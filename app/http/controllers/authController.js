const User = require('../../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
function authController() {
  return {
    login(req, res) {
      res.render("auth/login");
    },
    postLogin(req,res,next){
      passport.authenticate('local',(err,user,info)=>{
        if(err){
          req.flash('error',info.message);
          return next(err);
        }
        if(!user){
          req.flash('error',info.message);
          return res.redirect('/login');
        }
        req.login(user,()=>{
          if(err){
            req.flash('error',info.message);
            return next(err);
          }
          return res.redirect('/');
        })
      })(req,res,next)
    },
    register(req, res) {
      res.render("auth/register");
    },
    async postRegister(req, res) {
      const { name, email, password } = req.body;
      // console.log(req.body);
      //Validate Request
      if(!name || !email || !password){
        req.flash('error','All Fields are required');
        req.flash('name',name)
        req.flash('email',email)
        return res.redirect("/register");
      }
      // Check if email exixts
      User.exists({email:email},(err,result)=>{
        if(result){
          req.flash("error", "Email Already Exists!!");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/register");
        }
      })

      //Hash Password
      const hashedPassword = await bcrypt.hash(password,10)
      // Create a user
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });
      user.save().then(()=>{
        // Login By Default after register
        return res.redirect('/');
      }).catch(err =>{
        req.flash("error", "something went wrong");
        return res.redirect("/register");
      })
    },
    logout(req,res){
      req.logout(()=>{
        
      })
      return res.redirect('/login');
    },
  };
}
module.exports = authController;
// Factory Functions - Type of Patterns in a language
// A function that returns object
