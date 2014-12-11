var mongo = require("../config/database.js")


    
exports.addUser = function(req, res){
    console.log(req.body);
    mongo.insert( "user", 
                  user,
                  function(model) {
                  res.render('/');
                  }
                );
}

exports.findUser = function(req, res){
    var search = {username : req.name}
    console.log(search);
    mongo.find( "user",
                req.query,
                function(model) {
                res.render('/');
                }
               );
}

// In the case that no route has been matched
exports.errorMessage = function(req, res){
  var message = '<p>Error, did not understand path '+req.path+"</p>";
    // Set the status to 404 not found, and render a message to the user.
  res.status(404).send(message);
};

