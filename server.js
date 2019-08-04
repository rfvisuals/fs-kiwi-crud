//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;

// DATA 
const Steak = require('./models/data.js');

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Fix Depreciation Warnings from Mongoose*
// May or may not need these depending on your Mongoose version
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form




//___________________
// Routes
//___________________
//localhost:3000
//INDEX ROUTE
// app.get('/steaks' , (req, res) => {
//   res.render('index.ejs');
// });


// PUT ROUTE-RECEIVE DATA FROM OTHER PAGES AND SENDS 
// TO INDEX
app.get('/steaks', (req, res) => {
	console.log(req.body)
	//access db and look for steak data
	Steak.find({}, (error, newSteak) => {
		//render this onto index page
		res.render('index.ejs', {
			steaks: newSteak
		});
	});
});

//CREATE ROUTE - WHEN USER HITS PAGE THEY CAN ADD NEW CONTENT
app.get('/steaks/new', (req, res) => {
  res.render('new.ejs');
})

//POST ROUTE
app.post('/steaks/', (req, res) => {
	//takes data and populates db, appends
	// to body
	
    		Steak.create(req.body, (error, newSteak) => {
			res.redirect('/steaks')
		})
console.log('from post route', req.body);
});


//EDIT ROUTE
app.get('/steaks/:id', (req, res) => {
	//get the steak id that was clicked from database
	Steak.findById(req.params.id, (err, selectedSteak) => {
		res.render('edit.ejs', {
			steaks: selectedSteak
		})
	})	
})
//PUT ROUTE
app.put('/steaks/:id', (req, res)=>{
    Steak.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel)=>{
    res.redirect('/steaks');
	});
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));