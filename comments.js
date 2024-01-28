var express = require('express');
var router = express.Router();



var comment=require('./models/comment');
var art=require('./models/article');

router.use(function(req, res, next) { res.setHeader('Cache-Control', 'no-cache,private,no-Store,must-revalidate,max-stale=0,post-check=0,pre-check=0');
next();
  });
  router.get('/delete_comment/:commentId', function (req, res) {
    var commentId = req.params.commentId;
     comment.findByIdAndRemove(commentId, function (err, result) {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            // Redirect to the comment page or wherever you want after deletion
            res.redirect('/comment/:id');
        }
    });
});
 

 router.post('/comment/:id', function (req, res) {
    var commentInfo = req.body;
 
    if (! commentInfo.comment) {
        res.render('comment');
    } else {
           var newcomment = new comment({
            date:Date.now(),
            comment: commentInfo.comment,
            id:req.params.id
            
             });
 
        newcomment.save(function (err,comment) {
            if (err) {
                res.render('comment', {
                    message: "database Error",
                    type: 'error'
                });
            } else
            res.redirect('/comment/' + req.params.id + '/?msg=added');
 
        });
    }
 });



 module.exports=router;