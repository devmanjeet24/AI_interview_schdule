"use client"

import Sidebar from "./Sidebar"
import AuthGuard from "./AuthGuard"

export default function DashboardLayout({ children }) {

 return (

  <AuthGuard>

   <div className="flex h-screen bg-gray-50">

    <Sidebar />

    <main className="flex-1 p-6 overflow-y-auto">

     {children}

    </main>

   </div>

  </AuthGuard>

 )

}