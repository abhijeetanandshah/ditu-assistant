var Subject = require('../models/subject');
var Department = require('../models/department');

const { body,validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter');

// Display list of all subjects.
exports.subject_list = function(req, res, next) {
    Subject.find({})
    .exec(function(err, listSubject){
        if(err) {return next(err);}
        res.render('subject',{subject_list : listSubject});
    })
};

// Display detail page for a specific subject.
exports.subject_detail = function(req, res, next) {
    Subject.findById(req.params.id)
    .populate('department')
    .exec(function(err, detailSubject){
        if (err) {return next(err);}
        // no result
        if (detailSubject==null)
        {   
            var err = new Error('Subject Not Found');
            err.status = 404;
            return next(err);
        }
        console.log(detailSubject);
        res.render('subject-detail',{ subject_detail : detailSubject});
    })
};

// Display subject create form on get
exports.subject_create_get = function(req, res, next) {
    Department.find()
    .exec(function(err, listDepartment){
        if (err) {return next(err); }
        res.render('subject-form', {department_list : listDepartment});
    })
};

// Handle subject create on POST.
exports.subject_create_post =[
    (req, res, next) => {
        if(!(req.body.department instanceof Array)){
            if(typeof req.body.department === 'undefined')
            req.body.department=[];
            else
            req.body.department= new Array(req.body.department);
        }
        next();
    },
    // validating fields
    body('subject_code', 'Subject Code must be specified').isLength({min:1, max:7}).trim(),
    body('subject_name', 'Name must be speciified').isLength({ min:1 }).trim(),

    // sanitising fields using wildcard
    body('*').trim().escape(),
    // Processing request after validation and sanitization
    (req, res, next) => {
        // Exatract the validation error from the request
        const errors = validationResult(req);

        // Create a Subject object from processed data
        var subject = new Subject(
            {
                subject_code : req.body.subject_code,
                subject_name : req.body.subject_name,
                department : req.body.department,
                
            });
        console.log('pass');
        // if validation have error
        if (!errors.isEmpty()) {
            Department.find()
            .exec(function(err, listDepartment){
                if (err) {return next(err); 
                }
                res.render('subject-form', {department_list : listDepartment, errors: errors.array()});
            })
            // Add code to render the form with the user input
            // Render the form again
            // Error// res.render('subject-form', {department_detail:listDepartment, errors: errors.array()});

            return;
        }
        else{
            subject.save(function (err){
                if (err) {return next(err);}
                // redirect to newly created subject
                res.redirect(subject.url);
            });
        }
    }
];