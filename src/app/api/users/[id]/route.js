import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { hash } from "bcryptjs";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server"; // Import NextResponse

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, username: true },
  });

  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  return NextResponse.json(user, { status: 200 });
}

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = params;
  const { name, username, password } = await req.json();

  const data = { name, username };
  if (password) data.password = await hash(password, 10);

  try {
    const user = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, username: true },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Update failed or duplicate" }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = params;

  try {
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Delete failed" }, { status: 400 });
  }
}
