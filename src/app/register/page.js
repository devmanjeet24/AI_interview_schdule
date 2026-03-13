"use client"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"

import Image from "next/image"
import Link from "next/link"

import ErrorBox from "@/components/ErrorBox"

export default function Register(){

 const {
  register,
  handleSubmit,
  formState:{errors}
 } = useForm()

 const router = useRouter()

 const [error,setError] = useState("")
 const [loading,setLoading] = useState(false)

 const onSubmit = async(data)=>{

  try{

   setError("")
   setLoading(true)

   await api.post("/auth/register",data)

   router.push("/login")

  }catch(err){

   setError(err.response?.data?.error || "Registration failed")

  }finally{

   setLoading(false)

  }

 }

 return(

  <main className="relative min-h-screen flex items-center justify-center bg-[#0f172a] overflow-hidden px-6">

   {/* Background Glow Blobs */}

   <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-600 opacity-30 blur-[180px] rounded-full"></div>

   <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-indigo-600 opacity-30 blur-[180px] rounded-full"></div>

   <div className="absolute top-[40%] left-[40%] w-[350px] h-[350px] bg-blue-600 opacity-20 blur-[160px] rounded-full"></div>


   <div className="relative z-10 grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-center max-w-6xl w-full">

    {/* LEFT IMAGE */}

    <div className="flex justify-center items-center">

     <Image
      src="/register.png"
      alt="Interview"
      width={700}
      height={700}
      className="transition duration-500 hover:scale-105 object-contain"
     />

    </div>


    {/* REGISTER CARD */}

    <div className="relative max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl pt-20 pb-10 px-10 text-center transition-all duration-500 hover:shadow-purple-500/30 hover:-translate-y-2 mt-12">

     {/* Hanger Image */}

     <Image
      src="/hngerimg.jpg"
      alt="AI Interview"
      width={150}
      height={150}
      className="absolute -top-20 left-1/2 -translate-x-1/2 swing drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)]"
      style={{
       borderRadius: "44px 48px 48px 89px"
      }}
     />

     <h1 className="text-3xl font-bold text-white mb-3 tracking-tight ">
      Create Account
     </h1>

     <p className="text-gray-300 mb-8 text-sm">
      Register to start scheduling AI interviews
     </p>

     <ErrorBox message={error}/>

     <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 text-left"
     >

      {/* Name */}

      <div>

       <label className="text-sm text-gray-300">
        Full Name
       </label>

       <input
        placeholder="Enter your name"
        {...register("name",{required:"Name is required"})}
        className="w-full mt-1 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
       />

       {errors.name && (
        <p className="text-sm text-red-400 mt-1">
         {errors.name.message}
        </p>
       )}

      </div>

      {/* Email */}

      <div>

       <label className="text-sm text-gray-300">
        Email
       </label>

       <input
        type="email"
        placeholder="Enter your email"
        {...register("email",{required:"Email is required"})}
        className="w-full mt-1 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
       />

       {errors.email && (
        <p className="text-sm text-red-400 mt-1">
         {errors.email.message}
        </p>
       )}

      </div>

      {/* Password */}

      <div>

       <label className="text-sm text-gray-300">
        Password
       </label>

       <input
        type="password"
        placeholder="Create password"
        {...register("password",{required:"Password is required"})}
        className="w-full mt-1 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
       />

       {errors.password && (
        <p className="text-sm text-red-400 mt-1">
         {errors.password.message}
        </p>
       )}

      </div>

      {/* Button */}

      <button
       type="submit"
       disabled={loading}
       className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-purple-500/40"
      >

       {loading ? "Creating account..." : "Register"}

      </button>

     </form>

     <p className="text-sm text-center text-gray-300 mt-6">
      Already have an account?{" "}
      <Link
       href="/login"
       className="text-indigo-400 font-medium hover:underline"
      >
       Login
      </Link>
     </p>

    </div>

   </div>

  </main>

 )

}