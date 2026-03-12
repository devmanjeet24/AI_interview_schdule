"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
    LayoutDashboard,
    Calendar,
    MessageSquare,
    Clock,
    MessagesSquare,
    LogOut
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

const links = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard
    },
    {
        name: "Calendar",
        href: "/calendar",
        icon: Calendar
    },
    {
        name: "Chat",
        href: "/chat",
        icon: MessageSquare
    },
    {
        name: "Availability",
        href: "/availability",
        icon: Clock
    },
    {
        name: "Conversations",
        href: "/conversations",
        icon: MessagesSquare
    }
]

export default function Sidebar() {

    const pathname = usePathname()
    const router = useRouter()
    const { logout } = useAuth()

    const handleLogout = () => {

        logout()
        router.push("/login")

    }

    return (

        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">

            {/* Logo */}
            <div className="px-6 py-6 border-b border-gray-200">

                <h1 className="text-xl font-semibold tracking-tight">
                    AI Scheduler
                </h1>

                <p className="text-sm text-gray-500">
                    Interview Platform
                </p>

            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1">

                {links.map((link) => {

                    const Icon = link.icon
                    const active = pathname === link.href

                    return (

                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
       ${active
                                    ? "bg-black text-white shadow-sm"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >

                            <Icon size={18} />

                            {link.name}

                        </Link>

                    )

                })}

            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-200">

  <button
    onClick={handleLogout}
    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
  >

    <LogOut size={18} className="text-gray-500" />

    <span>Logout</span>

  </button>

</div>

        </aside>

    )

}