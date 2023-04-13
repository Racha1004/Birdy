const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    
    /*userId : {
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
    },*/
        posterId: {
        type : String,
        required: true
    },
    message: {
        type: String,
        maxlength: 500,
        trim : true
    },
    picture: {
        type: String,
        default: ''
    },
    video: {
        type: String,
        default: ''
    },
    likers: {
        type: [String],
        default : [],
    },
    comments: {
        type: [
        {
            commenterId: String,
            commenterPseudo: String,
            text: String,
            timestamp: Number
        }
      ],
        required : true
    }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("post", PostSchema);
 
