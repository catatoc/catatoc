import Link from "next/link"
import { Linkedin } from "lucide-react"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { LoadingNav } from "./loading-nav"
import { PreloaderThemeToggle } from "./theme-toggle-preloader"

export function LoadingHeader() {
  return (
    <header className="fixed top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <LoadingNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Linkedin className="size-5 fill-current md:block" />
                <span className="sr-only">LinkedIn</span>
              </div>
            </Link>
            <PreloaderThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
