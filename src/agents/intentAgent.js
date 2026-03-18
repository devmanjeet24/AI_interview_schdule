


// import { askLLM } from "@/lib/groq"

// export async function intentAgent(message){

//  const prompt = `
// You are an intent classifier for an interview scheduling AI assistant.

// Possible intents:

// schedule
// reschedule
// cancel
// availability
// inquiry

// Examples:

// "book interview tomorrow" -> schedule
// "schedule interview" -> schedule
// "change interview time" -> reschedule
// "move interview" -> reschedule
// "cancel my interview" -> cancel
// "delete interview" -> cancel
// "check availability" -> availability
// "available slots?" -> availability
// "hello" -> inquiry

// Return ONLY the intent word.

// Message:
// ${message}
// `

//  const result = await askLLM(prompt)

//  return result.trim().toLowerCase()

// }



import { askLLM } from "@/lib/groq"

export async function intentAgent(message){

 const prompt = `
You are an intent classifier for an interview scheduling AI assistant.

Strict rules:
- Return ONLY one word from below
- Do NOT add explanation

Possible intents:

schedule
reschedule
cancel
availability
inquiry

If message is unrelated to scheduling, return: inquiry

Message:
${message}
`

 try{

  const result = await askLLM(prompt)

  const intent = result.trim().toLowerCase()

  const allowed = ["schedule","reschedule","cancel","availability","inquiry"]

  if(!allowed.includes(intent)){
   return "inquiry"
  }

  return intent

 }catch(err){

  return "inquiry"

 }

}