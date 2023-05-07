const router = require('express').Router();
const postController = require('../controllers/post.controller');

router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

router.get('/', postController.getPost);
router.get('/:id', postController.getPostById);
router.get('/profile/:username', postController.getAllUsersPosts);
router.get("/feed/all/:userId", postController.getTimeLinePosts);

router.patch('/like-post/:id', postController.likePost);
router.patch('/:id/like', postController.likepost);
router.patch('/unlike-post/:id', postController.unlikePost);

router.get('/search/:search', postController.searchPosts);
router.get('/profile/search/:username/:search', postController.searchProfilePosts);
router.get("/feed/all/search/:userId/:search", postController.searchPostsFollowingOnly);
router.get("/feed/search/:pseudo",postController.searchPostsByPseudo);
router.get("/feed/search/:userId/:pseudo",postController.searchPostsFollowingOnlyByPseudo)

router.post("/retweet/:id",postController.retweet);

// Comment a post
router.patch('/comment-post/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.patch('/delete-comment-post/:id', postController.deleteCommentPost);


module.exports = router;