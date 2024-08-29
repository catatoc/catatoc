"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { XIcon } from "lucide-react"

import { Carousel } from "@/components/ui/carousel"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { AlbumArtwork } from "@/components/album-artwork"

// Datos de logros
const achievements = [
  {
    name: "Logro 1",
    cover: "/images/achievements/achievement1.png",
    artist: "Descripción 1.",
  },
  {
    name: "Logro 2",
    cover: "/images/achievements/achievement2.png",
    artist: "Descripción 2.",
  },
  {
    name: "Logro 3",
    cover: "/images/achievements/achievement3.png",
    artist: "Descripción 3.",
  },
  {
    name: "Logro 4",
    cover: "/images/achievements/achievement4.png",
    artist: "Descripción 4.",
  },
]

const familyPhotos = [
  "/images/foto1.jpg",
  "/images/foto2.jpg",
  // Añade más fotos según sea necesario
]

export default function ProfilePage() {
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null)
  const [showVideoBubble, setShowVideoBubble] = useState(true)
  const [isVideoVisible, setIsVideoVisible] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Mostrar la burbuja del video después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = false
        videoRef.current.play().catch((error) => {
          console.error("Error al reproducir el video automáticamente:", error)
        })
      }
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  // Manejar el clic en la burbuja de video para activar el sonido si está silenciado
  const handleVideoBubbleClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = false
      videoRef.current.play().catch((error) => {
        console.error("Error al intentar reproducir el video:", error)
      })
    }
  }

  // Ocultar y mostrar el video
  const toggleVideoVisibility = () => {
    setIsVideoVisible((prev) => !prev)
  }

  return (
    <div className="px-4 py-6 lg:px-8">
      {/* Avatar y Nombre */}
      <div className="mb-8 text-center">
        <Image
          src="/profile.png"
          width={150}
          height={150}
          alt="[Tu Nombre]"
          className="mx-auto rounded-full"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lPAAAAA=="
        />
        <h1 className="mt-4 text-2xl font-semibold">
          Carlos Horacio Carrasquero
        </h1>
      </div>

      {/* Sección: Mis Logros */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Mis Logros</h2>
        <Separator className="my-4" />
        <div className="relative">
          <ScrollArea className="flex w-96 gap-4 whitespace-nowrap rounded-md border md:w-full">
            <div className="flex space-x-8">
              {achievements.map((achievement) => (
                <div
                  className="relative cursor-pointer"
                  key={achievement.name}
                  onClick={() => setSelectedAchievement(achievement)}
                >
                  <AlbumArtwork
                    album={achievement}
                    className="w-[150px] shrink-0"
                    aspectRatio="square"
                    width={150}
                    height={150}
                  />
                  <span className="absolute right-0 top-0 text-2xl">🏅</span>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>

      {/* Sección: Familia (con Carousel) */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Familia</h2>
        <Separator className="my-4" />
        <Carousel className="hidden w-full">
          {familyPhotos.map((photo, index) => (
            <Image
              key={index}
              src={photo}
              width={150}
              height={150}
              alt={`Foto de Familia ${index + 1}`}
              className="rounded-md"
            />
          ))}
        </Carousel>
      </div>

      {/* Sección: Venezuela */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Venezuela</h2>
        <Separator className="my-4" />
        <p>
          Habla sobre tu conexión con Venezuela, tus raíces, cultura y lo que
          significa para ti.
        </p>
      </div>

      {/* Sección: Educación */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Educación</h2>
        <Separator className="my-4" />
        <p>
          Aquí puedes detallar tu trayectoria educativa, los títulos obtenidos,
          instituciones y cualquier otra información relevante.
        </p>
      </div>

      {/* Sección: Amor por lo que hago */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          Amor por lo que hago
        </h2>
        <Separator className="my-4" />
        <p>
          En esta sección, puedes compartir lo que te apasiona de tu trabajo y
          cómo eso impacta en tu vida y en los demás.
        </p>
      </div>

      {/* Modal para Logro Seleccionado */}
      {selectedAchievement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-8"
          onClick={() => setSelectedAchievement(null)}
        >
          <div className="relative">
            <Image
              src={selectedAchievement.cover}
              alt={selectedAchievement.name}
              width={800}
              height={800}
              className="rounded-md"
              objectFit="contain"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lPAAAAA=="
            />
            <p className="mt-4 text-center text-white">
              {selectedAchievement.artist}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
