var express = require('express');
var router = express.Router();

var art=require('./models/article')
var topic=require('./models/topic')

router.get('/edit/:id', function(req, res) {
    topic.find( function (err, topic) {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          // Fetch articles
          art.find({}, function (err, response) {
            if (err) {
              console.error(err);
              res.status(500).send('Internal Server Error');
            } else {
              res.render('edit', {
                data: response,
                topics: topic // Pass the list of topics to the template
              });
            }
          });
        }
      });
    });
         

router.post('/edit/:id', function(req, res) {
    var articleId = req.params.id;
    var updatedArticleData = req.body;

    art.findByIdAndUpdate(articleId, updatedArticleData, function(err, updatedArticle) {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/userarticle/?msg=Edited');
        }
    });
});

router.get('/delete/:id', function(req, res) {
    var articleId = req.params.id;

    art.findByIdAndRemove(articleId, function(err) {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/userarticle/?msg=Deleted');
        }
    });
});



module.exports=router;