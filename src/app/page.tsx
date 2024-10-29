import React from 'react';
import { GetServerSideProps } from 'next';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { getSession } from '../actions/sessionActions';

const Home: React.FC = () => (
  <div>
    <Header />
    <Hero />
    <Footer />
  </div>
);

export const getServerSideProps: GetServerSideProps = async () => {
  // Get the session server-side
  const session = await getSession();

  // If a session exists, redirect to the dashboard
  if (session?.userId) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  // Otherwise, render the landing page
  return { props: {} };
};

export default Home;
