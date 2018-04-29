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
var ComSchema = new mongoose.Schema({
    name:  {
        type: String, 
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters"],
        unique: [true, "Name must be unique"],
    },
    manage_id: {
        type: Number,
        required: [true, "Name is required"]
    },
    quantity: {
            type: Number
        },
    price: {
        type: String
    }
}, {timestamps: true });


// How to Retrieve the Schema and store it in the variable User
var Com = mongoose.model('Com', ComSchema);


//Promises are created to help stuff:
mongoose.Promise = global.Promise;


//All the Views and Logic 
app.get('/all', function(req, res){
    Com.find({}).sort('-createdAt').exec(function(err, result){
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
    Com.find({}).sort('-createdAt').exec(function(err, result){
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
    Com.findOne({_id: req.params.id}).sort("-createdAt").exec(function(err, result){
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
    Com.findOne({name: req.params.name}, function(err, result){
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
    var com = new Com(req.body);
    console.log('creating mov at 124');
    console.log(req.body);
    console.log(req.body.name)
    com.name = req.body.name;
    com.quantity = req.body.quantity;
    com.price = req.body.price;

    com.save(function(err, result){
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
    var newCom = req.body;

    console.log(newCom);
    console.log("======================================")
    Com.update({_id: req.params.id}, { $push: {messages: { name: newMovie.name, stars: newMovie.stars, review: newMovie.review }}}, function(err, rest){
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

    Com.find({_id: req.body._id}, function(err, lunch){
        
        console.log("===========")
        console.log(lunch[0]); 
        console.log(req.body._id);
        console.log(req.body.name);
        lunch[0].name = req.body.name;
        lunch[0].quantity = req.body.quantity;
        lunch[0].price = req.body.price;

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
    Com.findOne({_id: req.params.id}, function(err, rest){
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




app.delete('/delete/:id', function(req, res){
    console.log("HEREH +!+!)@)!(#*))*(@)*$(@#)($*)(#$*)(@#$")
    console.log(req.params.id);
    Com.remove( {_id: req.params.id}, function(err, result){
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