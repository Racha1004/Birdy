const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const {uploadErrors} = require("../utils/errors.utils");

const filePath = '/../../Client/public/uploads/bird.png'; // Remplacez ceci par le chemin d'accès réel de votre fichier

if (fs.existsSync(filePath)) {
  console.log('Le fichier existe');
} else {
  console.log('Le fichier n\'existe pas');
}

module.exports.uploadProfilPic = async (req, res) => {
    try{
        if(req.file.detectedMimeType !== "image/jpg" && req.file.detectedMimeType !== "image/png" && req.file.detectedMimeType !== "image/jpeg"){
            throw Error("invalid file");
        }
        if(req.file.size > 500000){
            throw Error("max size");
        }
    } catch (err) {
        const errors = uploadErrors(err);
        return res.status(201).json({ errors });
        //return res.status(201).json({ err });
    }

    const fileName = req.body.name + ".jpg";

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/.../Client/public/uploads/profil/${fileName}`
        )
    );

}