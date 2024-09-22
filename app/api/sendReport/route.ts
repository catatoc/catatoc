import { NextApiRequest } from "next"
import { NextRequest, NextResponse } from "next/server"
import { AppType, Client, Domain } from "@larksuiteoapi/node-sdk"
import { PDFDocument, rgb } from "pdf-lib"
import { ServerClient } from "postmark"

// Configuración de Lark y Postmark
const appId = process.env.NEXT_PUBLIC_LARK_APP_ID || ""
const appToken = process.env.NEXT_PUBLIC_LARK_APP_TOKEN || ""
const appSecret = process.env.NEXT_PUBLIC_LARK_APP_SECRET || ""
const tableId = process.env.NEXT_PUBLIC_LARK_TABLE_ID || ""
const postmarkApiToken = process.env.POSTMARK_API_TOKEN
if (!postmarkApiToken) {
  throw new Error("POSTMARK_API_TOKEN is not defined")
}

const postmarkClient = new ServerClient(postmarkApiToken)

const client = new Client({
  appId,
  appSecret,
  appType: AppType.SelfBuild,
  domain: Domain.Lark,
})

// Función para convertir Unix a formato dd/mm/yyyy
function unixToDateString(unixTime: number): string {
  const date = new Date(unixTime * 1000)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

// Obtener registros de Lark y filtrar por "SILVIA CASIQUE"
async function getLarkRecords(): Promise<any[]> {
  console.log("Obteniendo registros de Lark...")

  try {
    const filter = `CurrentValue.[Persona] = "SILVIA CASIQUE"`
    const resp = await client.bitable.appTableRecord.list({
      path: { app_token: appToken, table_id: tableId },
      params: { filter }, // Pasar el filtro como parte del params
    })

    console.log("Respuesta de Lark API:", resp)

    if (resp.data && Array.isArray(resp.data.items)) {
      console.log("Registros filtrados:", resp.data.items)
      return resp.data.items
    } else {
      console.error("Error: No se obtuvo un array de items.")
      throw new Error("Expected an array of items from Lark API")
    }
  } catch (error) {
    console.error("Error obteniendo registros de Lark Bitable:", error)
    throw error
  }
}

// Manipular los registros obtenidos (solo los campos necesarios)
async function manipulateRecords(records: any[]): Promise<any[]> {
  console.log("Manipulando registros...")

  const manipulated = records.map((record) => ({
    fecha: unixToDateString(record.fields.Fecha), // Convertir Unix a dd/mm/yyyy
    persona: record.fields.Persona,
    cliente: record.fields.Cliente,
    producto: record.fields.Producto,
    unidades: record.fields.Unidades,
    precioVenta: record.fields["Precio de Venta"],
  }))

  console.log("Registros manipulados:", manipulated)
  return manipulated
}

// Generar PDF en formato base64 con una mejor plantilla
async function generatePDFBase64(data: any[]): Promise<string> {
  console.log("Generando PDF...")

  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([600, 800])
  const { width, height } = page.getSize()

  // Título del reporte
  page.drawText("Reporte de Registros de SILVIA CASIQUE", {
    x: 50,
    y: height - 50,
    size: 24,
    color: rgb(0, 0, 0),
  })

  let currentY = height - 100

  // Cuadro de información de registros
  data.forEach((record, index) => {
    const text = `${index + 1}. Fecha: ${record.fecha}, Cliente: ${
      record.cliente
    }, Producto: ${record.producto}, Unidades: ${
      record.unidades
    }, Precio de Venta: ${record.precioVenta}`

    page.drawText(text, {
      x: 50,
      y: currentY,
      size: 12,
      color: rgb(0, 0, 0),
    })
    currentY -= 20
  })

  const pdfBytes = await pdfDoc.save()

  console.log("PDF generado en formato base64.")
  return Buffer.from(pdfBytes).toString("base64")
}

// Enviar el correo con Postmark
async function sendEmailWithPDF(
  base64PDF: string,
  recipientEmail: string
): Promise<any> {
  console.log("Enviando correo con Postmark...")

  try {
    const response = await postmarkClient.sendEmail({
      From: "info@mogosgroup.com",
      To: recipientEmail,
      Subject: "Reporte de registros de SILVIA CASIQUE",
      HtmlBody:
        "<strong>Adjunto encontrarás el reporte de registros de SILVIA CASIQUE.</strong>",
      Attachments: [
        {
          Name: "report.pdf",
          Content: base64PDF,
          ContentType: "application/pdf",
          ContentID: "",
        },
      ],
    })

    console.log("Correo enviado exitosamente:", response)
    return response
  } catch (error) {
    console.error("Error enviando el correo con Postmark:", error)
    throw error
  }
}

// API handler en Next.js
export async function POST(req: Request | NextRequest) {
  console.log("Iniciando el handler de la API...")

  try {
    // Obtener registros desde Lark
    console.log("Llamando a getLarkRecords()...")
    const records = await getLarkRecords()

    // Manipular registros (solo los campos necesarios)
    console.log("Llamando a manipulateRecords()...")
    const manipulatedRecords = await manipulateRecords(records)

    // Generar el PDF
    console.log("Llamando a generatePDFBase64()...")
    const base64PDF = await generatePDFBase64(manipulatedRecords)

    // Enviar el correo con Postmark
    console.log("Llamando a sendEmailWithPDF()...")
    const emailResponse = await sendEmailWithPDF(
      base64PDF,
      "catatocarrasquero@gmail.com"
    )

    console.log("Proceso completado. Enviando respuesta final...")
    return NextResponse.json({
      message: "Correo enviado exitosamente",
      emailResponse,
    })
  } catch (error) {
    console.error("Error en el proceso:", error)
    return NextResponse.json(
      { message: "Error en el proceso", error: (error as Error).message },
      { status: 500 }
    )
  }
}
