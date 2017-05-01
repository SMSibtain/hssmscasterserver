var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
// var groupsApiResponses = require('app/api/groupsApiResponses');

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// app.use('/groups', require('app/api/groupsApiResponses'))

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/check', function(request, response) {
  response.send({is_executed:true,
    path:__dirname+'/api/groupsApiResponses/check1'});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});