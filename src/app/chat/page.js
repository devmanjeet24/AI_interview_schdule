"use client"

import { useState } from "react"
import api from "@/lib/api"
import DashboardLayout from "@/components/DashboardLayout"

export default function Chat(){

 const [message,setMessage] = useState("")
 const [messages,setMessages] = useState([])
 const [loading,setLoading] = useState(false)
 const [conversationId,setConversationId] = useState(null)

 const sendMessage = async()=>{

  if(!message.trim()) return

  const userText = message

  const userMsg = {
   role:"user",
   text:userText
  }

  setMessages(prev => [...prev,userMsg])

  setMessage("")
  setLoading(true)

  try{

   const res = await api.post("/chat",{
    message:userText,
    conversationId
   })

   const data = res.data

   // IMPORTANT: save conversationId returned from API
   if(!conversationId && data.conversationId){
    setConversationId(data.conversationId)
   }

   const aiMsg = {
    role:"assistant",
    agent:data.agent || "Assistant",
    text:data.message || "",
    event:data.event || null
   }

   setMessages(prev => [...prev,aiMsg])

  }catch(err){

   setMessages(prev => [
    ...prev,
    {
     role:"assistant",
     text:"Something went wrong"
    }
   ])

  }finally{

   setLoading(false)

  }

 }

 return(

  <DashboardLayout>

   <div className="max-w-3xl mx-auto flex flex-col h-[80vh]">

    <h1 className="text-2xl font-bold mb-4">
     AI Assistant
    </h1>

    {/* Chat messages */}

    <div className="flex-1 overflow-y-auto space-y-4 border p-4 rounded-lg bg-white">

     {messages.map((msg,i)=>{

      if(msg.role === "user"){

       return(

        <div key={i} className="flex justify-end">

         <div className="bg-black text-white p-3 rounded-lg max-w-xs">
          {msg.text}
         </div>

        </div>

       )

      }

      return(

       <div key={i} className="flex flex-col">

        <span className="text-xs text-gray-500 mb-1">
         {msg.agent || "Assistant"}
        </span>

        <div className="bg-gray-100 p-3 rounded-lg max-w-md">

         {msg.text}

         {msg.event && (

          <div className="mt-3 p-3 border rounded bg-white">

           <p className="text-sm font-semibold">
            Interview Scheduled
           </p>

           <p className="text-sm">
            Time: {msg.event.time}
           </p>

          </div>

         )}

        </div>

       </div>

      )

     })}

     {loading && (
      <div className="text-gray-500 text-sm">
       AI is typing...
      </div>
     )}

    </div>

    {/* Input */}

    <div className="flex gap-2 mt-4">

     <input
      value={message}
      onChange={(e)=>setMessage(e.target.value)}
      placeholder="Ask something..."
      className="flex-1 border p-3 rounded-lg"
     />

     <button
      onClick={sendMessage}
      className="bg-black text-white px-4 rounded-lg"
     >
      Send
     </button>

    </div>

   </div>

  </DashboardLayout>

 )

}