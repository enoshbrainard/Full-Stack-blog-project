import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get("accesstoken")?.value;
  const pathname = request.nextUrl.pathname;

  console.log("➡️ Middleware running for:", pathname);
  console.log("➡️ Token found:", token);

  // ⛔ Fix: `pathname` must be defined before this
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/_next") || // static files
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  if (!token) {
    console.log("⛔ No token, redirecting to login");
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

    console.log("✅ /api/verify status:", res.status);

    if (!res.ok) {
      console.log("⛔ Token invalid, redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.log("❌ Middleware error:", err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/admin"], // ✅ Apply only to protected routes
};
