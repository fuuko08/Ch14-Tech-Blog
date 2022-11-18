const router = require('express').Router();
const { Post, User } = require('../models')

// TODO get all posts
router.get('/', async (req, res) => {
    try {
        // Retrieve all posts from db
        const dbPostData = await Post.findAll({ 
            include: [User]
        })
        // Serialize data retrieved
        const posts = dbPostData.map(post => post.get({ plain: true }))
        console.log(posts)
        // Respond with template to render along with date retrieved
        res.render('homepage', { posts })
    } catch (err) {
        res.status(500).json(err)
    }
})

// TODO get one post
router.get('/post/:id', async (req, res) => {
    res.send(`Render 1 post with id ${req.params.id}`)
})

//TODO login
router.get('/login', async (req, res) => {
    res.send('Render login view.')
})

//TODO signup
router.get('/signup', async (req, res) => {
    res.send('Render signup view.');
})

module.exports = router