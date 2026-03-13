"use client"

import { useForm } from "react-hook-form"
import { useState } from "react"
import api from "@/lib/api"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import Loader from "@/components/Loader"
import ErrorBox from "@/components/ErrorBox"
import Link from "next/link"
import Image from "next/image"

export default function Login() {

  const { register, handleSubmit } = useForm()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()
  const { login } = useAuth()

  const onSubmit = async (data) => {

    try {

      setLoading(true)
      setError("")

      const res = await api.post("/auth/login", data)

      login(res.data)

      router.push("/dashboard")

    } catch (err) {

      setError(err.response?.data?.error || "Login failed")

    } finally {

      setLoading(false)

    }

  }

  return (

    <main className="relative min-h-screen flex items-center justify-center bg-[#0f172a] overflow-hidden px-6">

      {/* Background Blobs */}

      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-600 opacity-30 blur-[180px] rounded-full"></div>

      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-indigo-600 opacity-30 blur-[180px] rounded-full"></div>

      <div className="absolute top-[40%] left-[40%] w-[350px] h-[350px] bg-blue-600 opacity-20 blur-[160px] rounded-full"></div>


      <div className="relative z-10 grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-center max-w-6xl w-full">

        {/* LEFT IMAGE */}

        <div className="flex justify-center items-center">

          <Image
            src="/login.png"
            alt="Interview"
            width={600}
            height={600}
            className="transition duration-500 hover:scale-105 object-contain"
          />

        </div>


        {/* LOGIN CARD */}

        <div className="relative max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl pt-20 pb-10 px-10 text-center transition-all duration-500 hover:shadow-purple-500/30 hover:-translate-y-2 mt-16">

          {/* Hanger Image */}

          <Image
            src="/hngerimg.jpg"
            alt="AI Interview"
            width={150}
            height={150}
            className="absolute -top-20 left-1/2 swing -translate-x-1/2 drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)]"
            style={{
              borderRadius: "44px 48px 48px 89px",
              transform: "rotate(-8deg)"
            }}
          />

          <h1 className="text-3xl font-bold text-white mb-3 tracking-tight mt-10">
            Welcome Back
          </h1>

          <p className="text-gray-300 mb-8 text-sm">
            Login to continue to AI Interview Scheduler
          </p>

          <ErrorBox message={error} />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">

            <div>
              <label className="text-sm text-gray-300">
                Email
              </label>

              <input
                {...register("email")}
                placeholder="Enter your email"
                className="w-full mt-1 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">
                Password
              </label>

              <input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
                className="w-full mt-1 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-purple-500/40 flex justify-center items-center"
            >
              {loading ? "Loading..." : "Login"}
            </button>

          </form>

          <p className="text-sm text-center text-gray-300 mt-6">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-indigo-400 font-medium hover:underline"
            >
              Register
            </Link>
          </p>

        </div>

      </div>

    </main>

  )

}