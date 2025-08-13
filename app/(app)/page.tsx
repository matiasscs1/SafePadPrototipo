"use client"

import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { PALETTE } from "@/lib/palette"
import { Wrench, MapPin, Shield } from "lucide-react"

function daysRemaining(to: string) {
  const target = new Date(to)
  const today = new Date()
  target.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  const diff = target.getTime() - today.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export default function DashboardPage() {
  const nextMaintDate = "25 de JUNIO del 2025"
  const appleExpires = "2026-05-12"
  const safepadRenew = "2025-12-05"

  const appleDays = daysRemaining(appleExpires)
  const safepadDays = daysRemaining(safepadRenew)

  return (
    <main style={{ backgroundColor: PALETTE.navyBottom }}>
      <PageHeader title="Inicio" />

      <section className="mx-auto w-full max-w-md px-4 pt-3 text-gray-900 pb-6">
        {/* Marca + saludo */}
        <div className="mb-4">
          <div className="mb-2 flex items-center gap-2 text-gray-900">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-semibold">SAFEPAD</span>
          </div>
          <h2 className="text-2xl font-bold">Hey, María!</h2>
        </div>

        {/* Card blanca: Dispositivo */}
        <Card className="mb-3 rounded-2xl bg-white text-black shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Image
                src={"/placeholder.svg?height=90&width=120&query=iPad%20white%20card"}
                alt="iPad 11va"
                width={120}
                height={90}
                className="rounded-md"
              />
              <div className="text-sm">
                <p className="text-xs text-gray-500">{`*ASIE266`}</p>
                <p className="text-lg font-semibold text-gray-900">iPad 11va</p>
                <p className="text-sm text-gray-600">Características</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card morada: Mantenimiento */}
        <div className="mb-3 rounded-2xl p-4 shadow" style={{ background: PALETTE.primary, color: "white" }}>
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-full bg-white/15 p-2">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs opacity-90">Tu siguiente mantenimiento</p>
              <p className="text-sm font-medium">{nextMaintDate}</p>
            </div>
          </div>
        </div>

        {/* Card blanca: Ubicación */}
        <Card className="mb-3 rounded-2xl bg-white text-black shadow">
          <CardContent className="space-y-2 p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-700" />
              <p className="text-base font-semibold text-gray-900">Tienda SafePad - Quito</p>
            </div>
            <p className="text-sm text-gray-600">Av. Amazonas y Naciones Unidas, Quito</p>
            <img src="/quito-safepad-map.png" alt="Mapa Quito" className="h-28 w-full rounded-md object-cover" />
          </CardContent>
        </Card>

        {/* Card morada: Garantías */}
        <div className="mb-4 rounded-2xl p-4 shadow" style={{ background: PALETTE.primary, color: "white" }}>
          <p className="mb-2 text-base font-semibold">Garantías</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="opacity-90">Apple</span>
              <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs">{appleDays} días restantes</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/20">
              <div className="h-2 rounded-full bg-white/80" style={{ width: "70%" }} />
            </div>
            <div className="flex items-center justify-between">
              <span className="opacity-90">SafePad</span>
              <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs">{safepadDays} días restantes</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/20">
              <div className="h-2 rounded-full bg-white/80" style={{ width: "60%" }} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
