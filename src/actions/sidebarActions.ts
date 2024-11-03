// src/actions/sidebarActions.ts
'use server';

import { redirect } from 'next/navigation';

export const goToDashboard = () => {
  redirect('/dashboard');
};

export const goToNewTank = () => {
  redirect('/analytics');
};

export const logout = () => {
  redirect('/settings');
};
