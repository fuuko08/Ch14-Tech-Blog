const router = require('express').Router();
const { User, Post, Comment  } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const dbUserData = await User.findAll({
            attributes: { exclude: ['password'] },
        });
        res.status(200).json(dbUserData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            attributes: { exclude: ['password'] },
            where: { id: req.params.id },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'content', 'created_at'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'content', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title'],
                    },
                },
                {
                    model: Post,
                    attributes: ['title'],
                },
            ],
        });
        if (!dbUserData) {
            res.status(404).json({ message: `User id ${req.params.id} is not valid.`});
            return;
        }
        res.status(200).json(dbUserData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        console.log(`username: {0} - password: {1}`, req.body.username, req.body.password);
        const dbUserData = await User.create(req.body);
        console.table(req.body);
        req.session.save(() => {
            req.session.userId = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.status(201).json({ message: `Account created for ${dbUserData.username}`});
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    console.log("showbody", req.body);
    try {
        const dbUserData = await User.findOne({
            where: {username: req.body.username}
        });
        //Exit no user found
        if (!dbUserData) {
            res.status(400).json({ message: `User id ${req.params.id} is not valid.` });
            return;
        }
        // check pw
        const pwValidated = await dbUserData.checkPassword(req.body.password)
        if (!pwValidated) {
            res.status(400).json({ message: "Incorrect password!" });
            return;
        }
        // create session and send response back
        req.session.save(() => {
            req.session.userId = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;        
        //send response to client
        res.status(200).json({ user: dbUserData, message: "You are logged in!" });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            const dbUserData = await req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    } catch {
        res.status(400).end();
    }
});

module.exports = router;