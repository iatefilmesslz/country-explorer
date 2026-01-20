"use client";

import { useMemo, useRef, useState } from "react";
import { AlertCircle, Download, Film, Loader2, Video as VideoIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Country } from "../types/country";
import { useFavorites } from "../stores/useFavorites";

const fallbackCountries: Country[] = [
  {
    cca3: "BRA",
    name: { common: "Brasil", official: "República Federativa do Brasil" },
    flags: { svg: "https://flagcdn.com/br.svg", alt: "Bandera de Brasil" },
    region: "Américas",
    population: 215000000,
    capital: ["Brasília"],
  },
  {
    cca3: "PRT",
    name: { common: "Portugal", official: "República Portuguesa" },
    flags: { svg: "https://flagcdn.com/pt.svg", alt: "Bandera de Portugal" },
    region: "Europa",
    population: 10310000,
    capital: ["Lisboa"],
  },
  {
    cca3: "ARG",
    name: { common: "Argentina", official: "República Argentina" },
    flags: { svg: "https://flagcdn.com/ar.svg", alt: "Bandera de Argentina" },
    region: "Américas",
    population: 45600000,
    capital: ["Buenos Aires"],
  },
  {
    cca3: "ESP",
    name: { common: "España", official: "Reino de España" },
    flags: { svg: "https://flagcdn.com/es.svg", alt: "Bandera de España" },
    region: "Europa",
    population: 47400000,
    capital: ["Madrid"],
  },
];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const formatPopulation = (population?: number) =>
  population ? new Intl.NumberFormat("es-ES").format(population) : "Dato desconocido";

async function loadFlagImage(src?: string) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    if (!src) return resolve(null);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function drawSlide(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  country: Country,
  flagImage: HTMLImageElement | null
) {
  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#0f172a");
  gradient.addColorStop(1, "#1d4ed8");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.globalAlpha = 0.16;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(40, 40, width - 80, height - 80);
  ctx.globalAlpha = 1;

  ctx.fillStyle = "rgba(15,23,42,0.75)";
  ctx.fillRect(90, 90, width - 180, height - 180);

  if (flagImage) {
    const maxFlagWidth = width * 0.45;
    const maxFlagHeight = height * 0.4;
    const flagRatio = Math.min(maxFlagWidth / flagImage.width, maxFlagHeight / flagImage.height);
    const drawWidth = flagImage.width * flagRatio;
    const drawHeight = flagImage.height * flagRatio;
    const flagX = width - drawWidth - 140;
    const flagY = height / 2 - drawHeight / 2;

    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.35)";
    ctx.shadowBlur = 24;
    ctx.drawImage(flagImage, flagX, flagY, drawWidth, drawHeight);
    ctx.restore();
  }

  ctx.fillStyle = "#e0e7ff";
  ctx.font = "34px 'Inter', system-ui, sans-serif";
  ctx.fillText(country.region ?? "Región desconocida", 130, 180);

  ctx.fillStyle = "#ffffff";
  ctx.font = "64px 'Inter', system-ui, sans-serif";
  ctx.fillText(country.name?.common ?? "País sin nombre", 130, 260);

  ctx.font = "28px 'Inter', system-ui, sans-serif";
  ctx.fillText(`Población: ${formatPopulation(country.population)}`, 130, 320);

  if (country.capital?.[0]) {
    ctx.fillText(`Capital: ${country.capital[0]}`, 130, 370);
  }

  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = "20px 'Inter', system-ui, sans-serif";
  ctx.fillText("Vídeo generado con tus países favoritos", 130, height - 160);
}

