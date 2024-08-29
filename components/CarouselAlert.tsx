"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, XIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export function AlertsCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const carousel = carouselRef.current
        const scrollLeft = carousel.scrollLeft
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth

        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft < maxScrollLeft)
      }
    }

    if (carouselRef.current) {
      carouselRef.current.addEventListener("scroll", handleScroll)
      handleScroll() // Initial check on mount
    }

    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.clientWidth,
        behavior: "smooth",
      })
    }
  }

  const handleScrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.clientWidth,
        behavior: "smooth",
      })
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="relative w-full mt-7 lg:hidden">
      {/* Close button */}
      <button
        className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
        onClick={() => setIsVisible(false)}
        aria-label="Cerrar carrusel"
      >
        <XIcon className="h-4 w-4 text-gray-600" />
      </button>

      <Carousel className="w-full overflow-hidden" ref={carouselRef}>
        <CarouselContent className="flex w-full">
          <CarouselItem className="w-full shrink-0">
            <Alert>
              <AlertTitle>👋🏼 Bienvenido a mi Sitio Web</AlertTitle>
              <AlertDescription>
                Este es un espacio donde comparto mis conocimientos y
                experiencias en el mundo de la tecnología y la programación.
              </AlertDescription>
            </Alert>
          </CarouselItem>

          <CarouselItem className="w-full shrink-0">
            <Alert variant="success">
              <AlertTitle>😁 Explora Mi Perfil Personal</AlertTitle>
              <AlertDescription>
                Para conocer más sobre mi historia, valores y aspectos
                personales, visita mi perfil.
                <a href="/perfil" className="underline ml-1">
                  Conoce más sobre mí
                </a>
                .
              </AlertDescription>
            </Alert>
          </CarouselItem>

          <CarouselItem className="w-full shrink-0">
            <Alert>
              <AlertTitle>🙋🏻 ¿Tienes Preguntas?</AlertTitle>
              <AlertDescription>
                No olvides que hay un botón flotante en la parte inferior
                derecha (
                <span role="img" aria-label="message">
                  💬
                </span>
                ) donde puedes acceder al chat de preguntas frecuentes.
              </AlertDescription>
            </Alert>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  )
}
