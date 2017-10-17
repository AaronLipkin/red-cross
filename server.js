const express        = require('express');
const app            = express();
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const session        = require('express-session');

const Car    = require('./models/carsModel.js');


app.use(express.static('public'))
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
	  secret: "flight from TPA to AUS", 
	  resave: false,
	  saveUninitialized: false
	 
}));

const sessionsController = require('./controllers/sessionsController.js');
app.use('/sessions', sessionsController);

app.get('/', (req, res)=>{
	res.render('index.ejs', {
		user : req.session.username,
		logged : req.session.logged
	})
});

app.post('/', (req, res)=>{
	console.log(req.body)
	Car.create(req.body, function(err, createdCar){
		res.json(createdCar); //.json() will send proper headers in response so client knows it's json coming back
	});

});

app.get('/admin', (req, res)=>{
	if (req.session.logged) {
		res.render('admin.ejs', {
			user : req.session.username,
		logged : req.session.logged
		})
	}
	else {
			res.redirect('/sessions/login')
	}
});

app.get('/cars', (req, res)=>{
	Car.find({}, function(err, foundCars) {
		res.json(foundCars)
	})
});

app.get('/thanks', (req, res)=>{
	res.render('thanks.ejs', {
		user : req.session.username,
		logged : req.session.logged
	})
});


var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/redcross';

mongoose.connect(mongoUri);
mongoose.connection.once('open', ()=>{
	console.log('connected to mongo');
});

port = process.env.PORT || 3000;

app.listen(port, ()=>{
	console.log('listening....');
});
