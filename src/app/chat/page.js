"use client"

import { useState, useRef, useEffect } from "react"
import api from "@/lib/api"
import DashboardLayout from "@/components/DashboardLayout"
import { Send, Sparkles, CalendarDays } from "lucide-react"
import { useRouter } from "next/navigation"

function formatDate(date) {
 return new Date(date).toLocaleString("en-IN", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
 })
}

export default function Chat() {

 const [message, setMessage] = useState("")
 const [messages, setMessages] = useState([])
 const [loading, setLoading] = useState(false)
 const [conversationId, setConversationId] = useState(null)

 const bottomRef = useRef(null)
 const router = useRouter()

 const startNewConversation = () => {
  const newId = crypto.randomUUID()
  setConversationId(newId)
  localStorage.setItem("conversationId", newId)
  setMessages([])
 }

 useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" })
 }, [messages, loading])

 useEffect(() => {

  const savedId = localStorage.getItem("conversationId")

  if (savedId) {
   setConversationId(savedId)
   loadHistory(savedId)
  }

 }, [])

 const loadHistory = async (id) => {

  try {

   const res = await api.get(`/conversation/${id}`)

   const history = res.data.history.map(m => ({
    role: m.role,
    text: m.message
   }))

   setMessages(history)

  } catch (err) {
   console.error("Failed to load history", err)
  }

 }

 const sendMessage = async () => {

  if (!message.trim()) return

  const userText = message

  const userMsg = {
   role: "user",
   text: userText
  }

  setMessages(prev => [...prev, userMsg])

  setMessage("")
  setLoading(true)

  try {

   const res = await api.post("/chat", {
    message: userText,
    conversationId
   })

   const data = res.data

   if (!conversationId && data.conversationId) {
    setConversationId(data.conversationId)
    localStorage.setItem("conversationId", data.conversationId)
   }

   const aiMsg = {
    role: "assistant",
    agent: data.agent || "Assistant",
    text: data.message || "",
    event: data.event || null
   }

   setMessages(prev => [...prev, aiMsg])

   // ✅🔥 MAIN FIX: Interview scheduled → reset + redirect
   if (data.event) {

    setTimeout(() => {

     // clear chat
     setMessages([])
     setConversationId(null)
     localStorage.removeItem("conversationId")

     // redirect to dashboard
     router.push("/dashboard")

    }, 1500)

   }

  } catch (err) {

   setMessages(prev => [
    ...prev,
    {
     role: "assistant",
     text: "Something went wrong"
    }
   ])

  } finally {
   setLoading(false)
  }

 }

 return (

  <DashboardLayout>

   <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-140px)]">

    {/* Header */}

    <div className="flex items-center justify-between mb-6">

     <div>
      <h1 className="text-3xl font-semibold text-white">
       AI Assistant
      </h1>
      <p className="text-gray-400 text-sm">
       Ask questions or schedule interviews
      </p>
     </div>

     <button
      onClick={startNewConversation}
      className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm text-white transition"
     >
      New Conversation
     </button>

    </div>


    {/* Chat messages */}

    <div className="flex-1 min-h-0 overflow-y-auto space-y-6 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg">

     {messages.map((msg, i) => {

      if (msg.role === "user") {

       return (

        <div key={i} className="flex justify-end">

         <div className="bg-indigo-500 text-white px-4 py-3 rounded-2xl max-w-md text-sm shadow">
          {msg.text}
         </div>

        </div>

       )

      }

      return (

       <div key={i} className="flex flex-col gap-2 max-w-xl">

        <div className="flex items-center gap-2 text-xs text-gray-400">
         <Sparkles className="w-3 h-3" />
         {msg.agent || "Assistant"}
        </div>

        <div className="bg-slate-800 text-gray-200 px-4 py-3 rounded-2xl text-sm">

         {msg.text}

         {msg.event && (

          <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-white/10 space-y-2">

           <div className="flex items-center gap-2 text-sm font-medium text-white">
            <CalendarDays className="w-4 h-4" />
            Interview Scheduled
           </div>

           <p className="text-sm text-gray-400">
            {formatDate(msg.event.time)}
           </p>

           {msg.event.meetingLink && (

            <a
             href={msg.event.meetingLink}
             target="_blank"
             className="inline-block text-sm px-3 py-1 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white"
            >
             Join Meeting
            </a>

           )}

          </div>

         )}

        </div>

       </div>

      )

     })}

     {loading && (
      <div className="text-gray-400 text-sm">
       AI is typing...
      </div>
     )}

     <div ref={bottomRef}></div>

    </div>


    {/* Input */}

    <div className="flex gap-3 mt-4">

     <textarea
      rows="2"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={(e) => {
       if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        sendMessage()
       }
      }}
      placeholder="Ask something..."
      className="flex-1 resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
     />

     <button
      onClick={sendMessage}
      className="px-5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white flex items-center gap-2"
     >
      <Send className="w-4 h-4" />
      Send
     </button>

    </div>

   </div>

  </DashboardLayout>

 )
}