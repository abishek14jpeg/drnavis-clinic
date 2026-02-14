import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const isSecure = process.env.NEXTAUTH_URL?.startsWith("https") || process.env.NODE_ENV === "production";
const cookieName = isSecure
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

export async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
        cookieName,
    });

    if (!token) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
