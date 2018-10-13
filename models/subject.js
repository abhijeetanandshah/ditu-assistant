var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SubjectSchema = new Schema(
  {
    _id:{type:String, required:true, max:10, unique:true},
    subject_name: {type: String, required: true, max: 100},
    department : [{type:Schema.Types.ObjectId , ref:'Department', required: true}]
  }
);

// Virtual for Subject's full name
SubjectSchema
.virtual('subjectdetails')
.get(function () {
  return ('Subject Code:'+this._subjectCode + ' Subject Name:' + this.subject_name + ' Departments:'+ this.department.get('dept_name'));
});

// Virtual for Subject's URL
SubjectSchema
.virtual('url')
.get(function () {
  return '/subject/' + this._subjectCode;
});

//Export model
module.exports = mongoose.model('Subject', SubjectSchema);