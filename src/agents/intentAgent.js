import {askLLM} from "@/lib/groq"

export async function intentAgent(message){

 const prompt=`
Detect intent:

schedule
reschedule
cancel
inquiry

Message:
${message}

Return intent only
`

 return await askLLM(prompt)

}