var express = require('express');
var router = express.Router();
var topic=require ('./models/topic')
var art=require('./models/article');
var comment=require('./models/comment');
var editordelete= require('./editordelete.js');
router.use('/',editordelete);

router.use(function(req, res, next) { res.setHeader('Cache-Control', 'no-cache,private,no-Store,must-revalidate,max-stale=0,post-check=0,pre-check=0');
next();
  });
 

function checkSignIn(req, res,next){
   if(req.session.person){
      next();    
   } else {
     res.render('interface');
      console.log(req.session.person);
      next(err);  
   }
}


/*router.get('/articles',checkSignIn,function(req, res){
  
    art.find(function(err, response){
       if (err) {
           console.error(err);
           res.status(500).send('Internal Server Error');
       } else {
      res.render('articles',{
             data:response
             
          })
       }
    })
 });*/
 router.get('/articles', checkSignIn, function (req, res) {
   topic.find(function (err, topic) {
     if (err) {
       console.error(err);
       res.status(500).send('Internal Server Error');
     } else {
       art.find(function (err, response) {
         if (err) {
           console.error(err);
           res.status(500).send('Internal Server Error');
         } else {
          var message=req.query.msg||'';
           res.render('articles', {
             article: response,
             category: topic ,// Pass the list of topics to the template
             message:message 
           });
         }
       });
     }
   });
 });

router.get('/userarticle',checkSignIn,function(req,res){
  art.find({name:req.session.person.name},function(request,respose){
    topic.find(function(err,topic){
      const message=req.query.msg||'';
res.render('userarticle',{article:respose,category:topic,message:message});
}) })})

router.post('/articles', function (req, res) {
   var articleInfo = req.body;

   if (!articleInfo.title || !articleInfo.topic || !articleInfo.content) {
       res.render('articles');
   } else {
          var newart = new art({
           date:Date.now(),
           name:req.session.person.name,
           title: articleInfo.title,
       topic:articleInfo.topic,
           content: articleInfo.content,
           status:0
       });

       newart.save(function (err, art) {
           if (err) {
               res.render('articles', {
                   message: "database Error",
                   type: 'error'
               });
           } else
               res.redirect('/articles/?msg=wait for the approval');

       });
   }
});
// ADD TOPIC

router.get('/addtopic',checkSignIn, function(req, res){
   topic.find(function(req , response){
  
   res.render('addtopic')
 });
 })
 
 router.post("/addtopic", function (req, res) {
   var articleInfo = req.body;
 
   if (!articleInfo.topic) {
     res.render("/addtopic");
   } else {
     var addtopic = new topic({ 
 
       topic:articleInfo.topic
     });
 
     addtopic.save(function (err, addtopic) {
       if (err) res.send("Database error");
       else res.redirect("/addtopic/?msg=new topic added to the dropdown");
 });
 }
 });
 router.get('/like/:id', checkSignIn, async function (req, res) {
    try {
        const artId = req.params.id;

        // Assuming you want to find the art by its ID and render a view
        const article = await art.findById(artId).exec();

        if (!article) {
            return res.status(404).send('Article not found');
        }

        // Render your 'liked' view with the article details
        res.render('articles', { article });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

    router.get('/comment/:id',checkSignIn, function(req, res){
      comment.find(function(err, respons){
         if (err) {
             console.error(err);
             res.status(500).send('Internal Server Error');
         } else {
             res.render('comment', {
                 data:respons,
                 req:req
             });
         }
     });
   })
   router.get('/like_comment/:id', checkSignIn, function (req, res) {
    comment.findById(req.params.id, function (err, foundComment) {
        if (err) {
            console.error(err);
            res.status(500).json({ status: 'error' });
        } else {
            const userId = req.user._id;
            const liked = foundComment.likes.includes(userId);
            if (liked) {
                // Unlike
                foundComment.likes.pull(userId);
            } else {
                // Like
                foundComment.likes.push(userId);
            }
            foundComment.save(function (saveErr) {
                if (saveErr) {
                    console.error(saveErr);
                    res.status(500).json({ status: 'error' });
                } else {
                    res.json({ status: liked ? 'unliked' : 'liked', likeCount: foundComment.likes.length });
                }
            });
        }
    });
});
module.exports=router;