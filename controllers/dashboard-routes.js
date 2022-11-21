const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

//Dashboard shows all posts
router.get('/', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            where: {"userId": req.session.userId},
            include: [User]
        });
        const posts = dbPostData.map((post) => post.get({ plain: true }));
    console.log(posts);
        res.render('all-posts', {
            layout: 'dashboard',
            posts,
        });
    } catch (err) {
        res.redirect('login');
    }
});

//Click on "New Post" button
router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {
        layout: 'dashboard',
    });
});

//Click on the Post
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id);
        if (dbPostData) {
            const post = dbPostData.get({ plain: true });
            console.log(post);
            res.render('edit-post', {
                layout: 'dashboard',
                post,
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.redirect('login');
    }
});

module.exports = router;