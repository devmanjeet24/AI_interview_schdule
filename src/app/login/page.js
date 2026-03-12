"use client"

import {useForm} from "react-hook-form"
import {useState} from "react"
import api from "@/lib/api"
import {useRouter} from "next/navigation"
import {useAuth} from "@/hooks/useAuth"
import Loader from "@/components/Loader"
import ErrorBox from "@/components/ErrorBox"

export default function Login(){

 const {register,handleSubmit} = useForm()

 const [loading,setLoading] = useState(false)
 const [error,setError] = useState("")

 const router = useRouter()
 const {login} = useAuth()

 const onSubmit = async(data)=>{

  try{

   setLoading(true)
   setError("")

   const res = await api.post("/auth/login",data)

   login(res.data)

   router.push("/dashboard")

  }catch(err){

   setError(err.response?.data?.error || "Login failed")

  }finally{

   setLoading(false)

  }

 }

 return(

  <div className="max-w-md mx-auto mt-20">

   <h1 className="text-2xl font-bold mb-4">
   Login
   </h1>

   <ErrorBox message={error}/>

   <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

    <input
     {...register("email")}
     placeholder="Email"
     className="border p-2 w-full"
    />

    <input
     {...register("password")}
     type="password"
     placeholder="Password"
     className="border p-2 w-full"
    />

    <button
     className="bg-blue-600 text-white p-2 w-full"
    >
     {loading ? "Loading..." : "Login"}
    </button>

   </form>

  </div>

 )

}