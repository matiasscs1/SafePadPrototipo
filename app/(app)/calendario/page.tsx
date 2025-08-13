"use client"

import { useMemo, useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { PALETTE } from "@/lib/palette"

type DayCell = { date: Date; inMonth: boolean; available: boolean }

function buildMonth(year: number, month: number): DayCell[] {
  const first = new Date(year, month, 1)
  const startDay = first.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevMonthDays = startDay
  const grid: DayCell[] = []

  for (let i = 0; i < prevMonthDays; i++) {
    const d = new Date(year, month, -i)
    grid.unshift({ date: d, inMonth: false, available: false })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d)
    const weekday = date.getDay()
    const busy = weekday === 0 || weekday === 6 || [5, 12, 19].includes(d)
    grid.push({ date, inMonth: true, available: !busy })
  }
  while (grid.length < 42) {
    const last = grid[grid.length - 1].date
    const next = new Date(last)
    next.setDate(last.getDate() + 1)
    grid.push({ date: next, inMonth: false, available: false })
  }
  return grid
}

const timeSlots = ["10:00", "11:00", "12:00", "13:00", "16:00", "17:00"]

export default function CalendarioPage() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [slot, setSlot] = useState<string>("")
  const [service, setService] = useState("reparacion")
  const [notes, setNotes] = useState("")
  const [files, setFiles] = useState<string[]>([])

  const grid = useMemo(() => buildMonth(year, month), [year, month])

  function monthName(m: number) {
    return new Intl.DateTimeFormat("es-MX", { month: "long" }).format(new Date(2025, m, 1))
  }

  function prevMonth() {
    const d = new Date(year, month, 1)
    d.setMonth(d.getMonth() - 1)
    setYear(d.getFullYear())
    setMonth(d.getMonth())
    setSelectedDate(null)
  }

  function nextMonth() {
    const d = new Date(year, month, 1)
    d.setMonth(d.getMonth() + 1)
    setYear(d.getFullYear())
    setMonth(d.getMonth())
    setSelectedDate(null)
  }

  return (
    <main style={{ backgroundColor: PALETTE.navyBottom }}>
      <PageHeader title="Citas" />

      <section className="mx-auto w-full max-w-md space-y-6 px-4 py-4">
        {/* Alterna: Morado/Azul — Encabezado de mes y navegación (card, no fondo) */}
        <div className="rounded-2xl p-4 text-white shadow" style={{ backgroundColor: PALETTE.primary }}>
          <div className="mb-2 flex items-center justify-between">
            <button className="rounded-md px-2 py-1 text-sm hover:bg-white/10" onClick={prevMonth}>
              {"‹ Anterior"}
            </button>
            <p className="text-sm font-medium">
              {monthName(month)} {year}
            </p>
            <button className="rounded-md px-2 py-1 text-sm hover:bg-white/10" onClick={nextMonth}>
              {"Siguiente ›"}
            </button>
          </div>
          <p className="text-xs opacity-90">Selecciona tu fecha disponible</p>
        </div>

        {/* Blanca — Calendario de días */}
        <Card className="rounded-2xl bg-white text-black shadow">
          <CardContent className="p-4">
            <div className="grid grid-cols-7 gap-2 text-center text-xs text-gray-600">
              {["D", "L", "M", "M", "J", "V", "S"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-2">
              {grid.map((c, i) => {
                const isSelected = selectedDate && c.inMonth && c.date.toDateString() === selectedDate.toDateString()
                const bg = isSelected ? PALETTE.primary : c.available ? "#F3F4F6" : "#E5E7EB"
                const color = isSelected ? "white" : c.available ? "#111827" : "#9CA3AF"
                const border = isSelected ? PALETTE.primary : "transparent"
                return (
                  <button
                    key={i}
                    className="aspect-square rounded-md border text-sm"
                    onClick={() => c.inMonth && c.available && setSelectedDate(c.date)}
                    disabled={!c.inMonth || !c.available}
                    style={{ backgroundColor: bg, color, borderColor: border, opacity: c.inMonth ? 1 : 0.5 }}
                    aria-label={c.date.toDateString()}
                  >
                    {c.date.getDate()}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Morado/Azul — Selección de horario */}
        <div className="rounded-2xl p-4 text-white shadow" style={{ backgroundColor: PALETTE.primary }}>
          <p className="mb-2 text-sm font-semibold">Selecciona horario</p>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((t) => {
              const active = slot === t
              return (
                <button
                  key={t}
                  onClick={() => setSlot(t)}
                  className="rounded-full border px-3 py-1 text-sm"
                  style={{
                    borderColor: "rgba(255,255,255,0.7)",
                    background: active ? "rgba(255,255,255,0.15)" : "transparent",
                    color: "white",
                  }}
                >
                  {t}
                </button>
              )
            })}
          </div>
          <p className="mt-2 text-xs opacity-90">Duración estimada: 45-60 minutos</p>
        </div>

        {/* Blanca — Tipo de servicio */}
        <Card className="rounded-2xl bg-white text-black shadow">
          <CardContent className="space-y-3 p-4">
            <p className="text-sm font-semibold text-gray-900">Tipo de servicio</p>
            <RadioGroup value={service} onValueChange={setService}>
              {[
                { id: "rep", v: "reparacion", l: "Reparación" },
                { id: "mant", v: "mantenimiento", l: "Mantenimiento preventivo" },
                { id: "rev", v: "revision", l: "Revisión general" },
                { id: "gar", v: "garantia", l: "Reclamación de garantía" },
              ].map((o) => (
                <div key={o.id} className="flex items-center space-x-2">
                  <RadioGroupItem id={o.id} value={o.v} />
                  <Label htmlFor={o.id}>{o.l}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Morado/Azul — Notas y fotos */}
        <div className="rounded-2xl p-4 text-white shadow" style={{ backgroundColor: PALETTE.primary }}>
          <div>
            <p className="text-sm font-semibold">Describe el problema</p>
            <Textarea
              placeholder="Ej. Pantalla con grietas en la esquina..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 bg-white/95 text-black placeholder:text-gray-400"
            />
          </div>
          <div className="mt-3">
            <Label>Fotos del daño (opcional)</Label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="mt-1 block w-full text-sm text-white"
              onChange={(e) => {
                const f = e.target.files ? Array.from(e.target.files) : []
                const readers = f.map(
                  (file) =>
                    new Promise<string>((resolve) => {
                      const reader = new FileReader()
                      reader.onload = () => resolve(reader.result as string)
                      reader.readAsDataURL(file)
                    }),
                )
                Promise.all(readers).then(setFiles)
              }}
            />
            {files.length > 0 ? (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {files.map((src, i) => (
                  <img
                    key={i}
                    src={src || "/placeholder.svg"}
                    alt={`Foto subida ${i + 1}`}
                    className="h-24 w-full rounded-md object-cover"
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Blanca — Confirmar */}
        <Button
          className="mb-6 w-full rounded-full"
          style={{ backgroundColor: "#2EEA77", color: "#000000" }}
          onClick={() => {
            if (!selectedDate || !slot) {
              alert("Selecciona fecha y horario")
              return
            }
            const d = new Intl.DateTimeFormat("es-MX", { dateStyle: "medium" }).format(selectedDate)
            alert(`Cita confirmada: ${d} a las ${slot} (${service})`)
          }}
        >
          Confirmar Cita
        </Button>
      </section>
    </main>
  )
}
