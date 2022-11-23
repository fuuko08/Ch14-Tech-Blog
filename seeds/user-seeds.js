const { User } = require('../models');

const userData = [
    {
        username: 'missingsu04',
        password: '3013',
    },
    {
        username: 'anasu02',
        password: '1234',
    },
];

const userSeed = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});