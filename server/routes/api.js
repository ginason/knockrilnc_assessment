"use static";

const express = require("express");
const router   = express.Router();
module.exports = router;
const api = require('../json/api.json');
const axios = require('axios');


router.get("/candidates", function(req, res) {
    console.log('api/candidates');
    axios.get('http://localhost:3001/candidates')
        .then(response => {
            return res.json({candidate: response.data});
        }).catch(err => {
        return res.json({err: err});
    });

});
router.get("/questions", function(req, res) {
    console.log('api/questions');
    axios.get('http://localhost:3001/questions')
        .then(response => {
            return res.json({question: response.data});
        }).catch(err => {
        return res.json({err: err});
    });
});
router.get("/questions/:id", function(req, res) {
    console.log('api/questions/:id');
    console.log(req.query.id);
    axios.get('http://localhost:3001/questions/' + req.query.id)
        .then(response => {
            return res.json({question: response.data});
        }).catch(err => {
        return res.json({err: err});
    });
});
router.get("/applications", function(req, res) {
    console.log('api/applications');
    axios.get('http://localhost:3001/applications')
        .then(response => {
            return res.json({application: response.data});
        }).catch(err => {
        return res.json({err: err});
    });
});
router.get("/applications/:id", function(req, res) {
    console.log('api/applications');
    console.log(req.query.id);
    axios.get('http://localhost:3001/applications/' + req.query.id)
        .then(response => {
            return res.json({application: response.data});
        }).catch(err => {
        return res.json({err: err});
    });
});
router.post("/applications/:id", function(req, res) {
    console.log('api/applications');
    let params = {
        videos: req.body.videos,
        id: req.body.id
    };
    axios.post('http://localhost:3001/applications', params)
        .then(response => {
            return res.json({application: response.data});
        }).catch(err => {
        return res.json({err: err});
    });
});
router.get("/comments/create", function(req, res) {
    console.log('post create api/comments');
    let params = {
        videoId: req.query.videoId,
        comment: req.query.comment
    };
    axios.post('http://localhost:3001/comments', params)
        .then(response => {
            return res.json({comments: response.data});
        }).catch(err => {
        return res.json({err: err});
    });
});
router.get("/comments/update", function(req, res) {
    console.log('post update api/comments');
    let params = {
        videoId: req.query.videoId,
        comment: req.query.comment
    };
    axios.put('http://localhost:3001/comments/' + req.query.id, params)
        .then(response => {
            return res.json({comments: response.data});
        }).catch(err => {
        return res.json({err: err});
    });
});
router.get("/comments", function(req, res) {
    console.log('get api/comments');
    let params = {
        videoId: req.query.videoId
    };
    axios.get('http://localhost:3001/comments?videoId=' + req.query.videoId)
        .then(response => {
            return res.json({comments: response.data});
        }).catch(err => {
        return res.json({err: err});
    });
});


