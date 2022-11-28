const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

// TODO get all posts
router.get('/', async (req, res) => {
    try {
        // Retrieve all posts from db
        const dbPostData = await Post.findAll({ 
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'content', 'postId', 'userId', 'created_at'],
                    include: {
                    model: User,
                    attributes: ['username'],
                    },
                },
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        })
        // Serialize data retrieved
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        console.log(posts)
        // Respond with template to render along with date retrieved
        res.render('homepage', { posts, loggedIn: req.session.loggedIn, username: req.session.username });
    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO get one post
router.get('/post/:id', async (req, res) => {
    try{
        const dbPostData = await Post.findOne({
            where: {id: req.params.id},
            attributes: ['id', 'content', 'title', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'content', 'postId', 'userId', 'created_at'],
                    include: {
                      model: User,
                      attributes: ['username'],
                    },
                  },
                  {
                    model: User,
                    attributes: ['username'],
                  },
            ],
        });
        if (dbPostData) {
            const post = dbPostData.get({ plain: true });
            console.log(post);
            res.render('onepost', { post, loggedIn: req.session.loggedIn, username: req.session.username, })  
        } else {
            res.status(404).json({ message: "This id has no post."});
            return;
        }
    } catch (err) {
        res.status(500).json(err);
    }   
});

// Get post's comments
router.get('/posts-comments', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'content', 'title', 'created_at'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    })
      .then((dbPostData) => {
        if (!dbPostData) {
          res.status(404).json({ message: 'This id has no post.' });
          return;
        }
        const post = dbPostData.get({ plain: true });
  
        res.render('posts-comments', {
          post,
          logged_in: req.session.logged_in,
          username: req.session.username,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//TODO login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

//TODO signup
router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;