import { formatTailwindHTML } from "@/lib/utils";
import puppeteer from "puppeteer";

export const runtime = "nodejs";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { html, structure } = body;

    if (!html || !structure) {
      return Response.json(
        { message: "Parâmetros inválidos" },
        { status: 400 }
      );
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(formatTailwindHTML(html, structure), {
      waitUntil: "networkidle0",
    });

    const bodyHeight = await page.evaluate(() => {
      return document.body.scrollHeight + 20;
    });

    const pdf = await page.pdf({
      width: "210mm",
      height: `${bodyHeight}px`,
      printBackground: true,
    });

    await browser.close();

    return new Response(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="documento.pdf"',
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Ocorreu um erro inesperado", error: String(error) },
      { status: 500 }
    );
  }
};
