//Require the following Modules:
var express = require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');

//Instantiate your Express application:
var app = express();

//BodyParser and Static must be connected to the server:
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, './static')));

//ANGULAR is being connected:
app.use(express.static(__dirname + "/SaturdayApp/dist"));

// configure body-parser to read JSON
app.use(bodyParser.json());

//This is the Mongo and mongoose connection:
mongoose.connect('mongodb://localhost/saturday');

//The Schema along with the validation about how data is stored.
var MovieSchema = new mongoose.Schema({
    title:  {
        type: String, 
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters"],
        unique: [true, "Name must be unique"],
    },
    messages: [{
        name: {
            type: String, 
            minlength: 3
        },
        stars: {
            type: Number
        },
        review: {
            type: String,
            minlength: 3
        }
    }]
}, {timestamps: true });


// How to Retrieve the Schema and store it in the variable User
var Movie = mongoose.model('Movie', MovieSchema);


//Promises are created to help stuff:
mongoose.Promise = global.Promise;


//All the Views and Logic 
app.get('/all', function(req, res){
    Movie.find({}).sort('-createdAt').exec(function(err, result){
        if(err){
            myerr = { error: "==== there is an error! ====="};
            console.log(err);
            res.json(err);
        }else{
            console.log(result);
            res.json(result);
        }
    });
});


app.get('/reviews', function(req, res){
    Movie.find({}).sort('-createdAt').exec(function(err, result){
        if(err){
            myerr = { error: "==== there is an error! ====="};
            console.log(err);
            res.json(err);
        }else{
            console.log(result);
            res.json(result);
        }
    });
});



app.get('/by/:id', function(req, res){
    console.log("INSIDE OF ID");
    Movie.findOne({_id: req.params.id}).sort("-createdAt").exec(function(err, result){
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.json(err);
        }else{
            console.log('==== Edit this one  === ')
            console.log(result);
            console.log("were here");
            res.json(result);
        }
    });
});


app.get('/byName/:name', function(req, res){
    console.log("INSIDE OF ID");
    Movie.findOne({name: req.params.name}, function(err, result){
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.json(err);
        }else{
            console.log('==== Edit this one  === ')
            console.log(result);
            console.log("were here");
            res.json(result);
        }
    });
});


app.post('/create', function(req, res){
    var mov = new Movie(req.body);
    console.log('creating mov at 124');
    console.log(mov);
    mov.title = req.body.title;
    mov.save(function(err, result){

        if(err){
            console.log('we have an error in mov.sav at 131');
            console.log(err)
            res.json({message: 'error', error: err});
        }else{
            console.log('we have an success in mov.sav at 134');
            console.log(result)
            res.json({message: 'succes', data: result});
        }
    });
});


app.put('/addReview/:id', function(req, res){
    var newMovie = req.body;

    console.log(newMovie);
    console.log("======================================")
    Movie.update({_id: req.params.id}, { $push: {messages: { name: newMovie.name, stars: newMovie.stars, review: newMovie.review }}}, function(err, rest){
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.json(err);
        }else{
            console.log(rest);
            res.json(rest);
        }
    });
})


app.post('/edit/:id', function(req,res){

    Movie.find({_id: req.body._id}, function(err, lunch){
        
        console.log("===========")
        console.log(lunch[0]); 
        console.log(req.body._id);
        console.log(req.body.name);
        lunch[0].name = req.body.name;
        lunch[0].cuisine = req.body.cuisine;

        lunch[0].save(function(err){
            if(err){
                console.log('==== there is an error! =====')
                console.log(err);
                res.json(err);
            }else{
                console.log('==== Edit this one  === ')
                console.log(lunch);
                res.json(lunch);
            }
        });
    });
});


app.get('/quotesBy/:id', function(req, res){
    console.log(req.params.id);
    console.log("========WE'RE ADDING A QUOTE=======")
    Movie.findOne({_id: req.params.id}, function(err, rest){
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.json(err);
        }else{
            console.log('==== Edit this one  === ')
            console.log(rest);
            console.log("were here");
            res.json(rest);
        }
    });
});


app.put('/like/:id', function(req, res){
    var newRest = req.body;
    console.log("85748394857584934857548394857548398475483948")
    console.log(newRest);

    Movie.update({_id: req.params.id}, { $set: { rank: newRest.rank }}, function(err, rest){
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.json(err);
        }else{
            console.log('==== Edit this one  === ')
            console.log(rest);
            console.log("were here");
            res.json(rest);
        }
    });
})


app.delete('/delete/:id', function(req, res){
    console.log(req.params.id);
    Movie.remove( {_id: req.params.id}, function(err, result){
        // This code will run when the DB has attempted to remove one matching record to {_id: 'insert record unique id here'}
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.json(err);
        }else{
            console.log('==== Edit this one  === ')
            console.log(result);
            console.log("were here");
            res.json(result);
        }        
    })
});


app.all('*', (req, res, next) => {
    res.sendFile(path.resolve('./SaturdayApp/dist/index.html'));
});


//Setting up the Server to listen to a partical port:
app.listen(8000, function() {
    console.log("listening on port 8000");
})