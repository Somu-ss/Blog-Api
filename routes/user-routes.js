import express from 'express'
import { getAllUsers, loginUser, signupUser } from '../controller/user-controller.js'


const routes = express.Router()

routes.get("/",getAllUsers)

routes.post("/signup",signupUser)


routes.post("/login", loginUser)

export default routes;