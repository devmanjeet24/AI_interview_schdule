import mongoose from "mongoose"

const EventSchema = new mongoose.Schema({

 time:{
  type:String,
  required:true
 },

 createdAt:{
  type:Date,
  default:Date.now
 }

})

export default mongoose.models.Event ||
 mongoose.model("Event",EventSchema)