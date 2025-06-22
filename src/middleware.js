import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("✅ Middleware is running for:", request.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
