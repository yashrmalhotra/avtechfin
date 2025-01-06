import User from "../models/user.js"
import { generateToken, generateVerificationToken, verifyToken } from "../utills/auth.js"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import "dotenv/config.js"
import e from "express"

const transPorter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})
export async function resgisterUser(req, res) {
    const { email, password } = req.body
    const hashPass = password && await bcrypt.hash(password, 10)

    await User.create({
        email,
        password: hashPass,
       
    }).then(async (result) => {
        const token = generateVerificationToken(result._id)
        const verificationURL = `http://localhost:5173/verify/${token}`
        const info = await transPorter.sendMail({
            from: "YASH <yashrmalhotra11@gmail.com>",
            to: email,
            subject: "Verification Email",
            html: `
        <p style="font-size:15px; font-weight:1000; color:black;">Please click on the link</p>
        <a href=${verificationURL}>
         <button style="font-weight:1000; font-size:18px; text-align:center; background-color:#87CEEB;">Verify</button>
       </a>
        `

        }, (error, emailSuccess) => {
            if (error) console.log(error)
            else console.log(emailSuccess)
        })

        res.json({ msg: "User created Successfully. Please check your email to verify" })
    }).catch(err => {
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map(error => error.message);
            res.status(422).json({ error: messages })
        } else if (err?.errorResponse?.code === 11000) {
            res.status(409).json({ error: "User already exist" })
        } else {
            res.status(500).json({ error: "Internal error" })
        }
    })

}

export async function login(req, res) {
    const { email, password } = req.body
    if (!email && !password) {
        res.status(401).json({ error: "Provide email and password" })
    } else if (!email) {
        res.status(401).json({ error: "Provide email" })
    } else if (!password) {
        res.status(401).json({ error: "Provide password" })
    }
    else {

        await User.findOne({
            email,

        }).then(async (result) => {

            const compare = await bcrypt.compare(password, result.password)
            if (compare) {
                if (result.isVerified) {
                    const user = await generateToken(result._id)
                    res.cookie("token", user, {
                        httpOnly: true,
                        sameSite: true,
                        path: "/"
                    })
                    res.status(200).json({ msg: "Logged in" })
                }else{
                    res.status(403).json({ error: "User not verified" })
                }
            } else {
                res.status(404).json({ error: "Invalid Email or Password" })
            }

        }).catch(err => {
            res.status(500).json({ error: "Internal server error" })
        })
    }


}
export function accessDashboard(req, res) {
    res.status(200).json({ msg: true })
}
export async function verifyUser(req, res) {
    const params = req.params.token
    try {
        const id = await verifyToken(params)
        const user = await User.findByIdAndUpdate(id.id,{
            $set:{
                isVerified:true
            }
        })
        console.log(user)
        res.json({ msg: user.email })
    } catch (error) {
        if (error.message === "jwt expired") {
            res.status(403).json({ error: "Token has expired" })
        }
        else {
            console.log(error)
            res.status(500).json({ error: "Internal error" })
        }
    }
}
export function logOut(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        path: "/"
    })
    res.send("logged out")
}