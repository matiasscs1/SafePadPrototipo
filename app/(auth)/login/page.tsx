"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, LogIn, Shield } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { PALETTE } from "@/lib/palette"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [remember, setRemember] = useState(true)
  const [email, setEmail] = useState("andres@example.com")
  const [password, setPassword] = useState("SafePad#2025")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)

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
              <h1 className="text-xl font-semibold text-gray-900">Iniciar Sesión</h1>
              <p className="text-xs text-gray-900">Bienvenido de vuelta a SafePad</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-start justify-center px-5 pb-6">
        <div className="w-full max-w-sm rounded-2xl border bg-white p-5 text-black shadow-sm">
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault()
              setError(null)
              setLoading(true)
              const res = await login(email, password, remember)
              setLoading(false)
              if (!res.ok) {
                setError(res.error || "Error al iniciar sesión")
              } else {
                router.replace("/")
              }
            }}
          >
            <div>
              <Label htmlFor="email" className="text-sm">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="maria@example.com"
                className="mt-1 h-12 text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  className="mt-1 h-12 pr-10 text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-zinc-600 hover:bg-zinc-100"
                  onClick={() => setShow((s) => !s)}
                >
                  {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex select-none items-center gap-2 text-sm text-black">
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Recordar sesión
              </label>
              <Link href="/registro" className="text-sm underline" style={{ color: "#1F2937" }}>
                Crear cuenta
              </Link>
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <Button
              type="submit"
              className="h-12 w-full rounded-full text-base"
              disabled={loading}
              style={{ backgroundColor: PALETTE.ctaGreen, color: "#0B2213" }}
            >
              <LogIn className="mr-2 h-5 w-5" />
              {loading ? "Ingresando…" : "Iniciar Sesión"}
            </Button>

            <div className="rounded-md bg-zinc-50 p-2 text-xs text-zinc-600">
              Demo: andres@example.com / SafePad#2025
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
