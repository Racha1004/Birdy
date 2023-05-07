const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//user display: block
router.get("/AllUsers", userController.getAllUsers);
router.get("/", userController.userInfo);

// search user
router.get("/search/:search", userController.searchUser);
router.put("/profileViews/:id", userController.incrementProfileViews);

router.get("/profileViews/:id", userController.getNbrViews);

router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

router.get("/followings/:id", userController.getFollowings);
router.get("/followers/:id", userController.getFollowers);


module.exports = router;