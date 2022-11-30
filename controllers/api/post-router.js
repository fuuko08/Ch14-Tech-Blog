const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        attributes: ['id', 'title', 'content', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
          { model: User, attributes: ['username'] },
          {
            model: Comment,
            attributes: [
              'id',
              'content',
              'postId',
              'userId',
              'created_at',
            ],
            include: { model: User, attributes: ['username'] },
          },
        ],
      });
      res.status(200).json(postData.reverse());
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.get('/:id', async (req, res) => {
    try {
      const postData = await Post.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'title', 'content', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
          { model: User, attributes: ['username'] },
          {
            model: Comment,
            attributes: [
              'id',
              'content',
              'postId',
              'userId',
              'created_at',
            ],
            include: { model: User, attributes: ['username'] },
          },
        ],
      });
      if (!postData) {
        res.status(404).json({ message: `this id ${req.params.id} has no post` });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// create a new post
router.post('/', withAuth, async (req, res) => {
    const body = req.body;

    try {
        const newPost = await Post.create({ ...body, userId: req.session.userId });
        console.log("This is the new post", newPost);
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update the post
router.put('/:id', withAuth, async (req, res) => {
    try {
      const updatedPost = await Post.update(
        {
          title: req.body.title,
          content: req.body.content,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (!updatedPost) {
        res.status(404).json({ message: 'This id has no post' });
        return;
      }
  
      res.json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// delete the post
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          userId: req.session.userId,
        },
      });
      if (!postData) {
        res.status(404).json({
          message: `No User Id ${req.session.userId} found with id = ${req.params.id}`,
        });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;