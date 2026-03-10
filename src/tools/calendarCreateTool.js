import {v4 as uuid} from "uuid"

let events=[]

export function calendarCreateTool(data){

 const event={
  id:uuid(),
  ...data
 }

 events.push(event)

 return event

}