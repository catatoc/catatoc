"use client"

import { useState } from "react"

import Preloader from "@/components/PreLoader"

interface ClientWrapperProps {
  children: React.ReactNode
  assets: { type: string; src: string }[]
}

export const ClientWrapper = ({ children, assets }: ClientWrapperProps) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && (
        <Preloader assets={assets} onLoaded={() => setLoaded(true)} />
      )}
      {loaded && children}
    </>
  )
}
