// src/hooks/useAuth.ts
import { useAuth } from '@/context/AuthContext';
import { loginUser } from '@/lib/api';

export const useAuthActions = () => {
  const { login } = useAuth();

  const authenticate = async (username: string, password: string) => {
    try {
      const { token } = await loginUser(username, password);
      login(token);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return { authenticate };
};
