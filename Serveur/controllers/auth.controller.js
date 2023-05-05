const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
// importer SignUpErrors
const { signUpErrors,signInErrors }  = require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 days


const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};

module.exports.signUp = async(req, res) => {
   // console.log(req.body);

    const {username, email, password} = req.body;

    console.log("body,",req.body)
    try {
        console.log("pseudo",username);
        //const user = await UserModel.create({username, email, password});
        const user = await UserModel.create({pseudo : username, email : email, password : password});
        console.log("1");
        res.status(201).json({user : user._id});
        console.log("user created",user);
    } catch (error) {
        const errors = signUpErrors(error);
        console.log(errors);
        //res.status(500).json(error);
        res.status(500).send({ errors })
    }
}

module.exports.signIn = async(req, res) => {
    const {email, password} = req.body;

    try {
        const user = await UserModel.login(email, password);
        console.log("id",user._id);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge });
        res.status(200).json(user);
    } catch (error) {
        const errors = signInErrors(error);
        res.status(500).json({ errors })
    }
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 }); // supprimer le cookie jwt en le mettant à une durée de vie nulle
    res.redirect('/'); // rediriger l'utilisateur vers la page d'accueil
    console.log("logout");
    console.log(req.cookies);
}
  
//module.exports.signUpErrors = signUpErrors;
