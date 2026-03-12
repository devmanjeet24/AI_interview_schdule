import { intentAgent } from "@/agents/intentAgent"
import { availabilityAgent } from "@/agents/availabilityAgent"
import { schedulingAgent } from "@/agents/schedulingAgent"

import {
 getState,
 updateState,
 clearState
} from "@/tools/schedulingMemory"

export async function runGraph(message,userId="default"){

 const state = getState(userId)

 // STEP 1: ask name

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

 // STEP 2: ask email

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

 // STEP 3: ask interview type

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

 // detect intent

 const intent = await intentAgent(message)

 // start scheduling

 if(intent === "schedule"){

  updateState(userId,{ step:"awaiting_name" })

  return{

   agent:"Assistant",

   message:"Sure! Who is the interview for? Please provide the candidate name."

  }

 }

 return{

  agent:"Assistant",

  message:"I can help schedule interviews. Try saying 'Schedule an interview'."

 }

}