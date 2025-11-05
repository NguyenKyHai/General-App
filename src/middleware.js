export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    // Bắt đăng nhập cho tất cả route trừ login, api/auth, about
    "/((?!api/auth|login|dashboard/about|_next/static|_next/image|favicon.ico).*)",
  ],
}
