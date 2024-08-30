"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface LoadingNavProps {
  items?: NavItem[]
}

export function LoadingNav({ items }: LoadingNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <div className="relative flex items-center space-x-2">
        <Avatar className="relative">
          <AvatarImage src="/profile.webp" alt="@catatoc" />
          <AvatarFallback>CC</AvatarFallback>
        </Avatar>
        <span className="hidden font-bold md:inline-block">
          {siteConfig.name}
        </span>
      </div>
    </div>
  )
}
