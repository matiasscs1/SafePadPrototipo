"use client"

import { PageHeader } from "@/components/page-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { PALETTE } from "@/lib/palette"
import { useAuth } from "@/components/auth-provider"

export default function PerfilPage() {
  const { logout, user } = useAuth()
  const [form, setForm] = useState({
    nombre: user ? `${user.nombre} ${user.apellido ?? ""}`.trim() : "María García",
    email: user?.email ?? "maria@example.com",
    nacimiento: user?.nacimiento ?? "1993-04-23",
    telefono: "+52 55 1234 5678",
  })
  const [push, setPush] = useState(true)
  const [reminders, setReminders] = useState(true)

  return (
    <main style={{ backgroundColor: PALETTE.navyBottom }}>
      <PageHeader title="Mi Perfil" />

      <section className="mx-auto w-full max-w-md space-y-6 px-4 py-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src="/generic-avatar.png" alt="Avatar" />
            <AvatarFallback>SP</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-base font-semibold text-white">{form.nombre}</p>
            <p className="text-sm text-white/80">{form.email}</p>
          </div>
        </div>

        <form
          className="space-y-4 rounded-lg border bg-white p-4 text-black"
          onSubmit={(e) => {
            e.preventDefault()
            alert("Cambios guardados (demo)")
          }}
        >
          <div>
            <Label htmlFor="nombre">Nombre y apellido</Label>
            <Input
              id="nombre"
              value={form.nombre}
              onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="nacimiento">Fecha de nacimiento</Label>
            <Input
              id="nacimiento"
              type="date"
              value={form.nacimiento}
              onChange={(e) => setForm((f) => ({ ...f, nacimiento: e.target.value }))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              value={form.telefono}
              onChange={(e) => setForm((f) => ({ ...f, telefono: e.target.value }))}
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full" style={{ backgroundColor: PALETTE.ctaGreen, color: "#0B2213" }}>
            Guardar cambios
          </Button>
        </form>

        <div className="space-y-3 rounded-lg border bg-white p-4 text-black">
          <p className="text-sm font-semibold" style={{ color: PALETTE.onLight }}>
            Configuraciones
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: PALETTE.onLight }}>
              Notificaciones push
            </span>
            <Switch checked={push} onCheckedChange={(v) => setPush(Boolean(v))} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: PALETTE.onLight }}>
              Recordatorios de mantenimiento
            </span>
            <Switch checked={reminders} onCheckedChange={(v) => setReminders(Boolean(v))} />
          </div>
        </div>

        <div className="mb-6 space-y-3 rounded-lg border bg-white p-4 text-black">
          <button className="w-full rounded-md border px-4 py-2 text-sm" style={{ color: PALETTE.primary }}>
            Cambiar contraseña
          </button>
          <button
            className="w-full rounded-md border px-4 py-2 text-sm"
            style={{ color: "#FF3B30" }}
            onClick={() => {
              logout()
              window.location.href = "/login"
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </section>
    </main>
  )
}
