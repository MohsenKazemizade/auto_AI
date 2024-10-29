// src/app/page.tsx
import React from 'react';
import { redirect } from 'next/navigation';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { getSession } from '../actions/sessionActions';

const Home = async () => {
  const session = await getSession();

  // Redirect to dashboard if the user is authenticated
  if (session?.userId) {
    redirect('/dashboard');
  }

  // Render the landing page if not authenticated
  return (
    <div>
      <Header />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
