// src/app/layout.tsx
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';

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
