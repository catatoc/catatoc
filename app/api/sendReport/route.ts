import { NextRequest, NextResponse } from "next/server"
import { AppType, Client, Domain } from "@larksuiteoapi/node-sdk"
import { ServerClient } from "postmark"
import puppeteer from "puppeteer"

import { logo } from "@/lib/logo"

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

// Función para convertir Unix a formato dd/mm/yyyy y validar fecha
function unixToDateString(unixTime: number): string {
  const validTimestamp = unixTime > 0 && unixTime < 10000000000 // Validar rango de Unix timestamp
  const date = validTimestamp ? new Date(unixTime * 1000) : new Date()

  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

// Formatear valores numéricos como moneda
function formatCurrency(value: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value)
}

// Obtener registros de Lark y filtrar por "SILVIA CASIQUE"
async function getLarkRecords(): Promise<any[]> {
  try {
    const filter = `CurrentValue.[Persona] = "SILVIA CASIQUE"`
    const resp = await client.bitable.appTableRecord.list({
      path: { app_token: appToken, table_id: tableId },
      params: { filter },
    })

    if (resp.data && Array.isArray(resp.data.items)) {
      return resp.data.items
    } else {
      throw new Error("Expected an array of items from Lark API")
    }
  } catch (error) {
    throw error
  }
}

// Manipular los registros obtenidos
async function manipulateRecords(records: any[]): Promise<any[]> {
  return records.map((record) => ({
    fecha: unixToDateString(record.fields.Fecha),
    persona: record.fields.Persona,
    cliente: record.fields.Cliente,
    producto: record.fields.Producto[0].text, // Mostrar el nombre del producto
    unidades: parseFloat(record.fields.Unidades) || 0, // Asegurarse de que sea número
    precioVenta: parseFloat(record.fields["Precio de Venta"]) || 0, // Asegurarse de que sea número
  }))
}

// Función para calcular los totales de unidades y precio de venta
function calculateTotals(data: any[]): {
  totalUnidades: number
  totalPrecioVenta: number
} {
  const totalUnidades = data.reduce((acc, record) => acc + record.unidades, 0)
  const totalPrecioVenta = data.reduce(
    (acc, record) => acc + record.precioVenta,
    0
  )
  return { totalUnidades, totalPrecioVenta }
}

// Función para generar el PDF usando Puppeteer con logo, bordes redondeados y espacio para firma
async function generatePDFBase64(
  data: any[],
  reportDate: string
): Promise<string> {
  console.log("Generando PDF con Puppeteer...")

  // Calcular totales
  const { totalUnidades, totalPrecioVenta } = calculateTotals(data)

  const htmlContent = `
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { text-align: center; }
        .logo { text-align: center; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; border-radius: 10px; overflow: hidden; }
        th, td { padding: 8px 12px; border: 1px solid #ddd; text-align: left; }
        th { background-color: #f4f4f4; }
        tr:last-child { border-bottom: 2px solid black; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: gray; }
        .currency { text-align: right; }
        .total-row { background-color: #f0f0f0; font-weight: bold; }
        .signature { margin-top: 100px; text-align: center; }
        .signature-line { margin-top: 50px; border-top: 1px solid #000; width: 200px; margin-left: auto; margin-right: auto; text-align: center; }
        .signature-label { margin-top: 5px; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="logo">
        <img src=${logo} alt="Company Logo" width="200" />
      </div>
      <h1>Reporte de Registros de SILVIA CASIQUE</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Producto</th>
            <th>Unidades</th>
            <th class="currency">Precio de Venta</th>
          </tr>
        </thead>
        <tbody>
          ${data
            .map(
              (record, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${record.fecha}</td>
              <td>${record.cliente}</td>
              <td>${record.producto}</td>
              <td>${record.unidades}</td>
              <td class="currency">${formatCurrency(
                record.precioVenta,
                "USD"
              )}</td>
            </tr>`
            )
            .join("")}
          <tr class="total-row">
            <td colspan="4" style="text-align: right;">Totales:</td>
            <td>${totalUnidades}</td>
            <td class="currency">${formatCurrency(totalPrecioVenta, "USD")}</td>
          </tr>
        </tbody>
      </table>
      <div class="signature">
        <div class="signature-line"></div>
        <div class="signature-label">Firma</div>
        <div class="signature-label">Fecha: ${reportDate}</div>
      </div>
      <div class="footer">Reporte generado el ${reportDate}</div>
    </body>
    </html>
  `

  // Usar Puppeteer para convertir el HTML a PDF
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(htmlContent)
  const pdfBuffer = await page.pdf({ format: "A4" })
  await browser.close()

  return Buffer.from(pdfBuffer).toString("base64")
}

// Enviar el correo con Postmark
async function sendEmailWithPDF(
  base64PDF: string,
  recipientEmail: string,
  pdfFileName: string
): Promise<any> {
  return postmarkClient.sendEmail({
    From: "info@mogosgroup.com",
    To: recipientEmail,
    Subject: `Reporte de registros de SILVIA CASIQUE - ${pdfFileName}`,
    HtmlBody:
      "<strong>Adjunto encontrarás el reporte de registros de SILVIA CASIQUE.</strong>",
    Attachments: [
      {
        Name: `${pdfFileName}.pdf`,
        Content: base64PDF,
        ContentType: "application/pdf",
        ContentID: "",
      },
    ],
  })
}

// API handler en Next.js
export async function POST(req: Request | NextRequest) {
  try {
    // Obtener registros desde Lark
    const records = await getLarkRecords()

    // Manipular registros
    const manipulatedRecords = await manipulateRecords(records)

    // Fecha del reporte
    const reportDate = new Date().toLocaleDateString("es-VE")

    // Generar el PDF con un nombre dinámico
    const pdfFileName = `reporte_registros_${reportDate}_SILVIA_CASIQUE`
    const base64PDF = await generatePDFBase64(manipulatedRecords, reportDate)

    // Enviar el correo con Postmark
    const emailResponse = await sendEmailWithPDF(
      base64PDF,
      "catatocarrasquero@gmail.com",
      pdfFileName
    )

    return NextResponse.json({
      message: "Correo enviado exitosamente",
      emailResponse,
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Error en el proceso", error: (error as Error).message },
      { status: 500 }
    )
  }
}
