export { default } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.SECRET, // Should be NEXTAUTH_SECRET in newer versions
  });

  const url = request.nextUrl;

  // If user is authenticated and trying to access login/register
  if (
    token &&
    (url.pathname.startsWith("/login") || url.pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is not authenticated and trying to access login/register
  if (
    !token &&
    (url.pathname.startsWith("/login") || url.pathname.startsWith("/register"))
  ) {
    return NextResponse.next(); // Allow access to login/register pages
  }

  // Default case - could add more logic for protected routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register"], // Works fine as is
};
