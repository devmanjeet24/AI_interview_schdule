import { google } from "googleapis"
import { v4 as uuid } from "uuid"
import { getOAuthClient } from "@/lib/googleAuth"

export async function createMeetingLink(){

 try{

  const client = await getOAuthClient()

  const calendar = google.calendar({ version:"v3", auth: client })

  const start = new Date()
  const end = new Date(Date.now() + 30 * 60 * 1000)

  const event = await calendar.events.insert({
   calendarId: "primary",
   conferenceDataVersion: 1,
   requestBody: {
    summary: "Interview Meeting",
    start: { dateTime: start.toISOString() },
    end: { dateTime: end.toISOString() },
    conferenceData: {
     createRequest: {
      requestId: uuid()
     }
    }
   }
  })

  const meetLink =
   event.data.conferenceData?.entryPoints?.find(
    e => e.entryPointType === "video"
   )?.uri

  if(!meetLink){
   throw new Error("Meet link not generated")
  }

  return meetLink

 }catch(err){

  console.error("Google Meet error:",err)

  // ❌ THROW mat karo (chat break hota hai)
  return "Meeting link unavailable. Please reconnect Google."

 }

}