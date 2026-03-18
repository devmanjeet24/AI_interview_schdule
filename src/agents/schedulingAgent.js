// import { createEvent } from "@/tools/calendarStore"
// import { removeSlot } from "@/tools/calendarReadTool"
// import { createMeetingLink } from "@/tools/meetingLinkTool"

// export async function schedulingAgent(data){

//  const meetingLink = createMeetingLink()

//  const event = await createEvent({
//   ...data,
//   meetingLink
//  })

//  // remove booked slot
//  removeSlot(data.time)

//  return event

// }


import { createEvent } from "@/tools/calendarStore"
import { removeSlot } from "@/tools/calendarReadTool"
import { createMeetingLink } from "@/tools/meetingLinkTool" // ✅ ADD THIS

export async function schedulingAgent(data){

 const meetingLink = await createMeetingLink() // already correct

 const event = await createEvent({
  ...data,
  meetingLink
 })

 removeSlot(data.time)

 return event

}