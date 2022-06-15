const router = require('express').Router();
const {publicPosts, privatePosts} = require('../db.js')
const checkAuth = require('../middleware/checkAuth')
router.get('/', (req, res)=> {
    res.json(publicPosts);
})

router.get('/',checkAuth , (req, res)=> {
    res.json(privatePosts)
})

module.exports = router;