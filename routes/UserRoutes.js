const router = require('express').Router()
const BlogUser = require('../models/User')
const BlogDatas = require('../models/blogData')
const keys = require('../config/keys')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth');

router.use(cors())
router.get('/', (req, res) => {
    BlogUser.find()
    .sort({date: -1})
    .then(blogdata => res.json(blogdata))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/register',(req, res) => {
    const userdata = {
        name : req.body.name,
        email : req.body.email.toLowerCase(),
        password : req.body.password
    }
    if(!userdata.name) {
      res.end({success: false, message:'Error:name must not be empty'})
    }
    if(!userdata.email) {
      res.end({success: false, message:'Error:email must not be empty'})
    }
    if(!userdata.password) {
      res.end({success: false, message:'Error:password must not be empty'})
    }
    BlogUser.findOne({
        email: userdata.email
    })
    .then(user => {
        if(!user) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(userdata.password, salt, (err, hash) => {
                  if(err) {
                    throw err
                  } 
                  userdata.password = hash;
                  BlogUser
                    .create(userdata)
                    .then(user => 
                      jwt.sign(
                        {id: user._id},
                        keys.secretOrKey,
                        {
                          expiresIn: 3600
                        },
                        (err, token) => {
                          if(err) throw err;
                          res.json({
                            success: true,
                            token: token,
                            user: {
                                _id: user.id,
                                name: user.name,
                                email: user.email
                            }
                          });
                        }
                      )
                    )
                    .catch(err => console.log(err));
                });
              
              });
            }
        });
});

router.post('/login',auth,(req, res) => {
  if(!req.body.email) {
    res.end({success: false, message:'Error:email must not be empty'})
  }
  if(!req.body.email) {
    res.end({success: false, message:'Error:password must not be empty'})
  }
     BlogUser.findOne({
        email: req.body.email.toLowerCase()
    })
    .then(user => {
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                const payload = {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                      expiresIn: 3600
                    },
                    (err, token) => {
                      res.json({
                        
                        success: true,
                        token: token,
                        user: {
                            _id: user._id,
                            name: user.name,
                            email: user.email
                        }
                      });
                    }
                  );
                } else {
                  return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
                }
            }
    }).catch(err => {
        res.send('error' + err);
    });
});

module.exports = router








