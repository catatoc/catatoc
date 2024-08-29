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
        <Card className="w-full max-w-md rounded-lg bg-white p-4 shadow-lg sm:max-w-xs md:max-w-sm">
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
          className="rounded-full p-4 shadow-lg"
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
      question: "Académica",
      answer: "Información relacionada con temas académicos y educativos.",
    },
    {
      question: "Pasiones",
      answer: "Información sobre hobbies, intereses y actividades recreativas.",
    },
    {
      question: "Deportes",
      answer: "Discusión sobre deportes y actividades físicas.",
    },
    {
      question: "Familia",
      answer: "Temas relacionados con la familia y la vida en el hogar.",
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

      <div className="max-h-56 space-y-2 overflow-y-auto rounded-lg border border-gray-200 bg-white p-4">
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
                  ? "bg-green-200 text-green-900"
                  : "bg-gray-200 text-gray-800"
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
            <div className="rounded-lg bg-gray-200 p-2 text-sm">...</div>
          </div>
        )}

        {/* Este div invisible es para hacer scroll hacia el final */}
        <div ref={chatEndRef} />
      </div>
    </div>
  )
}
