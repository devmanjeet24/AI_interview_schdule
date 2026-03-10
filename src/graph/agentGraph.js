import {intentAgent} from "@/agents/intentAgent"
import {availabilityAgent} from "@/agents/availabilityAgent"
import {schedulingAgent} from "@/agents/schedulingAgent"

export async function runGraph(message){

 const intent = await intentAgent(message)

 if(intent.includes("schedule")){

  const slots = availabilityAgent()

  const event = schedulingAgent(slots[0])

  return {
   agent:"Scheduling Agent",
   event
  }

 }

 return {
  agent:"Conversation Agent",
  reply:"Please provide preferred time"
 }

}