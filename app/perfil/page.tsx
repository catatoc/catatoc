"use client"

import { Metadata } from "next"
import Image from "next/image"
import { MedalIcon } from "lucide-react"

import { Carousel } from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator"
import { AlbumArtwork } from "@/components/album-artwork"

// Datos de ejemplo
const achievements = [
  {
    name: "Logro 1",
    image: "/images/logro1.png",
    description: "Descripción breve del logro 1.",
  },
  {
    name: "Logro 2",
    image: "/images/logro2.png",
    description: "Descripción breve del logro 2.",
  },
]

const familyPhotos = [
  "/images/foto1.jpg",
  "/images/foto2.jpg",
  // Añade más fotos según sea necesario
]

// export const metadata: Metadata = {
//   title: "Perfil de [Tu Nombre]",
//   description: "Sección de perfil de [Tu Nombre].",
// }

export default function ProfilePage() {
  return (
    <div className="px-4 py-6 lg:px-8">
      {/* Avatar y Nombre */}
      <div className="text-center mb-8">
        <Image
          src="/images/tu-foto.png"
          width={150}
          height={150}
          alt="[Tu Nombre]"
          className="rounded-full mx-auto"
        />
        <h1 className="text-2xl font-semibold mt-4">[Tu Nombre]</h1>
      </div>

      {/* Sección: Mis Logros */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Mis Logros</h2>
        <Separator className="my-4" />
        <div className="relative">
          <div className="flex space-x-4 pb-4">
            {achievements.map((achievement) => (
              <div className="relative" key={achievement.name}>
                {/* <AlbumArtwork
                  album={achievement}
                  className="w-[150px] shrink-0"
                  aspectRatio="square"
                  width={150}
                  height={150}
                /> */}
                <MedalIcon className="absolute top-0 right-0 h-6 w-6 text-gold" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sección: Familia (con Carousel) */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">Familia</h2>
        <Separator className="my-4" />
        <Carousel className="w-full">
          {familyPhotos.map((photo, index) => (
            <Image
              key={index}
              src={photo}
              width={300}
              height={200}
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
    </div>
  )
}
