var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var db = require('./models');
var app = express();
var port = process.env.port || 8080;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

db.sequelize.sync({force: false }).then(function(){
	app.listen(port, function() {
		console.log("listening on port: ", port);
	});
});

require('./controllers/burgers_controller.js')(app);