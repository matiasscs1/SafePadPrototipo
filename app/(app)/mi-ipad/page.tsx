"use client"

import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { PALETTE } from "@/lib/palette"
import { ChevronDown } from "lucide-react"

const COLORS = {
  green: "#34C759",
  orange: "#FF9500",
  red: "#FF3B30",
}

type Ticket = {
  steps: { key: string; title: string; done: boolean; date?: string }[]
}

function readTicket(): Ticket | null {
  try {
    const raw = localStorage.getItem("safepad:ticket")
    return raw ? (JSON.parse(raw) as Ticket) : null
  } catch {
    return null
  }
}

export default function MiIpadPage() {
  const appleWarrantyActive = true
  const safepadStatus: "activa" | "proxima" | "vencida" = "proxima"
  const safePadColor =
    safepadStatus === "activa" ? COLORS.green : safepadStatus === "proxima" ? COLORS.orange : COLORS.red

  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => setTicket(readTicket()), [])

  return (
    <main className="pb-4" style={{ backgroundColor: PALETTE.navyBottom }}>
      <PageHeader title="Mi iPad" />

      <section className="mx-auto w-full max-w-md space-y-3 px-4 pt-3">
        {/* Card — Blanca: Dispositivo */}
        <Card className="rounded-2xl bg-white text-black shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Image
                src={"/placeholder.svg?height=90&width=140&query=iPad%20device%20card%20white"}
                alt="Mi iPad"
                width={140}
                height={90}
                className="rounded-md"
              />
              <div className="text-sm">
                <p className="text-xs text-gray-500">Número de serie: C02ZQ1ABCD</p>
                <p className="text-base font-semibold text-gray-900">iPad Pro 12.9 (6a gen)</p>
                <p className="text-xs text-gray-600">Fecha de compra: 12/05/2023</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card — Morada: Garantía Apple */}
        <div className="rounded-2xl p-4 text-white shadow" style={{ background: PALETTE.primary }}>
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold">Garantía Apple</p>
            <StatusBadge
              label={appleWarrantyActive ? "Activa" : "Vencida"}
              color={appleWarrantyActive ? COLORS.green : COLORS.red}
            />
          </div>
          <p className="mt-2 text-sm opacity-90">Vence: 12/05/2026</p>
          <p className="text-sm opacity-90">Cobertura: Limitada + Soporte Técn.</p>
        </div>

        {/* Card — Blanca: Garantía SafePad */}
        <Card className="rounded-2xl bg-white text-black shadow">
          <CardContent className="space-y-2 p-4">
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold text-gray-900">Garantía SafePad</p>
              <StatusBadge
                label={
                  safepadStatus === "activa" ? "Activa" : safepadStatus === "proxima" ? "Próxima a vencer" : "Vencida"
                }
                color={safePadColor}
              />
            </div>
            <p className="text-sm text-gray-600">Renovación: 12/05/2025</p>
            <p className="text-sm text-gray-600">Plan: SafePad Plus (daños accidentales)</p>
            <Button className="mt-2 w-full" style={{ backgroundColor: PALETTE.ctaGreen, color: "#0B2213" }}>
              Renovar ahora
            </Button>
          </CardContent>
        </Card>

        {/* Card — Morada: Proceso de reparación (colapsable) */}
        <div className="rounded-2xl p-4 text-white shadow" style={{ background: PALETTE.primary }}>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-base font-semibold">Proceso de Reparación Actual</p>
            <button
              onClick={() => setExpanded((e) => !e)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-xs hover:bg-white/20"
            >
              {expanded ? "Ver menos" : "Ver más"}
              <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : "rotate-0"}`} />
            </button>
          </div>

          {ticket ? (
            <div
              role="region"
              aria-label="Contenido del proceso actual"
              className={`relative transition-all ${expanded ? "max-h-none" : "max-h-[160px] overflow-hidden"}`}
            >
              <ol className="relative ml-3 space-y-4">
                {ticket.steps.map((s, idx, arr) => (
                  <li key={s.key} className="relative">
                    {idx < arr.length - 1 ? (
                      <span className="absolute left-[-12px] top-5 h-[28px] w-[2px] bg-white/30" aria-hidden="true" />
                    ) : null}
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-block h-3 w-3 rounded-full"
                        style={{ backgroundColor: s.done ? "#2EEA77" : "#B3B7F7" }}
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-medium">{s.title}</p>
                        <p className="text-xs opacity-80">{s.date || "Pendiente"}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>

              {!expanded ? (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.28)]" />
              ) : null}
            </div>
          ) : (
            <p className="text-sm opacity-80">Sin reparaciones activas.</p>
          )}

          <div className="mt-3">
            <button
              onClick={() => setExpanded((e) => !e)}
              aria-expanded={expanded}
              className="w-full rounded-full bg-white text-black py-2 text-sm font-medium"
            >
              {expanded ? "Ver menos" : "Ver más"}
            </button>
          </div>

          <div className="mt-3 space-y-1 text-sm opacity-90">
            <p>Técnico: Juan Pérez</p>
            <p>Entrega estimada: 07 Ago 2025</p>
            <p>Notas: Reemplazo de pantalla en progreso.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
