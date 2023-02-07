const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/userModel')

  const customFields = {
    usernameField: "email",
    passwordField: "password",
  };

  //This is the callback function that goes inside localstrategy setup
  const authenticateUser = async (email, password, done) => {
    console.log("called authenticate User", email, password)
    const user = await User.findOne({email: email});

    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy(customFields, authenticateUser))

  //save user.id in our session
  passport.serializeUser((user, done) => {
    console.log(`serializing user ${user}`)
    return done(null, user.id)
  })
  passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({_id: id});
    console.log(`deserializing user ${user}`)
    return done(null, user)
  })
