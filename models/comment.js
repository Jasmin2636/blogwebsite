var mongoose=require('mongoose');



var commentSchema = mongoose.Schema({
   comment:String,
   date:Date,
   id:String,
   name:String,
   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

});
 var comment = mongoose.model("comment",commentSchema);

 module.exports=comment;