import React from "react"
import type { Metadata } from 'next'
import { JetBrains_Mono, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: '--font-mono' });

export const metadata = {
  title: "Aman Verma | Software Engineer",

  description:
    "Portfolio of Aman Verma, a B.Tech Information Technology student specializing in Java Backend Development, Spring Boot, REST APIs, and Data Structures & Algorithms.",

  keywords: [
    "Aman Verma",
    "Java Developer",
    "Spring Boot",
    "Backend Developer",
    "Portfolio",
    "Software Engineer",
    "REST API",
    "DSA",
  ],

  authors: [{ name: "Aman Verma" }],

  creator: "Aman Verma",

  openGraph: {
    title: "Aman Verma | Java Backend Developer",
    description:
      "Backend developer passionate about Spring Boot, REST APIs, and scalable software engineering.",
    url: "https://your-domain.vercel.app",
    siteName: "Aman Verma Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
