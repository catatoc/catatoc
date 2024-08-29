"use client"

import { useCallback } from "react"
import confetti, { Shape } from "canvas-confetti"

function createEmojiImage(emoji: string) {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  canvas.width = 50
  canvas.height = 50

  if (ctx) {
    ctx.font = "40px serif"
    ctx.textBaseline = "middle"
    ctx.textAlign = "center"
    ctx.fillText(emoji, canvas.width / 2, canvas.height / 2)
  }

  return canvas.toDataURL() // Retorna la imagen del canvas como un data URL
}

export function triggerConfetti(emoji: string) {
  const emojiImage = createEmojiImage(emoji)

  confetti({
    particleCount: 100,
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    origin: {
      x: Math.random(),
      y: Math.random() - 0.2,
    },
    shapes: ["image" as any],
  })
}

export default function EmojiConfetti({
  emoji,
  children,
}: {
  emoji: string
  children: React.ReactNode
}) {
  const handleConfetti = useCallback(() => {
    triggerConfetti(emoji)
  }, [emoji])

  return (
    <button onClick={handleConfetti} className="cursor-pointer text-start">
      {children}
    </button>
  )
}
