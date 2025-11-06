// pages/api/posts/[id].js
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server"; // Import NextResponse

export async function GET(req, { params }) {
  // Kiểm tra phiên đăng nhập người dùng
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Lấy ID từ params
  const { id } = await params;

  try {
    // Tìm bài viết theo ID trong cơ sở dữ liệu
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        content: true,  // Bao gồm nội dung của bài viết
      },
    });

    // Kiểm tra nếu bài viết không tồn tại
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // Trả về bài viết theo ID
    return NextResponse.json(post, { status: 200 });

  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error fetching post:", error);
    return NextResponse.json({ message: "Failed to fetch post" }, { status: 500 });
  }
}
