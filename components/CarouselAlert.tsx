"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, XIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
    <div className="relative mt-7 w-full lg:hidden">
      {/* Close button */}
      <button
        className="absolute right-2 top-2 z-10 rounded-full bg-white p-1 shadow-md hover:bg-gray-100"
        onClick={() => setIsVisible(false)}
        aria-label="Cerrar carrusel"
      >
        <XIcon className="size-4 text-gray-600" />
      </button>
      <Carousel
        className="flex w-full flex-col overflow-hidden"
        ref={carouselRef}
        opts={{
          loop: true,
          align: "start",
          slidesToScroll: 1,
          containScroll: "trimSnaps",
        }}
      >
        <CarouselContent className="flex w-full">
          <CarouselItem className="w-full shrink-0">
            <Alert className="relative">
              <AlertTitle>👋🏼 ¡Hola!</AlertTitle>
              <AlertDescription className="relative">
                Este es un espacio donde comparto una descripción sobre mí, mis
                intereses, habilidades y pasiones.
              </AlertDescription>
            </Alert>
            <p className="absolute bottom-0.5 right-2 w-fit">👉🏼</p>
          </CarouselItem>

          <CarouselItem className="w-full shrink-0">
            <Alert variant="success" className="relative">
              <AlertTitle>😁 Explora Mi Perfil Personal</AlertTitle>
              <AlertDescription className="relative">
                Para conocer más sobre mi historia, valores y aspectos
                personales, visita mi perfil.
                <a href="/perfil" className="ml-1 underline">
                  Conoce más sobre mí.
                </a>
              </AlertDescription>
              <p className="absolute bottom-0.5 right-2 w-fit">👉🏼</p>
            </Alert>
          </CarouselItem>

          <CarouselItem className="w-full shrink-0">
            <Alert className="relative">
              <AlertTitle>🙋🏻 ¿Tienes Preguntas?</AlertTitle>
              <AlertDescription className="relative">
                Hay un botón flotante en la parte inferior derecha (
                <span role="img" aria-label="message">
                  💬
                </span>
                ) donde puedes descubrir más detalles sobre mí.
              </AlertDescription>
              <p className="absolute bottom-0.5 right-2 w-fit">👉🏼</p>
            </Alert>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
