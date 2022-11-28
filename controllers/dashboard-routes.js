const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

//Dashboard shows all posts
router.get('/', withAuth, (req, res) => {
    Post.findAll({
      where: {
        userId: req.session.userId,
      },
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
      .then((dbPostData) => {
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true, username: req.session.username,});       
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//Click on "New Post" button
router.get('/new', (req, res) => {
    res.render('newpost', { username: req.session.username });
  });

//Click on the Post to edit it
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['id', 'content', 'postId', 'userId', 'created_at'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    })
      .then((dbPostData) => {
        if (!dbPostData) {
          res.status(404).json({ message: 'This id has no post.' });
          return;
        }
        const post = dbPostData.get({ plain: true });
        console.log('sending ' + req.session.username);
        res.render('editpost', { post, loggedIn: true, username: req.session.username });         
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;