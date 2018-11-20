var question = require('../models/question');
var app = require('../app');
var mongoose= require('mongoose');
var async = require('async');
var db = mongoose.connection;

// Display list of all Questions.
exports.question_list = function(req, res) {
    db.collection('question').find({}).count((err, docs)=>{
        res.render('question',{'error':err,'data':docs});
        console.log("No. of questions : "+ docs);
    });
};

// Display detail page for a specific Question.
exports.question_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Question detail: ' + req.params.id);
};

// Display Question create form on GET.
exports.question_create_get = function(req, res) {
    db.collection('subject').find({}).toArray((err,docs)=>{
        res.render('add-question',{'subjects':docs});
        console.log("Subject Count : "+ docs);
    });
};

// Handle Question create on POST.
exports.question_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Question create POST');
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