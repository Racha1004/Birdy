const router = require('express').Router();



const authController = require('../Controllers/auth.controller');
const userController = require('../Controllers/user.controller');

//auth
router.post("/register", authController.signUp);

//user display: block
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);

router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);


router.get("/",(req,res)=>{
    res.send("Hey you");
})


module.exports = router;