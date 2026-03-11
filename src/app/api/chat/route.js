import {runGraph} from "@/graph/agentGraph"
import {requireAuth} from "@/lib/authMiddleware"

export async function POST(req){

    const auth = requireAuth(req)

    if(auth.error){
        return Response.json(
            {
              error:auth.error
            }, {status:401}
        )
    }

 const body = await req.json()

 const result = await runGraph(body.message)

 return Response.json(result)

}