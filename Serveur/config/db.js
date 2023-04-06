 
const mongoose = require('mongoose');

mongoose.connect ("mongodb://localhost:27017/Birdy", 
    { useNewUrlParser: true, 
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to mongoDB", err));