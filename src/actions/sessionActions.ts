// src/actions/sessionActions.ts
'use server';
import { sessionOptions, SessionData } from '../lib/session';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

// Retrieve the session
export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return session;
};

// Placeholder for future login functionality
export const login = async () => {
  // Future logic for login
};

// Placeholder for future logout functionality
export const logout = async () => {
  // Future logic for logout
};
