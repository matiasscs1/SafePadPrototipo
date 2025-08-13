"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, Home, Tablet, Wrench, Gift, CalendarIcon, User, LogOut, Shield } from "lucide-react"
import { PALETTE } from "@/lib/palette"
import { useAuth } from "@/components/auth-provider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"

type PageHeaderProps = {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  const router = useRouter()
  const { logout } = useAuth()

  return (
    <header
      className="sticky top-0 z-30"
      // Header transparente, sin franja distinta al fondo
      style={{ background: "transparent", color: "black" }}
    >
      <div className="mx-auto flex h-14 w-full max-w-md items-center justify-between px-4">
        {/* Menú */}
        <Sheet>
          <SheetTrigger asChild>
            <button aria-label="Abrir menú" className="rounded-md p-2 hover:bg-white/10 active:bg-white/15">
              <Menu className="h-5 w-5 text-black" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <div className="px-4 py-3" style={{ backgroundColor: PALETTE.navyBottom, color: "black" }}>
              <SheetHeader>
                <SheetTitle className="text-black">SAFEPAD</SheetTitle>
              </SheetHeader>
              <p className="mt-1 text-xs text-black opacity-80">Menú principal</p>
            </div>
            <nav className="px-2 py-2">
              {[
                { href: "/", label: "Inicio", icon: Home },
                { href: "/mi-ipad", label: "Mi iPad", icon: Tablet },
                { href: "/reparacion", label: "Reparación", icon: Wrench },
                { href: "/cashback", label: "Cashback", icon: Gift },
                { href: "/calendario", label: "Citas", icon: CalendarIcon },
                { href: "/perfil", label: "Perfil", icon: User },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      <Icon className="h-4 w-4 text-black" />
                      <span className="text-black">{item.label}</span>
                    </Link>
                  </SheetClose>
                )
              })}
              <button
                onClick={() => {
                  logout()
                  router.replace("/login")
                }}
                className="mt-2 flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4 text-red-600" />
                <span className="text-red-600">Cerrar sesión</span>
              </button>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="leading-tight">
          <h1 className="text-lg font-semibold text-black">{title}</h1>
          {subtitle ? <p className="text-xs text-black opacity-80">{subtitle}</p> : null}
        </div>

        {/* Marca SAFEPAD en la esquina derecha */}
        <div className="flex items-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/12 px-2 py-1 text-[10px] font-semibold text-black">
            <Shield className="h-3.5 w-3.5 text-black" />
            SAFEPAD
          </span>
        </div>
      </div>
    </header>
  )
}