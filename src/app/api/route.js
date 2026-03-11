export async function GET() {
    return Response.json(
        {
            message: "API is running",
            endpoints: [
                "/api/auth/register",
                "/api/auth/login",
                "/api/chat",
                "/api/calendar"
            ]
        }
    )
}