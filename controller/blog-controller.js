import Blog from "../model/Blog.js";
import User from "../model/User.js";
import mongoose from "mongoose";

export const getAllBlogs = async(req,res,next) => {
    let blogs;
    try {
        blogs=await Blog.find();
        
    } catch (err) {
        return console.log(err);
    }
    if(!blogs){
        return res.status(404).json({message: "No Blogs Found "})
    }
    return res.status(200).json({blogs})
}

export const addBlog = async(req,res,next) => {
    const {title,description,image,user} = req.body;

    let existingUser;

    try {
        existingUser = await User.findById(user)
        
    } catch (err) {
        console.log(err);
        
    }
    if(!existingUser){
        return res.status(400).json({message: "Unable to find the user from this ID"})
    }

    const blog = new Blog({
        title: title,
        description: description,
        image: image,
        user: user
    
    });
    
    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await blog.save({session})
        existingUser.blogs.push(blog)
        await existingUser.save({session})
        await session.commitTransaction() 
    }
    catch(err){
        return console.log(err);
        return res.status(500).json({message: err}) 
    }
    
    return res.status(200).json({blog})
}

export const updateBlog = async(req,res,next) => {
    const {title,description} = req.body
    const blogId = req.params.id
    let blog
    try {
        blog = await Blog.findByIdAndUpdate(blogId,{
            title: title,
            description: description
        })
    } catch (err) {
        return console.log(err);
        
    }
    if (!blog) {
        return res.status(500).json({message: "Unable to update server"})
    }
    return res.status(200).json({blog})
}

export const getById = async(req,res,next) => {
    const id = req.params.id;
    let blogs;
    try {
        blogs = await Blog.findById(id)
        
    } catch (err) {
        return console.log(err);
    }
    if(!blogs) {
        return res.status(500).json({message: "Cannot find the blog"})
    }
    return res.status(200).json({blogs})

} 

export const deleteBlog = async(req,res,next) => {
    const blogId = req.params.id
    let blog
    try {
        blog = await Blog.findByIdAndDelete(blogId).populate('user')
        await blog.user.blogs.pull(blog)
        await blog.user.save()
    } catch (err) {
        return res.status(err)
    }
    if(!blog){
        return res.status(500).json({message: "Unable to delete the Blog "})
    }
    return res.status(200).json({message: "Blog deleted succesfully"})
}

export const userBlogs = async(req,res,next) => {
    const userId = req.params.id;
    let blogs;
    try {
        blogs = await User.findById(userId).populate('blogs');
    } catch (err) {
        return console.log(err);
    
    }
    if(!blogs){
        return res.status(401).json({message: 'User Id is incorrect'});
    
    }
    return res.status(200).json({meassage: blogs})
}