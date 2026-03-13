let memory = {}

export function memoryTool(action,id,data){

 if(action === "store"){

  if(!memory[id]){
   memory[id] = []
  }

  memory[id].push(data)

 }

 if(action === "read"){
  return memory[id] || []
 }

 if(action === "list"){

  return Object.keys(memory).map(id => ({
   id,
   preview: memory[id][0]?.message,
   messages: memory[id]
  }))

 }

}