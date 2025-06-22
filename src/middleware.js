import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("jwt")?.value;

  if (!token) {
    console.log("⛔ No token, redirecting...");
    // return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret); // No need to store decoded if not needed
    return NextResponse.next();
  } catch (err) {
    console.log("❌ Invalid token, redirecting...");
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
