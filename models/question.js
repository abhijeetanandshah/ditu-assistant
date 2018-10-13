var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuestionSchema = new Schema (
    {
        question_text : {type: String, required: true},
        marks_tag : {type: String, required: true, enum:[ '2.5', '5', '10', 'Undefined'], default:'Undefined'} , 
        type_tag: {type: String, required:true, enum:['Numerical', 'Theoretical', 'Undefined'], default:'Undefined'},
        subject: {type:String , required: true, ref:'Subject'}
    }
)
//     ** id is taken by default
//     *** chapter tag for future, as cahpter values are not predefined 

//   Virtual function for Question's Detail 
QuestionSchema
.virtual('questionDetails')
.get(function() {
    return ('Question Id:'+this._id + 'Marks:'+this.marks_tag +'Type:'+this.type_tag +'Subject:'+this.subject);
});

// Virtual for Subject's URL 
QuestionSchema
.virtual('url')
.get(function (){
    return '/question/' + this._id;
});

// Exporting model
module.exports = mongoose.model('Question', QuestionSchema);
