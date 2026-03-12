"use client"

import Link from "next/link"
import {useAuth} from "@/hooks/useAuth"

export default function Navbar(){

 const {logout} = useAuth()

 return(

  <div className="flex justify-between bg-black text-white p-4">

   <div className="flex gap-4">

    <Link href="/dashboard">Dashboard</Link>
    <Link href="/calendar">Calendar</Link>
    <Link href="/chat">Chat</Link>
    <Link href="/availability">Availability</Link>
    <Link href="/conversations">Conversations</Link>

   </div>

   <button onClick={logout}>
    Logout
   </button>

  </div>

 )

}