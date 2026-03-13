"use client"

import { useState, useRef, useEffect } from "react"
import api from "@/lib/api"
import DashboardLayout from "@/components/DashboardLayout"

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

    const startNewConversation = () => {

 const newId = crypto.randomUUID()

 setConversationId(newId)

 localStorage.setItem("conversationId", newId)

 setMessages([])

}

    const bottomRef = useRef(null)

    // AUTO SCROLL EFFECT
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

            <div className="max-w-3xl mx-auto flex flex-col h-[80vh]">

               <div className="flex items-center justify-between mb-4">

 <h1 className="text-2xl font-bold">
  AI Assistant
 </h1>

 <button
  onClick={startNewConversation}
  className="text-sm px-3 py-1 border rounded-md"
 >
  New Conversation
 </button>

</div>

                {/* Chat messages */}

                <div className="flex-1 overflow-y-auto space-y-4 border p-4 rounded-lg bg-white">

                    {messages.map((msg, i) => {

                        if (msg.role === "user") {

                            return (

                                <div key={i} className="flex justify-end">

                                    <div className="bg-black text-white p-3 rounded-lg max-w-xs">
                                        {msg.text}
                                    </div>

                                </div>

                            )

                        }

                        return (

                            <div key={i} className="flex flex-col">

                                <span className="text-xs text-gray-500 mb-1">
                                    {msg.agent || "Assistant"}
                                </span>

                                <div className="bg-gray-100 p-3 rounded-lg max-w-md">

                                    {msg.text}

                                    {msg.event && (

 <div className="mt-3 p-3 border rounded bg-white space-y-2">

  <p className="text-sm font-semibold">
   Interview Scheduled
  </p>

  <p className="text-sm">
   Time: {msg.event.time}
  </p>

  {msg.event.meetingLink && (

   <a
    href={msg.event.meetingLink}
    target="_blank"
    className="text-blue-600 text-sm underline"
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
                        <div className="text-gray-500 text-sm">
                            AI is typing...
                        </div>
                    )}

                    {/* SCROLL TARGET */}
                    <div ref={bottomRef}></div>

                </div>

                {/* Input */}

                <div className="flex gap-2 mt-4">

                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault()
                                sendMessage()
                            }
                        }}
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