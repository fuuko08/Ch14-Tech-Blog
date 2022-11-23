const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// TODO get all posts
router.get('/', async (req, res) => {
    try {
        // Retrieve all posts from db
        const dbPostData = await Post.findAll({ 
            include: [User]
        })
        // Serialize data retrieved
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        console.log(posts)
        // Respond with template to render along with date retrieved
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err)
    }
});

// TODO get one post
router.get('/post/:id', withAuth, async (req, res) => {
    try{
        const dbPostData = await Post.findOne({
            where: {id: req.params.id},
            include: [
                User, 
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });
        if (dbPostData) {
            const posts = dbPostData.get({ plain: true });
            console.log(posts);
            res.render('onepost', { posts, loggedIn: req.session.loggedIn })  
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }   
});

//TODO login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

//TODO signup
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signup');
});

module.exports = router;