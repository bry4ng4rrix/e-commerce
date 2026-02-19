"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  Home,
  Users,
  Settings, 
  ClipboardClock ,
  Mail,
  BarChart,
  BookOpen,
  LayersPlus,
  Moon,
  Sun,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

interface SidebarProps {
  collapsed?: boolean
}

const menuItems = [
  { name: "Tableau de bord", href: "/admin", icon: Home },
  { name: "Etudiants", href: "/admin/etudiants", icon: Users },
  { name: "Enseignants", href: "/admin/prof", icon: BookOpen },
  { name: "Académique", href: "/admin/academique", icon: LayersPlus },
  { name: "Demande", href: "/admin/demande", icon: ClipboardClock },
  { name: "Communication", href: "/admin/comunication", icon: Mail },
  ]

export function Sidebard({ collapsed = false }: SidebarProps) {
  const pathname = usePathname()
  const [dark, setDark] = useState(false)

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark")
    setDark(!dark)
  }

  // Toggle collapse pour desktop
  const toggleCollapse = () => {
    const event = new CustomEvent("toggleCollapse")
    window.dispatchEvent(event)
  }

  return (
    <>
      {/* ========== MOBILE SIDEBAR ========== */}
      <div className="md:hidden flex items-center justify-between p-4 border-b">
        <h2 className="font-bold text-lg">Page d'admin</h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost">
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-64 p-6">
            <div className="space-y-4 ">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={`w-full justify-start gap-3 ${isActive ? "bg-blue-400" : ""}`}
                    >
                      <item.icon size={18} />
                      {item.name}
                    </Button>
                  </Link>
                )
              })}

              <Button
                variant="outline"
                className="w-full gap-2 mt-4"
                onClick={toggleDark}
              >
                {dark ? <Sun size={16} /> : <Moon size={16} />}
                {dark ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* ========== DESKTOP SIDEBAR ========== */}
      <aside
        className={cn(
          "hidden md:flex flex-col h-screen bg-background transition-all duration-100",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && <h2 className="text-xl font-bold">Page d'admin</h2>}

          {/* Bouton toggle uniquement ici */}
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleCollapse}
          >
            <Menu />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 transition-all duration-100",
                    collapsed && "justify-center"
                  )}
                >
                  <item.icon size={18} />
                  {!collapsed && item.name}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
           
          <Button
            variant="outline"
            className={cn("w-full gap-2", collapsed && "justify-center")}
            onClick={toggleDark}
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
            {!collapsed && (dark ? "Light Mode" : "Dark Mode")}
          </Button>
        </div>
      </aside>
    </>
  )
}
