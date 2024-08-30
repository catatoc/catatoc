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
    emoji: "🌱",
    name: "Sostenibilidad y Responsabilidad Ambiental",
    description:
      "Implementación de prácticas sostenibles en productos y servicios, garantizando un impacto positivo en el medio ambiente.",
    level: "Avanzado",
  },
  {
    emoji: "⚡",
    name: "Desarrollo Ágil de Proyectos",
    description:
      "Aplicación de metodologías ágiles para mejorar la eficiencia en el desarrollo de proyectos y servicios.",
    level: "Avanzado",
  },
  {
    emoji: "🔍",
    name: "Evaluación de Oportunidades de Mercado",
    description:
      "Identificación y análisis de nuevas áreas de mercado para la expansión de productos y servicios.",
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
    emoji: "🔄",
    name: "Cultura de Mejora Continua",
    description:
      "Promoción y establecimiento de una cultura organizacional que desafíe constantemente el status quo.",
    level: "Intermedio",
  },
  {
    emoji: "❤️",
    name: "Desarrollo de Estrategias de Bienestar",
    description:
      "Creación e implementación de estrategias que contribuyan al bienestar social y a la calidad de vida.",
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
    emoji: "🤝",
    name: "Responsabilidad Social Corporativa (RSC)",
    description:
      "Implementación de prácticas de RSC que integren responsabilidad social en la estrategia de negocio.",
    level: "Básico",
  },
  {
    emoji: "🧪",
    name: "Investigación y Desarrollo (I+D)",
    description:
      "Contribución al desarrollo de nuevos productos a través de la investigación y la experimentación.",
    level: "Básico",
  },
]

const ExperiencesScroll = () => {
  // Ordenar por nivel: Avanzado > Intermedio > Básico
  const sortedExperiences = [...experiences].sort((a, b) => {
    const levels = ["Avanzado", "Intermedio", "Básico"]
    return levels.indexOf(a.level) - levels.indexOf(b.level)
  })

  // Calcular el ancho más amplio basado en el nombre de la experiencia más larga
  const maxWidth =
    sortedExperiences.reduce((max, experience) => {
      return Math.max(max, experience.name.length)
    }, 0) * 10 // multiplicamos por un factor para ajustar el ancho

  return (
    <div className="relative mt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Experiencias
          </h2>
          <p className="text-sm text-muted-foreground">
            Aquí puedes encontrar las experiencias que he desarrollado.
          </p>
        </div>
      </div>
      <Separator className="my-4" />

      <ScrollArea className="w-96 whitespace-nowrap md:w-full">
        <div className="flex space-x-4 pb-4">
          {sortedExperiences.map((experience, index) => (
            <Card
              key={index}
              className="shrink-0 transition-shadow hover:shadow-lg"
              style={{ width: `${maxWidth}px` }} // Aplicar el ancho calculado
            >
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  {experience.emoji}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="text-sm font-semibold">{experience.name}</h3>
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground">
                    {experience.level}
                  </p>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full ${
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
