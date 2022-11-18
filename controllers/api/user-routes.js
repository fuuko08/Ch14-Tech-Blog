const router = require('express').Router();
const { User } = require('../../models')

router.post('/login', async (req, res) => {
    console.log("showbody",req.body);
    try {
        const userData = await User.findOne({
            where: {username: req.body.username}
        })
        //Exit no user found
        if (!userData) {
            return res.status(400).json("No user is found with that username.")
        }
        // check pw
        const pwValidated = await userData.checkPassword(req.body.password)
        if (!pwValidated) {
            return res.status(400).json("No user is found with that username.")
        }
        // create session and send response back
        req.session.save(() => {
            req.session.userID = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;        
        //send response to client
        res.status(200).json("You are logged in.");
        })
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;