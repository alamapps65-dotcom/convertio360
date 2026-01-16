import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const CONVERSION_SERVER_URL = Deno.env.get("CONVERSION_SERVER_URL") || "http://localhost:3001";

const SIMPLE_CONVERSIONS = ["txt", "md", "html", "json", "xml", "csv"];

function needsServerConversion(inputFormat: string, outputFormat: string): boolean {
  const isImage = ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"].includes(inputFormat) ||
                  ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"].includes(outputFormat);
  const isVideo = ["mp4", "avi", "mov", "mkv", "webm", "flv"].includes(inputFormat) ||
                  ["mp4", "avi", "mov", "mkv", "webm", "flv"].includes(outputFormat);
  const isDocument = ["pdf", "docx", "doc", "odt", "rtf", "epub"].includes(inputFormat) ||
                     ["pdf", "docx", "doc", "odt", "rtf", "epub"].includes(outputFormat);

  return isImage || isVideo || isDocument;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  const url = new URL(req.url);

  if (req.method === "GET" && url.pathname.includes("/status/")) {
    try {
      const jobId = url.pathname.split("/status/")[1];

      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );

      const { data: job, error } = await supabase
        .from("conversion_jobs")
        .select("*")
        .eq("id", jobId)
        .maybeSingle();

      if (error || !job) {
        return new Response(
          JSON.stringify({ error: "Job not found" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (job.status === 'completed' && job.output_data) {
        const outputBuffer = Uint8Array.from(atob(job.output_data), c => c.charCodeAt(0));
        return new Response(
          outputBuffer,
          {
            status: 200,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/octet-stream",
              "Content-Disposition": `attachment; filename="${job.filename.replace(/\.[^.]+$/, '')}.${job.output_format}"`,
            },
          }
        );
      }

      return new Response(
        JSON.stringify(job),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
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

    if (needsServerConversion(inputFormat, outputFormat)) {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );

      const { data: job, error: jobError } = await supabase
        .from("conversion_jobs")
        .insert({
          filename: file.name,
          input_format: inputFormat,
          output_format: outputFormat,
          file_size: file.size,
          status: "pending"
        })
        .select()
        .single();

      if (jobError) {
        throw new Error(`Failed to create job: ${jobError.message}`);
      }

      const hetznerFormData = new FormData();
      hetznerFormData.append("file", file);
      hetznerFormData.append("outputFormat", outputFormat);
      hetznerFormData.append("jobId", job.id);

      fetch(`${CONVERSION_SERVER_URL}/convert`, {
        method: "POST",
        body: hetznerFormData,
      }).catch(err => console.error("Failed to send to conversion server:", err));

      return new Response(
        JSON.stringify({
          jobId: job.id,
          status: "processing",
          message: "Conversion started. Use jobId to check status."
        }),
        { status: 202, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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