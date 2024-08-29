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

  // Determinar la ruta de destino
  const targetHref = pathname === "/" ? "/perfil" : "/"

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href={targetHref} className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src="/profile.png" alt="@catatoc" />
          <AvatarFallback>CC</AvatarFallback>
        </Avatar>
        <span className="hidden font-bold md:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
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
