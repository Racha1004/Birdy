const express = require('express');
const bodyParser = require('body-parser');

///require('./config/db');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const path = require('path');
const envPath = path.resolve(__dirname, 'config/.env');
dotenv.config({ path: envPath });

const userRoutes = require('./routes/user.router');
const postRoutes = require('./routes/post.router');


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connexion réussie à la base de données');
    // Code à exécuter après la connexion réussie
  })
  .catch((error) => {
    console.log('Erreur lors de la connexion à la base de données : ', error.message);
    // Code à exécuter en cas d'erreur de connexion
  });


//Middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes
app.use('/api/users',userRoutes);
app.use('/api/posts',postRoutes);

//serveur

app.listen(process.env.PORT,() => {
  console.log(`Listening on port ${process.env.PORT}`);
})



/* nom : birdy
  password : birdy
*/