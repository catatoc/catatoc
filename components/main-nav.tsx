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

  // Verificar si el usuario ha visitado la página /perfil
  React.useEffect(() => {
    const hasVisitedProfile = localStorage.getItem("hasVisitedProfile")

    if (!hasVisitedProfile) {
      // Si no ha visitado, mostrar el punto verde después de 10 segundos
      const timer = setTimeout(() => {
        setShowNotificationDot(true)
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [])

  // Guardar la visita cuando se acceda a la página /perfil
  React.useEffect(() => {
    if (pathname === "/perfil") {
      localStorage.setItem("hasVisitedProfile", "true")
      setShowNotificationDot(false) // Ocultar el punto verde si la página ha sido visitada
    }
  }, [pathname])

  // Determinar la ruta de destino
  const targetHref = pathname === "/" ? "/perfil" : "/perfil"

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href={targetHref} className="relative flex items-center space-x-2">
        <Avatar className="relative">
          <AvatarImage src="/profile.webp" alt="@catatoc" />
          <AvatarFallback>👨🏼‍🦲</AvatarFallback>
          {showNotificationDot && (
            <span className="absolute bottom-1 right-1 z-50 block size-3 animate-ping rounded-full bg-green-300"></span>
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
