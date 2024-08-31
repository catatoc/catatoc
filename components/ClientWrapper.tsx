"use client"

import { useState } from "react"

import Preloader from "@/components/PreLoader"

interface Asset {
  type: "image" | "video" | "audio" | "unknown"
  src: string
}

interface ClientWrapperProps {
  children: React.ReactNode
  assets: Asset[]
}

export const ClientWrapper = ({ children, assets }: ClientWrapperProps) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && (
        <Preloader
          assets={assets}
          onLoaded={() => setLoaded(true)}
          timeout={10000}
        />
      )}
      {loaded && children}
    </>
  )
}
