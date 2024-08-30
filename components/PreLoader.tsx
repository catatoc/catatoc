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

const Preloader = ({ assets, onLoaded, timeout = 5000 }: PreloaderProps) => {
  const [progress, setProgress] = useState(0)
  const [currentEmoji, setCurrentEmoji] = useState(emojis[0])

  useEffect(() => {
    const totalAssets = assets.length
    let loadedAssets = 0

    const updateProgress = () => {
      loadedAssets += 1
      setProgress(Math.round((loadedAssets / totalAssets) * 100))
      if (loadedAssets === totalAssets) {
        onLoaded() // Notifica que la carga ha terminado
      }
    }

    const loadAsset = (asset: Asset) => {
      return new Promise<void>((resolve) => {
        let timer = setTimeout(() => {
          resolve()
          updateProgress()
        }, timeout) // Timeout configurable para evitar atascos

        switch (asset.type) {
          case "image":
            const img = new Image()
            img.src = asset.src
            img.onload = () => {
              clearTimeout(timer)
              resolve()
              updateProgress()
            }
            img.onerror = () => {
              clearTimeout(timer)
              resolve()
              updateProgress()
            }
            break
          case "video":
            const video = document.createElement("video")
            video.src = asset.src
            video.preload = "auto"
            video.onloadeddata = () => {
              clearTimeout(timer)
              resolve()
              updateProgress()
            }
            video.onerror = () => {
              clearTimeout(timer)
              resolve()
              updateProgress()
            }
            break
          case "audio":
            const audio = new Audio()
            audio.src = asset.src
            audio.preload = "auto"
            audio.oncanplaythrough = () => {
              clearTimeout(timer)
              resolve()
              updateProgress()
            }
            audio.onerror = () => {
              clearTimeout(timer)
              resolve()
              updateProgress()
            }
            break
          default:
            // En caso de tipo no soportado
            clearTimeout(timer)
            resolve()
            updateProgress()
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
        <div className="mt-4 text-3xl">{currentEmoji}</div>{" "}
        {/* Emoji que cambia */}
      </div>
    </div>
  )
}

export default Preloader
