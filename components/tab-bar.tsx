"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Tablet, Gift, Wrench, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { PALETTE } from "@/lib/palette"

type TabItem = {
  href: string
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const tabs: TabItem[] = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/mi-ipad", label: "Mi iPad", icon: Tablet },
  { href: "/cashback", label: "Cashback", icon: Gift },
  { href: "/reparacion", label: "Reparación", icon: Wrench },
  { href: "/perfil", label: "Perfil", icon: User },
]

export function TabBar() {
  const pathname = usePathname()
  return (
    <nav
      aria-label="Navegación inferior"
      className="sticky bottom-0 left-0 right-0 z-40 border-t"
      style={{
        background: `linear-gradient(180deg, ${PALETTE.navyTop} 0%, ${PALETTE.navyBottom} 100%)`,
        borderColor: "rgba(255,255,255,0.12)",
      }}
    >
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {tabs.map((t) => {
          const active = pathname === t.href
          const Icon = t.icon
          return (
            <li key={t.href}>
              <Link
                href={t.href}
                className={cn("flex h-14 flex-col items-center justify-center gap-1 text-xs font-medium")}
                aria-current={active ? "page" : undefined}
                style={{
                  color: active ? PALETTE.primary : "rgba(255,255,255,0.85)",
                }}
              >
                <Icon className="h-5 w-5" />
                <span>{t.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
