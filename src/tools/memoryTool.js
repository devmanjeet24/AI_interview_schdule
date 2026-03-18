import fs from "fs"
import path from "path"

const FILE_PATH = path.join(process.cwd(), "memory.json")

// load memory from file
function loadMemory(){
 try{
  if(fs.existsSync(FILE_PATH)){
   const data = fs.readFileSync(FILE_PATH)
   return JSON.parse(data)
  }
  return {}
 }catch{
  return {}
 }
}

// save memory to file
function saveMemory(memory){
 fs.writeFileSync(FILE_PATH, JSON.stringify(memory, null, 2))
}

export function memoryTool(action,id,data){

 let memory = loadMemory()

 if(action === "store"){

  if(!memory[id]){
   memory[id] = []
  }

  memory[id].push(data)

  saveMemory(memory)
 }

 if(action === "read"){
  return memory[id] || []
 }

 if(action === "list"){

  return Object.keys(memory).map(id => ({

   id,

   preview: memory[id]?.[memory[id].length - 1]?.message || "",

   messages: memory[id]

  }))

 }

}