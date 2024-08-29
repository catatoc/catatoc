"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname()
  const [showNotificationDot, setShowNotificationDot] = React.useState(false)

  // Determinar la ruta de destino
  const targetHref = pathname === "/" ? "/perfil" : "/perfil"

  // Mostrar el punto verde después de 10 segundos
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotificationDot(true)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href={targetHref} className="relative flex items-center space-x-2">
        <Avatar className="relative">
          <AvatarImage src="/profile.png" alt="@catatoc" />
          <AvatarFallback>CC</AvatarFallback>
          {showNotificationDot && (
            <span className="absolute bottom-1 right-1 z-50 block size-2 animate-ping rounded-full bg-green-500"></span>
          )}
        </Avatar>
        <span className="hidden font-bold md:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium",
                    item.disabled && "cursor-not-allowed opacity-80",
                    pathname === item.href
                      ? "text-green-500"
                      : "text-muted-foreground",
                    pathname === item.href &&
                      item.title === "🏡" &&
                      "border-green-500"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
