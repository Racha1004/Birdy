const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.router');
const postRoutes = require('./routes/post.router');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const multer = require('multer');
const path = require("path");

require('dotenv').config({path: './config/.env'});
require('./config/db');

const {checkUser,requireAuth} = require('./middleware/auth.middleware');
const app = express();

app.use("/Images", express.static(path.join(__dirname,"public/Images")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


//jwt
app.get('*',checkUser);
app.get('/jwtid',requireAuth,(req,res) => {
  res.status(200).send(res.locals.user._id);
})


const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,"public/Images");
  },
  filename: (req,file,cb)=>{
    console.log(req.body);
    cb(null,file.originalname);
  },
});
const upload = multer({storage});
app.post('/api/upload',upload.single("file"),(req,res)=>{
  try{
    console.log(req.body.name);
    return res.status(200).json("File uploaded succesfully");
  }catch(error){
    console.log(error);
  }
})
//routes
app.use('/api/user',userRoutes);
app.use('/api/post',postRoutes);
app.use(morgan("common"));

//serveur 
app.listen(process.env.PORT,() => {
  console.log(`Listening on port ${process.env.PORT}`);
})
