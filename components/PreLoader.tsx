"use client"

import { useEffect, useState } from "react"

import { Progress } from "@/components/ui/progress"

const Preloader = ({
  assets,
  onLoaded,
}: {
  assets: { type: string; src: string }[]
  onLoaded: () => void
}) => {
  const [progress, setProgress] = useState(0)

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

    const loadAsset = (asset: any) => {
      return new Promise<void>((resolve) => {
        let timeout = setTimeout(() => {
          resolve()
          updateProgress()
        }, 5000) // Timeout de 5 segundos para asegurar que no se quede atascado

        if (asset.type === "image") {
          const img = new Image()
          img.src = asset.src
          img.onload = () => {
            clearTimeout(timeout)
            resolve()
            updateProgress()
          }
          img.onerror = () => {
            clearTimeout(timeout)
            resolve()
            updateProgress()
          }
        } else if (asset.type === "video") {
          const video = document.createElement("video")
          video.src = asset.src
          video.preload = "auto" // Asegúrate de solo cargarlo sin reproducir
          video.onloadeddata = () => {
            clearTimeout(timeout)
            resolve()
            updateProgress()
          }
          video.onerror = () => {
            clearTimeout(timeout)
            resolve()
            updateProgress()
          }
        } else if (asset.type === "audio") {
          const audio = new Audio()
          audio.src = asset.src
          audio.preload = "auto" // Asegúrate de solo cargarlo sin reproducir
          audio.oncanplaythrough = () => {
            clearTimeout(timeout)
            resolve()
            updateProgress()
          }
          audio.onerror = () => {
            clearTimeout(timeout)
            resolve()
            updateProgress()
          }
        } else {
          // En caso de tipo no soportado
          clearTimeout(timeout)
          resolve()
          updateProgress()
        }
      })
    }

    assets.forEach(loadAsset)
  }, [assets, onLoaded])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="text-center">
        <div className="mb-4 text-lg font-semibold text-white">
          Cargando... {progress}%
        </div>
        <Progress value={progress} className="w-64 h-2" />
      </div>
    </div>
  )
}

export default Preloader
