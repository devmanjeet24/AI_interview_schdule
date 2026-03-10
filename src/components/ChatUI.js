"use client"

import { useState } from "react"

export default function ChatUI(){

 const [msg,setMsg] = useState("")
 const [chat,setChat] = useState([])
 const [loading,setLoading] = useState(false)

 async function send(){

  if(!msg) return

  setLoading(true)

  const res = await fetch("/api/chat",{

   method:"POST",

   headers:{
    "Content-Type":"application/json"
   },

   body:JSON.stringify({
    message:msg
   })

  })

  const data = await res.json()

  setChat([...chat,{user:msg,bot:data}])

  setMsg("")

  setLoading(false)

 }

 return(

  <div className="flex flex-col gap-3">

   {chat.map((c,i)=>(
    <div key={i}>

     <p className="font-bold">
      User:
     </p>

     <p>{c.user}</p>

     <p className="font-bold">
      Bot:
     </p>

     <p>{JSON.stringify(c.bot)}</p>

    </div>
   ))}

   <input
    value={msg}
    onChange={e=>setMsg(e.target.value)}
    className="border p-2"
   />

   <button
    onClick={send}
    className="bg-black text-white p-2"
   >
    {loading ? "Thinking..." : "Send"}
   </button>

  </div>

 )

}