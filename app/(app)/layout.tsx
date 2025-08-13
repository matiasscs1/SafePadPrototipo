"use client"

import type { ReactNode } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthProvider, useAuth } from "@/components/auth-provider"
import { DeviceFrame } from "@/components/device-frame"
import { PALETTE } from "@/lib/palette"

function Guard({ children }: { children: ReactNode }) {
  const { isAuthenticated, hydrated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (hydrated && !isAuthenticated) router.replace("/login")
  }, [hydrated, isAuthenticated, router])

  if (!hydrated) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-white/80">Cargando…</p>
      </div>
    )
  }
  if (!isAuthenticated) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-white/80">Redirigiendo a inicio de sesión…</p>
      </div>
    )
  }
  return <>{children}</>
}

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <DeviceFrame>
        {/* Fondo navy uniforme para cubrir todo el scroll */}
        <div className="flex h-full flex-col" style={{ backgroundColor: PALETTE.navyBottom }}>
          <Guard>
            <div className="flex-1">{children}</div>
          </Guard>
        </div>
      </DeviceFrame>
    </AuthProvider>
  )
}
