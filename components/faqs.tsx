"use client"

import { useEffect, useRef, useState } from "react"

import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card } from "./ui/card"

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)

  // Open the chatbot automatically after 10 seconds only if it hasn't been opened before
  useEffect(() => {
    const hasOpened = localStorage.getItem("hasOpened")
    if (!hasOpened) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        localStorage.setItem("hasOpened", "true")
      }, 10000) // 10 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <div
      style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}
    >
      {isOpen ? (
        <Card className="w-full max-w-md rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800 dark:text-white sm:max-w-xs md:max-w-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Consulta Aquí 👇🏼</h2>
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
      answer: `Soy Carlos Horacio Carrasquero Quintini, ingeniero, músico y deportista venezolano, apasionado por la innovación, la mejora continua y las buenas ideas. Mi vida se centra en el impacto, el ingenio y las experiencias, creando o transformando lo existente con eficiencia y creatividad. Mi objetivo es generar un impacto positivo en la sociedad, manteniendo un espíritu profesional, entusiasta y de equipo.`,
    },
    {
      question: "¿Cuáles son mis pasiones?",
      answer: `Mis tres grandes pasiones son la ingeniería, la música y los deportes. La ingeniería me permite abstraerme de lo cotidiano, observar las situaciones de otra perspectiva, crear, transformar, entender, mejorar y resolver problemas; la música me da la capacidad de conectar y comunicar de manera única; y los deportes me enseñan disciplina, trabajo en equipo y resiliencia.`,
    },
    {
      question: "¿Cómo puedo aportar al área de Innovación?",
      answer: `Mi pasión por la ingeniería y la mejora continua es lo que más puede contribuir al área de Innovación y Nuevos Negocios de Empresas Polar. Estoy constantemente evaluando nuevas formas de crear, transformar, entender y mejorar procesos, productos y servicios. Gracias a mi formación en Ingeniería de Producción y Sistemas, puedo comunicarme de manera efectiva con diferentes áreas y personas, comprendiendo y empatizando con sus perspectivas para llegar a soluciones integrales.`,
    },
    {
      question: "¿Qué hago en mi tiempo libre?",
      answer: `En mi tiempo libre, disfruto tocar instrumentos musicales, practicar deportes, explorar nuevas tecnologías y pasar tiempo con los que más quiero. Estas actividades no solo son un escape creativo, sino que también me ayudan a mantener una mente activa y siempre en búsqueda de nuevas ideas.`,
    },
  ]

  const handleQuestionClick = (faq: { question: any; answer: any }) => {
    setChat((prev) => [...prev, { type: "question", content: faq.question }])
    setTyping(true)

    setTimeout(() => {
      setTyping(false)
      simulateTyping(faq.answer)
    }, 1000) // Delay for the response simulation
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

      // Scroll to the bottom after each character is added
      if (chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }, 30) // Increased typing speed
  }

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

      <div className="max-h-72 space-y-2 overflow-y-auto rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
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
                maxWidth: "85%", // Increased from 75% to 85%
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

        {/* This invisible div is for auto-scrolling to the end */}
        <div ref={chatEndRef} />
      </div>
    </div>
  )
}
