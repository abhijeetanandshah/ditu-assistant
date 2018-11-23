var Department = require('../models/department');

// for form validation
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// var app = require('../app');
// var mongoose= require('mongoose');
// var async = require('async');
// var db = mongoose.connection;

// Display list of all departments.
exports.department_list = function(req, res, next) {
    Department.find({})
    .exec(function(err, listDepartment){
        if(err) {return next(err);}
        res.render('department',{department_list : listDepartment,
            auth_token : req.isAuthenticated()});
    })
};

// Display detail page for a specific department.
exports.department_detail = function(req, res, next) {
    // * //
    Department.findById(req.params.id)
    .exec(function(err, detailDepartment){
        if (err) {return next(err);}
        // no result
        if (detailDepartment==null)
        {   
            var err = new Error('Genre Not Found');
            err.status = 404;
            return next(err);
        }
        res.render('department-detail',{ department_detail : detailDepartment});
    })
};

// Display department create form on GET.
exports.department_create_get = function(req, res, next) {
    res.render('department-form');
};

// Handle department create on POST.
exports.department_create_post = [
    // validating fields
    body('department_name', 'Name must be specified').isLength({min: 1 }).trim(),
    body('department_description', 'Description must be specified').isLength({min:1}).trim(),
    // sanitizaion fields
    sanitizeBody('department_name').trim().escape(),
    sanitizeBody('department_description').trim().escape(),
    // Processing request after validation and sanitization
    (req, res, next) => {
        
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        var department = new Department(
            {
                department_name : req.body.department_name,
                department_description : req.body.department_description
            });

        if (!errors.isEmpty()) {

            res.render('department-form', { department_detail: detailDepartment, errors: errors.array() });
        
            return;
        }
        else {
            department.save(function (err){
                if (err) { return next(err);}
                // redirect to newly created record
                res.redirect(department.url);
            
            });
        }
    }
];

// Display department delete form on GET.
exports.department_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: department delete GET');
};

// Handle department delete on POST.
exports.department_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: department delete POST');
};

// Display department update form on GET.
exports.department_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: department update GET');
};

// Handle department update on POST.
exports.department_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: department update POST');
};