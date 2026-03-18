import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({

 name:String,
 email:String,
 password:String,

  googleTokens:{
  access_token:String,
  refresh_token:String,
  scope:String,
  token_type:String,
  expiry_date:Number
 }

})

export default mongoose.models.User ||
mongoose.model("User",UserSchema)