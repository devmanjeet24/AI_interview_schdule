"use client"

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

export default function Login(){

 const router = useRouter()

 const {
  register,
  handleSubmit,
  formState:{errors,isSubmitting}
 } = useForm()

 async function onSubmit(data){

  const res = await fetch("/api/auth/login",{
   method:"POST",
   headers:{
    "Content-Type":"application/json"
   },
   body:JSON.stringify(data)
  })

  const result = await res.json()

  if(!res.ok){
   alert(result.error)
   return
  }

  localStorage.setItem("token",result.token)

  router.push("/dashboard")

 }

 return(

  <div className="flex flex-col items-center justify-center min-h-screen">

   <h1 className="text-2xl font-bold mb-5">
    Login
   </h1>

   <form
    onSubmit={handleSubmit(onSubmit)}
    className="flex flex-col gap-3 w-80"
   >

    <input
     placeholder="Email"
     className="border p-2"
     {...register("email",{
      required:"Email required"
     })}
    />

    {errors.email && (
     <p className="text-red-500 text-sm">
      {errors.email.message}
     </p>
    )}

    <input
     type="password"
     placeholder="Password"
     className="border p-2"
     {...register("password",{
      required:"Password required"
     })}
    />

    {errors.password && (
     <p className="text-red-500 text-sm">
      {errors.password.message}
     </p>
    )}

    <button
     disabled={isSubmitting}
     className="bg-green-500 text-white p-2"
    >
     {isSubmitting ? "Logging..." : "Login"}
    </button>

   </form>

  </div>

 )

}