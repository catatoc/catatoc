import dynamic from "next/dynamic"

import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { BackButton } from "@/components/BackButton"
import { ClientWrapper } from "@/components/ClientWrapper"
import { Footer } from "@/components/Footer"
import Chatbot from "@/components/faqs"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

// Cargar dinámicamente el componente que usa Framer Motion
const AnimatedMain = dynamic(() => import("@/components/AnimatedMain"), {
  ssr: false, // Deshabilitar SSR para este componente
})

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
    // Academic
    { type: "image", src: "/images/academic/tesis.webp" },

    // Achievements
    { type: "image", src: "/images/achievements/achievement1.webp" },
    { type: "image", src: "/images/achievements/achievement2.webp" },
    { type: "image", src: "/images/achievements/achievement3.webp" },
    { type: "image", src: "/images/achievements/achievement4.webp" },
    { type: "image", src: "/images/achievements/achievement5.webp" },
    { type: "image", src: "/images/achievements/achievement6.webp" },

    // Canada
    { type: "image", src: "/images/canada/canada1.webp" },
    { type: "image", src: "/images/canada/canada2.webp" },
    { type: "image", src: "/images/canada/canada3.webp" },
    { type: "image", src: "/images/canada/canada4.webp" },
    { type: "image", src: "/images/canada/canada5.webp" },
    { type: "image", src: "/images/canada/canada6.webp" },
    { type: "image", src: "/images/canada/canada7.webp" },
    { type: "image", src: "/images/canada/canada8.webp" },

    // Engineering
    { type: "image", src: "/images/engineering/engineering1.webp" },
    { type: "image", src: "/images/engineering/engineering2.webp" },
    { type: "image", src: "/images/engineering/engineering3.webp" },
    { type: "image", src: "/images/engineering/engineering4.webp" },
    { type: "image", src: "/images/engineering/engineering5.webp" },
    { type: "image", src: "/images/engineering/engineering6.webp" },
    { type: "image", src: "/images/engineering/engineering7.webp" },
    { type: "image", src: "/images/engineering/engineering8.webp" },
    { type: "image", src: "/images/engineering/engineering9.webp" },
    { type: "image", src: "/images/engineering/engineering10.webp" },
    { type: "image", src: "/images/engineering/engineering11.webp" },
    { type: "image", src: "/images/engineering/engineering12.webp" },
    { type: "image", src: "/images/engineering/tech.webp" },

    // Family
    { type: "image", src: "/images/family/family1.webp" },
    { type: "image", src: "/images/family/family2.webp" },
    { type: "image", src: "/images/family/family3.webp" },
    { type: "image", src: "/images/family/family4.webp" },
    { type: "image", src: "/images/family/family5.webp" },
    { type: "image", src: "/images/family/family6.webp" },
    { type: "image", src: "/images/family/family7.webp" },
    { type: "image", src: "/images/family/family8.webp" },
    { type: "image", src: "/images/family/family9.webp" },
    { type: "image", src: "/images/family/family10.webp" },
    { type: "image", src: "/images/family/family11.webp" },
    { type: "image", src: "/images/family/family12.webp" },

    // Leadership
    { type: "image", src: "/images/leadership/leadership1.webp" },
    { type: "image", src: "/images/leadership/leadership2.webp" },
    { type: "image", src: "/images/leadership/leadership3.webp" },
    { type: "image", src: "/images/leadership/leadership4.webp" },
    { type: "image", src: "/images/leadership/royale.webp" },

    // Music
    { type: "image", src: "/images/music/esquina.webp" },
    { type: "image", src: "/images/music/koga.webp" },
    { type: "image", src: "/images/music/music1.webp" },
    { type: "image", src: "/images/music/music2.webp" },
    { type: "image", src: "/images/music/music3.webp" },
    { type: "image", src: "/images/music/music4.webp" },
    { type: "image", src: "/images/music/music5.webp" },
    { type: "image", src: "/images/music/music6.webp" },
    { type: "image", src: "/images/music/music7.webp" },
    { type: "image", src: "/images/music/music8.webp" },
    { type: "image", src: "/images/music/music9.webp" },
    { type: "audio", src: "/music/music.mp3" }, // Archivo de audio

    // People
    { type: "image", src: "/images/people/people1.webp" },
    { type: "image", src: "/images/people/people2.webp" },
    { type: "image", src: "/images/people/people3.webp" },
    { type: "image", src: "/images/people/people4.webp" },
    { type: "image", src: "/images/people/people5.webp" },
    { type: "image", src: "/images/people/people6.webp" },
    { type: "image", src: "/images/people/people7.webp" },
    { type: "image", src: "/images/people/people8.webp" },
    { type: "image", src: "/images/people/people9.webp" },
    { type: "image", src: "/images/people/people10.webp" },

    // Sports
    { type: "image", src: "/images/sports/soccer.webp" },
    { type: "image", src: "/images/sports/sport1.webp" },
    { type: "image", src: "/images/sports/sport2.webp" },
    { type: "image", src: "/images/sports/sport3.webp" },
    { type: "image", src: "/images/sports/sport4.webp" },
    { type: "image", src: "/images/sports/sport5.webp" },
    { type: "image", src: "/images/sports/sport6.webp" },
    { type: "image", src: "/images/sports/sport7.webp" },
    { type: "image", src: "/images/sports/sport8.webp" },
    { type: "image", src: "/images/sports/sport9.webp" },
    { type: "image", src: "/images/sports/sport10.webp" },
    { type: "image", src: "/images/sports/sport11.webp" },
    { type: "image", src: "/images/sports/sport12.webp" },
    { type: "image", src: "/images/sports/sport13.webp" },
    { type: "image", src: "/images/sports/sport14.webp" },
    { type: "image", src: "/images/sports/sport15.webp" },
    { type: "image", src: "/images/sports/sport16.webp" },

    // Profile
    { type: "image", src: "/profile.webp" },
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
            <ClientWrapper assets={assetsToLoad as any}>
              <div className="relative flex min-h-screen flex-col overflow-x-hidden">
                <SiteHeader />
                <AnimatedMain>
                  <BackButton className="" />
                  {children}
                </AnimatedMain>
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
