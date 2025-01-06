import {Router} from "express"
import { accessDashboard, login, logOut, resgisterUser, verifyUser } from "../controllers/controller.js"
import { checkUserLoggedin } from "../middlewares/middlware.js"

const router = Router()

router.post("/register",resgisterUser)
router.post("/login",login)
router.get("/verify/:token",verifyUser)
router.use(checkUserLoggedin)
router.get("/dashboard",accessDashboard)
router.delete("/logout",logOut)
export default router