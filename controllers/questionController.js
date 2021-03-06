var question = require('../models/question');
var app = require('../app');
var mongoose= require('mongoose');
var async = require('async');
var db = mongoose.connection;
var Question = mongoose.model('Question');
ObjectID = require('mongodb').ObjectID;

// Display list of all Questions.
exports.question_home = function(req, res) {
    db.collection('questions').find({}).toArray((err, docs)=>{
        res.render('question',{'error':err,'data':docs.length,
        auth_token : req.isAuthenticated(), 'user' : req.user });
    });
};

exports.question_view_all = function(req, res) {
    db.collection('questions').find({}).toArray((err, docs)=>{
        res.render('question-all',{'error':err,'data':docs,
        auth_token : req.isAuthenticated() });
    });
};

// Display detail page for a specific Question.
exports.question_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Question detail: ' + req.params.id);
};

// Display Question create form on GET.
exports.question_create_get = function(req, res) {
    db.collection('subjects').find({}).toArray((err,docs)=>{
        res.render('add-question',{'subjects':docs,
        auth_token : req.isAuthenticated()});
        console.log("Subject Count : "+ docs);
    });
};

exports.question_paper_get = function(req, res) {
    db.collection('questions').find({}).toArray((err, docs)=>{
        res.render('question-paper',{'error':err,'data':docs,
        auth_token : req.isAuthenticated() });
    });
};

exports.question_paper_post = function(req, res){
    var bhejo = JSON.parse(JSON.stringify(req.body.questions));

    var id = [];
    for(var i=0;i<bhejo.length;i++){
        id.push(mongoose.Types.ObjectId(bhejo[i].toString('hex')));
    }
    
    db.collection('questions').find({"_id" : {"$in" : id}}).toArray((err,docs)=>{
        //console.log(docs);
        res.render('temp',{'questions': docs, 'error':err, auth_token : req.isAuthenticated(),'subject':req.body.subject });
    });
};

exports.question_paper_subject_get = function(req, res){
    db.collection('subjects').find({}).toArray((err,docs)=>{
        res.render('question-paper-subject',{'error':err,'data':docs,auth_token : req.isAuthenticated()});
    });
};

exports.question_paper_subject_post = function(req, res){
    console.log(req.body.subject);
    db.collection('questions').find({}).toArray((err,docs)=>{
        res.render('question-paper',{'error':err,'data':docs,'subject':req.body.subject,
        auth_token : req.isAuthenticated() });
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