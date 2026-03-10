import Link from "next/link"

export default function Home(){

 return(

  <div>

   <h1>
   AI Interview Scheduler
   </h1>

   <Link href="/login">
   Login
   </Link>

   <br/>

   <Link href="/register">
   Register
   </Link>

  </div>

 )

}