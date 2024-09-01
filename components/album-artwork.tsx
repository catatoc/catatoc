"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Album } from "@/data/albums"
import confetti from "canvas-confetti"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import ImageWSkeleton from "./ImageWSkeleton"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu"

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Album
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
  className?: string
}

export function AlbumArtwork({
  album,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: AlbumArtworkProps) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const emoji = "⚽"

  const triggerConfetti = (emoji: string) => {
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

    const emojiImage = canvas.toDataURL()

    confetti({
      particleCount: 100,
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2,
      },
    })
  }

  const handleConfetti = useCallback(() => {
    triggerConfetti(emoji)
  }, [emoji])

  // Function to handle redirection to /profile
  const redirectToProfile = () => {
    router.push("/perfil")
  }

  // Function to handle opening the modal
  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // Close modal when clicking outside the image
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleCloseModal()
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isModalOpen])

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className="cursor-pointer overflow-hidden rounded-md"
            onClick={() => {
              handleConfetti()
              handleOpenModal()
            }}
          >
            <ImageWSkeleton
              src={album.cover}
              alt={album.name}
              className={cn(
                "size-auto h-full object-contain transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem onSelect={redirectToProfile}>
            <span role="img" aria-label="Happy Face" className="mr-2 text-xl">
              😁
            </span>
            Ir a Perfil
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{album.name}</h3>
        <p className="text-xs text-muted-foreground">{album.artist}</p>
      </div>

      {/* Modal for Image Enlargement */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div ref={modalRef} className="relative p-4">
            <button
              onClick={handleCloseModal}
              className="absolute right-0 top-0 z-30 m-2 cursor-pointer text-3xl text-neutral-100"
            >
              <XIcon />
            </button>
            <img
              src={album.cover}
              alt={album.name}
              className={cn(
                "max-h-[80vh] max-w-[80vw] object-contain transition-all",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
        </div>
      )}
    </div>
  )
}
