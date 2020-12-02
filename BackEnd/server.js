const express = require('express')
const app = express()
const port = 4000 //changed to 4000 as 3000 is hosting another server
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); //used to connect us to mongoDB (database)

//cors
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//connecting to mongoDB
const strConnection = 'mongodb+srv://admin:admin@cluster0.hrgmz.mongodb.net/MyFilms?retryWrites=true&w=majority';
mongoose.connect(strConnection, {useNewUrlParser: true});

//making a schema for database
const Schema = mongoose.Schema;
//data we're going to store
const movieSchema = new Schema({
    Title:String,
    Year:String,
    Poster:String
})
//movieModel is what we call now when we want to interact with the database
const movieModel = mongoose.model('film', movieSchema);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/movies', (req, res) => {
    //find all documents in database
    movieModel.find((err,data)=>{
        res.json(data);
    })
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    //         "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    
})

app.get('/api/movies/:id',(req, res, next)=>{
    console.log(req.params.id);
    movieModel.findById(req.params.id, (err,data)=>{
        res.json(data);
    })
})
//delete movies
app.delete('/api/movies/:id', (req, res)=>{
    console.log(req.params.id);
    movieModel.findByIdAndDelete({_id:req.params.id},
         (err, data)=>{
        res.send(data);
    })
})

app.put('/api/movies/:id', (req,res)=>{
    console.log("Update movie: "+req.params.id);
    console.log(req.body);

    movieModel.findByIdAndUpdate(req.params.id,req.body, {new:true},
        (err,data)=>{
            res.send(data);
        })
})

app.post('/api/movies', (req, res) => {
    console.log(req.body);

    movieModel.create({
        Title:req.body.Title,
        Year:req.body.Year,
        Poster:req.body.Poster
    })
    .then()
    .catch();

    res.send('Data Recieved!');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})