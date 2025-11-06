// src/app/api/post/route.js
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Dữ liệu bài viết được khởi tạo trực tiếp thay vì lấy từ req.json()
    const blogPost = {
      title: "Khám Phá Next.js và Tailwind CSS",
      date: new Date("2025-11-10T00:00:00.000Z"),
      insertedDate: new Date("2025-11-10T00:00:00.000Z"),
      updatedDate: new Date("2025-11-10T00:00:00.000Z"),
      content: [
        {
          type: "text",
          content: "Trong bài viết này, chúng ta sẽ cùng tìm hiểu về cách Next.js và Tailwind CSS có thể kết hợp với nhau để tạo ra các ứng dụng web mạnh mẽ và dễ dàng tùy chỉnh."
        },
        {
          type: "image",
          src: "/images/nextjs-tailwind-1.png",
          alt: "Next.js và Tailwind CSS"
        },
        {
          type: "text",
          content: "Next.js là một framework React giúp bạn xây dựng các ứng dụng web với các tính năng mạnh mẽ như SSR (Server-Side Rendering) và SSG (Static Site Generation). Tailwind CSS là một framework CSS tiện lợi giúp tạo giao diện nhanh chóng mà không cần phải viết quá nhiều mã CSS."
        },
        {
          type: "image",
          src: "/images/nextjs-tailwind-2.png",
          alt: "Tích hợp Tailwind CSS vào Next.js"
        },
        {
          type: "text",
          content: "Việc sử dụng Tailwind CSS với Next.js giúp bạn dễ dàng tạo giao diện đẹp mắt và dễ dàng cấu hình mà không mất quá nhiều thời gian."
        },
        {
          type: "quote",
          content: "Kết hợp Next.js và Tailwind CSS giúp việc phát triển ứng dụng nhanh chóng và hiệu quả hơn."
        }
      ]
    };

    // Tạo bài viết mới trong cơ sở dữ liệu
    const createdPost = await prisma.post.create({
      data: {
        title: blogPost.title,
        date: blogPost.date,
        insertedDate: blogPost.insertedDate,
        updatedDate: blogPost.updatedDate,
        content: {
          create: blogPost.content.map((item) => ({
            type: item.type,
            content: item.content || null,
            src: item.src || null,
            alt: item.alt || null,
          })),
        },
      },
    });

    // Trả về phản hồi với status code 201 (Created) và dữ liệu bài viết vừa tạo
    return NextResponse.json(createdPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    // Trả về phản hồi lỗi nếu có sự cố trong quá trình tạo bài viết
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra khi tạo bài viết" },
      { status: 500 }
    );
  }
}
