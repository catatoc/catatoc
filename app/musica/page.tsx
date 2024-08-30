"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { Lightbulb } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Leaderboard from "@/components/ui/leaderboard"
import { Blockquote, BlockquoteAuthor } from "@/components/ui/quote"
import MusicSection from "@/components/MusicSection"

export default function MusicPage() {
  const valoresMusica = [
    "Disciplina",
    "Flexibilidad Mental",
    "Trabajo en Equipo",
    "Creatividad",
    "Perseverancia",
  ]

  const images = Array.from({ length: 9 }).map(
    (_, index) => `/images/music/music${index + 1}.png`
  )

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Manejar las flechas del teclado
  const handleKeyDown = useCallback(
    (event: { key: string }) => {
      if (selectedImage) {
        if (event.key === "ArrowRight") {
          const nextIndex = (currentIndex + 1) % images.length
          setSelectedImage(images[nextIndex])
          setCurrentIndex(nextIndex)
        } else if (event.key === "ArrowLeft") {
          const prevIndex = (currentIndex - 1 + images.length) % images.length
          setSelectedImage(images[prevIndex])
          setCurrentIndex(prevIndex)
        }
      }
    },
    [selectedImage, currentIndex, images]
  )

  useEffect(() => {
    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown)
    } else {
      window.removeEventListener("keydown", handleKeyDown)
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedImage, handleKeyDown])

  return (
    <div className="relative min-h-screen p-8">
      <MusicSection />

      <div className="mt-12">
        <h1 className="mb-4 text-4xl font-bold">Música</h1>
        <p className="mb-6">
          Comencé con el piano a los 15 en festivales escolares y seguí
          explorando la música con Gerry Weil, el jazz, y la producción
          electrónica. Aquí están los valores clave que he aprendido.
        </p>

        <Leaderboard title="Valores en la Música" values={valoresMusica} />

        <Alert variant="success" className="my-6">
          <Lightbulb className="size-4" />
          <AlertTitle>De lo más importante</AlertTitle>
          <AlertDescription>
            La música da mucha paciencia, perseverancia, trabajo duro y aprender
            a improvisar. Si te equivocas en una nota, tienes que seguir y
            resolver en el camino para que el oyente no pierda la magia de la
            experiencia.
          </AlertDescription>
        </Alert>

        <Blockquote>
          El gesto de amor más auténtico es la música.
          <BlockquoteAuthor>Gerry Weil</BlockquoteAuthor>
        </Blockquote>

        <div className="mt-12">
          <h2 className="mb-4 text-3xl font-bold">Lecciones Aprendidas</h2>
          <p className="mb-4">
            Tocar en bandas me enseñó a superar el miedo escénico, aceptar
            errores y valorar el trabajo en equipo. Estas lecciones han sido
            vitales en todos los aspectos de mi vida.
          </p>

          {/* Carrusel con Auto Loop, Drag y Click */}
          <h2 className="mb-4 text-3xl font-bold">Algunas fotos</h2>
          <Carousel
            className="mx-auto w-full max-w-3xl"
            opts={{
              loop: true,
              align: "start",
              slidesToScroll: 1,
              containScroll: "trimSnaps",
            }}
          >
            <CarouselContent className="-ml-4 flex">
              {images.map((src, index) => (
                <CarouselItem
                  key={index}
                  className="shrink-0 basis-full pl-4 sm:basis-1/3" // En móviles, 1 imagen a la vez, en pantallas más grandes, 3 imágenes
                  onClick={() => {
                    setSelectedImage(src)
                    setCurrentIndex(index)
                  }}
                >
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Image
                          src={src}
                          alt={`Foto ${index + 1}`}
                          width={500}
                          height={500}
                          className="rounded-md shadow-md"
                          objectFit="cover"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lPAAAAA=="
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* Modal para imagen seleccionada */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-8"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative">
            <Image
              src={selectedImage}
              alt="Imagen seleccionada"
              width={800}
              height={800}
              className="rounded-md"
              objectFit="contain"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lPAAAAA=="
            />
          </div>
        </div>
      )}
    </div>
  )
}
