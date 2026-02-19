"use client"

import { useState, useEffect } from "react"
import { Sidebard } from "@/app/ui/sidebard"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  // Écoute du toggle depuis le Sidebar
  useEffect(() => {
    const handler = () => setCollapsed((prev) => !prev)
    window.addEventListener("toggleCollapse", handler)
    return () => window.removeEventListener("toggleCollapse", handler)
  }, [])

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden  ">
      
      {/* Sidebar */}
      <div
        className={`flex-none  transition-all duration-300 border-r border-red-500
          ${collapsed ? "w-20" : "w-64"} md:h-screen`}
      >
        <Sidebard collapsed={collapsed} />
      </div>

      {/* Main content */}
      <div className="grow p-4 md:overflow-y-auto md:p-12 transition-all duration-300">
        {children}
      </div>
    </div>
  )
}
