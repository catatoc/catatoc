"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { Cpu } from "lucide-react"

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
import { Footer } from "@/components/Footer"
import ParticlesBackground from "@/components/ParticlesBackground"
import TechStack from "@/components/TechStack"

export default function EngineeringPage() {
  const valoresIngenieria = [
    "Innovación",
    "Optimización de Procesos",
    "Transformación Digital",
    "Liderazgo",
    "Creatividad",
  ]

  const aprendizajesIngenieria = [
    "Resolución de Problemas",
    "Profesionalismo",
    "Capacidad de Análisis",
    "Trabajo en Equipo",
    "Gestión del Tiempo",
  ]

  const images = Array.from({ length: 12 }).map(
    (_, index) => `/images/engineering/engineering${index + 1}.png`
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
    <div className="relative min-h-screen p-0 lg:p-8">
      <ParticlesBackground />

      <div className="relative z-10 bg-white dark:bg-gray-900 dark:bg-opacity-70 bg-opacity-70 p-8 rounded-lg shadow-lg">
        <div className="mt-12">
          <h1 className="mb-4 text-4xl font-bold">
            Mi Trayectoria en Ingeniería
          </h1>
          <p className="mb-6">
            Con una sólida formación en Ingeniería de Sistemas y Producción, he
            liderado proyectos que integran la tecnología y la innovación para
            optimizar procesos y generar un impacto significativo en las
            empresas en las que he trabajado.
          </p>

          <Leaderboard
            title="Valores en Ingeniería"
            values={valoresIngenieria}
          />

          <Alert className="my-6">
            <Cpu className="size-4" />
            <AlertTitle>Dato Curioso!</AlertTitle>
            <AlertDescription>
              En mi rol actual, estoy impulsando la integración de AI y ChatGPT
              en procesos empresariales para mejorar la eficiencia.
            </AlertDescription>
          </Alert>

          <Blockquote>
            La ingeniería es el arte de dirigir los grandes recursos de poder de
            la naturaleza para el uso y conveniencia del hombre.
            <BlockquoteAuthor>Thomas Tredgold</BlockquoteAuthor>
          </Blockquote>

          <div className="mt-12">
            <h2 className="mb-4 text-3xl font-bold">Cosas que He Aprendido</h2>
            <p className="mb-4">
              Mi experiencia en ingeniería me ha permitido desarrollar
              habilidades clave que aplico diariamente en mi trabajo. Aquí están
              algunos de los aprendizajes más importantes que he adquirido.
            </p>

            <Leaderboard
              title="Aprendizajes en Ingeniería"
              values={aprendizajesIngenieria}
            />
          </div>

          <div className="mt-12">
            <h2 className="mb-4 text-3xl font-bold">Proyectos Destacados</h2>
            <p className="mb-4">
              A lo largo de mi carrera, he trabajado en una variedad de
              proyectos que abarcan desde la gestión integral de soluciones de
              software hasta la optimización de cadenas de suministro en
              empresas multinacionales. Aquí te presento algunos de los más
              importantes.
            </p>

            {/* Carrusel con Auto Loop, Drag y Click */}
            <h2 className="mb-4 text-3xl font-bold">Galería de Proyectos</h2>
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
                            alt={`Proyecto ${index + 1}`}
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
          {/* stack tecnologico */}
          <div className="mt-12">
            <h2 className="mb-4 text-3xl font-bold">Stack Tecnológico</h2>
            <p className="mb-4">
              A lo largo de mi carrera, he trabajado con una variedad de
              tecnologías y herramientas que me han permitido llevar a cabo
              proyectos innovadores y de alto impacto. Aquí te presento algunas
              de las tecnologías que he dominado.
            </p>

            <TechStack />
          </div>
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
              alt="Proyecto seleccionado"
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
