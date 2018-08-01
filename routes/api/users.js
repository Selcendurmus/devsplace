const express = require('express');
const User = require ('../../models/User');
const gravatar = require ('gravatar'); 
const bcrypt = require ('bcryptjs');
const router = express.Router();


// @route GET api/users/test
// @desc Tests the user route
// @access Public
router.get('/test', (req,res) => res.json ({
  msg: 'Users works'
}));

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req,res) =>{
  User.findOne({email: req.body.email})
  .then(user => {
    if (user) {
      return res.status(400).json({
        email: 'Email already exists'
      })
    }
    else {

      const avatar =gravatar.url(req.body.email,{
        s:'200',
        r:'pg',
        d:'mm'
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err,salt) => {
        if (err) throw err; // Failed generating salt
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err; // Failed hashing
          newUser.password = hash;
          newUser.save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
        })
      })
    }
  })
})

module.exports = router;