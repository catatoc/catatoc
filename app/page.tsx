import { Metadata } from "next"
import Image from "next/image"
import { listenNowAlbums, madeForYouAlbums } from "@/data/albums"
import { playlists } from "@/data/playlists"
import { PlusCircledIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlbumArtwork } from "@/components/album-artwork"
import { Menu } from "@/components/menu"
import { PodcastEmptyPlaceholder } from "@/components/podcast-empty-placeholder"
import { Sidebar } from "@/components/sidebar"
import TimelineExample from "@/components/timeline/TimelineExample"
import EmojiConfetti from "@/components/triggerConfetti"

// Importa el nuevo componente

export const metadata: Metadata = {
  title: "Currículum de Carlos Horacio Carrasquero",
  description: "Secciones para conocer a Carlos Horacio Carrasquero.",
}

export default function MusicPage() {
  const emoji = "⚽" // Usar la pelota de fútbol como emoji

  return (
    <>
      <div className="hidden md:hidden">
        <Image
          src="/examples/music-light.png"
          width={1280}
          height={1114}
          alt="Carlos Horacio Carrasquero"
          className="block dark:hidden"
        />
        <Image
          src="/examples/music-dark.png"
          width={1280}
          height={1114}
          alt="Carlos Horacio Carrasquero"
          className="hidden dark:block"
        />
      </div>
      <div className="md:block">
        <Menu />
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="music" className="h-full space-y-6">
                    <div className="space-between flex items-center justify-between">
                      <TabsList>
                        <TabsTrigger value="music" className="relative">
                          Innovación
                        </TabsTrigger>
                        <TabsTrigger value="podcasts">Tecnología</TabsTrigger>
                        <TabsTrigger value="live" disabled>
                          Ingeniería
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    {/* Sección Innovación */}
                    <TabsContent
                      value="music"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Sobre mí
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Conoce más sobre Carlos Horacio Carrasquero.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea className="w-96 whitespace-nowrap md:w-full">
                          <div className="flex space-x-4 pb-4">
                            {listenNowAlbums.map((album) => (
                              <EmojiConfetti
                                key={album.name}
                                emoji={emoji} // Aquí puedes usar "⚽" o cualquier emoji que desees
                              >
                                <AlbumArtwork
                                  album={album}
                                  className="w-[250px] shrink-0"
                                  aspectRatio="portrait"
                                  width={250}
                                  height={330}
                                />
                              </EmojiConfetti>
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </TabsContent>

                    {/* Sección Tecnología */}
                    <div className="mt-6 space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Tecnología
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Exploración de las tecnologías más recientes.
                      </p>
                      <TimelineExample />
                    </div>
                    <Separator className="my-4" />
                    <div className="relative">
                      <ScrollArea className="w-96 whitespace-nowrap rounded-md border md:w-full">
                        <div className="flex space-x-4 pb-4">
                          {madeForYouAlbums.map((album) => (
                            <AlbumArtwork
                              key={album.name}
                              album={album}
                              className="w-[150px] shrink-0"
                              aspectRatio="square"
                              width={150}
                              height={150}
                            />
                          ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </div>

                    {/* Sección Ingeniería */}
                    <TabsContent
                      value="podcasts"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Ingeniería
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Proyectos y desarrollos en el campo de la
                            ingeniería.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <PodcastEmptyPlaceholder />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
