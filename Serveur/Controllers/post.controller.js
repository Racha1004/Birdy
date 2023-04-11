
const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID  = require('mongoose').Types.ObjectId;
//const { ObjectID } = require('mongodb');

// si on a un await dans une fonction, il faut que la fonction soit async
// Retrieve and return all posts from the database.
module.exports.getPost = async (req, res) => {
    try {
        const posts = await PostModel.find().sort({createdAt: -1}).populate("posterId", "pseudo");
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Create and Save a new Post
module.exports.createPost = async (req, res) => {
    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        //picture: req.body.picture,
        video: req.body.video,
        likers: [],
        comments: []
    });
    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

};

// Find a single post with a postId
module.exports.getPostById = async (req, res) => {

    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknow : " + req.params.id);

    try {
        const post = await PostModel.findById(req.params.id).populate("posterId", "pseudo");
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    
}

// Update a post identified by the postId in the request
module.exports.updatePost = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknow : " + req.params.id);
    
    const updatedRecord = {
        message: req.body.message
    };

    try {
        const result = await PostModel.findByIdAndUpdate(req.params.id, { $set: updatedRecord }, { new: true });
        res.send(result);
    } catch (err) {
        console.log("Update error : " + err);
        res.status(500).send("Update error");
    }
}

// Delete a post with the specified postId in the request
module.exports.deletePost = async (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknow : " + req.params.id);

    try { 
        await PostModel.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: "Successfully deleted." });

    }
    catch (err) {
        console.log("Delete error : " + err);
        res.status(500).send("Delete error");
    }     
}

// Like a post
module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      const updatedPost = await PostModel.findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: { likers: req.body.id },
        },
        { new: true }
      );
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.body.id,
        {
          $addToSet: { likes: req.params.id },
        },
        { new: true }
      );
      res.send({ updatedPost, updatedUser });
    } catch (err) {
      return res.status(400).send(err);
    }
  };
  
    // Unlike a post
module.exports.unlikePost = async (req, res) => {
    try {
          if (!ObjectID.isValid(req.params.id)) {
            return res.status(400).send("Invalid post ID");
          }
          if (!ObjectID.isValid(req.body.id)) {
            return res.status(400).send("Invalid user ID");
          }
      
          const post = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
              $pull: { likers: req.body.id },
            },
            { new: true }
          );
          if (!post) {
            return res.status(404).send("Post not found");
          }
      
          const user = await UserModel.findByIdAndUpdate(
            req.body.id,
            {
              $pull: { likes: req.params.id },
            },
            { new: true }
        );
        if (!user) {
            return res.status(404).send("User not found");
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).send(err.message);
    }
};
      
// Comment a post
module.exports.commentPost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
        const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
            $push: {
                comments: {
                commenterId: req.body.commenterId,
                commenterPseudo: req.body.commenterPseudo,
                text: req.body.text,
                timestamp: new Date().getTime(),
                },
            },
            },
            { new: true }
        );
        return res.status(201).json(updatedPost);
    } catch (err) {
        return res.status(400).send(err);
    }

}   

// Edit a comment
module.exports.editCommentPost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
    try {
      const post = await PostModel.findById(req.params.id);
      if (!post) return res.status(404).send("Post not found");
      
      const comment = post.comments.find((c) => c._id.equals(req.body.commentId));
      if (!comment) return res.status(404).send("Comment not found");
      comment.text = req.body.text;
      
      await post.save();
      res.status(200).send(post);
    } catch (err) {
      return res.status(400).send(err);
    }
  }
  
// Delete a comment
module.exports.deleteCommentPost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);

    try{
        const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            {
            $pull: {
                comments: {
                _id: req.body.commentId,
                },
            },
            },
            { new: true }
        );
        return res.status(201).json(updatedPost);

    } catch (err){
        return res.status(400).send(err);
    }

    
}