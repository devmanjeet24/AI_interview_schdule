import { google } from "googleapis"

let tokensStore = null // ✅ memory storage

const oauth2Client = new google.auth.OAuth2(
 process.env.GOOGLE_CLIENT_ID,
 process.env.GOOGLE_CLIENT_SECRET,
 process.env.GOOGLE_REDIRECT_URI
)

export function getAuthUrl(){
 return oauth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: ["https://www.googleapis.com/auth/calendar"]
 })
}

// ✅ SAVE TOKENS (memory)
export function saveTokens(tokens){
 tokensStore = tokens
}

// ✅ LOAD TOKENS
export function getOAuthClient(){

 if(!tokensStore){
  throw new Error("Google not connected")
 }

 oauth2Client.setCredentials(tokensStore)

 return oauth2Client
}