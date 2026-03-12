import mongoose from "mongoose"

const EventSchema = new mongoose.Schema({

 candidateName:{
  type:String,
  required:true
 },

 email:{
  type:String,
  required:true
 },

 interviewer:{
  type:String,
  default:"HR"
 },

 interviewType:{
  type:String
 },

 meetingLink:{
  type:String
 },

 time:{
  type:String,
  required:true
 },

 status:{
  type:String,
  default:"scheduled"
 },

 createdAt:{
  type:Date,
  default:Date.now
 }

})

export default mongoose.models.Event ||
 mongoose.model("Event",EventSchema)