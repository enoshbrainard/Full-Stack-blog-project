import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // you must bundle this properly

export async function middleware(request) {
  console.log("✅ Middleware running...");

  const token = request.cookies.get("jwt")?.value;

  if (!token) {
    console.log("⛔ No token found");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // use a shared secret
    console.log("✅ Token verified:", decoded);
    return NextResponse.next();
  } catch (err) {
    console.log("⛔ Invalid token");
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
