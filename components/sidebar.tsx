import { cn } from "@/lib/utils"

import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

export function Sidebar({ className }: { className?: string }) {
  return (
    <div className={cn("relative pb-12", className)}>
      {/* Contenido del sidebar */}
      <div className="sticky top-0 w-full max-w-xs flex flex-col gap-2 mt-4">
        {/* Bienvenida */}
        <div className="px-4 py-2">
          <Alert>
            <AlertTitle>👋🏼 Bienvenido a mi Sitio Web</AlertTitle>
            <AlertDescription>
              Este es un espacio donde comparto mis conocimientos y experiencias
              en el mundo de la tecnología y la programación.
            </AlertDescription>
          </Alert>
        </div>

        {/* Invitación al Perfil */}
        <div className="px-4 py-2">
          <Alert variant="success">
            {/* super happy face emoji */}

            <AlertTitle>😁 Explora Mi Perfil Personal</AlertTitle>
            <AlertDescription>
              Para conocer más sobre mi historia, valores y aspectos personales,
              visita mi perfil.
              <a href="/perfil" className="underline ml-1">
                Conoce más sobre mí
              </a>
              .
            </AlertDescription>
          </Alert>
        </div>

        {/* Botón Flotante para Chat de Preguntas Frecuentes */}
        <div className="px-4 py-2">
          <Alert>
            <AlertTitle>🙋🏻 ¿Tienes Preguntas?</AlertTitle>
            <AlertDescription>
              No olvides que hay un botón flotante en la parte inferior derecha
              (
              <span role="img" aria-label="message">
                💬
              </span>
              ) donde puedes acceder al chat de preguntas frecuentes.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
