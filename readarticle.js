var express = require('express');
var router = express.Router();
var art=require('./models/article');
var topic=require('./models/topic');




router.get('/readarticle',function (req, res) {
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
            res.render('readarticle', {
              article: response,
              category: topic
            });
          }
        });
      }
    });
  });
 router.get('/readpolitics', function(req, res){
   art.find(function(err, response){
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
      } else {
          res.render('readpolitics', {
              data: response
          });
      }
  });
});
router.get('/readmovies', function(req, res){
   art.find(function(err, response){
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
      } else { 
          res.render('readmovies', {
              data: response
          });
      }
  });
});
 router.get('/readhealth', function(req, res){
   art.find(function(err, response){
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
      } else {
          res.render('readhealth', {
              data: response
          });
      }
  });
});router.get('/readtech', function(req, res){
   art.find(function(err, response){
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
      } else {
          res.render('readtech', {
              data: response
          });
      }
  });
});



module.exports=router;