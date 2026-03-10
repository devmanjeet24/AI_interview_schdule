import Link from "next/link"

export default function Dashboard(){

 return(

  <div>

   <h1>Dashboard</h1>

   <Link href="/chatbot">
    Chatbot
   </Link>

   <br/>

   <Link href="/calendar">
    Calendar
   </Link>

  </div>

 )

}