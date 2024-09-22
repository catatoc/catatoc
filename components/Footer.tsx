import React from "react"

import { cn } from "@/lib/utils"

export function Footer() {
  return (
    <footer className="z-50 border-t bg-background py-4 text-center">
      <div className="container">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Carlos Horacio Carrasquero Quintini{" "}
          🇻🇪
        </p>
      </div>
    </footer>
  )
}
