"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

export default function AnimatedMain({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0 }} // Comienza con opacidad 0 (invisible)
      animate={{ opacity: 1 }} // Se desvanece hasta opacidad 1 (completamente visible)
      transition={{ duration: 0.5 }} // Duración de la animación de medio segundo
      className="mt-16 flex-1 px-4"
    >
      {children}
    </motion.main>
  )
}
