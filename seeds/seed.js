const sequelize = require('../config/connection');
const userSeed = require('./user-seeds');
const postSeed = require('./post-seeds');
const commentSeed = require('./comment-seeds');

const allSeed = async () => {
    await sequelize.sync ({ force: true });
    await userSeed();
    await postSeed();
    await commentSeed();
    process.exit(0);
};

allSeed();