const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports = {
    async login(req, res) {
        let { username, password } = req.body;
        const db = req.app.get('db');
        let [existingUser] = await db.get_user_by_handle(username);
        if (!existingUser) return res.status(401).send('Username not found');
        let result = await bcrypt.compare(password, existingUser.password);
        if (result) {
            req.session.user = {
                username: existingUser.username,
                id: existingUser.id,
                profilePic: existingUser.profile_pic,
                city: existingUser.city,
                state: existingUser.state,
                loggedIn: true,
            };
            res.send(req.session.user);
        } else res.status(401).send('Username or password incorrect');
    },
    async signup(req, res) {
        let { username, password, profilePic, city, state } = req.body;
        const db = req.app.get('db');
        let [existingUser] = await db.get_user_by_handle(username);
        if (existingUser) return res.status(400).send('Username exists already');
        let salt = await bcrypt.genSalt(saltRounds);
        let hash = await bcrypt.hash(password, salt);
        let [user] = await db.register_user([username, hash, profilePic, city, state])
        req.session.user = {
            username: user.username,
            id: user.id,
            profilePic: user.profile_pic,
            city: user.city,
            state: user.state,
            loggedIn: true
        }
        console.log('req.session.user', req.session.user)
        res.send(req.session.user);
    },
    logout(req, res) {
        req.session.destroy();
        res.sendStatus(200);
    },
    getUser(req, res) {
        res.send(req.session.user);
    }
}