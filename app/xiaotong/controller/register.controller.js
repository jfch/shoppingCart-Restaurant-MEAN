﻿var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');

router.get('/', function (req, res) {
    res.render('register');
});

//router.post('/', function (req, res) {
//    // register using api to maintain clean separation between layers
//    request.post({
//        url: config.apiUrl + '/users/register',
//        form: req.body,
//        json: true
//    }, function (error, response, body) {
//        if (error) {
//            return res.render('register', { error: 'An error occurred' });
//        }
//
//        if (response.statusCode !== 200) {
//            return res.render('register', {
//                error: response.body,
//                username: req.body.username,
//                phonenum: req.body.phonenum,
//                email: req.body.email,
//            });
//        }
//
//        // return to login page with success message
//        req.session.success = 'Registration successful';
//        return res.redirect('/login');
//    });
//});


router.post('/', function (req, res) {
    // register using api to maintain clean separation between layers
    request.post({
        url: config.awsApiUrl + '/user/signup/' + req.body.username + '/' + req.body.password + '/' + req.body.phonenum + '/' + req.body.email + '/',
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render('register', { error: 'An error occurred' });
        }

        if (response.statusCode !== 200 || !response.body.success) {
            return res.render('register', {
                error: response.body.msg,
                username: req.body.username,
                phonenum: req.body.phonenum,
                email: req.body.email,
            });
        }
        //
        //if () {
        //    return res.render('register', {
        //        error: response.body,
        //        username: req.body.username,
        //        phonenum: req.body.phonenum,
        //        email: req.body.email,
        //    });
        //}

        // return to login page with success message
        req.session.success = 'Registration successful';
        return res.redirect('/login');
    });
});

module.exports = router;