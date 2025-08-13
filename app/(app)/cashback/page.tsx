"use client"

import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PALETTE } from "@/lib/palette"

const products = [
  { name: "AirPods (2a gen)", price: 99, img: "/generic-wireless-earbuds.png" },
  { name: "Bandas Apple Watch", price: 39, img: "/assorted-watch-bands.png" },
  { name: "Funda iPad", price: 59, img: "/stylish-ipad-case.png" },
  { name: "Cargador USB-C", price: 35, img: "/usb-c-charger.png" },
]

const history = [
  { date: "15 Jul 2025", desc: "Compra accesorios", amount: "+$28", status: "pendiente" },
  { date: "05 Jun 2025", desc: "Reclamado: Bandas Watch", amount: "-$39", status: "reclamado" },
]

export default function CashbackPage() {
  return (
    <main style={{ backgroundColor: PALETTE.navyBottom }}>
      <PageHeader title="Cashback" />

      <section className="mx-auto w-full max-w-md px-4 pt-3 pb-6">
        {/* Morada: Resumen saldo */}
        <div className="mb-3 rounded-2xl p-4 text-white shadow" style={{ background: PALETTE.primary }}>
          <p className="text-sm opacity-90">Saldo disponible</p>
          <p className="text-3xl font-bold">$128 USD</p>
        </div>

        {/* Blanca: Productos */}
        <Card className="mb-3 rounded-2xl bg-white text-black shadow">
          <CardContent className="space-y-3 p-4">
            <p className="text-base font-semibold text-gray-900">Productos disponibles</p>
            <div className="grid grid-cols-2 gap-3">
              {products.map((p) => (
                <div key={p.name} className="overflow-hidden rounded-[16px] border">
                  <img src={p.img || "/placeholder.svg"} alt={p.name} className="h-28 w-full object-cover" />
                  <div className="space-y-1 p-2">
                    <p className="text-sm font-medium text-gray-900">{p.name}</p>
                    <p className="text-xs text-gray-600">${p.price} cashback</p>
                    <Button
                      className="h-[38px] w-full rounded-full"
                      style={{ backgroundColor: "#2EEA77", color: "black" }}
                      onClick={() => alert(`Reclamado: ${p.name} (demo)`)}
                    >
                      Reclamar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Blanca: Historial */}
        <Card className="mb-4 rounded-2xl bg-white text-black shadow">
          <CardContent className="space-y-2 p-4">
            <p className="text-base font-semibold text-gray-900">Historial</p>
            {history.map((h, i) => (
              <div key={i} className="flex items-center justify-between rounded-[12px] border p-3 text-sm">
                <div>
                  <p className="font-medium text-gray-900">{h.desc}</p>
                  <p className="text-xs text-gray-600">{h.date}</p>
                </div>
                <span className={h.amount.startsWith("+") ? "text-green-600" : "text-red-600"}>{h.amount}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
