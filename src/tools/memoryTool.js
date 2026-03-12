let memory = {}

export function memoryTool(action,id,data){

     console.log("Memory action:",action)
 console.log("Memory id:",id)

 if(action==="store"){

  memory[id]=[
   ...(memory[id]||[]),
   data
  ]

  console.log("Stored:",memory[id])

 }

 if(action==="read"){

     console.log("Read:",memory[id])

  return memory[id] || []

 }

}