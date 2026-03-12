import jwt from "jsonwebtoken"

const ACCESS_SECRET = process.env.JWT_SECRET
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET


// Access Token 
export function generateAccessToken(user) {
    return jwt.sign(
        { id: user._id, email: user.email },
        ACCESS_SECRET,
        { expiresIn: "15m" }
    )
}

// REFRESH TOKEN
export function generateRefreshToken(user) {
    return jwt.sign(
        { id: user._id },
        REFRESH_SECRET,
        { expiresIn: "7d" }
    )
}


// VERIFY ACCESS TOKEN
export function verifyAccessToken(token) {
    try {
        return jwt.verify(token, ACCESS_SECRET)
    } catch {
        return null
    }
}

// VERIFY REFRESH TOKEN
export function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, REFRESH_SECRET)
    } catch {
        return null
    }
}

// AUTH MIDDLEWARE
export function requireAuth(req) {

    const authHeader = req.headers.get("authorization")

    if (!authHeader) {
        return { error: "Authorization header missing" }
    }

    if (!authHeader.startsWith("Bearer ")) {
        return { error: "Invalid authorization format" }
    }

    const token = authHeader.split(" ")[1]

    const user = verifyAccessToken(token)

    if (!user) {
        return { error: "Invalid or expired token" }
    }

    return { user }

}