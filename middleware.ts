import { NextResponse } from "next/server";
// NextAuth beta requires a specific setup for middleware
import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = req.nextUrl.pathname.startsWith("/api/auth");
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isLoginRoute = req.nextUrl.pathname === "/admin/login";

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isLoginRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/admin/dashboard", req.nextUrl));
    }
    return NextResponse.next();
  }

  if (isAdminRoute && !isLoggedIn) {
    return Response.redirect(new URL("/admin/login", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
