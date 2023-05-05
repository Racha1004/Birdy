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
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id)

    try {
        const update ={};
        if(req.body.profilePicture !== "" ){
            update.profilePicture =req.body.profilePicture;
        }
        if(req.body.coverPicture !== "" ){
            update.coverPicture =req.body.coverPicture;
        }
        if(req.body.bio !== "" ){
            update.bio =req.body.bio;
        }
        const updatedUser = await UserModel.findOneAndUpdate(
            {_id: req.params.id },
            update,
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

module.exports.getFollowings = async (req, res) => {
    try{
        const user = await UserModel.findById(req.params.id).select('-password');
        const followings = await Promise.all(
            user.following.map((friendId)=>{
                return  UserModel.findById(friendId).select('-password');
            })
        );
        let followingList = [];
        followings.map((friend)=>{
            const {_id,pseudo,profilePicture} = friend;
            followingList.push( {_id,pseudo,profilePicture});
        });

        res.status(200).json(followingList);

    }catch(error){
        res.status(500).json(error);
    }

}
module.exports.getFollowers = async (req, res) => {
    try{
        const user = await UserModel.findById(req.params.id).select('-password');
        const followerss = await Promise.all(
            user.followers.map((friendId)=>{
                return  UserModel.findById(friendId).select('-password');
            })
        );
        let followersList = [];
        followerss.map((friend)=>{
            const {_id,pseudo,profilePicture} = friend;
            followersList.push( {_id,pseudo,profilePicture});
        });
        res.status(200).json(followersList);
    }catch(error){
        res.status(500).json(error);
    }
}
module.exports.searchUser = async (req, res) => {
    try {
      const keyword = req.params.search;
      const users = await UserModel.find({ pseudo: { $regex: keyword, $options: "i" } }).select('pseudo');
  
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
/*
module.exports.incrementProfileViews = async (req, res) => {
    try {
        const viewerId = req.body.viewerId;
        const userId = req.params.id;
        
        if (viewerId === userId) {
            // Ne pas incrémenter le champ si l'utilisateur consulte son propre profil
            const user = await UserModel.findById(userId);
            return res.status(200).json(user);
        }
        
        const user = await UserModel.findByIdAndUpdate(
            userId,
            { $inc: { profileViews: 1 } },
            { new: true }
        );

        if (!user) {
            return res.status(404).send("Utilisateur introuvable");
        }

        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).send(err.message);
    }
};
*/
module.exports.incrementProfileViews = async (req, res) => {

    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id)

    try {
        const update ={
            profileViews : req.body.profileViews
        };
        
        const updatedUser = await UserModel.findOneAndUpdate(
            {_id: req.params.id },
            update,
            {new: true, upsert: true, setDefaultsOnInsert: true} //options to return the updated user, param a mettre obligatoirement 
        );
        res.send(updatedUser);
    } catch(err) {
        console.log('ID inconnu : ' + err);
        return res.status(500).json({message : err});
    }
}
module.exports.getNbrViews = async (req, res) => {
    try {
      const currentUser = await UserModel.findOne({pseudo: req.params.id});
      console.log(req.params.id);
      if (!currentUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.status(200).json(currentUser.profileViews);
    } catch(error) {
      res.status(500).json(err);
    }
  };
  