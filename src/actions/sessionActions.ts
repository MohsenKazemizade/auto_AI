// src/actions/sessionActions.ts
'use server';
import { sessionOptions, SessionData } from '../lib/session';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Retrieve the session
export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (session) return session;
};

// Login form submission action
export const handleLoginSubmit = async (formData: FormData) => {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    const errorMessage = encodeURIComponent(
      'نام کاربری یا رمز عبور اشتباه است'
    );
    redirect(`/login?error=${errorMessage}`);
    return;
  }

  const user = await prisma.asaUser.findUnique({
    where: { UserName: username },
  });

  if (user && (await bcrypt.compare(password, user.Password))) {
    const session = await getSession();
    session.userId = user.ID.toString();
    session.username = user.UserName;
    session.accesslevel = user.AccessLevel;
    await session.save();

    redirect('/dashboard');
  } else {
    const errorMessage = encodeURIComponent(
      'نام کاربری یا رمز عبور اشتباه است'
    );
    redirect(`/login?error=${errorMessage}`);
  }
};
// Logout
export const handleLogout = async () => {
  // Retrieve the session
  const session = await getIronSession(cookies(), sessionOptions);

  // Destroy the session
  session.destroy();

  // Redirect to login page after session is destroyed
  redirect('/login');
};
