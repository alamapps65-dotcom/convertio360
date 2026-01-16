import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { PDFDocument } from "npm:pdf-lib@1.17.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

async function convertImageToPDF(imageBuffer: Uint8Array, imageType: string): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  let image;
  if (imageType === 'png') {
    image = await pdfDoc.embedPng(imageBuffer);
  } else if (imageType === 'jpg' || imageType === 'jpeg') {
    image = await pdfDoc.embedJpg(imageBuffer);
  } else {
    throw new Error(`Unsupported image type: ${imageType}`);
  }

  const page = pdfDoc.addPage([image.width, image.height]);
  page.drawImage(image, {
    x: 0,
    y: 0,
    width: image.width,
    height: image.height,
  });

  return await pdfDoc.save();
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const outputFormat = formData.get("outputFormat") as string;

    if (!file || !outputFormat) {
      return new Response(
        JSON.stringify({ error: "Missing file or outputFormat" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const inputFormat = file.name.split(".").pop()?.toLowerCase() || "";
    const imageFormats = ["jpg", "jpeg", "png"];

    if (imageFormats.includes(inputFormat) && outputFormat.toLowerCase() === "pdf") {
      const arrayBuffer = await file.arrayBuffer();
      const imageBuffer = new Uint8Array(arrayBuffer);

      const pdfBuffer = await convertImageToPDF(imageBuffer, inputFormat);

      return new Response(
        pdfBuffer,
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${file.name.replace(/\.[^.]+$/, '')}.pdf"`,
          },
        }
      );
    } else {
      const text = await file.text();
      let converted = text;

      if (outputFormat === "html" && inputFormat === "txt") {
        converted = `<!DOCTYPE html><html><body><pre>${text}</pre></body></html>`;
      } else if (outputFormat === "md" && inputFormat === "txt") {
        converted = text;
      } else if (outputFormat === "txt") {
        converted = text.replace(/<[^>]*>/g, "");
      }

      const blob = new Blob([converted], { type: "text/plain" });
      const arrayBuffer = await blob.arrayBuffer();

      return new Response(
        arrayBuffer,
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/octet-stream",
            "Content-Disposition": `attachment; filename="converted.${outputFormat}"`,
          },
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
