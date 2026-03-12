"use client"

import { useForm } from "react-hook-form"
import { useState } from "react"
import api from "@/lib/api"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import Loader from "@/components/Loader"
import ErrorBox from "@/components/ErrorBox"
import Link from "next/link"

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

    <main className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center px-4">

      <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-10 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to continue to AI Interview Scheduler
        </p>

        <ErrorBox message={error} />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div>
            <label className="text-sm text-gray-600">
              Email
            </label>

            <input
              {...register("email")}
              placeholder="Enter your email"
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Password
            </label>

            <input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 flex justify-center items-center"
          >
            {loading ? "Loading..." : "Login"}
          </button>

        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>

      </div>

    </main>

  )

}