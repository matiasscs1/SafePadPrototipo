"use client"

import type React from "react"
import { DeviceFrame } from "@/components/device-frame"
import { AuthProvider } from "@/components/auth-provider"
import { PALETTE } from "@/lib/palette"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DeviceFrame>
        {/* Fondo NAVY uniforme también en auth */}
        <div className="min-h-full" style={{ backgroundColor: PALETTE.navyBottom }}>
          {children}
        </div>
      </DeviceFrame>
    </AuthProvider>
  )
}
