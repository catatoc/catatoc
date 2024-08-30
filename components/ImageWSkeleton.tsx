import React from "react"
import { motion } from "framer-motion"

interface ImageWSkeletonProps {
  src?: string
  alt?: string
}
export default function ImageWSkeleton({ src, alt }: ImageWSkeletonProps) {
  const [imageLoading, setImageLoading] = React.useState(true)
  const [pulsing, setPulsing] = React.useState(true)
  const imageLoaded = () => {
    setImageLoading(false)
    setTimeout(() => setPulsing(false), 200)
  }
  return (
    <motion.div
      className={`${pulsing && "pulse"} h-fit w-full rounded-lg bg-slate-100`}
    >
      <motion.img
        initial={{ height: "16rem", opacity: 0 }}
        // style={{ height: imageLoading ? "6rem" : "auto" }}
        animate={{
          height: imageLoading ? "16rem" : "auto",
          opacity: imageLoading ? 0 : 1,
        }}
        transition={{
          height: { delay: 0, duration: 0.4 },
          opacity: { delay: 0.5, duration: 0.4 },
        }}
        src={src}
        alt={alt}
        onLoad={imageLoaded}
        className="h-auto w-full rounded-lg object-contain"
      ></motion.img>
    </motion.div>
  )
}
