let memory = {}

export function memoryTool(action,id,data){

 if(action==="store"){

  memory[id]=[
   ...(memory[id]||[]),
   data
  ]

 }

 if(action==="read"){

  return memory[id] || []

 }

}