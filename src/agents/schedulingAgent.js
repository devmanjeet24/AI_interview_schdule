import { createEvent } from "@/tools/calendarStore"
import { createMeetingLink } from "@/tools/meetingLinkTool"

export async function schedulingAgent(data){

 const meetingLink = createMeetingLink()

 const event = await createEvent({

  ...data,
  meetingLink

 })

 return event

}