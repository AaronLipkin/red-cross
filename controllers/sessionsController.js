const express = require('express');
const router  = express.Router();
const User    = require('../models/usersModel');
const bcrypt = require('bcryptjs');

router.get('/login', (req, res, next) =>{

  res.render('users/login.ejs', {
    message: req.session.message || '',
    logged: req.session.logged})
})



router.get('/register', (req, res, next) => {
  res.render('users/register.ejs', {message: req.session.taken || ''})
})

router.post('/login', (req, res, next) => {

  User.findOne({username: req.body.username}, (err, user) => {

      if(user){
                     //now compare hash with the password from the form
            if(bcrypt.compareSync(req.body.password, user.password)){
                req.session.message  = '';
                req.session.username = req.body.username;
                req.session.logged   = true;
                console.log(req.session, req.body)

                res.redirect('/admin')
            } else {
              console.log('else in bcrypt compare')
              req.session.message = 'Username or password are incorrect';
              res.redirect('/sessions/login')

            }

      } else {

          req.session.message = 'Username or password are incorrect';
          res.redirect('/sessions/login')

      } //end of if user
  });

})




router.get('/logout', function(req, res){
  req.session.destroy(function(err){
    res.redirect('/')
  })
})

router.get('/seed', (req, res) => {
  User.create({username : "admin", password : "$2a$10$NYbv94L59MwyITDhG9sMqOALpnNoIwiqR7qj6y3.GJ2epVzEjryo2"}, (err, createdUser) => {
    res.redirect('/')
  })
})




// export the controller
module.exports = router;
