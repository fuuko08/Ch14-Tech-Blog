const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post');

User.hasMany(Post, {
    foreignKey: 'userId',
});

User.hasMany(Comment, {
    foreignKey: 'uderId',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
});

Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

module.exports = { User, Comment, Post };