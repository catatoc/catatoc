"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}
    >
      {isOpen ? (
        <Card className="w-full max-w-md rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800 dark:text-white sm:max-w-xs md:max-w-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Preguntas Frecuentes</h2>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              ✖️
            </Button>
          </div>
          <FAQChat />
        </Card>
      ) : (
        <Button
          variant="outline"
          className="rounded-full p-4 shadow-lg dark:bg-gray-800 dark:text-white"
          onClick={() => setIsOpen(true)}
        >
          💬
        </Button>
      )}
    </div>
  )
}

function FAQChat() {
  const [chat, setChat] = useState<{ type: string; content: any }[]>([])
  const [typing, setTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const faqs = [
    {
      question: "¿Quién soy?",
      answer: `Mi nombre es Carlos Horacio Carrasquero. Soy ingeniero, músico y deportista, apasionado por la innovación y la mejora continua. Me gusta pensar que mi vida gira en torno al "impacto" y al "ingenio", siempre buscando maneras de hacer las cosas mejor y con más eficiencia.`,
    },
    {
      question: "¿Cuáles son mis pasiones?",
      answer: `Mis tres grandes pasiones son la ingeniería, la música y los deportes. La ingeniería me permite aplicar el ingenio para resolver problemas; la música me da la capacidad de conectar y comunicar de manera única; y los deportes me enseñan disciplina, trabajo en equipo y resiliencia.`,
    },
    {
      question: "¿Cómo puedo aportar al área de Innovación?",
      answer: `Creo que mi pasión por la ingeniería y la innovación es lo que más puede contribuir al área de Innovación y Nuevos Negocios. Estoy constantemente evaluando nuevas formas de mejorar procesos y productos, lo que se alinea con la misión del departamento de evaluar nuevas zonas de interés para productos y servicios que generen un impacto positivo en la sociedad.`,
    },
    {
      question: "¿Qué hago en mi tiempo libre?",
      answer: `En mi tiempo libre, disfruto de tocar instrumentos musicales, practicar deportes y explorar nuevas tecnologías. Estas actividades no solo son un escape creativo, sino que también me ayudan a mantener una mente activa y siempre en búsqueda de nuevas ideas.`,
    },
  ]

  const handleQuestionClick = (faq: { question: any; answer: any }) => {
    setChat((prev) => [...prev, { type: "question", content: faq.question }])
    setTyping(true)

    // Simular un retraso para la respuesta
    setTimeout(() => {
      setTyping(false)
      simulateTyping(faq.answer)
    }, 1000)
  }

  const simulateTyping = (answer: string) => {
    let currentText = ""
    const interval = setInterval(() => {
      if (currentText.length < answer.length) {
        currentText += answer[currentText.length]
        setChat((prev) => {
          const lastMessage = prev[prev.length - 1]
          if (lastMessage?.type === "answer") {
            return [
              ...prev.slice(0, -1),
              { type: "answer", content: currentText },
            ]
          } else {
            return [...prev, { type: "answer", content: currentText }]
          }
        })
      } else {
        clearInterval(interval)
      }
    }, 50) // Velocidad de escritura
  }

  // Efecto para hacer scroll hasta el final del chat cada vez que se actualiza
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [chat, typing])

  return (
    <div className="space-y-4">
      <div className="mb-4 flex flex-wrap gap-2">
        {faqs.map((faq, index) => (
          <Badge
            key={index}
            className="cursor-pointer"
            onClick={() => handleQuestionClick(faq)}
          >
            {faq.question}
          </Badge>
        ))}
      </div>

      <div className="max-h-56 space-y-2 overflow-y-auto rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
        {chat.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === "question" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`inline-block rounded-lg p-2 text-sm ${
                message.type === "question"
                  ? "bg-green-200 text-green-900 dark:bg-green-800 dark:text-green-200"
                  : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
              }`}
              style={{
                maxWidth: "75%",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
              }}
            >
              {message.content}
            </div>
          </div>
        ))}

        {typing && (
          <div className="text-left">
            <div className="rounded-lg bg-gray-200 p-2 text-sm dark:bg-gray-700 dark:text-gray-300">
              ...
            </div>
          </div>
        )}

        {/* Este div invisible es para hacer scroll hacia el final */}
        <div ref={chatEndRef} />
      </div>
    </div>
  )
}
