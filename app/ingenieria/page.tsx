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
import ParticlesBackground from "@/components/ParticlesBackground"

export default function EngineeringPage() {
  return (
    <div className="relative h-screen">
      <ParticlesBackground />
      <div className="relative z-10 hidden">
        <Image
          src="/images/engineering-light.png"
          width={1280}
          height={1114}
          alt="Ingeniería"
          className="hidden dark:block"
        />
        <div className="p-8 md:block">
          <Tabs defaultValue="overview" className="h-full space-y-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="overview">Innovación</TabsTrigger>
                <TabsTrigger value="technology">Tecnología</TabsTrigger>
                <TabsTrigger value="engineering">Ingeniería</TabsTrigger>
              </TabsList>
            </div>

            {/* Sección Innovación */}
            <TabsContent value="overview" className="p-4">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">
                  Innovación
                </h2>
                <p className="text-sm text-gray-400">
                  Exploración de ideas innovadoras en ingeniería.
                </p>
              </div>
              <Separator className="my-4" />
              <ScrollArea className="w-full">
                <div className="flex space-x-4 pb-4">
                  {/* Contenido de Innovación */}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </TabsContent>

            {/* Sección Tecnología */}
            <TabsContent value="technology" className="p-4">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">
                  Tecnología
                </h2>
                <p className="text-sm text-gray-400">
                  Las tecnologías más recientes en el campo de la ingeniería.
                </p>
              </div>
              <Separator className="my-4" />
              <ScrollArea className="w-full">
                <div className="flex space-x-4 pb-4">
                  {/* Contenido de Tecnología */}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </TabsContent>

            {/* Sección Ingeniería */}
            <TabsContent value="engineering" className="p-4">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">
                  Ingeniería
                </h2>
                <p className="text-sm text-gray-400">
                  Proyectos y desarrollos en el campo de la ingeniería.
                </p>
              </div>
              <Separator className="my-4" />
              <ScrollArea className="w-full">
                <div className="flex space-x-4 pb-4">
                  {/* Contenido de Ingeniería */}
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
