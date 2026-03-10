import {runGraph} from "@/graph/agentGraph"

export async function POST(req){

 const body = await req.json()

 const result = await runGraph(body.message)

 return Response.json(result)

}