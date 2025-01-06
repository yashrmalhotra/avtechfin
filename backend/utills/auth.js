import jwt from "jsonwebtoken"

const secret = "ran123"
export function generateToken(user){
    return jwt.sign({
        id:user._id,
    },secret,{expiresIn:"180m"})
}
export function generateVerificationToken(id){
    return jwt.sign({
        id,
    },secret,{expiresIn:"10m"})
}
export function verifyToken(token){
    return jwt.verify(token,secret)
}