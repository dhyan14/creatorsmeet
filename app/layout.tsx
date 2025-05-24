import React from 'react'
import './globals.css'
import type { Metadata } from 'next'
import { Space_Grotesk } from "next/font/google"

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: 'Creators Meet - Your All-In-One Innovation Network',
  description: 'Connect, collaborate, and create with innovators worldwide. Join Creators Meet to transform your ideas into reality.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="font-space-grotesk antialiased">
        {children}
      </body>
    </html>
  )
} 