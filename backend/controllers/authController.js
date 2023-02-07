const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const passport = require("passport");

function logout(req, res, next) {
  req.logout()        
  res.clearCookie("connect.sid", { path: "/" });

  req.session.destroy(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({message:"logged out!"});
  });  
}

  
  function login(req, res, next) {

	passport.authenticate("local", function (err, user, info) {
    if (err || !user) {
      console.log("passport authenticate says", info.message)
      res.status(401).send(info.message);
    } else {
      console.log("user found")
      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        res.status(200).json({
          email: user.email,
          name: user.name,
        });
      });
    }
  })(req, res, next);
  };

  async function register(req, res, next) {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send(`Email <${req.body.email}> already taken`);
    } else {
    
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    try {          

      const newuser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      });
      //Auto-login
          req.login(newuser, function (err) {
            if (err) {
              next(err);
            }
            res.status(200).json({
              email: newuser.email,
              name: newuser.name,
            });
          });
    } catch(error) {
      console.log(error)
      next(error);
    }

	}    
  };  
  
  
  function getUser(req, res) {
    console.log(req.user);
    res.status(200).json({
    	email: req.user.email,
      name: req.user.name
  	});
  };

  

  module.exports = {getUser, login, logout, register};

