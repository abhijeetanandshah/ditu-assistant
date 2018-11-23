const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//Load Faculty Model
const Faculty = mongoose.model('Faculty');


module.exports=function(passport){
    passport.use(new LocalStrategy({usernameField:'sap_id'},(sap_id,password,done)=>{
        Faculty.findOne({
            sap_id: sap_id
        }).then(user =>{
            if(!user){
                return done(null, false);

            }

            bcrypt.compare(password, user.password, (err,isMatch)=>{
                if(err) throw err;
                if(isMatch){
                    return done(null,user);
                }else{
                    return done(null,false);
                }
            })
        })

    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        Faculty.findById(id, function(err, user) {
          done(err, user);
        });
      })
}