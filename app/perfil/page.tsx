"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { XIcon } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { AlbumArtwork } from "@/components/album-artwork"

// Datos de logros
const achievements = [
  {
    name: "Bachiller en Ciencias",
    cover: "/images/achievements/achievement1.png",
    artist: "Colegio Don Bosco",
  },
  {
    name: "Ingeniero en Producción",
    cover: "/images/achievements/achievement2.png",
    artist: "UNIMET.",
  },
  {
    name: "Ingeniero en Sistemas",
    cover: "/images/achievements/achievement3.png",
    artist: "UNIMET.",
  },
  {
    name: "Música",
    cover: "/images/achievements/achievement4.png",
    artist: "UNIMET",
  },
  {
    name: "Junta Directiva",
    cover: "/images/achievements/achievement5.png",
    artist: "FCE UNIMET",
  },
  {
    name: "Beca Académica",
    cover: "/images/achievements/achievement6.png",
    artist: "UNIMET",
  },
]

const familyPhotos = [
  "/images/foto1.jpg",
  "/images/foto2.jpg",
  // Añade más fotos según sea necesario
]

export default function ProfilePage() {
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null)
  const [isVideoVisible, setIsVideoVisible] = useState(true)

  const familyPhotos = Array.from({ length: 12 }).map(
    (_, index) => `/images/family/family${index + 1}.png`
  )

  const culturaPhotos = Array.from({ length: 8 }).map(
    (_, index) => `/images/canada/canada${index + 1}.png`
  )

  const leadershipPhotos = Array.from({ length: 8 }).map(
    (_, index) => `/images/leadership/leadership${index + 1}.png`
  )

  const peoplePhotos = Array.from({ length: 10 }).map(
    (_, index) => `/images/people/people${index + 1}.png`
  )

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
          Carlos Horacio Carrasquero Quintini
        </h1>
      </div>

      {/* Sección: Mis Logros */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Mis Logros</h2>
        <Separator className="my-4" />
        <div className="relative">
          <ScrollArea className="flex w-96 gap-4 whitespace-nowrap rounded-md border p-4 md:w-full">
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

      {/* Secciones con Acordeones */}
      <Accordion type="multiple">
        {/* Sección: Familia */}
        <AccordionItem value="family">
          <AccordionTrigger className="text-2xl font-semibold tracking-tight">
            Familia
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <p className="text-lg">
                  Mi familia es <strong>mi mayor fortaleza</strong>. Somos una
                  familia <strong>numerosa y unida</strong> que ha moldeado mis
                  valores y mi forma de ver la vida. Desde pequeño, aprendí la
                  importancia de la{" "}
                  <strong>solidaridad, el respeto y el amor</strong> hacia los
                  demás. Estos valores, inculcados por mi familia, han sido
                  fundamentales en mi crecimiento personal y profesional.
                </p>
                <p className="mt-4 text-lg">
                  Cada reunión familiar es un recordatorio de lo que somos y de
                  donde venimos. La{" "}
                  <strong>alegría y el calor humano (y venezolano)</strong> son
                  parte esencial de nuestras vidas, algo que valoro enormemente
                  y que me esfuerzo por transmitir en cada aspecto de mi vida.
                </p>
              </div>

              <div className="flex justify-center">
                <Carousel
                  className="w-full max-w-lg"
                  opts={{ loop: true, align: "start", slidesToScroll: 1 }}
                >
                  <CarouselContent className="-ml-4 flex">
                    {familyPhotos.map((src, index) => (
                      <CarouselItem
                        key={index}
                        className="shrink-0 basis-full pl-4 sm:basis-1/3"
                      >
                        <div className="p-1">
                          <Image
                            src={src}
                            alt={`Foto de Familia ${index + 1}`}
                            width={500}
                            height={500}
                            className="rounded-md shadow-md"
                            objectFit="cover"
                            loading="lazy"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Sección: Cultura */}
        <AccordionItem value="cultura">
          <AccordionTrigger className="text-2xl font-semibold tracking-tight">
            Cultura
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold">🇻🇪 Venezuela</h3>
                <p className="mt-2 text-lg">
                  Es sin duda un país especial para mí. Aquí crecí y aprendí la
                  importancia de ser feliz sin importar los obstáculos. Un país
                  que me ha dado una vida memorable y la oporunidad de rodearme
                  de personas únicas; mis mejores amigos, mi familia y mi
                  pareja. La riqueza de su cultura, la calidez de la gente y la
                  belleza de sus paisajes naturales hacen de Caracas y Venezuela
                  un hogar único.
                </p>

                <h3 className="mt-8 text-xl font-semibold">🇨🇦 Canadá</h3>
                <p className="mt-2 text-lg">
                  Viví en Canadá durante un año, una experiencia que me permitió
                  no solo aprender inglés, sino también sumergirme en una
                  cultura muy amplia donde tuve que poner al máximo mis
                  habilidades. Canadá es un país que valora la{" "}
                  <strong>inclusión</strong>, la <strong>diversidad</strong> y
                  la <strong>convivencia pacífica</strong> entre personas de
                  diferentes orígenes.
                </p>
                <p className="mt-4 text-lg">
                  La experiencia canadiense me enseñó a apreciar diferentes
                  perspectivas culturales y me ayudó a crecer tanto personal
                  como profesionalmente.
                </p>
              </div>

              <div className="flex justify-center">
                <Carousel
                  className="w-full max-w-lg"
                  opts={{ loop: true, align: "start", slidesToScroll: 1 }}
                >
                  <CarouselContent className="-ml-4 flex">
                    {culturaPhotos.map((src, index) => (
                      <CarouselItem
                        key={index}
                        className="shrink-0 basis-full pl-4 sm:basis-1/3"
                      >
                        <div className="p-1">
                          <Image
                            src={src}
                            alt={`Foto de Cultura ${index + 1}`}
                            width={500}
                            height={500}
                            className="rounded-md shadow-md"
                            objectFit="cover"
                            loading="lazy"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Sección: Liderazgo */}
        <AccordionItem value="liderazgo">
          <AccordionTrigger className="text-2xl font-semibold tracking-tight">
            Liderazgo
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <p className="mt-2 text-lg">
                  Mi experiencia en liderazgo se basa en{" "}
                  <strong>tomar decisiones estratégicas</strong>,{" "}
                  <strong>
                    guiar equipos a creer en ellos, probar cosas nuevas
                  </strong>
                  , y{" "}
                  <strong>
                    facilitar el crecimiento personal y profesional
                  </strong>{" "}
                  de aquellos a mi alrededor. Siempre apuntando a la excelencia
                  he liderado equipos en distintos contextos, desde el ámbito
                  empresarial hasta el educativo.
                </p>
                <p className="mt-4 text-lg">
                  Como <strong>profesor universitario</strong>,{" "}
                  <strong>guía de campamento</strong>,{" "}
                  <strong>deportista</strong>, y <strong>músico</strong>, he
                  aprendido a <strong>inspirar y motivar</strong> a los demás,
                  adaptándome a diferentes audiencias y situaciones. En cada uno
                  de estos roles, la <strong>disciplina</strong>, la{" "}
                  <strong>resiliencia</strong> y la{" "}
                  <strong>colaboración</strong> son esenciales. Creo en el
                  liderazgo que empodera, que permite a cada individuo
                  desarrollar su potencial máximo.
                </p>
              </div>

              <div className="flex justify-center">
                <Carousel
                  className="w-full max-w-lg"
                  opts={{ loop: true, align: "start", slidesToScroll: 1 }}
                >
                  <CarouselContent className="-ml-4 flex">
                    {leadershipPhotos.map((src, index) => (
                      <CarouselItem
                        key={index}
                        className="shrink-0 basis-full pl-4 sm:basis-1/3"
                      >
                        <div className="p-1">
                          <Image
                            src={src}
                            alt={`Foto de Liderazgo ${index + 1}`}
                            width={500}
                            height={500}
                            className="rounded-md shadow-md"
                            objectFit="cover"
                            loading="lazy"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Sección: Impacto */}
        <AccordionItem value="impacto">
          <AccordionTrigger className="text-2xl font-semibold tracking-tight">
            Impacto
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <p className="mt-2 text-lg">
                  El <strong>compañerismo</strong> ha sido fundamental en cada
                  equipo y proyecto en el que he participado. Valoro
                  profundamente las relaciones interpersonales y creo que los
                  mejores resultados se logran cuando trabajamos juntos con un
                  propósito común.
                </p>
                <p className="mt-4 text-lg">
                  Mi <strong>amor por lo que hago</strong> es el motor que
                  impulsa mi vida profesional y personal. Cada proyecto es una
                  oportunidad para crear, innovar y superar desafíos, lo que me
                  llena de energía y satisfacción.
                </p>
                <p className="mt-4 text-lg">
                  Además, siempre he tenido una fuerte inclinación por{" "}
                  <strong>ayudar a los demás</strong>. Ya sea guiando a un
                  compañero, ofreciendo apoyo en momentos difíciles o
                  compartiendo conocimientos, encuentro un profundo sentido de
                  propósito en hacer la diferencia en la vida de otros.
                </p>
              </div>

              <div className="flex justify-center">
                <Carousel
                  className="w-full max-w-lg"
                  opts={{ loop: true, align: "start", slidesToScroll: 1 }}
                >
                  <CarouselContent className="-ml-4 flex">
                    {peoplePhotos.map((src, index) => (
                      <CarouselItem
                        key={index}
                        className="shrink-0 basis-full pl-4 sm:basis-1/3"
                      >
                        <div className="p-1">
                          <Image
                            src={src}
                            alt={`Foto de Compañerismo ${index + 1}`}
                            width={500}
                            height={500}
                            className="rounded-md shadow-md"
                            objectFit="cover"
                            loading="lazy"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

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
