import { google } from "googleapis"
import fs from "fs"
import path from "path"

const TOKEN_PATH = path.join(process.cwd(), "google_tokens.json")

const oauth2Client = new google.auth.OAuth2(
 process.env.GOOGLE_CLIENT_ID,
 process.env.GOOGLE_CLIENT_SECRET,
 process.env.GOOGLE_REDIRECT_URI
)

// Generate consent URL
export function getAuthUrl(){
 return oauth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent", // 🔥 IMPORTANT (forces refresh_token)
  scope: ["https://www.googleapis.com/auth/calendar"]
 })
}

// Save tokens
export function saveTokens(tokens){
 fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens))
}

// Load tokens
export function loadTokens(){
 try{
  if(fs.existsSync(TOKEN_PATH)){
   const data = fs.readFileSync(TOKEN_PATH)
   return JSON.parse(data)
  }
  return null
 }catch{
  return null
 }
}

// 🔥 PRODUCTION READY CLIENT (AUTO REFRESH)
export async function getOAuthClient(){

 const client = oauth2Client

 const tokens = loadTokens()

 if(!tokens){
  throw new Error("Google not connected")
 }

 client.setCredentials(tokens)

 // 🔥 AUTO REFRESH TOKEN
 if(tokens.expiry_date && tokens.expiry_date <= Date.now()){

  const { credentials } = await client.refreshAccessToken()

  saveTokens({
   ...tokens,
   ...credentials
  })

  client.setCredentials({
   ...tokens,
   ...credentials
  })
 }

 return client
}