export default function VideoCreator() {
  const favorites = useFavorites((s) => s.favorites);
  const slides = useMemo(() => (favorites.length ? favorites : fallbackCountries), [favorites]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const generateVideo = async () => {
    if (generating) return;

    const canvas = canvasRef.current;
    if (!canvas) {
      setError("No se pudo preparar el lienzo para el video.");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setError("No se pudo iniciar el contexto del video.");
      return;
    }

    if (typeof MediaRecorder === "undefined" || typeof canvas.captureStream !== "function") {
      setError("Este navegador no soporta la grabación de video con lienzos.");
      return;
    }

    setGenerating(true);
    setError(null);
    setVideoUrl(null);

    const stream = canvas.captureStream(30);
    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    const chunks: Blob[] = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };

    const stopped = new Promise<void>((resolve) => {
      recorder.onstop = () => resolve();
    });

    recorder.start();

    for (const country of slides.slice(0, 6)) {
      const flagImage = await loadFlagImage(country.flags?.svg ?? country.flags?.png);
      drawSlide(ctx, canvas, country, flagImage);
      await wait(1800);
    }

    recorder.stop();
    await stopped;

    const blob = new Blob(chunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    setVideoUrl(url);
    setGenerating(false);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr,1fr]">
      <div className="space-y-4">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-primary">Creador de video</p>
              <h2 className="text-2xl font-semibold leading-tight">Gere um vídeo em segundos</h2>
              <p className="text-muted-foreground">
                Usa tus países favoritos o los ejemplos preseleccionados para generar un video
                corto que puedes descargar y compartir.
              </p>
            </div>
            <Badge variant="secondary" className="flex items-center gap-2">
              <VideoIcon className="h-4 w-4" />
              Beta
            </Badge>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <div className="rounded-lg border border-dashed bg-muted/40 p-4 text-sm">
              <p className="font-medium text-foreground">Lo que incluye</p>
              <ul className="mt-2 space-y-1 text-muted-foreground">
                <li>• Transición suave entre países</li>
                <li>• Bandera, población y capital</li>
                <li>• Vídeo en formato WebM listo para compartir</li>
              </ul>
            </div>
            <div className="rounded-lg border border-dashed bg-muted/40 p-4 text-sm">
              <p className="font-medium text-foreground">Consejo rápido</p>
              <p className="mt-2 text-muted-foreground">
                Marca países como favoritos en la vista principal para que aparezcan aquí sin
                configuraciones adicionales.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Film className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Países incluidos</h3>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {slides.map((country) => (
              <div
                key={country.cca3}
                className="flex items-center gap-3 rounded-lg border bg-muted/40 p-3"
              >
                <div className="h-12 w-16 overflow-hidden rounded-md border bg-white">
                  <img
                    src={country.flags?.png ?? country.flags?.svg ?? ""}
                    alt={country.flags?.alt ?? `Bandera de ${country.name?.common ?? "país"}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <p className="font-medium leading-tight">{country.name?.common}</p>
                  <p className="text-sm text-muted-foreground">
                    {country.region ?? "Sin región"} • {formatPopulation(country.population)} hab.
                  </p>
                </div>
              </div>
            ))}
          </div>

          {!favorites.length && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-dashed bg-muted/30 p-3 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              Añade países a favoritos para personalizar tu video automático.
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Renderizar video</p>
              <p className="font-semibold">Pré-visualização do clipe</p>
            </div>
            <Button onClick={generateVideo} disabled={generating} size="sm">
              {generating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <VideoIcon className="mr-2 h-4 w-4" />
                  Criar vídeo
                </>
              )}
            </Button>
          </div>

          <div className="mt-4 overflow-hidden rounded-lg border bg-muted/60">
            <canvas
              ref={canvasRef}
              width={1280}
              height={720}
              className="h-full w-full"
              aria-hidden="true"
            />
          </div>

          {error && (
            <div className="mt-3 flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-2 flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Reproducir y descargar</h3>
          </div>
          {videoUrl ? (
            <>
              <video controls className="w-full rounded-lg border" src={videoUrl} />
              <a
                href={videoUrl}
                download="video-paises.webm"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary underline"
              >
                <Download className="h-4 w-4" />
                Descargar video WebM
              </a>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Genera el clip para reproducirlo aquí y obtener el archivo.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
