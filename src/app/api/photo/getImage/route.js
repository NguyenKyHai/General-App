import cloudinary from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const publicId = searchParams.get('public_id');

  if (!publicId) {
    return NextResponse.json({ error: 'Missing public_id parameter' }, { status: 400 });
  }

  try {
    // Gọi Cloudinary để lấy thông tin ảnh
    const result = await cloudinary.api.resource(publicId, {
      resource_type: 'image',
    });

    return NextResponse.json({
      secure_url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      created_at: result.created_at,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
