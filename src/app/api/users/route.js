import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { hash } from "bcryptjs";
import { authOptions } from "../auth/[...nextauth]/route"; // nếu dùng NextAuth

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });

  const users = await prisma.user.findMany();

  return new Response(JSON.stringify(users), { status: 200 });
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });

  const { name, username, password, role } = await req.json();
  if (!name || !username || !password || !role)
    return new Response(JSON.stringify({ message: "Missing fields" }), { status: 400 });

  const hashedPassword = await hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { name, username, password: hashedPassword, role: role },
      select: { id: true, name: true, username: true },
    });
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err }), { status: 400 });
  }
}
