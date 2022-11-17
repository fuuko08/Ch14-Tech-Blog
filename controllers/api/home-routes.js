const router = require('express').Router();
const { Post, User } = require('../../models')

// TODO get all posts
router.get('/', async (req, res) => {
    try {
        // Retrieve all posts from db
        const dbPostData = await 
        // Serialize data retrieved

        // Respond with template to render along with date retrieved
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