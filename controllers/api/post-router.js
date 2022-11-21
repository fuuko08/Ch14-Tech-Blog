const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// create a new post
router.post('/', withAuth, async (req, res) => {
    const body = req.body;
    console.log(body);

    try {
        const newPost = await Post.create({ ...body, userId: req.session.userId });
        console.log("This is the new post", newPost);
        res.json(newPost);
    } catch (err) {
        console.log("Failed to post", err);
        res.status(500).json(err);
    }
});

// update the post
router.put('/:id', withAuth, async (req, res) => {
    try {
        console.log('This is the post body', req.body);
        const [affectedRows] = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete the post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const [affectedRows] = await Post.destroy ({
            where: {
                id: req.params.id,
            },
        });
        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;