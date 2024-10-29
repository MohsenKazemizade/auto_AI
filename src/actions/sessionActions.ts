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

  return session;
};

export const login = async (formData: FormData) => {
  const session = await getSession();
  const formUsername = formData.get('username') as string;
  const formPassword = formData.get('password') as string;

  // Check for the user in the database
  const user = await prisma.asaUser.findUnique({
    where: { UserName: formUsername },
  });

  // Validate user credentials
  if (user && (await bcrypt.compare(formPassword, user.Password))) {
    // If user is found and password matches, update the session
    session.userId = user.ID.toString();
    session.username = user.UserName;
    session.accesslevel = user.AccessLevel;
    await session.save();

    // Redirect to dashboard
    redirect('/dashboard');
  } else {
    // Handle invalid login attempt by throwing an error
    throw new Error('Invalid username or password');
  }
};

export const logout = async () => {
  // Future logic for logout
};
