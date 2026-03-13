"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"

import {
  House,
  CalendarBlank,
  ChatCircleDots,
  Clock,
  Chats,
  SignOut
} from "@phosphor-icons/react"

import { useAuth } from "@/hooks/useAuth"

const links = [
  { name: "Dashboard", href: "/dashboard", icon: House },
  { name: "Calendar", href: "/calendar", icon: CalendarBlank },
  { name: "Chat", href: "/chat", icon: ChatCircleDots },
  { name: "Availability", href: "/availability", icon: Clock },
  { name: "Conversations", href: "/conversations", icon: Chats }
]

export default function Sidebar() {

  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()

  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (

    <aside
      className={`h-screen flex flex-col border-r border-white/10
      bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
      transition-all duration-300
      ${collapsed ? "w-20" : "w-64"}`}
    >

      {/* Header */}

      <div className="flex items-center justify-between px-5 py-6 border-b border-white/10">

        {!collapsed && (
          <div>
            <h1 className="text-xl font-semibold text-white">
              AI Scheduler
            </h1>

            <p className="text-sm text-gray-400">
              Interview Platform
            </p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-white/10 transition"
        >
          {collapsed ? <PanelLeftOpen size={20}/> : <PanelLeftClose size={20}/>}
        </button>

      </div>


      {/* Navigation */}

      <nav className="flex-1 px-3 py-6 space-y-3">

        {links.map((link) => {

          const Icon = link.icon
          const active = pathname === link.href

          return (

            <Link
              key={link.name}
              href={link.href}
              className={`group relative flex items-center gap-4 px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all
              
              ${active
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >

              {/* Active indicator */}

              {active && (
                <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r"></span>
              )}

              {/* Icon */}

              <div className={`p-2.5 rounded-lg transition
                ${active ? "bg-indigo-500/20" : "group-hover:bg-white/10"}
              `}>
                <Icon size={24} weight="duotone" />
              </div>

              {!collapsed && link.name}

            </Link>

          )

        })}

      </nav>


      {/* Logout */}

      <div className="p-3 border-t border-white/10">

        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full px-4 py-3.5 rounded-xl text-[15px] font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition"
        >

          <div className="p-2.5 rounded-lg bg-red-500/10">
            <SignOut size={24} weight="duotone" />
          </div>

          {!collapsed && <span>Logout</span>}

        </button>

      </div>

    </aside>

  )
}