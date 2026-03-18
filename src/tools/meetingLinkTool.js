import { google } from "googleapis"
import { connectDB } from "@/lib/db"
import User from "@/models/User"

export async function createMeetingLink(){

 try{

  await connectDB()

  const user = await User.findOne()

  if(!user || !user.googleTokens){
   throw new Error("Google not connected")
  }

  const client = new google.auth.OAuth2(
   process.env.GOOGLE_CLIENT_ID,
   process.env.GOOGLE_CLIENT_SECRET,
   process.env.GOOGLE_REDIRECT_URI
  )

  client.setCredentials(user.googleTokens)

  const calendar = google.calendar({
   version:"v3",
   auth:client
  })

  const event = await calendar.events.insert({
   calendarId:"primary",
   conferenceDataVersion:1,
   requestBody:{
    summary:"Interview Meeting",
    start:{
     dateTime:new Date().toISOString()
    },
    end:{
     dateTime:new Date(Date.now()+30*60000).toISOString()
    },
    conferenceData:{
     createRequest:{
      requestId:Math.random().toString(36).substring(2,10),
      conferenceSolutionKey:{
       type:"hangoutsMeet"
      }
     }
    }
   }
  })

  return event.data.hangoutLink

 }catch(err){

  console.error("Google Meet error:",err)

  return null // ❗ fallback (important)

 }

}