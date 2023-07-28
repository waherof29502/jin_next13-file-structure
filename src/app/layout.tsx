import './globals.css';

import { Nunito } from 'next/font/google';
import React from 'react';

import NavBar from '@/components/Navbar/navbar';
const font = Nunito({ subsets: ['latin'] });
export const metadata = {
  title: '123',
  description: 'Generated by create next app'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
