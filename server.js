/*function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}
const express = require('express');
const app = express();
app.use(requireHTTPS);

app.use(express.static('./dist/connect4-rh-trainees'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/connect4-rh-trainees/src/'}
  );
  });

  app.listen(process.env.PORT || 8080);

*/


/*
//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
//app.use(express.static(__dirname + '/dist/connect4-rh-trainees'));
app.use(express.static(path.join(__dirname,'./dist/connect4-rh-trainees')));


//app.get('/*', function(req,res) {
app.get('/', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/connect4-rh-trainees/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080); 
*/

//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the angularapp directory
app.use(express.static(__dirname + '/connect4-rh-trainees'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/connect4-rh-trainees/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);