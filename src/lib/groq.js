import Groq from "groq-sdk"

const groq = new Groq({
 apiKey:process.env.GROQ_API_KEY
})

export async function askLLM(prompt){

 try{

  const res = await groq.chat.completions.create({
   model:"llama-3.1-8b-instant",
   messages:[{role:"user",content:prompt}]
  })

  return res.choices[0].message.content

 }catch(err){

  console.error("Groq error:",err)

  return "AI service temporarily unavailable"

 }

}