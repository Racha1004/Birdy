const UserModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password'); //
    res.status(200).json(users);
}

module.exports.userInfo = async (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id)

    try {
        const user = await UserModel.findById(req.params.id).select('-password');
        res.send(user);
    } catch(err) {
        console.log('ID inconnu : ' + err);
    }
}

module.exports.updateUser = async (req, res) => {
    console.log(req.params.id);
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id)

    try {
        console.log("test1");
        const updatedUser = await UserModel.findOneAndUpdate(
            {_id: req.params.id}, //condition to find the user to update 
            {
                $set: {
                    bio: req.body.bio
                }
            },
            {new: true, upsert: true, setDefaultsOnInsert: true} //options to return the updated user, param a mettre obligatoirement 
        );
        console.log("test3");
        res.send(updatedUser);
    } catch(err) {
        console.log('ID inconnu : ' + err);
        return res.status(500).json({message : err});
    }
};


