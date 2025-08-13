"use client"

import { PALETTE } from "@/lib/palette"

type Props = {
  current: 0 | 1 | 2
  labels?: [string, string, string]
}
export function ThreeStepBar({ current, labels = ["Inicio", "En Reparación", "Finalizado"] }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => {
          const active = i <= current
          return (
            <div key={i} className="flex flex-1 items-center">
              <div
                className="grid h-6 w-6 place-items-center rounded-full text-xs font-bold"
                style={{
                  backgroundColor: active ? PALETTE.purple : "#E9ECEF",
                  color: active ? "white" : PALETTE.textSecondary,
                }}
              >
                {i + 1}
              </div>
              {i < 2 ? (
                <div
                  className="mx-1 h-2 flex-1 rounded-full"
                  style={{ backgroundColor: active ? PALETTE.purple : "#E9ECEF" }}
                />
              ) : null}
            </div>
          )
        })}
      </div>
      <div className="mt-2 grid grid-cols-3 text-center text-xs" style={{ color: PALETTE.textSecondary }}>
        {labels.map((l, i) => (
          <span key={i}>{l}</span>
        ))}
      </div>
    </div>
  )
}
