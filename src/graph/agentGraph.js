import { intentAgent } from "@/agents/intentAgent"
import { availabilityAgent } from "@/agents/availabilityAgent"
import { schedulingAgent } from "@/agents/schedulingAgent"
import { askLLM } from "@/lib/groq"

import {
 getState,
 updateState,
 clearState
} from "@/tools/schedulingMemory"

export async function runGraph(message, userId){

 // ✅ IMPORTANT: NO random id
 if(!userId){
  throw new Error("userId (conversationId) is required")
 }

 const state = getState(userId)

 // ===============================
 // STEP FLOW (SCHEDULING)
 // ===============================

 if(state.step === "awaiting_name"){

  updateState(userId,{
   candidateName:message,
   step:"awaiting_email"
  })

  return{
   agent:"Assistant",
   message:`Great! Please provide ${message}'s email address.`
  }

 }

 if(state.step === "awaiting_email"){

  updateState(userId,{
   email:message,
   step:"awaiting_type"
  })

  return{
   agent:"Assistant",
   message:"What type of interview is this? (Technical / HR / Manager)"
  }

 }

 if(state.step === "awaiting_type"){

  const availability = await availabilityAgent()

  if(!availability.available){

   clearState(userId)

   return{
    agent:"Assistant",
    message:"Sorry, there are no available interview slots right now."
   }

  }

  const slot = availability.slot

  const event = await schedulingAgent({

   candidateName:state.candidateName,
   email:state.email,
   interviewType:message,
   interviewer:"HR",
   time:slot

  })

  clearState(userId)

  return{
   agent:"Assistant",
   message:`Perfect! The interview for ${event.candidateName} has been scheduled successfully.`,
   event
  }

 }

 // ===============================
 // INTENT DETECTION
 // ===============================

 const intent = await intentAgent(message)

 // ===============================
 // HANDLE INTENTS
 // ===============================

 if(intent === "schedule"){

  updateState(userId,{ step:"awaiting_name" })

  return{
   agent:"Assistant",
   message:"Sure! Who is the interview for? Please provide the candidate name."
  }

 }

 if(intent === "availability"){

  const availability = await availabilityAgent()

  if(!availability.available){
   return{
    agent:"Assistant",
    message:"Currently there are no available interview slots."
   }
  }

  return{
   agent:"Assistant",
   message:`Yes, slots are available. Example slot: ${availability.slot}`
  }

 }

 if(intent === "cancel"){
  return{
   agent:"Assistant",
   message:"To cancel an interview, please go to the calendar page and click cancel on the interview."
  }
 }

 if(intent === "reschedule"){
  return{
   agent:"Assistant",
   message:"To reschedule, please open your calendar and choose a new time."
  }
 }

 // ===============================
 // GENERAL AI RESPONSE
 // ===============================

 try{

  const response = await askLLM(`
You are a helpful AI assistant for an interview scheduling platform.

User message:
${message}

Respond conversationally and helpfully.
`)

  return{
   agent:"Assistant",
   message: response
  }

 }catch(err){

  return{
   agent:"Assistant",
   message:"I'm here to help with interview scheduling or any questions you have."
  }

 }

}