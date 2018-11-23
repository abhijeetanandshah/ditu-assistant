var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DepartmentSchema = new Schema(
  {
    department_name: {type: String, required: true, max: 100},
    department_description: {type: String, max:100}
  }
);

// Virtual for Department's Detail
DepartmentSchema
.virtual('departmentDetails')
.get(function () {
  return ('Department Code:'+this._id + ' Department Name:' + this.department_name + ' Department Description:' + this.department_description);
});

// Virtual for Department's URL
DepartmentSchema
.virtual('url')
.get(function () {
  return '/ditu/department/' + this._id;
});

//Export model
module.exports = mongoose.model('Department', DepartmentSchema);