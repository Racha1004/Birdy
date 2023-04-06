const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const postSchema = new mongoose.Schema(
  {
        userId : {
            type: String,
            required :true,
        },
        description : {
            type:String,
            max : 500,
        },
        image:{
            type:String,
        },
        likes: {
        type:Array,
        default:[],
        }
  },
  {
    timestamps: true
  }
);




const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;
