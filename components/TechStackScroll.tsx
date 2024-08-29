import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { ScrollArea, ScrollBar } from "./ui/scroll-area"
import { Separator } from "./ui/separator"

interface TechItem {
  emoji: string
  name: string
  description: string
  level: string
}

const techStack: TechItem[] = [
  {
    emoji: "🟦",
    name: "SAP",
    description: "ERP empresarial líder.",
    level: "Avanzado",
  },
  {
    emoji: "🔧",
    name: "VS Code",
    description: "Editor de código poderoso.",
    level: "Avanzado",
  },
  {
    emoji: "💻",
    name: "Python",
    description: "Lenguaje de programación versátil.",
    level: "Avanzado",
  },
  {
    emoji: "🌐",
    name: "JavaScript",
    description: "Lenguaje para la web.",
    level: "Avanzado",
  },
  {
    emoji: "🔮",
    name: "ChatGPT",
    description: "Inteligencia Artificial conversacional.",
    level: "Avanzado",
  },
  {
    emoji: "📎",
    name: "Office 365",
    description: "Suite de productividad empresarial.",
    level: "Avanzado",
  },
  {
    emoji: "🗂",
    name: "Notion",
    description: "Gestión de notas y tareas.",
    level: "Intermedio",
  },
  {
    emoji: "🖥️",
    name: "Power BI",
    description: "Análisis de datos empresarial.",
    level: "Intermedio",
  },
  {
    emoji: "📊",
    name: "Tableau",
    description: "Visualización de datos.",
    level: "Intermedio",
  },
  {
    emoji: "👥",
    name: "Jira",
    description: "Gestión de proyectos y tareas.",
    level: "Intermedio",
  },
  {
    emoji: "🎨",
    name: "Figma",
    description: "Diseño de interfaces colaborativas.",
    level: "Intermedio",
  },
  {
    emoji: "🗃️",
    name: "MongoDB",
    description: "Base de datos NoSQL.",
    level: "Intermedio",
  },
  {
    emoji: "📎",
    name: "Google Workspace",
    description: "Suite de productividad empresarial.",
    level: "Intermedio",
  },
  {
    emoji: "💬",
    name: "Lark",
    description: "Colaboración y comunicación.",
    level: "Básico",
  },
  {
    emoji: "🎥",
    name: "Canva",
    description: "Diseño gráfico sencillo.",
    level: "Básico",
  },
  {
    emoji: "💾",
    name: "Odoo",
    description: "Suite de aplicaciones empresariales.",
    level: "Básico",
  },
  {
    emoji: "📂",
    name: "Celonis",
    description: "Minería de procesos.",
    level: "Básico",
  },
]

const TechStackScroll = () => {
  // Ordenar por nivel: Avanzado > Intermedio > Básico
  const sortedTechStack = [...techStack].sort((a, b) => {
    const levels = ["Avanzado", "Intermedio", "Básico"]
    return levels.indexOf(a.level) - levels.indexOf(b.level)
  })

  // Calcular el ancho más amplio basado en el nombre de la tecnología más larga
  const maxWidth =
    sortedTechStack.reduce((max, tech) => {
      return Math.max(max, tech.name.length)
    }, 0) * 10 // multiplicamos por un factor para ajustar el ancho

  return (
    <div className="relative mt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Herramientas
          </h2>
          <p className="text-sm text-muted-foreground">
            Aquí puedes encontrar las tecnologías que utilizo.
          </p>
        </div>
      </div>
      <Separator className="my-4" />

      <ScrollArea className="w-96 whitespace-nowrap md:w-full">
        <div className="flex space-x-4 pb-4">
          {sortedTechStack.map((tech, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow shrink-0"
              style={{ width: `${maxWidth}px` }} // Aplicar el ancho calculado
            >
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  {tech.emoji}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <h3 className="text-sm font-semibold">{tech.name}</h3>
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground">{tech.level}</p>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        tech.level === "Avanzado"
                          ? "bg-green-500 w-3/4"
                          : tech.level === "Intermedio"
                          ? "bg-blue-400 w-1/2"
                          : "bg-yellow-500 w-1/4"
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

export default TechStackScroll
