import { NextRequest, NextResponse } from 'next/server';
import { getCookieServer } from './lib/cookieServer';

export async function middleware(req: NextRequest){
  const { pathname } = req.nextUrl;

  // libera assets e a home
  if (pathname.startsWith('/_next') || pathname === '/') {
    return NextResponse.next();
  }

  // 👇 lê o cookie direto do request (Edge runtime)
  //const token = req.cookies.get('session')?.value || null;
  const token = await getCookieServer();

  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    const isValid = await validateToken(token);
    console.log('ISVALID---:', isValid);

    if (!isValid) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

async function validateToken(token: string){
  if (!token) return false;

  try {
    // 👇 use fetch no middleware (axios quebra no Edge)
    const res = await fetch('http://localhost:3333/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    return res.ok;
  } catch {
    return false;
  }
}