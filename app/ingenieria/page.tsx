"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Cpu } from "lucide-react"

import { cn } from "@/lib/utils"
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
import ImageWSkeleton from "@/components/ImageWSkeleton"
import ParticlesBackground from "@/components/ParticlesBackground"
import TechStack from "@/components/TechStack"
import { fadeInAnimation } from "@/components/animations/fadeInAnimation"

export default function EngineeringPage() {
  const valoresIngenieria = [
    "Innovación",
    "Optimización",
    "Transformación",
    "Liderazgo",
    "Creatividad",
  ]

  const aprendizajesIngenieria = [
    "Eficiencia",
    "Profesionalismo",
    "Pensamiento Crítico",
    "Trabajo en Equipo",
    "Gestión del Tiempo",
  ]

  const images = Array.from({ length: 12 }).map(
    (_, index) => `/images/engineering/engineering${index + 1}.webp`
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
    <motion.div
      {...fadeInAnimation}
      className="relative min-h-screen p-0 lg:p-8"
    >
      <ParticlesBackground />

      <div className="relative z-10 rounded-lg bg-white bg-opacity-70 p-8 shadow-lg dark:bg-gray-900 dark:bg-opacity-70">
        <div className="mt-12">
          <h1 className="mb-4 text-4xl font-bold">Ingeniería 💡</h1>
          <p className="mb-6">
            Desde joven siempre me gustaron los números y cultivé la curiosidad
            por crear y mejorar lo que ya existe. Estudiar Ingeniería de
            Sistemas y Producción fue una pieza fundamental en mi trayectoria
            como líder de proyectos, con ello he logrado integrar tecnología e
            innovación para optimizar procesos y generar un impacto
            significativo en las empresas y en la sociedad.
          </p>
          <p>
            Entender las palabras <strong>impacto</strong> e{" "}
            <strong>ingenio</strong> son fundamentales para ser un buen
            ingeniero.
          </p>
          <Leaderboard
            title="Valores en Ingeniería"
            values={valoresIngenieria}
          />
          <Alert className="my-6">
            <Cpu className="size-4" />
            <AlertTitle>Dato Curioso</AlertTitle>
            <AlertDescription>
              Muchos piensan que la ingeniería es para personalidades rígidas y
              excluyente para las mentes creativas. La realidad es que el
              ingenio es la combinación perfecta entre estructura y creatividad,
              inspiración y ejecución. Es un arte.
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
              proyectos. Aquí te presento algunos de los más importantes.
            </p>

            {/* Carrusel con Auto Loop, Drag y Click */}
            <h2 className="mb-4 text-3xl font-bold">Fotos</h2>
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
                          <ImageWSkeleton
                            src={src}
                            alt={`Foto ${index + 1}`}
                            className={cn(
                              "size-auto h-full object-contain transition-all hover:scale-105"
                            )}
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
    </motion.div>
  )
}
