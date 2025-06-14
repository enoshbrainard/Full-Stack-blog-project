import { NextResponse } from "next/server";

export async function middleware(request) {
  console.log("✅ Middleware running...");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/verify`, {
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
    credentials: "include",
  });

  if (res.status === 401) {
    console.log("⛔ Unauthorized, redirecting...");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin"], // covers /admin and deeper routes
};
