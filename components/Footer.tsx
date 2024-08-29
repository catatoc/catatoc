import React from "react"

import { cn } from "@/lib/utils"

export function Footer() {
  return (
    <footer className="border-t bg-background py-4 text-center z-50">
      <div className="container">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Carlos Horacio Carrasquero Quintini.{" "}
          Elaborado en {new Date().getFullYear()} para el proceso de selección
          de Empresas Polar 🇻🇪
        </p>
      </div>
    </footer>
  )
}
