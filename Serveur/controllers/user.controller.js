const UserModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password'); //
    res.status(200).json(users);
}

module.exports.userInfo = async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try{
        const user = userId 
        ? await UserModel.findById(userId).select('-password')
        : await UserModel.findOne({ pseudo: username }).select('-password');;

        res.send(user);
    } catch(err) {
        return res.status(400).send('ID / username inconnu');
    }
}

module.exports.updateUser = async (req, res) => {
    console.log(req.params.id);
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id)

    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            {_id: req.params.id}, //condition to find the user to update 
            {
                $set: {
                    bio: req.body.bio
                }
            },
            {new: true, upsert: true, setDefaultsOnInsert: true} //options to return the updated user, param a mettre obligatoirement 
        );
        res.send(updatedUser);
    } catch(err) {
        console.log('ID inconnu : ' + err);
        return res.status(500).json({message : err});
    }
};

module.exports.deleteUser = async (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id)

    try {
        await UserModel.deleteOne({_id: req.params.id}).exec();        
        res.status(200).json({message: "Successfully deleted."});

    } catch(err) {
        //console.log('ID inconnu : ' + err);
        return res.status(500).json({message : err});
    }
}

module.exports.follow = async (req, res) => {
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToFollow)) {
      return res.status(400).send('ID inconnu : ' + req.params.id);
    }
  
    try {
      // Ajouter à la liste des abonnés
      const user = await UserModel.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { following: req.body.idToFollow } },
        { new: true, upsert: true }
      ).exec();
  
      // Ajouter à la liste des abonnements
      const followedUser = await UserModel.findByIdAndUpdate(
        req.body.idToFollow,
        { $addToSet: { followers: req.params.id } },
        { new: true, upsert: true }
      ).exec();
  
      return res.status(201).json({ user, followedUser });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
};

module.exports.unfollow = async (req, res) => {
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToUnFollow)) {
        return res.status(400).send('ID inconnu : ' + req.params.id);
    }
    
    try{
        // Retirer à la liste des abonnés
        const user = await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnFollow } },
            { new: true, upsert: true }
          ).exec();
      
          // Retirer à la liste des abonnements
          const unfollowedUser = await UserModel.findByIdAndUpdate(
            req.body.idToUnFollow,
            { $pull: { followers: req.params.id } },
            { new: true, upsert: true }
          ).exec();

          // Retourner les deux objets mis à jour
          return res.json({ user, unfollowedUser });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
