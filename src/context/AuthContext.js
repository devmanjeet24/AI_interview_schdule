"use client"

import {createContext,useState,useEffect} from "react"

export const AuthContext = createContext()

export function AuthProvider({children}){

 const [user,setUser] = useState(null)
 const [loading,setLoading] = useState(true)

 useEffect(()=>{

  const token = localStorage.getItem("accessToken")

  if(token){
   setUser({loggedIn:true})
  }

  setLoading(false)

 },[])

 const login = (data)=>{

  localStorage.setItem("accessToken",data.accessToken)
  localStorage.setItem("refreshToken",data.refreshToken)

  setUser({loggedIn:true})

 }

 const logout = ()=>{

  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")

  setUser(null)

 }

 return(
  <AuthContext.Provider
   value={{user,login,logout,loading}}
  >
   {children}
  </AuthContext.Provider>
 )

}