"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

type User = {
  nombre: string
  apellido: string
  email: string
  nacimiento?: string
  serial?: string
  password: string
}

type AuthContextType = {
  user: Omit<User, "password"> | null
  isAuthenticated: boolean
  hydrated: boolean
  login: (email: string, password: string, remember: boolean) => Promise<{ ok: boolean; error?: string }>
  register: (user: User, remember?: boolean) => Promise<{ ok: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

function readUsers(): User[] {
  try {
    const raw = localStorage.getItem("safepad:users")
    return raw ? (JSON.parse(raw) as User[]) : []
  } catch {
    return []
  }
}
function writeUsers(users: User[]) {
  localStorage.setItem("safepad:users", JSON.stringify(users))
}
function saveSession(u: Omit<User, "password">, remember: boolean) {
  const payload = JSON.stringify(u)
  if (remember) {
    localStorage.setItem("safepad:session", payload)
    localStorage.setItem("safepad:remember", "1")
    sessionStorage.removeItem("safepad:session")
  } else {
    sessionStorage.setItem("safepad:session", payload)
    localStorage.removeItem("safepad:session")
    localStorage.setItem("safepad:remember", "0")
  }
}
function readSession(): Omit<User, "password"> | null {
  try {
    const s = sessionStorage.getItem("safepad:session")
    if (s) return JSON.parse(s)
    const l = localStorage.getItem("safepad:session")
    if (l) return JSON.parse(l)
    return null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null)
  const [hydrated, setHydrated] = useState(false)

  // Seed user demo
  useEffect(() => {
    if (!localStorage.getItem("safepad:seeded")) {
      const demo: User = {
        nombre: "Andrés",
        apellido: "González",
        email: "andres@example.com",
        nacimiento: "1991-08-15",
        serial: "*AS1E266",
        password: "SafePad#2025",
      }
      const list = readUsers()
      if (!list.find((u) => u.email === demo.email)) {
        writeUsers([...list, demo])
      }
      localStorage.setItem("safepad:seeded", "1")
    }
  }, [])

  // Hydrate session
  useEffect(() => {
    const current = readSession()
    if (current) setUser(current)
    setHydrated(true)
  }, [])

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      hydrated,
      async login(email, password, remember) {
        const users = readUsers()
        const match = users.find((u) => u.email === email && u.password === password)
        if (!match) return { ok: false, error: "Credenciales inválidas" }
        const { password: _p, ...safe } = match
        setUser(safe)
        saveSession(safe, remember)
        return { ok: true }
      },
      async register(newUser, remember = true) {
        const users = readUsers()
        if (users.some((u) => u.email === newUser.email)) {
          return { ok: false, error: "El correo ya existe" }
        }
        writeUsers([...users, newUser])
        const { password: _p, ...safe } = newUser
        setUser(safe)
        saveSession(safe, remember)
        return { ok: true }
      },
      logout() {
        setUser(null)
        sessionStorage.removeItem("safepad:session")
        localStorage.removeItem("safepad:session")
      },
    }),
    [user, hydrated],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
