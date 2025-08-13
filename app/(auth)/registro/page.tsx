"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle, Shield } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { PALETTE } from "@/lib/palette"

type FieldState = "idle" | "valid" | "invalid"

export default function RegistroPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [remember, setRemember] = useState(true)
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    serial: "",
    nacimiento: "",
    password: "",
    confirm: "",
  })

  const validators = {
    nombre: (v: string) => v.trim().length > 0,
    apellido: (v: string) => v.trim().length > 0,
    email: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    serial: (v: string) => v.trim().length >= 8,
    nacimiento: (v: string) => !!v,
    password: (v: string) => /[A-Z]/.test(v) && /[a-z]/.test(v) && /[^A-Za-z0-9]/.test(v) && v.length >= 8,
    confirm: (v: string) => v === form.password && v.length > 0,
  }

  const fieldState: Record<keyof typeof form, FieldState> = useMemo(() => {
    const res: any = {}
    for (const k in form) {
      const key = k as keyof typeof form
      const value = form[key]
      res[key] = value ? (validators[key](value) ? "valid" : "invalid") : "idle"
    }
    return res
  }, [form])

  const allValid = (Object.keys(form) as (keyof typeof form)[]).every((k) => validators[k](form[k] as string))

  function borderColor(state: FieldState) {
    if (state === "valid") return PALETTE.ctaGreenDark
    if (state === "invalid") return "#FF3B30"
    return "rgba(0,0,0,0.1)"
  }

  return (
    <main className="flex h-full flex-col text-white">
      {/* Hero con sello grande al centro y badge en esquina */}
      <div className="relative h-56 w-full">
        {/* Badge esquina derecha */}
        <div className="absolute right-4 top-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/12 px-2 py-1 text-[10px] font-semibold">
            <Shield className="h-3.5 w-3.5" />
            SAFEPAD
          </span>
        </div>

        {/* Solo el escudo en blanco, sin fondo ni card */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center gap-3">
            <Shield className="h-20 w-20 text-gray-900" aria-label="SafePad" />
            <div className="text-center">
              <h1 className="text-xl font-semibold text-gray-900">Crear Cuenta SafePad</h1>
              <p className="text-xs text-gray-900">Únete a la protección total</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-start justify-center px-5 pb-6">
        <div className="w-full max-w-md rounded-2xl border bg-white p-5 text-black shadow-sm">
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault()
              setError(null)
              const res = await register(
                {
                  nombre: form.nombre,
                  apellido: form.apellido,
                  email: form.email,
                  nacimiento: form.nacimiento,
                  serial: form.serial,
                  password: form.password,
                },
                remember,
              )
              if (!res.ok) setError(res.error || "Error al registrar")
              else router.replace("/")
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre">Nombre</Label>
                <div className="relative">
                  <Input
                    id="nombre"
                    placeholder="María"
                    value={form.nombre}
                    onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
                    className="mt-1"
                    style={{ borderColor: borderColor(fieldState.nombre) }}
                  />
                  <StatusIcon state={fieldState.nombre} />
                </div>
              </div>
              <div>
                <Label htmlFor="apellido">Apellido</Label>
                <div className="relative">
                  <Input
                    id="apellido"
                    placeholder="García"
                    value={form.apellido}
                    onChange={(e) => setForm((f) => ({ ...f, apellido: e.target.value }))}
                    className="mt-1"
                    style={{ borderColor: borderColor(fieldState.apellido) }}
                  />
                  <StatusIcon state={fieldState.apellido} />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="maria@example.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="mt-1"
                  style={{ borderColor: borderColor(fieldState.email) }}
                />
                <StatusIcon state={fieldState.email} />
              </div>
            </div>

            <div>
              <Label htmlFor="serial">Número serial del iPad</Label>
              <div className="relative">
                <Input
                  id="serial"
                  placeholder="C0XXXXXXXX"
                  value={form.serial}
                  onChange={(e) => setForm((f) => ({ ...f, serial: e.target.value.toUpperCase() }))}
                  className="mt-1 uppercase"
                  style={{ borderColor: borderColor(fieldState.serial) }}
                />
                <StatusIcon state={fieldState.serial} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nacimiento">Fecha de nacimiento</Label>
                <div className="relative">
                  <Input
                    id="nacimiento"
                    type="date"
                    value={form.nacimiento}
                    onChange={(e) => setForm((f) => ({ ...f, nacimiento: e.target.value }))}
                    className="mt-1"
                    style={{ borderColor: borderColor(fieldState.nacimiento) }}
                  />
                  <StatusIcon state={fieldState.nacimiento} />
                </div>
              </div>
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                    className="mt-1"
                    style={{ borderColor: borderColor(fieldState.password) }}
                  />
                  <StatusIcon state={fieldState.password} />
                </div>
                <ul className="mt-2 space-y-1 text-xs text-black/70">
                  <li className={cn(/[A-Z]/.test(form.password) ? "text-green-600" : "text-red-600")}>• Una mayúscula</li>
                  <li className={cn(/[a-z]/.test(form.password) ? "text-green-600" : "text-red-600")}>• Una minúscula</li>
                  <li className={cn(/[^A-Za-z0-9]/.test(form.password) ? "text-green-600" : "text-red-600")}>
                    • Un carácter especial
                  </li>
                  <li className={cn(form.password.length >= 8 ? "text-green-600" : "text-red-600")}>• 8+ caracteres</li>
                </ul>
              </div>
            </div>

            <div>
              <Label htmlFor="confirm">Confirmar contraseña</Label>
              <div className="relative">
                <Input
                  id="confirm"
                  type="password"
                  value={form.confirm}
                  onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
                  className="mt-1"
                  style={{ borderColor: borderColor(fieldState.confirm) }}
                />
                <StatusIcon state={fieldState.confirm} />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex select-none items-center gap-2 text-black">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                Recordarme
              </label>
              <Link href="/login" className="underline text-black">
                ¿Ya tienes cuenta? Inicia sesión
              </Link>
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <Button
              type="submit"
              className="w-full"
              disabled={!allValid}
              style={{ backgroundColor: PALETTE.ctaGreen, color: "#0B2213" }}
            >
              Registrarse
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}

function StatusIcon({ state }: { state: "idle" | "valid" | "invalid" }) {
  if (state === "idle") return null
  if (state === "valid") return <CheckCircle2 className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500" />
  return <XCircle className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500" />
}