'use client';

import "./globals.css";
import {RecoilRoot} from "recoil";
import RecoilNexus from "recoil-nexus";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body><RecoilRoot><RecoilNexus />{children}</RecoilRoot></body>
    </html>
  );
}
