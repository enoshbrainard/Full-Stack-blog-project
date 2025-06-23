import { NextResponse } from "next/server";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("accesstoken")?.value;

  console.log("🟢 Middleware running for:", pathname);
  console.log("🔑 accesstoken in cookie:", token);

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin"], // Only run for these routes
};
