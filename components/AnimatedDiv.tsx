"use client"

import { motion } from "framer-motion"

interface AnimatedDivProps {
  children: React.ReactNode
  className?: string
}

export default function AnimatedDiv({ children, className }: AnimatedDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
