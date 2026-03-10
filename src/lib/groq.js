import Groq from "groq-sdk"

const groq = new Groq({
 apiKey:process.env.GROQ_API_KEY
})

export async function askLLM(prompt){

 const res = await groq.chat.completions.create({

  model:"llama3-8b-8192",

  messages:[
   {
    role:"user",
    content:prompt
   }
  ]

 })

 return res.choices[0].message.content

}