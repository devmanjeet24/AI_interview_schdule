
import { intentAgent } from "@/agents/intentAgent"
import { availabilityAgent } from "@/agents/availabilityAgent"
import { schedulingAgent } from "@/agents/schedulingAgent"

export async function runGraph(message){

  const intent = (await intentAgent(message))
  .trim()
  .toLowerCase()

 if(intent === "schedule"){ 

  const availability = await availabilityAgent()

  if(!availability.available){
   return {
    agent:"Availability Agent",
    message:"No slots available"
   }
  }

  const event = await schedulingAgent(availability.slot)

  return {
   agent:"Scheduling Agent",
   event
  }

 }

 return {message:"Unknown intent"}
}