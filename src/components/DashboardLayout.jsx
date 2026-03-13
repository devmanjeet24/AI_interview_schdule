"use client"

import Sidebar from "./Sidebar"
import AuthGuard from "./AuthGuard"

export default function DashboardLayout({ children }) {

  return (

    <AuthGuard>

      {/* Page container */}
      <div className="flex h-screen bg-slate-900 text-white overflow-hidden">

        {/* Sidebar (fixed height) */}
        <Sidebar />

        {/* Main content scroll area */}
        <main className="flex-1 relative overflow-y-auto overflow-x-hidden p-8">

          {/* Background glow */}

          <div className="absolute top-[-150px] right-[-150px] w-[400px] h-[400px] bg-purple-600/20 blur-[160px] rounded-full"></div>

          <div className="absolute bottom-[-150px] left-[-150px] w-[400px] h-[400px] bg-indigo-600/20 blur-[160px] rounded-full"></div>

          {/* Content wrapper */}

          <div className="relative z-10">

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl">

              {children}

            </div>

          </div>

        </main>

      </div>

    </AuthGuard>

  )

}