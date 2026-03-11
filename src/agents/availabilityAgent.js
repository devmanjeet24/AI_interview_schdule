import {calendarReadTool} from "@/tools/calendarReadTool"

export function availabilityAgent(){

 const slots = calendarReadTool()

 if(!slots || slots.length === 0){
  return {
   available:false
  }
 }

 return {
  available:true,
  slot:slots[0]
 }

}