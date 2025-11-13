import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { prisma } from "@/lib/prisma";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export async function POST(req) {
  try {
    const formData = await req.formData();

    const title = formData.get('title');
    const contentEntries = [];

    // Kiểm tra title và date có hợp lệ không
    if (!title) {
      return NextResponse.json({ success: false, message: 'Thiếu tiêu đề hoặc ngày' }, { status: 400 });
    }

    // Lặp qua các phần nội dung
    for (let i = 0; ; i++) {
      const type = formData.get(`content[${i}][type]`);
      if (!type) break;

      if (type === 'text') {
        const contentText = formData.get(`content[${i}][content]`);
        contentEntries.push({
          type: 'text',
          content: contentText,
        });
      } else if (type === 'image') {
        const mediaEntries = [];
        const mediaCount = formData.getAll(`content[${i}][media][0][src]`).length;

        // Xử lý từng media (hình ảnh)
        for (let j = 0; j < mediaCount; j++) {
          const file = formData.get(`content[${i}][media][${j}][src]`);
          const alt = formData.get(`content[${i}][media][${j}][alt]`);
          const note = formData.get(`content[${i}][media][${j}][note]`);

          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          // Upload file lên Cloudinary
          const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
              {
                folder: 'blog_media',
                resource_type: 'auto',
              },
              (err, result) => {
                if (err) reject(err);
                else resolve(result);
              }
            ).end(buffer);
          });

          // Lưu media vào mảng mediaEntries
          mediaEntries.push({
            src: result.secure_url,
            alt,
            note,
            type: 'image',
          });
        }

        // Lưu phần nội dung "image" vào contentEntries
        contentEntries.push({
          type: 'image',
          content: mediaEntries.filter(Boolean), // Lưu danh sách media dưới dạng chuỗi JSON
        });
      }
    }

    // Tạo bài viết trong database
    const post = await prisma.post.create({
      data: {
        title,
        date: new Date(),  // Tạo ngày giờ hiện tại
        content: {
          create: contentEntries.filter(Boolean).map((entry) => ({
            type: entry.type,
            content: entry.type === 'text' ? entry.content : null,  // Nếu là văn bản, lưu vào content
            media: entry.type === 'image' ? {
              create: entry.content.map((media) => ({
                src: media.src,
                alt: media.alt,
                note: media.note,
                type: media.type,
              })),
            } : undefined, // Nếu không phải hình ảnh thì không cần tạo media
          })),
        },
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (err) {
    console.error('Lỗi xử lý POST:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
