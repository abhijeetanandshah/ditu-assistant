var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var db = mongoose.connection;

//Load Faculty model
require('../models/faculty');
const Faculty = mongoose.model('Faculty');

exports.faculty_register_get = function(req, res) {
    db.collection('subjects').find({}).toArray((err,docs)=>{
        res.render('register',{'subjects':docs});
      });
};

exports.faculty_register_post = function(req, res) {
    console.log(req.body);
    const newFaculty = new Faculty({
      sap_id:req.body.sap_id,
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      password:req.body.password,
      date_of_birth:req.body.date_of_birth,
      //department: req.body.department,
  
    });
  
    newFaculty.subjects=[req.body.subjects];
  
    newFaculty.save()
    .then(user=>{
      res.redirect('/ditu');
    })
    .catch(err =>{
      console.log(err);
      return;
    });
};

