const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      const dbCommentData = await Comment.findAll({});
      if (dbCommentData.length === 0) {
        res
          .status(404)
          .json({ message: 'no comment' });
        return;
      }  
      res.status(200).json(dbCommentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/:id', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({
      where: { id: req.params.id },
    });
    if (dbCommentData.length === 0) {
      res
        .status(404)
        .json({ message: `This id ${req.params.id} has no comment.` });
      return;
    }
    res.status(200).json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', withAuth, async (req, res) => {
    const body = req.body;
    try {
        const newComment = await Comment.create({
            ...body,
            userId: req.session.userId,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
      const updatedComment = await Comment.update(
        {
          comment_text: req.body.comment_text,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (!updatedComment) {
        res
          .status(404)
          .json({ message: `This id ${req.params.id} has no comment.` });
        return;
      }
      res.status(200).json(updatedComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!dbCommentData) {
      res.status(404).json({
        message: `No post owned by user_id = ${req.session.user_id} found with id = ${req.params.id}`,
      });
      return;
    }

    res.status(200).json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;