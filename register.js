var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/myproject');

var person = require('./models/person');
var art = require('./models/article');
var topic = require('./models/topic');

var manager = require('./manager.js');
router.use('/', manager);

router.get('/interface', function (req, res) {
    res.render('interface');
});

router.get('/mainpage', function (req, res) {
    topic.find(function (reqi, resp) {
        res.render('mainpage', { category: resp });
    });
});   

router.get("/viewarticle/:id", function (req, res) {
    var id = req.params.id;
    art.find({ _id: id }, function (reqq, ress) {
        console.log(ress);
    });
});

router.get('/signup', function (req, res) {
    res.render('signup', {
        message: " ",
    });
});

router.post('/signup', function (req, res) {
    var personInfo = req.body;

    if (!personInfo.name || !personInfo.id || !personInfo.password) {
        res.render('signup', {
            message: "Sorry, wrong information",
            type: "error"
        });
    }
    person.findOne({ id: personInfo.id }, function (err, existingUser) {
        if (err) {
            console.error(err);
            return res.render('signup');
        }

        if (existingUser) {
            return res.render('signup', {
                message: "User with this ID already exists. Please choose another ID.",
                type: "error"
            });
        }
        else {
            var newperson = new person({
                name: personInfo.name,
                id: personInfo.id,
                password: personInfo.password,
                status: 1,
                position: 'Basic'
            });

            newperson.save(function (err, person) {
                if (err) {
                    res.render('signup', {
                        message: "Database error",
                        type: 'error'
                    });
                } else {
                    req.session.person = newperson;
                    res.redirect('articles');
                }
            });
        }
    });
});

router.get('/logout', function (req, res) {
    req.session.destroy(function () {
        console.log("user logged out.");
    });
    res.redirect('login');
});

module.exports = router;
