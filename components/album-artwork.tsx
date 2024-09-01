"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Album } from "@/data/albums"

import { cn } from "@/lib/utils"

import ImageWSkeleton from "./ImageWSkeleton"
import EmojiConfetti from "./triggerConfetti"
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

  const emoji = "⚽"

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md" onClick={handleOpenModal}>
            <EmojiConfetti key={album.name} emoji={emoji}>
              <ImageWSkeleton
                src={album.cover}
                alt={album.name}
                className={cn(
                  "size-auto h-full object-contain transition-all hover:scale-105",
                  aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                )}
              />
            </EmojiConfetti>
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
              className="absolute right-0 top-0 m-2 text-3xl text-neutral-100"
            >
              ✖️
            </button>
            <ImageWSkeleton
              src={album.cover}
              alt={album.name}
              className={cn(
                "max-h-[80vh] max-w-[80vw] object-contain transition-all hover:scale-105", // Limitar tamaño de la imagen con padding
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
        </div>
      )}
    </div>
  )
}
