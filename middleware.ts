import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 登录页面路径
const loginPath = '/login';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 允许访问登录页面
  if (pathname === loginPath) {
    return NextResponse.next();
  }

  // 检查是否是受保护的路径
  // /posts/new 或 /posts/:slug (编辑现有文章)
  const isProtectedPath = pathname === '/posts/new' || 
    (pathname.startsWith('/posts/') && pathname !== '/posts');

  if (!isProtectedPath) {
    return NextResponse.next();
  }

  // 检查是否有认证 cookie
  const sessionCookie = request.cookies.get('cms_session');
  
  if (!sessionCookie) {
    // 未登录，重定向到登录页面
    const loginUrl = new URL(loginPath, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 验证会话是否有效
  try {
    const session = JSON.parse(sessionCookie.value);
    if (!session.isAuthenticated || session.expiresAt < Date.now()) {
      // 会话无效或过期，重定向到登录页面
      const loginUrl = new URL(loginPath, request.url);
      return NextResponse.redirect(loginUrl);
    }
  } catch {
    // Cookie 解析失败，重定向到登录页面
    const loginUrl = new URL(loginPath, request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// 配置中间件匹配的路径
export const config = {
  matcher: [
    '/posts/:path*',
    '/login',
  ],
};