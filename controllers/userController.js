const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./../models/User');

exports.signUp = async (req, res) => {

    const userExists = await User.findOne({ email: req.body.email });
      if (userExists)
        return res.status(403).json({
            error: 'Email is taken!'
        });
        
            // isSeller = Boolean.valueOf("req.body.isSeller");
            // isSeller = Boolean.parseBoolean("req.body.isSeller");
            const  isSeller = (req.body.isSeller === 'true');

            const user = new User({
                email: req.body.email,
                password: req.body.password,
                isSeller: isSeller
            });
            user.save()
            .then(() => {
               //1.generate a token with user id and secret
                const token = jwt.sign(
                     { _id: user._id,
                      isSeller: user.isSeller },
                      process.env.JWT_SECRET);
                             
                //2.persist the token as 't' in cookie with expiry date
                     res.cookie('t', token, { expire: new Date() + 9999 });

                 //3.retrun response with user and token to frontend 
                     const { _id, isSeller } = user;
                     return res.json({ token, user: { _id, isSeller } })
            })
            .catch(err=>console.log(err));

};

exports.logIn = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    
    User.findOne({ email }, (err, user) => {
        // if err or no user
        if (err || !user) {
            return res.status(401).json({
                error: 'User with that email does not exist.'
            });
        }
        // if user is found make sure the email and password match
        if (!bcrypt.compare(password, user.password)) {
            return res.status(401).json({
                error: 'Email and password do not match'
            });
        }

        // generate a token with user id and secret
        const token = jwt.sign(
            { _id: user._id,
             isSeller: user.isSeller },
             process.env.JWT_SECRET);

        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token,
             { expire: new Date() + 9999 });

        // retrun response with user and token to frontend 
        const { _id, isSeller } = user;
        return res.json({ token, user: { _id, isSeller } });
    });
};

exports.signout = (req, res) => {
    res.clearCookie('t');
    return res.json({ message: 'Signout success!' });
};