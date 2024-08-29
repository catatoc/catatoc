"use client"

import { useState } from "react"
import { ExitIcon } from "@radix-ui/react-icons"
import { ExpandIcon } from "lucide-react"
import { Chrono } from "react-chrono"

import { Button } from "../ui/button"
import { Card } from "../ui/card"

const TimelineExample = () => {
  const [isMaximized, setIsMaximized] = useState(false)

  const items = [
    {
      title: "2000",
      cardTitle: "Inicio de la Música",
      cardSubtitle: "Aprendí a tocar la guitarra",
      cardDetailedText:
        "Empecé a aprender guitarra a los 10 años, lo que me llevó a unirme a la banda escolar.",
      media: {
        type: "IMAGE",
        source: {
          url: "/images/music.jpg",
        },
      },
    },
    {
      title: "2005",
      cardTitle: "Grado en Ingeniería Informática",
      cardSubtitle: "Universidad XYZ",
      cardDetailedText:
        "Comencé mis estudios en Ingeniería Informática, donde desarrollé un fuerte interés en la programación.",
      media: {
        type: "IMAGE",
        source: {
          url: "/images/engineering.jpg",
        },
      },
    },
    {
      title: "2010",
      cardTitle: "Primer Trabajo",
      cardSubtitle: "Desarrollador Junior en ABC",
      cardDetailedText:
        "Inicié mi carrera profesional como desarrollador junior, trabajando en proyectos web.",
      media: {
        type: "IMAGE",
        source: {
          url: "/images/work.jpg",
        },
      },
    },
    {
      title: "2015",
      cardTitle: "Máster en Ciencias de la Computación",
      cardSubtitle: "Especialización en IA",
      cardDetailedText:
        "Me especialicé en inteligencia artificial y trabajé en proyectos de aprendizaje automático.",
      media: {
        type: "IMAGE",
        source: {
          url: "/images/ai.jpg",
        },
      },
    },
    {
      title: "2018",
      cardTitle: "Nuevo Hobby: Fotografía",
      cardSubtitle: "Paisajes Urbanos",
      cardDetailedText:
        "Comencé a practicar la fotografía, enfocándome en capturar la belleza de la arquitectura urbana.",
      media: {
        type: "IMAGE",
        source: {
          url: "/images/photography.jpg",
        },
      },
    },
    {
      title: "2022",
      cardTitle: "Especialista en Machine Learning",
      cardSubtitle: "Empresa DEF",
      cardDetailedText:
        "Me uní a DEF como especialista en machine learning, trabajando en la implementación de modelos de IA.",
      media: {
        type: "IMAGE",
        source: {
          url: "/images/ml.jpg",
        },
      },
    },
  ]

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  return (
    <div
      className={
        isMaximized
          ? "fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
          : "relative"
      }
    >
      <Card className={isMaximized ? "w-full h-full p-4" : "p-6"}>
        <div className="flex justify-end mb-2">
          <Button onClick={toggleMaximize} variant="outline" size="icon">
            {isMaximized ? (
              <ExitIcon className="w-6 h-6" />
            ) : (
              <ExpandIcon className="w-6 h-6" />
            )}
          </Button>
        </div>
        <div className="overflow-x-auto scrollbar-hide touch-pan-x">
          <Chrono
            items={items}
            mode="HORIZONTAL"
            theme={{
              primary: "#A8E4A0", // Verde suave como color principal
              secondary: "#6B8E23", // Verde más oscuro como secundario
              cardBgColor: "#F0FFF0", // Verde claro para el fondo de las tarjetas
              cardForeColor: "#2F4F4F", // Verde oscuro para el texto en las tarjetas
              titleColor: "#556B2F", // Verde más oscuro para el color del título
              titleFontSize: "18px",
              textColor: "#556B2F",
              textFontSize: "16px",
            }}
            hideControls
            scrollable={{ scrollbar: false }} // Oculta la barra de desplazamiento nativa
            cardHeight={200}
            timelineCircleDimension={16}
            lineWidth={4}
            mediaSettings={{
              imageFit: "cover", // Ajusta la imagen dentro del contenedor
              height: "120px", // Altura fija de las imágenes
              width: "100%", // Ancho de las imágenes a nivel de contenedor
            }}
            enableBreakPoint
          />
        </div>
      </Card>
    </div>
  )
}

export default TimelineExample
