// src/app/layout.tsx
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
export const metadata = {
  title: 'آسامسیر ناوگان',
  description: 'A description for SEO and social media',
  icons: {
    icon: [
      {
        url: '/images/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/images/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      { url: '/images/favicon.ico', type: 'image/x-icon' },
    ],
    apple: '/images/apple-touch-icon.png', // If you have an Apple Touch Icon
  },
  manifest: '/images/site.webmanifest', // Optional if your project supports a web manifest
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* The ThemeProvider wraps the children to provide theme context */}
      <body className="antialiased">
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  );
}
