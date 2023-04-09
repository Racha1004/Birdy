const router = require("express").Router();
const Post = require("../models/post.model");
const User = require("../models/user.model");

//Create a post

router.post("/", async(req,res)=>{
    const newPost =  new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(error){
        res.status(500).json(error);
    }
})
//Update a post
router.put("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("The post has been updated");
        }else{
            res.status(403).json("You cas update only your post");
        }
    }catch(error){
        res.status(500).json(error);
    }
})
//Delete a post
router.delete("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne({$set:req.body});
            res.status(200).json("The post has been deleted");
        }else{
            res.status(403).json("You cas delete only your post");
        }
    }catch(error){
        res.status(500).json(error);
    }
})
//Like a post
router.put("/:id/like",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push : {likes:req.body.userId}});
            res.status(200).json("The post has been liked");
        }else{
            await post.updateOne({$pull : {likes:req.body.userId}});
            res.status(200).json("The post has been disliked");
        }
    }catch(error){
        res.status(500).json(error);
    }
})
// Get  post
router.get("/:id",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(error){
        res.status(500).json(error);
    }
})
//Get timeline posts
router.get("/feed/all/:userId",async(req,res)=>{
    try{
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId : currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId)=>{
                return Post.find({userId:friendId});
            })
        );
        console.log(currentUser);
        res.status(200).json(userPosts.concat(...friendPosts));
    }catch(error){
        res.status(500).json(error);
    }
})
module.exports = router;