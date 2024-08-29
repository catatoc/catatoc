"use client"

import React, { useCallback } from "react"
import { useTheme } from "next-themes"
import Particles from "react-particles"
import { loadFull } from "tsparticles"
import type { Engine } from "tsparticles-engine"

export default function ParticlesBackground() {
  const { theme } = useTheme()

  const particlesInit = useCallback(async (engine: Engine) => {
    return await loadFull(engine)
  }, [])

  const particlesOptions = {
    background: {
      color: {
        value: theme === "dark" ? "#000000" : "#ffffff", // Cambia el color de fondo según el tema
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: theme === "dark" ? "#ffffff" : "#000000", // Cambia el color de las partículas según el tema
      },
      links: {
        color: theme === "dark" ? "#ffffff" : "#000000", // Cambia el color de los enlaces entre partículas según el tema
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 50,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesOptions as any}
    />
  )
}
