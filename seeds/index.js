const sequelize = require('../config/connection');
const userSeed = require('./user-seeds');
const postSeed = require('./post-seeds');

const allSeed = async () => {
    await sequelize.sync ({ force: true });
    await userSeed();
    await postSeed();
    process.exit(0);
};

allSeed();