// src/actions/sidebarActions.ts
'use server';

import { redirect } from 'next/navigation';

export const goToNewTank = () => {
  redirect('/analytics');
};
