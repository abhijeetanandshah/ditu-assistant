var express = require('express');
var router = express.Router();

// Require controller modules.
var department_controller = require('../controllers/departmentController');
var question_controller = require('../controllers/questionController');
//var genre_controller = require('../controllers/genreController');
//var book_instance_controller = require('../controllers/bookinstanceController');

/// DEPARTMENT ROUTES ///


// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/department/create', department_controller.department_create_get);

// POST request for creating Book.
router.post('/department/create', department_controller.department_create_post);

// GET request to delete Book.
router.get('/department/:id/delete', department_controller.department_delete_get);

// // POST request to delete Book.
// router.post('/department/:id/delete', department_controller.department_delete_post);

// GET request to update Book.
router.get('/department/:id/update', department_controller.department_update_get);

// // POST request to update Book.
// router.post('/department/:id/update', department_controller.department_update_post);

// GET request for one Book.
router.get('/department/:id', department_controller.department_detail);

// GET request for list of all department.
router.get('/department', department_controller.department_list);

/// AUTHOR ROUTES ///

// GET home page.
router.get('/', exports.index = function(req, res) {
    res.render('index');
    //res.send('NOT IMPLEMENTED: Site Home Page');
});

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get('/question/create', question_controller.question_create_get);

// POST request for creating Author.
router.post('/question/create', question_controller.question_create_post);

// GET request to delete Author.
router.get('/question/:id/delete', question_controller.question_delete_get);

// POST request to delete Author.
router.post('/question/:id/delete', question_controller.question_delete_post);

// GET request to update Author.
router.get('/question/:id/update', question_controller.question_update_get);

// POST request to update Author.
router.post('/question/:id/update', question_controller.question_update_post);

// GET request for one Author.
router.get('/question/:id', question_controller.question_detail);

// GET request for list of all Authors.
router.get('/question', question_controller.question_list);

/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
// router.get('/genre/create', genre_controller.genre_create_get);

// //POST request for creating Genre.
// router.post('/genre/create', genre_controller.genre_create_post);

// // GET request to delete Genre.
// router.get('/genre/:id/delete', genre_controller.genre_delete_get);

// // POST request to delete Genre.
// router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// // GET request to update Genre.
// router.get('/genre/:id/update', genre_controller.genre_update_get);

// // POST request to update Genre.
// router.post('/genre/:id/update', genre_controller.genre_update_post);

// // GET request for one Genre.
// router.get('/genre/:id', genre_controller.genre_detail);

// // GET request for list of all Genre.
// router.get('/genres', genre_controller.genre_list);

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