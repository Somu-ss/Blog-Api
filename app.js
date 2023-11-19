import express from 'express'
import mongoose from 'mongoose'
import routes from '../Backend/routes/user-routes.js'
import blogRoutes from './routes/blog-routes.js'

const app = express()

const PORT = 5000

app.use(express.json())

app.use('/api/user',routes)
app.use('/api/blog', blogRoutes)

mongoose.connect("mongodb+srv://admin:KAgGUuPfB9dyNbqt@cluster.x434rdw.mongodb.net/Blog?retryWrites=true&w=majority")
.then(()=>app.listen(PORT))
.then(()=>console.log('Database Connected'))
.catch((err)=>console.log(err))


// Password -- KAgGUuPfB9dyNbqt