const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxLength: 45
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      maxlength: 1024,
      minlength: 8
    },
    picture: {
      type: String,
      default: './uploads/profil/random-user.png'
    },
    bio: {
      type: String,
      maxlength: 1024
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'user'
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'user'
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'tweet'
    }
  },
  {
    timestamps: true
  }
);

//play function before save into display : block
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
