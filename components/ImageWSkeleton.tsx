import React from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface ImageWSkeletonProps {
  src?: string
  alt?: string
  aspectRatio?: "portrait" | "square"
  className?: string
}

export default function ImageWSkeleton({
  src,
  alt,
  aspectRatio = "portrait",
  className,
}: ImageWSkeletonProps) {
  const [imageLoading, setImageLoading] = React.useState(true)
  const [pulsing, setPulsing] = React.useState(true)

  const imageLoaded = () => {
    setImageLoading(false)
    setTimeout(() => setPulsing(false), 200)
  }

  return (
    <motion.div
      className={cn(
        pulsing && "pulse",
        "relative overflow-hidden rounded-lg bg-slate-100",
        aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square",
        className
      )}
    >
      {/* Background Image Blurred */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center blur-2xl"
        style={{
          backgroundImage: `url(${src})`,
          filter: "blur(20px)",
        }}
      />

      {/* Foreground Image Centered */}
      <motion.img
        initial={{ opacity: 0 }}
        animate={{
          opacity: imageLoading ? 0 : 1,
        }}
        transition={{
          opacity: { delay: 0.3, duration: 0.4 },
        }}
        src={src}
        alt={alt}
        onLoad={imageLoaded}
        className={cn(
          "relative z-10 mx-auto max-h-full max-w-full object-contain",
          className
        )}
      />
    </motion.div>
  )
}
