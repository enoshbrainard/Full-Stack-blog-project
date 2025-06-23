import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get("accesstoken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/verify`, {
      method: "GET",
      headers: {
        Cookie: `accesstoken=${token}`,
      },
      credentials: "include",
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Middleware error:", err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
