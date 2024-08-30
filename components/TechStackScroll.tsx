import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { ScrollArea, ScrollBar } from "./ui/scroll-area"
import { Separator } from "./ui/separator"

interface ExperienceItem {
  emoji: string
  name: string
  description: string
  level: string
}

const experiences: ExperienceItem[] = [
  {
    emoji: "🚀",
    name: "Innovación de Productos",
    description:
      "Desarrollo y lanzamiento de productos innovadores que mejoran la calidad de vida y satisfacen nuevas demandas del mercado.",
    level: "Avanzado",
  },
  {
    emoji: "⚡",
    name: "Desarrollo Ágil",
    description:
      "Aplicación de metodologías ágiles para mejorar la eficiencia en el desarrollo de proyectos y servicios.",
    level: "Avanzado",
  },
  {
    emoji: "💡",
    name: "Gestión de Innovación",
    description:
      "Liderazgo en la creación de un entorno que fomente la innovación continua dentro de la organización.",
    level: "Intermedio",
  },
  {
    emoji: "🗓️",
    name: "Planificación",
    description: "Fechas críticas, manejo de equipo, estructura.",
    level: "Avanzado",
  },
  {
    emoji: "🔄",
    name: "Mejora Continua",
    description:
      "Promoción y establecimiento de una cultura organizacional que desafíe constantemente el status quo.",
    level: "Avanzado",
  },
  {
    emoji: "💰",
    name: "Control de Gestión",
    description:
      "Gestión y control de recursos financieros para garantizar la sostenibilidad y rentabilidad de la organización.",
    level: "Básico",
  },
  {
    emoji: "🧐",
    name: "Consultoría Estratégica",
    description:
      "Asesoramiento en la definición de estrategias de negocio que impulsen el crecimiento y la competitividad.",
    level: "Intermedio",
  },
  {
    emoji: "🌟",
    name: "Liderazgo Transformacional",
    description:
      "Capacidad para liderar equipos hacia la transformación organizacional, impulsando el cambio y la innovación.",
    level: "Intermedio",
  },
  {
    emoji: "🧪",
    name: "Investigación y Desarrollo",
    description:
      "Contribución al desarrollo de nuevos productos a través de la investigación y la experimentación.",
    level: "Intermedio",
  },
  {
    emoji: "💻",
    name: "Desarrollo de Software",
    description:
      "Desarrollo de aplicaciones y sistemas software siguiendo las mejores prácticas de ingeniería de software.",
    level: "Avanzado",
  },
  {
    emoji: "🎨",
    name: "UI/UX",
    description:
      "Diseño de interfaces de usuario intuitivas y experiencia de usuario centrada en el cliente.",
    level: "Básico",
  },
  {
    emoji: "📈",
    name: "Product Management",
    description:
      "Gestión integral de productos, desde la concepción hasta el lanzamiento, alineando la visión del producto con los objetivos del negocio.",
    level: "Avanzado",
  },
  {
    emoji: "📚",
    name: "Docencia",
    description:
      "Experiencia en la enseñanza y formación de estudiantes, desarrollando programas educativos efectivos y dinámicos.",
    level: "Avanzado",
  },
  {
    emoji: "🎤",
    name: "Oratoria",
    description:
      "Habilidad para hablar en público con claridad y persuasión, capturando la atención y comunicando mensajes de manera efectiva.",
    level: "Avanzado",
  },
]

const ExperiencesScroll = () => {
  // Ordenar por nivel: Avanzado > Intermedio > Básico
  const sortedExperiences = [...experiences].sort((a, b) => {
    const levels = ["Avanzado", "Intermedio", "Básico"]
    return levels.indexOf(a.level) - levels.indexOf(b.level)
  })

  // Calcular el ancho más amplio basado en el nombre de la experiencia más larga para cada nivel
  const maxWidths = sortedExperiences.reduce((acc, experience) => {
    const currentWidth = experience.name.length * 10 // Factor para ajustar el ancho
    if (!acc[experience.level] || currentWidth > acc[experience.level]) {
      acc[experience.level] = currentWidth
    }
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="relative mt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Habilidades</h2>
          <p className="w-[90vw] text-sm text-muted-foreground">
            Estas son las habilidades que he desarrollado a lo largo de mi
            carrera profesional.
          </p>
        </div>
      </div>
      <Separator className="my-4" />

      <ScrollArea className="w-screen whitespace-nowrap md:w-screen lg:w-full">
        <div className="flex space-x-4 pb-4">
          {sortedExperiences.map((experience, index) => (
            <Card
              key={index}
              className="shrink-0 transition-shadow hover:shadow-lg"
              style={{ width: `${maxWidths[experience.level]}px` }} // Aplicar el ancho calculado para cada nivel
            >
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  {experience.emoji}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="text-sm font-semibold">{experience.name}</h3>
                <div className="mt-2 hidden">
                  <p className="text-xs text-muted-foreground">
                    {experience.level}
                  </p>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`hidden h-full ${
                        experience.level === "Avanzado"
                          ? "w-3/4 bg-green-500"
                          : experience.level === "Intermedio"
                          ? "w-1/2 bg-blue-400"
                          : "w-1/4 bg-yellow-500"
                      }`}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export default ExperiencesScroll
