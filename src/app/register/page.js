"use client"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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

  <div className="flex items-center justify-center min-h-screen bg-gray-50">

   <Card className="w-full max-w-md shadow-lg">

    <CardHeader>

     <CardTitle className="text-2xl text-center">
      Create Account
     </CardTitle>

    </CardHeader>

    <CardContent>

     <ErrorBox message={error}/>

     <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
     >

      {/* Name */}

      <div>

       <Input
        placeholder="Full Name"
        {...register("name",{required:"Name is required"})}
       />

       {errors.name && (
        <p className="text-sm text-red-500 mt-1">
         {errors.name.message}
        </p>
       )}

      </div>

      {/* Email */}

      <div>

       <Input
        type="email"
        placeholder="Email"
        {...register("email",{required:"Email is required"})}
       />

       {errors.email && (
        <p className="text-sm text-red-500 mt-1">
         {errors.email.message}
        </p>
       )}

      </div>

      {/* Password */}

      <div>

       <Input
        type="password"
        placeholder="Password"
        {...register("password",{required:"Password is required"})}
       />

       {errors.password && (
        <p className="text-sm text-red-500 mt-1">
         {errors.password.message}
        </p>
       )}

      </div>

      {/* Button */}

      <Button
       type="submit"
       className="w-full"
       disabled={loading}
      >

       {loading ? "Creating account..." : "Register"}

      </Button>

     </form>

    </CardContent>

   </Card>

  </div>

 )
}