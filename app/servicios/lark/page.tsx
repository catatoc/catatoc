"use client"

import { motion } from "framer-motion"

import { fadeInAnimation } from "@/components/animations/fadeInAnimation"
import LarkPackages from "@/components/services/lark/lark-packages"

export default function LarkPage() {
  return (
    <motion.div
      {...fadeInAnimation}
      className="relative min-h-screen p-2 lg:p-8"
    >
      <LarkPackages />
    </motion.div>
  )
}
