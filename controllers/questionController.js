var question = require('../models/question');
var app = require('../app');
var mongoose= require('mongoose');
var async = require('async');
var db = mongoose.connection;
var Question = mongoose.model('Question');

// Display list of all Questions.
exports.question_home = function(req, res) {
    db.collection('questions').find({}).toArray((err, docs)=>{
        res.render('question',{'error':err,'data':docs.length,
        a : req.isAuthenticated()
    });
        console.log("No. of questions : "+ docs.length);
        a = req.isAuthenticated();
        console.log("aaaaaaaaaaaaaaaa"+a)
    });
};

exports.question_view_all = function(req, res) {
    db.collection('questions').find({}).toArray((err, docs)=>{
        res.render('question-all',{'error':err,'data':docs});
    });
};

// Display detail page for a specific Question.
exports.question_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Question detail: ' + req.params.id);
};

// Display Question create form on GET.
exports.question_create_get = function(req, res) {
    db.collection('subjects').find({}).toArray((err,docs)=>{
        res.render('add-question',{'subjects':docs});
        console.log("Subject Count : "+ docs);
    });
};

// Handle Question create on POST.
exports.question_create_post = function(req, res, next) {
    var question = new Question(
        {
            question_text :  req.body.question_text,
            marks_tag : req.body.marks_tag,
            type_tag : req.body.type_tag,
            subject : req.body.subject
        }
    );
    console.log(question);
    question.save(function(err){
        if(err){ return next(err); }
        res.redirect("/ditu/question");
    });
};

// Display Question delete form on GET.
exports.question_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Question delete GET');
};

// Handle Question delete on POST.
exports.question_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Question delete POST');
};

// Display Question update form on GET.
exports.question_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Question update GET');
};

// Handle Question update on POST.
exports.question_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Question update POST');
};