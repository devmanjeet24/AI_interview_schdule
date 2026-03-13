import { createEvent } from "@/tools/calendarStore"
import { removeSlot } from "@/tools/calendarReadTool"
import { createMeetingLink } from "@/tools/meetingLinkTool"

export async function schedulingAgent(data){

 const meetingLink = createMeetingLink()

 const event = await createEvent({
  ...data,
  meetingLink
 })

 // remove booked slot
 removeSlot(data.time)

 return event

}