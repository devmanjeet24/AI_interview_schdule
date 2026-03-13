let slots = generateSlots()

function generateSlots(){

 const result = []
 const now = new Date()

 for(let i=1;i<=7;i++){

  const day = new Date()
  day.setDate(now.getDate()+i)

  const date = day.toISOString().split("T")[0]

  result.push(`${date}T10:00`)
  result.push(`${date}T12:00`)
  result.push(`${date}T14:00`)

 }

 return result

}

export function calendarReadTool(){

 return slots

}

export function removeSlot(slot){

 slots = slots.filter(s => s !== slot)

}