"use client"

import { useRouter } from "next/navigation"
import { Album } from "@/data/albums"

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

  // Function to handle redirection to /profile
  const redirectToProfile = () => {
    router.push("/perfil")
  }

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
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
    </div>
  )
}
