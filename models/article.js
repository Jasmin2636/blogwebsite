var mongoose=require('mongoose');



var artSchema = mongoose.Schema({
    date:Date,
    title: String,
    topic:String,
    content:String,
    status:Number,
    name:String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    });
 
 var art= mongoose.model("art", artSchema);

 module.exports=art;
