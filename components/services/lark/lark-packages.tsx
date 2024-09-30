import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const packages = [
  {
    name: "Bronze",
    emoji: "🥉",
    title: "Básico",
    description:
      "Ideal para una implementación rápida y configuración inicial.",
    features: [
      "Instalación y configuración de Lark en los dispositivos de la empresa",
      "Creación de cuentas y asignación de permisos básicos",
      "Estructuración de chats y grupos por área/departamento",
      "Configuración básica de almacenamiento en la nube de Lark",
      "Integración con calendarios y correo electrónico",
      "Capacitación inicial con 2 sesiones",
    ],
    price: "$1,500 USD",
  },
  {
    name: "Silver",
    emoji: "🥈",
    title: "Intermedio",
    description:
      "Para empresas que requieren una configuración personalizada y un nivel básico de automatización.",
    features: [
      "Todo lo del Paquete Básico",
      "Creación de grupos avanzados de trabajo",
      "Personalización de flujos de trabajo utilizando formularios simples",
      "Automatización de tareas básicas",
      "Capacitación inicial con 4 sesiones",
      "Integración con otros servicios",
      "Soporte técnico durante el primer mes",
    ],
    price: "$3,000 USD",
  },
  {
    name: "Gold",
    emoji: "🥇",
    title: "Avanzado",
    description:
      "Para empresas que buscan una implementación completa con automatización de procesos y personalización avanzada.",
    features: [
      "Todo lo del Paquete Intermedio",
      "Automatización avanzada de flujos de trabajo",
      "Personalización avanzada de roles y permisos",
      "Configuración avanzada de documentos compartidos",
      "Capacitación completa con 8 sesiones",
      "Soporte técnico durante 2 meses",
      "Metodología de mejora continua con EOS",
    ],
    price: "$4,000 USD",
  },
  {
    name: "Platinum",
    emoji: "💎",
    title: "Consultoría Completa",
    description:
      "Ideal para empresas que buscan una solución a medida con soporte a largo plazo.",
    features: [
      "Todo lo del Paquete Avanzado",
      "Auditoría inicial de los procesos actuales",
      "Personalización profunda de Lark",
      "Capacitación personalizada para el equipo de IT",
      "Soporte técnico continuo durante 3 meses",
    ],
    price: "Consultar",
  },
]

export default function LarkPackages() {
  const handleWhatsAppClick = (pkg: {
    name: any
    emoji?: string
    title: any
    description?: string
    features?: string[]
    price: any
  }) => {
    const phoneNumber = "584141181358" // Número de WhatsApp
    const textMessage = `Hola, estoy interesado en contratar el paquete ${pkg.title} (${pkg.name}) por ${pkg.price}. Me gustaría recibir más información.`
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      textMessage
    )}`
    window.open(whatsappURL, "_blank")
  }

  const handleSendReport = async () => {
    try {
      const response = await fetch("/api/sendReport", {
        method: "POST",
      })

      console.log("Response:", response)
      if (response.ok) {
        const data = await response.json()
        alert("Reporte enviado exitosamente")
        console.log(data)
      } else {
        alert("Error al enviar el reporte")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Ocurrió un error al enviar el reporte")
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
          Paquetes de Servicios Lark
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
          Optimiza la comunicación y colaboración de tu empresa.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
        {packages.map((pkg, index) => (
          <Card key={index} className="flex h-full flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-lg">
                  {pkg.name}
                </Badge>
                <span className="text-4xl">{pkg.emoji}</span>
              </div>
              <CardTitle className="mt-4 text-2xl">{pkg.title}</CardTitle>
              <CardDescription>{pkg.description}</CardDescription>
            </CardHeader>
            <CardContent className="grow">
              <ul className="list-inside list-disc space-y-2">
                {pkg.features.map((feature, fIndex) => (
                  <li key={fIndex} className="text-sm">
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="mt-auto flex flex-col items-stretch">
              <p className="mb-4 text-center text-2xl font-bold">{pkg.price}</p>
              <Button
                className="w-full"
                onClick={() => handleWhatsAppClick(pkg)}
              >
                Contratar Ahora
              </Button>
              <Button
                className="mt-4 hidden w-full"
                variant="outline"
                onClick={handleSendReport}
              >
                Probar Envío de Reporte
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
