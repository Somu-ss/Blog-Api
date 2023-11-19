import express from "express";
import { addBlog, deleteBlog, getAllBlogs, getById, updateBlog, userBlogs } from "../controller/blog-controller.js";

const blogRoutes = express.Router()

blogRoutes.get('/', getAllBlogs)

blogRoutes.post('/add', addBlog)

blogRoutes.put('/update/:id',updateBlog)

blogRoutes.get('/:id', getById)

blogRoutes.delete('/delete/:id',deleteBlog)

blogRoutes.get('/user/:id',userBlogs)

export default blogRoutes;