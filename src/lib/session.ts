import { SessionOptions } from 'iron-session';

// Define the session data type
export interface SessionData {
  userId?: bigint;
  username?: string;
  password?: string;
  accesslevel?: string;
}

// Session configuration
export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD!,
  cookieName: 'asamasir-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365 * 10, // 10 years, effectively a very long duration
    sameSite: 'strict',
  },
};

export default sessionOptions;
