export function createMeetingLink(){

 const id = Math.random().toString(36).substring(2,10)

 return `https://meet.example.com/${id}`

}