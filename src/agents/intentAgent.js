// import {askLLM} from "@/lib/groq"

// export async function intentAgent(message){

//  const prompt=`
// Detect intent:

// schedule
// reschedule
// cancel
// inquiry

// Message:
// ${message}

// Return intent only
// `

//  return await askLLM(prompt)

// }


import { askLLM } from "@/lib/groq"

export async function intentAgent(message){

 const prompt = `
You are an intent classifier for an interview scheduling AI assistant.

Possible intents:

schedule
reschedule
cancel
availability
inquiry

Examples:

"book interview tomorrow" -> schedule
"schedule interview" -> schedule
"change interview time" -> reschedule
"move interview" -> reschedule
"cancel my interview" -> cancel
"delete interview" -> cancel
"check availability" -> availability
"available slots?" -> availability
"hello" -> inquiry

Return ONLY the intent word.

Message:
${message}
`

 const result = await askLLM(prompt)

 return result.trim().toLowerCase()

}