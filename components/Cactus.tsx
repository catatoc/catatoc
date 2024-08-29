"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"

const Cactus = () => {
  const router = useRouter()

  useEffect(() => {
    // Configura el temporizador para mostrar el cactus después de 30 segundos
    const timer = setTimeout(() => {
      // Crear el elemento del cactus
      const cactus = document.createElement("div")
      cactus.textContent = "🌵"
      cactus.style.position = "fixed"
      cactus.style.bottom = "16px"
      cactus.style.left = "16px"
      cactus.style.cursor = "pointer"
      cactus.style.animation = "slide-in 1s ease-out, pulse 1.5s infinite"
      cactus.style.zIndex = "1000"
      cactus.style.fontSize = "48px" // Aumentar el tamaño del cactus

      // Añadir manejador de click al cactus
      cactus.addEventListener("click", () => {
        const currentPath = window.location.pathname
        const targetPath = currentPath === "/" ? "/perfil" : "/"
        router.push(targetPath)
      })

      // Agregar el cactus al body
      document.body.appendChild(cactus)
    }, 30000)

    // Limpiar el temporizador si el componente se desmonta
    return () => clearTimeout(timer)
  }, [router])

  return null
}

export default Cactus
