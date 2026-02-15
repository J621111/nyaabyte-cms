import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import crypto from 'crypto';

const AUTH_COOKIE_NAME = 'cms_session';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7天

export interface AuthSession {
  username: string;
  isAuthenticated: boolean;
  expiresAt: number;
}

// 验证密码
export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.CMS_ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error('CMS_ADMIN_PASSWORD not set in environment variables');
    return false;
  }
  return password === adminPassword;
}

// 创建会话
export async function createSession(username: string): Promise<void> {
  const session: AuthSession = {
    username,
    isAuthenticated: true,
    expiresAt: Date.now() + SESSION_DURATION,
  };

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_DURATION / 1000, // 转换为秒
    path: '/',
  });
}

// 销毁会话
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

// 获取当前会话
export async function getSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME);
  
  if (!sessionCookie) {
    return null;
  }

  try {
    const session: AuthSession = JSON.parse(sessionCookie.value);
    
    // 检查会话是否过期
    if (session.expiresAt < Date.now()) {
      await destroySession();
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

// 检查是否已认证
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session?.isAuthenticated === true;
}

// API 路由认证检查
export async function requireAuth(): Promise<{ success: false; response: Response } | { success: true; session: AuthSession }> {
  const session = await getSession();
  
  if (!session?.isAuthenticated) {
    return {
      success: false,
      response: new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      ),
    };
  }

  return { success: true, session };
}