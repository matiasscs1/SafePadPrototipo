"use client"

import type { ReactNode } from "react"

export function DeviceFrame({ children }: { children: ReactNode }) {
  // iPhone-like frame sin barra de estado; el contenido ocupa toda la altura
  return (
    <div className="min-h-svh w-full bg-[#0D1333]">
      <div className="mx-auto flex max-w-full items-center justify-center px-2 py-4">
        <div
          className="relative h-[844px] w-[390px] overflow-hidden rounded-[44px] border bg-white shadow-xl"
          style={{ borderColor: "rgba(0,0,0,0.08)" }}
        >
          {/* Contenido de la app (scrollable) ocupando toda la altura */}
          <div className="flex h-full flex-col">
            <div className="relative flex-1 overflow-y-auto">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
