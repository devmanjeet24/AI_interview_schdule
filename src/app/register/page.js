"use client"

import {useForm} from "react-hook-form"
import api from "@/lib/api"
import {useRouter} from "next/navigation"
import {useState} from "react"
import ErrorBox from "@/components/ErrorBox"

export default function Register(){

 const {register,handleSubmit} = useForm()

 const router = useRouter()

 const [error,setError] = useState("")

 const onSubmit = async(data)=>{

  try{

   await api.post("/auth/register",data)

   router.push("/login")

  }catch(err){

   setError(err.response?.data?.error)

  }

 }

 return(

  <div className="max-w-md mx-auto mt-20">

   <h1 className="text-2xl font-bold mb-4">
   Register
   </h1>

   <ErrorBox message={error}/>

   <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

    <input {...register("name")} placeholder="Name" className="border p-2 w-full"/>

    <input {...register("email")} placeholder="Email" className="border p-2 w-full"/>

    <input {...register("password")} type="password" placeholder="Password" className="border p-2 w-full"/>

    <button className="bg-green-600 text-white p-2 w-full">
     Register
    </button>

   </form>

  </div>

 )
}