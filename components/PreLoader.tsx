"use client"

import { useEffect, useState } from "react"

import { Progress } from "@/components/ui/progress"

import { LoadingHeader } from "./loading-header"

const emojis = [
  "🎹",
  "⚽",
  "💡",
  "😁",
  "🇻🇪",
  "👨🏻‍💻",
  "👷",
  "🔎",
  "🌵",
  "🎾",
  "🎵",
]

interface Asset {
  type: "image" | "video" | "audio" | "unknown"
  src: string
}

interface PreloaderProps {
  assets: Asset[]
  onLoaded: () => void
  timeout?: number // Opcional: timeout para la carga de cada asset
}

const Preloader = ({ assets, onLoaded, timeout = 10000 }: PreloaderProps) => {
  const [progress, setProgress] = useState(0)
  const [currentEmoji, setCurrentEmoji] = useState(emojis[0])

  useEffect(() => {
    const totalAssets = assets.length
    let loadedAssets = 0

    const updateProgress = (asset: Asset, status: string) => {
      loadedAssets += 1
      setProgress(Math.round((loadedAssets / totalAssets) * 100))
      console.log(`Asset loaded: ${asset.src}, Status: ${status}`)
      if (loadedAssets === totalAssets) {
        console.log("All assets loaded or timed out.")
        onLoaded() // Notifica que la carga ha terminado
      }
    }

    const loadAsset = (asset: Asset) => {
      console.log(`Starting to load asset: ${asset.src}`)
      return new Promise<void>((resolve) => {
        let timer = setTimeout(() => {
          console.warn(`Asset timed out: ${asset.src}`)
          resolve()
          updateProgress(asset, "timeout")
        }, timeout) // Timeout configurable para evitar atascos

        switch (asset.type) {
          case "image":
            const img = new Image()
            img.src = asset.src
            img.onload = () => {
              clearTimeout(timer)
              console.log(`Loaded image: ${asset.src}`)
              resolve()
              updateProgress(asset, "loaded")
            }
            img.onerror = () => {
              clearTimeout(timer)
              console.error(`Failed to load image: ${asset.src}`)
              resolve()
              updateProgress(asset, "error")
            }
            break
          case "video":
            const video = document.createElement("video")
            video.src = asset.src
            video.preload = "auto"
            video.onloadeddata = () => {
              clearTimeout(timer)
              console.log(`Loaded video: ${asset.src}`)
              resolve()
              updateProgress(asset, "loaded")
            }
            video.onerror = () => {
              clearTimeout(timer)
              console.error(`Failed to load video: ${asset.src}`)
              resolve()
              updateProgress(asset, "error")
            }
            break
          case "audio":
            const audio = new Audio()
            audio.src = asset.src
            audio.preload = "auto"
            audio.oncanplaythrough = () => {
              clearTimeout(timer)
              console.log(`Loaded audio: ${asset.src}`)
              resolve()
              updateProgress(asset, "loaded")
            }
            audio.onerror = () => {
              clearTimeout(timer)
              console.error(`Failed to load audio: ${asset.src}`)
              resolve()
              updateProgress(asset, "error")
            }
            break
          default:
            clearTimeout(timer)
            console.warn(`Unsupported asset type: ${asset.src}`)
            resolve()
            updateProgress(asset, "unsupported")
        }
      })
    }

    assets.forEach(loadAsset)

    // Cambiar emojis cada 1.5 segundos
    const emojiInterval = setInterval(() => {
      setCurrentEmoji((prevEmoji) => {
        const currentIndex = emojis.indexOf(prevEmoji)
        const nextIndex = (currentIndex + 1) % emojis.length
        return emojis[nextIndex]
      })
    }, 1500)

    return () => {
      clearInterval(emojiInterval)
    }
  }, [assets, onLoaded, timeout])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <LoadingHeader />
      <div className="text-center">
        <div className="mb-4 text-lg font-semibold text-white">{progress}%</div>
        <Progress value={progress} className="h-2 w-64" />
        <div className="mt-4 text-3xl">{currentEmoji}</div>
      </div>
    </div>
  )
}

export default Preloader
