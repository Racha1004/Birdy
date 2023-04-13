 
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connexion réussie à la base de données');
    // Code à exécuter après la connexion réussie
  })
  .catch((error) => {
    console.log('Erreur lors de la connexion à la base de données : ', error.message);
    // Code à exécuter en cas d'erreur de connexion
  });
