const router = require('express').Router();
const postController = require('../controllers/post.controller');

router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

router.get('/', postController.getPost);
router.get('/search/:search', postController.searchPosts);
router.get('/:id', postController.getPostById);
router.get('/profile/:username', postController.getAllUsersPosts);
router.patch('/like-post/:id', postController.likePost);
router.patch('/:id/like', postController.likepost);
router.patch('/unlike-post/:id', postController.unlikePost);
router.get("/feed/all/:userId", postController.getTimeLinePosts);

// Comment a post
router.patch('/comment-post/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.patch('/delete-comment-post/:id', postController.deleteCommentPost);


module.exports = router;