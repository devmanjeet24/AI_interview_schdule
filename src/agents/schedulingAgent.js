import { createEvent } from "@/tools/calendarStore"

export async function schedulingAgent(slot){

 const event = await createEvent({
  time: slot
 })

 return event

}