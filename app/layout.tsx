import type {Metadata} from 'next';
import localFont from 'next/font/local';
import './globals.css';
import {NotesProvider} from '@/app/context/NotesContext';
import Header from '@/app/components/header/Header';
import {SessionProvider} from 'next-auth/react';


const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'Vision Notes',
    description: 'A simple OCR app using Google Cloud Vision',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link rel="manifest" href="/public/manifest.json" />
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <SessionProvider>
            <NotesProvider>
                <Header/>
                {children}
            </NotesProvider>
        </SessionProvider>
        </body>
        </html>
    );
}
