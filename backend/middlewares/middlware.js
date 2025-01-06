import User from "../models/user.js"
import { verifyToken } from "../utills/auth.js"

export function checkUserLoggedin(req,res,next){
    const cookie = req.cookies.token
    
   
    if(!cookie){
        res.status(404).json({error:"Not loggedin"})
    }else{
        try {
            const getId = verifyToken(cookie)
            const verifier = User.findById(getId)
            if(verifier){
                next()
            }else{
                res.status(404).json({error:"User not found"})
            }

        } catch (error) {
            res.status(404).json({error:"Session Expired"})
        }
    }
}