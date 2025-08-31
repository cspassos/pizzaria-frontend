// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // deixe públicas a home e assets (ajuste se quiser)
  if (pathname === "/" || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  // proteja somente /dashboard (e subrotas)
  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  // ✅ NO EDGE: leia direto do cookie
  const token =
    req.cookies.get("token")?.value ||
    req.cookies.get("session")?.value || // se seu cookie tiver outro nome
    null;

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const ok = await validateToken(token);
  if (!ok) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

async function validateToken(token: string) {
  // ✅ Em PROD use uma env de servidor no FRONTEND project do Vercel
  // Vercel → Project → Settings → Environment Variables
  // API_URL = https://SEU-BACKEND.vercel.app
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

  try {
    const res = await fetch(`${apiBase}/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    return res.ok;
  } catch {
    return false;
  }
}

// aplica só em /dashboard pra não interceptar tudo
export const config = {
  matcher: ["/dashboard/:path*"],
};
