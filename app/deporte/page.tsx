"use client"

import { useState } from "react"
import Image from "next/image"
import { Engine } from "@tsparticles/engine"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FootballEntrance from "@/components/FootballEntrance"

export default function SportsPage() {
  return (
    <div className="relative h-screen">
      <FootballEntrance />
      <div className="relative z-10 hidden">
        <Image
          src="/images/sports-light.png"
          width={1280}
          height={1114}
          alt="Deportes"
          className="hidden dark:block"
        />
        <div className="p-8 md:block">
          <Tabs defaultValue="overview" className="h-full space-y-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="overview">Fútbol</TabsTrigger>
                <TabsTrigger value="basketball">Baloncesto</TabsTrigger>
                <TabsTrigger value="tennis">Tenis</TabsTrigger>
              </TabsList>
            </div>

            {/* Sección Fútbol */}
            <TabsContent value="overview" className="p-4">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-black">Fútbol</h2>
                <p className="text-sm text-gray-600">
                  Noticias y eventos recientes en el mundo del fútbol.
                </p>
              </div>
              <Separator className="my-4" />
              <ScrollArea className="w-full">
                <div className="flex space-x-4 pb-4">
                  {/* Contenido de Fútbol */}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </TabsContent>

            {/* Sección Baloncesto */}
            <TabsContent value="basketball" className="p-4">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-black">
                  Baloncesto
                </h2>
                <p className="text-sm text-gray-600">
                  Lo último en el mundo del baloncesto.
                </p>
              </div>
              <Separator className="my-4" />
              <ScrollArea className="w-full">
                <div className="flex space-x-4 pb-4">
                  {/* Contenido de Baloncesto */}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </TabsContent>

            {/* Sección Tenis */}
            <TabsContent value="tennis" className="p-4">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-black">Tenis</h2>
                <p className="text-sm text-gray-600">
                  Últimos torneos y resultados en tenis.
                </p>
              </div>
              <Separator className="my-4" />
              <ScrollArea className="w-full">
                <div className="flex space-x-4 pb-4">
                  {/* Contenido de Tenis */}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
