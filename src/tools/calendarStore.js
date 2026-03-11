import { connectDB } from "@/lib/db"
import Event from "@/models/Event"

export async function getAllEvents(){

 await connectDB()

 const events = await Event.find().sort({createdAt:-1})

 return events

}

export async function getEventById(id){

 await connectDB()

 const event = await Event.findById(id)

 return event

}

export async function createEvent(data){

 await connectDB()

 const event = await Event.create({
  time:data.time
 })

 return event

}

export async function updateEvent(id,newTime){

 await connectDB()

 const event = await Event.findByIdAndUpdate(
  id,
  {time:newTime},
  {new:true}
 )

 return event

}

export async function deleteEvent(id){

 await connectDB()

 const event = await Event.findByIdAndDelete(id)

 return event

}