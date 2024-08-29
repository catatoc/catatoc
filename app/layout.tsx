import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import Cactus from "@/components/Cactus"
import { ClientWrapper } from "@/components/ClientWrapper"
import { Footer } from "@/components/Footer"
import Chatbot from "@/components/faqs"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

// Importa el componente Cactus

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const assetsToLoad = [
    { type: "image", src: "/images/sports/soccer.png" },
    { type: "image", src: "/images/academic/tesis.png" },
    { type: "image", src: "/images/music/esquina.png" },
    { type: "image", src: "/images/family/royale.png" },
    { type: "image", src: "/images/engineering/tech.png" },
    { type: "image", src: "/images/music/koga.png" },
    { type: "image", src: "/images/people/cono.png" },
    { type: "audio", src: "/music/music.mp3" },
  ]

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ClientWrapper assets={assetsToLoad}>
              <div className="relative flex min-h-screen flex-col overflow-x-hidden">
                <SiteHeader />
                <main className="flex-1 px-4 mt-16">{children}</main>
                <TailwindIndicator />
                <Chatbot />
              </div>
              <Footer />
            </ClientWrapper>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
