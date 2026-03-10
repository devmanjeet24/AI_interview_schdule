import { v4 as uuid } from "uuid"

let events = []

export function getAllEvents(){
 return events
}

export function getEventById(id){
 return events.find(e => e.id === id)
}

export function createEvent(data){

 const event = {
  id: uuid(),
  time: data.time,
  createdAt: new Date()
 }

 events.push(event)

 return event
}

export function updateEvent(id,newTime){

 const event = events.find(e => e.id === id)

 if(!event) return null

 event.time = newTime

 return event
}

export function deleteEvent(id){

 const index = events.findIndex(e => e.id === id)

 if(index === -1) return false

 events.splice(index,1)

 return true
}