const { Comment } = require('../models');

const commentData =
[
    {
        "content": "this is the first post ever",
        "userId": 1,
        "postId": 1
    },
    {
        "content": "Happy Thanksgiving to everybody",
        "userId": 2,
        "postId": 1
    }
]

const commentSeed = () => Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
});