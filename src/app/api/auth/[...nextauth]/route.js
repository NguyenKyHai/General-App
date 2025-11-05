import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma";

// Tài khoản đặc biệt, bypass hash
const specialAccounts = [
  { username: "admin", password: "123456", name: "SystemAdmin", role: "Admin" },
]

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { username: {}, password: {} },
      async authorize(credentials) {
        // 1️⃣ Kiểm tra tài khoản đặc biệt trước
        const special = specialAccounts.find(u => u.username === credentials.username && u.password === credentials.password)
        if (special) {
          return { id: special.username, name: special.name, username: special.username, role: special.role }
        }

        // 2️⃣ Nếu không phải tài khoản đặc biệt, so sánh với users trong db
        const user = await prisma.user.findUnique({ where: { username: credentials.username } });
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          const { password, ...safeUser } = user
          return safeUser
        }

        return null
      }
    })
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.username = token.username;
      session.user.role = token.role;
      return session;
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
