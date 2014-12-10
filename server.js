/*
 Module dependencies:

 - Express
 - Http (to run Express)
 - Body parser (to parse JSON requests)
 - Underscore (because it's cool)
 - Socket.IO

 It is a common practice to name the variables after the module name.
 Ex: http is the "http" module, express is the "express" module, etc.
 The only exception is Underscore, where we use, conveniently, an
 underscore. Oh, and "socket.io" is simply called io. Seriously, the
 rest should be named after its module name.

 */
var express = require("express")
  , app = express()
  , http = require("http").createServer(app)
  , bodyParser = require("body-parser")
  , io = require("socket.io").listen(http)
  , _ = require("underscore");

var socket = io.connect("http://nodesample-gschilli.rhcloud.com:8000");

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

var session = require('express-session');

var superagent = require('superagent');
require('superagent-oauth')(superagent);
var OAuth = require('oauth');
var helpers = require('express-helpers');
helpers(app);

//Twitter API Keys
var TWITTER_CONSUMER_KEY = "7B7wyCdaM51Kcip9J8PoMLspI";
var TWITTER_CONSUMER_SECRET = "fhUgnY7GdATLv9gsrT3VLx4rOHRpSQz6qbvVvoYWOuZYjAhJxB";

// models (normally would save to a DB)
function User() {
  this.id = null;

  // we all start off as female, according to
  // https://www.youtube.com/watch?v=z1Kdoja3hlk
  this.firstname = "Jane";

  // but then you might become a guy
  if(Math.random() > 0.51){
    this.firstname = "John";
  }

  this.lastname = "Doe";

  // this is a blank object that i'm using to
  // assign various Twitter attributes to, 
  // such as the profile and various tokens
  this.twitter = new Object();
}

// this is the user object that is referenced
// throughout the application
var user = new User();
console.log(user.firstname);

// all environments
//app.configure(function() {
  //app.set('views', __dirname + '/views');
  //app.set('view engine', 'ejs');
  //app.use(express.logger());
  //app.use(express.cookieParser());
  //app.use(express.bodyParser());
  //app.use(express.methodOverride());
app.use(session({ secret: 'keyboard cat' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
//app.use(app.router);
app.use(express.static(__dirname + '/public'));

// serialize users
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

/* Server config */

//Server's IP address
//app.set("ipaddr", "127.0.0.1");

//Server's port number
//app.set("port", 8080);

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

// Twitter strategy
// this first part deals with authenticating the user
// we're passing the consumer key, consumer secret, and callback URL to Twitter
// the function parameters are what is returned from a successful authentication
// those parameters are token, tokenSecret, and profile

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://"+server_ip_address+":"+server_port+"/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {

    // you will want to save each of these to the user,
    // most likely in the DB in your case

    user.twitter.profile = profile;
    user.twitter.token = token;
    user.twitter.tokenSecret = tokenSecret;

    // returns the user to the application
    return done(null, user);
  }
));

/*
 The list of participants in our chatroom.
 The format of each participant will be:
 {
 id: "sessionId",
 name: "participantName"
 }
 */
var participants = [];



//Specify the views folder
app.set("views", __dirname + "/views");

//View engine is EJS
app.set("view engine", "ejs");

//Specify where the static content is
app.use(express.static("public", __dirname + "/public"));

//Tells server to support JSON requests
app.use(bodyParser.json());

/* Server routing */

//Handle route "GET /", as in "http://localhost:8080/"
app.get("/", function(request, response) {

  //Render the view called "index"
  response.render("index", {user: user});

});

//twitter routes
// this route will be called when the user tries to connect to
// Twitter. from there, Passport magic happens
app.get('/auth/twitter', passport.authenticate('twitter'));

// this is the callback route that happens after the user puts
// in his or her information on the OAuth page. You can redirect
// the user to different places depending on whether or not they
// authenticated, but in my case, i'm just using the index page
// and a bunch of if statements in EJS anyways
app.get('/auth/twitter/callback', passport.authenticate('twitter', { successReturnToOrRedirect: '/', failureRedirect: '/' }));

// this route will disconnect the user's Twitter account from
// the user, which in this instance just means setting the
// user's 'twitter' attribute to a blank object again
app.get('/disconnect/twitter', function(req, res) { user.twitter = new Object(); res.redirect('/'); });




//POST method to create a chat message
app.post("/message", function(request, response) {

  //The request body expects a param named "message"
  var message = request.body.message;

  //If the message is empty or wasn't sent it's a bad request
  if(_.isUndefined(message) || _.isEmpty(message.trim())) {
    return response.json(400, {error: "Message is invalid"});
  }

  //We also expect the sender's name with the message
  var name = request.body.name;

  //Let our chatroom know there was a new message
  io.sockets.emit("incomingMessage", {message: message, name: name});

  //Looks good, let the client know
  response.json(200, {message: "Message received"});

});

/* Socket.IO events */
io.on("connection", function(socket){

  /*
   When a new user connects to our server, we expect an event called "newUser"
   and then we'll emit an event called "newConnection" with a list of all
   participants to all connected clients
   */
  socket.on("newUser", function(data) {
    participants.push({id: data.id, name: data.name});
    io.sockets.emit("newConnection", {participants: participants});
  });

  /*
   When a user changes his name, we are expecting an event called "nameChange"
   and then we'll emit an event called "nameChanged" to all participants with
   the id and new name of the user who emitted the original message
   */
  socket.on("nameChange", function(data) {
    _.findWhere(participants, {id: socket.id}).name = data.name;
    io.sockets.emit("nameChanged", {id: data.id, name: data.name});
  });

  /*
   When a client disconnects from the server, the event "disconnect" is automatically
   captured by the server. It will then emit an event called "userDisconnected" to
   all participants with the id of the client that disconnected
   */
  socket.on("disconnect", function() {
    participants = _.without(participants,_.findWhere(participants, {id: socket.id}));
    io.sockets.emit("userDisconnected", {id: socket.id, sender:"system"});
  });

});

//Start the http server at port and IP defined before
http.listen(server_port, server_ip_address, function() {
  console.log("Server up and running. Go to http://" + server_ip_address + ":" + server_port);
});