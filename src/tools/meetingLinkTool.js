import { v4 as uuid } from "uuid"

export function createMeetingLink(){

 const id = uuid().slice(0,8)

 return `https://meet.google.com/${id}`

}