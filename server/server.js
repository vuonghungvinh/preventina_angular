var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var cors = require('cors');
//firebase
var firebase = require("firebase");
require("firebase/auth");
require("firebase/database");
var config = {
    apiKey: "AIzaSyB0Gh1qJB8CO65U7fcBXwgHE8RxVJ8roUk",
    authDomain: "preventina-9573b.firebaseapp.com",
    databaseURL: "https://preventina-9573b.firebaseio.com",
    projectId: "preventina-9573b",
    storageBucket: "preventina-9573b.appspot.com",
    messagingSenderId: "590741124640"
};
firebase.initializeApp(config);
var email = "123@virtualsushi.com";
var password = "123456";

firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
    console.log(error.code);
    console.log(error.message);
});
////////////////////////////////////

app.use(cookieParser());
app.use(session({ secret: "Shh, its a secrect!" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: true}));
app.use(function (req, res, next) {
    
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', function(req, res){
    res.json({"test": 'hello!'});
});

app.get('/tabs', function(req, res) {
    var ref = firebase.database().ref('/tabs');
    ref.once("value", function(snapshot) {
        console.log('LOOPING TABS');
        console.log(snapshot.val());
        res.json(snapshot.val());
    }, function (error) {
        res.json({"error": error.code});
    });
});

app.get('/gears', function(req, res){
    var ref = firebase.database().ref('/gears');
    ref.once("value", function(snapshot) {
        console.log('LOOPING GEARS');
        console.log(snapshot.val());
        res.json(snapshot.val());
    }, function(error) {
        res.json({'error': error.code});
    });
});

app.post("/createposter", function(req, res) {
    var ref = firebase.database().ref();
    var postsRef = ref.child("posters");
    var key = postsRef.push(req.body).key;
    res.json({id: key});
});

app.get('/loadposters', function(req, res) {
    var ref = firebase.database().ref('/posters');
    ref.once("value", function(snapshot) {
        res.json(snapshot.val());
    }, function(error) {
        res.json({'error': error.code});
    });
});

var server = app.listen(3000, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("app listening at http://%s:%s", host, port)
});