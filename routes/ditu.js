var express = require('express');
var router = express.Router();
var passport = require('passport');
var app = require('../app')

// Require controller modules.
var subject_controller = require('../controllers/subjectController');
var department_controller = require('../controllers/departmentController');
var question_controller = require('../controllers/questionController');
var faculty_controller = require('../controllers/facultyController');
//var subject_controller s require('../controllers/SubjectController');
//var book_instance_controller = require('../controllers/bookinstanceController');

var auth_token = 0;

var loggedin  =  function(req,res,next){
    if(req.isAuthenticated()){
    auth_token = req.isAuthenticated();
     next()
    }else{
        res.redirect('/');
    }
}

/// HOME ROUTES///
// GET home page.
router.get('/', (req, res)=>{
    res.render('home');
    //res.send('NOT IMPLEMENTED: Site Home Page');
});

//Login Route
router.get('/login',(req,res)=>{
    res.render('index');
});

/// About Route ///
router.get('/about',(req,res)=>{
    res.render('about');
});

/// DEPARTMENT ROUTES ///

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/department/create',loggedin, department_controller.department_create_get);

// POST request for creating Book.
router.post('/department/create', department_controller.department_create_post);

// GET request to delete Book.
router.get('/department/:id/delete',loggedin, department_controller.department_delete_get);

// // POST request to delete Book.
// router.post('/department/:id/delete', department_controller.department_delete_post);

// GET request to update Book.
router.get('/department/:id/update',loggedin, department_controller.department_update_get);

// // POST request to update Book.
// router.post('/department/:id/update', department_controller.department_update_post);

// GET request for one Book.
router.get('/department/:id',loggedin, department_controller.department_detail);

// GET request for list of all department.
router.get('/department',loggedin, department_controller.department_list);

/// QUESTION ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get('/question/create',loggedin, question_controller.question_create_get);

// GET request for list of all Authors.
router.get('/question/view',loggedin, question_controller.question_view_all);

// POST request for creating Author.
router.post('/question/create', question_controller.question_create_post);

// GET request to delete Author.
router.get('/question/:id/delete',loggedin, question_controller.question_delete_get);

// POST request to delete Author.
router.post('/question/:id/delete', question_controller.question_delete_post);

// GET request to update Author.
router.get('/question/:id/update',loggedin, question_controller.question_update_get);

// POST request to update Author.
router.post('/question/:id/update', question_controller.question_update_post);

// GET request for one Author.
router.get('/question/:id',loggedin, question_controller.question_detail);

// GET request for list of all Authors.
router.get('/question',loggedin, question_controller.question_home);

/// FACULTY ROUTES ///

//GET request to register user
router.get('/register', faculty_controller.faculty_register_get);

//POST request to Pass faculty value
router.post('/register', faculty_controller.faculty_register_post);

//POST req for user login
router.post('/login', faculty_controller.faculty_login_post);

//GET req for LogOut
router.get('/logout', faculty_controller.faculty_logout_get);


/// SUBJECT ROUTES ///

// GET request for creating a subject. NOTE This must come before route that displays subject (uses id).
router.get('/subject/create', subject_controller.subject_create_get);

//POST request for creating subject.
router.post('/subject/create', subject_controller.subject_create_post);

// // GET request to delete subject.
// router.get('/subject/:id/delete', subject_controller.subject_delete_get);

// // POST request to delete subject.
// router.post('/subject/:id/delete', subject_controller.subject_delete_post);

// // GET request to update subject.
// router.get('/subject/:id/update', subject_controller.subject_update_get);

// // POST request to update subject.
// router.post('/subject/:id/update', subject_controller.subject_update_post);

// GET request for one subject.
router.get('/subject/:id', subject_controller.subject_detail);

// GET request for list of all subject.
router.get('/subject', subject_controller.subject_list);

// /// BOOKINSTANCE ROUTES ///

// // GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
// router.get('/bookinstance/create', book_instance_controller.bookinstance_create_get);

// // POST request for creating BookInstance. 
// router.post('/bookinstance/create', book_instance_controller.bookinstance_create_post);

// // GET request to delete BookInstance.
// router.get('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_get);

// // POST request to delete BookInstance.
// router.post('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_post);

// // GET request to update BookInstance.
// router.get('/bookinstance/:id/update', book_instance_controller.bookinstance_update_get);

// // POST request to update BookInstance.
// router.post('/bookinstance/:id/update', book_instance_controller.bookinstance_update_post);

// // GET request for one BookInstance.
// router.get('/bookinstance/:id', book_instance_controller.bookinstance_detail);

// // GET request for list of all BookInstance.
// router.get('/bookinstances', book_instance_controller.bookinstance_list);

module.exports = router;