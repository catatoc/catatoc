"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { cn } from "@/lib/utils"

export function BackButton({ className }: { className?: string }) {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className={cn(
        "items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors absolute hidden mt-4 ml-4 z-50",
        className
      )}
    >
      <ArrowLeft className="h-5 w-5" />
      <span>Volver</span>
    </button>
  )
}
