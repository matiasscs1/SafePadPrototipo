"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package2, MessageCircle, ChevronDown } from "lucide-react";
import { PALETTE } from "@/lib/palette";

type Step = {
  key: string;
  title: string;
  done: boolean;
  detail?: string;
  date?: string;
  metrics?: string[];
};
type Part = {
  name: string;
  status: "pedido" | "en camino" | "recibida";
  eta: string;
};
type Ticket = {
  id: string;
  statusIndex: number;
  steps: Step[];
  parts: Part[];
  technician: { name: string; rating: string };
  sla: { target: string; hoursRemaining: number };
  photos: string[];
};

const defaultTicket: Ticket = {
  id: "SP-2025-0831-01",
  statusIndex: 4,
  steps: [
    {
      key: "recibido",
      title: "Dispositivo recibido",
      done: true,
      date: "01 Ago 2025",
      detail: "Equipo etiquetado y registrado en sistema.",
      metrics: ["Etiqueta #A-4932", "Ingreso 10:21"],
    },
    {
      key: "fotos",
      title: "Fotografía de ingreso",
      done: true,
      date: "01 Ago 2025",
      detail: "Se tomaron 6 fotos del estado del equipo.",
      metrics: ["6 fotos HDR", "Luz de banco"],
    },
    {
      key: "diagnostico",
      title: "Pruebas de diagnóstico",
      done: true,
      date: "02 Ago 2025",
      detail: "Diagnóstico automatizado y manual completado.",
      metrics: ["Batería 92%", "True Tone OK", "Táctil OK"],
    },
    {
      key: "piezas",
      title: "Piezas solicitadas",
      done: true,
      date: "02 Ago 2025",
      detail: "Pantalla OEM y adhesivo sellante.",
      metrics: ["Proveedor: iParts MX"],
    },
    {
      key: "envio",
      title: "Piezas en tránsito",
      done: true,
      date: "03 Ago 2025",
      detail: "Guía: 94ZZ-4312-XY, entrega estimada 04 Ago.",
      metrics: ["Paquetería: Estafeta"],
    },
    {
      key: "reparacion",
      title: "Reparación en proceso",
      done: false,
      date: "03 Ago 2025",
      detail: "Reemplazo de pantalla y sellado.",
      metrics: ["Progreso 60%", "Sellado IP en curso"],
    },
    {
      key: "qc",
      title: "Control de calidad",
      done: false,
      detail: "Pruebas de tacto, brillo, True Tone y sellado IP.",
      metrics: ["Checklist 12/12"],
    },
    {
      key: "listo",
      title: "Listo para recoger",
      done: false,
      detail: "Notificación push + correo para el cliente.",
    },
  ],
  parts: [
    {
      name: "Pantalla OEM iPad Pro 12.9",
      status: "recibida",
      eta: "04 Ago 2025",
    },
    { name: "Adhesivo sellante", status: "recibida", eta: "04 Ago 2025" },
  ],
  technician: { name: "Juan Pérez", rating: "4.9/5" },
  sla: { target: "07 Ago 2025 18:00", hoursRemaining: 56 },
  photos: [
    "/cracked-phone-screen.png",
    "/ipad-corner-dent.png",
    "/diagnostic-bench.png",
  ],
};

function readTicket(): Ticket {
  try {
    const raw = localStorage.getItem("safepad:ticket");
    return raw ? (JSON.parse(raw) as Ticket) : defaultTicket;
  } catch {
    return defaultTicket;
  }
}
function writeTicket(t: Ticket) {
  localStorage.setItem("safepad:ticket", JSON.stringify(t));
}

export default function ReparacionPage() {
  const [ticket, setTicket] = useState<Ticket>(defaultTicket);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => setTicket(readTicket()), []);
  useEffect(() => writeTicket(ticket), [ticket]);

  const whatsappLink = `https://wa.me/525512345678?text=${encodeURIComponent(
    `Hola SafePad, consulta sobre ticket ${ticket.id}`
  )}`;

  return (
    <main style={{ backgroundColor: PALETTE.navyBottom }}>
      <PageHeader title="Reparación" />

      <section className="mx-auto w-full max-w-md space-y-6 px-4 py-4">
        {/* Blanca — Piezas y logística (1) */}
        <Card className="rounded-2xl bg-white text-black shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Piezas y logística</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {ticket.parts.map((p, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border p-3 text-sm"
              >
                <div className="flex items-start gap-2">
                  <Package2 className="mt-0.5 h-4 w-4 text-gray-700" />
                  <div>
                    <p className="font-medium text-gray-900">{p.name}</p>
                    <p className="text-xs text-gray-600">ETA {p.eta}</p>
                  </div>
                </div>
                <span className="rounded-full border px-2 py-0.5 text-xs text-gray-700">
                  {p.status === "pedido"
                    ? "Pedido"
                    : p.status === "en camino"
                    ? "En camino"
                    : "Recibida"}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Morada — Proceso detallado (2) colapsable */}
        <div
          className="rounded-2xl p-4 text-white shadow"
          style={{ background: PALETTE.primary }}
        >
          <div className="mb-2 flex items-center justify-between">
            <p className="text-base font-semibold">Proceso detallado</p>
            <button
              onClick={() => setExpanded((e) => !e)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-xs hover:bg-white/20"
            >
              {expanded ? "Ver menos" : "Ver más"}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  expanded ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          </div>

          {/* Contenido con vista previa cuando está colapsado */}
          <div
            role="region"
            aria-label="Contenido del proceso detallado"
            className={`relative transition-all ${
              expanded ? "max-h-none" : "max-h-[168px] overflow-hidden"
            }`}
          >
            <div className="space-y-3">
              {ticket.steps.map((s) => (
                <div key={s.key} className="rounded-lg bg-white/10 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{s.title}</p>
                    <span className="text-xs opacity-90">
                      {s.date || "Pendiente"}
                    </span>
                  </div>
                  {s.detail ? (
                    <p className="mt-1 text-sm opacity-95">{s.detail}</p>
                  ) : null}
                  {s.metrics && s.metrics.length ? (
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-xs opacity-90">
                      {s.metrics.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>

            {/* Degradado al fondo cuando está colapsado */}
            {!expanded ? (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.28)]" />
            ) : null}
          </div>

          {/* Botón grande opcional al final para accesibilidad en móviles */}
          <div className="mt-3">
            <button
              onClick={() => setExpanded((e) => !e)}
              aria-expanded={expanded}
              className="w-full rounded-full bg-white text-black py-2 text-sm font-medium"
            >
              {expanded ? "Ver menos" : "Ver más"}
            </button>
          </div>
        </div>

        {/* Blanca — Fotos y contacto (3) */}
        <Card className="mb-6 rounded-2xl bg-white text-black shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              Fotos del daño y contacto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {ticket.photos.map((src, i) => (
                <img
                  key={i}
                  src={src || "/placeholder.svg"}
                  alt={`Foto ${i + 1}`}
                  className="h-24 w-full rounded-md object-cover"
                />
              ))}
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex w-full justify-center"
            >
              <button
                className="h-10 w-full rounded-full border text-black"
                style={{ backgroundColor: "#2EEA77" }}
              >
                <span className="inline-flex items-center justify-center gap-2 text-sm">
                  <MessageCircle className="h-4 w-4" />
                  Contactar por WhatsApp
                </span>
              </button>
            </a>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
