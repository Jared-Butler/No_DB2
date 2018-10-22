const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cont = require('./controller');
require('dotenv').config();

const app = express();
app.use( bodyParser.json());
const dock = 4040;


//send searchTile from app.js here to store all saved cards.
let gifTile = []

// function    getGifs (req, res, next)  {
//     console.log("I'm doing something.")
//     let {searchInput} = req.body;
//     let{API_KEY} = process.env
//     axios.get(`${baseURL}q=${searchInput}key=${API_KEY}`)
//     .then((res) => res.status(200).send(res.body))
//     .catch(err => console.log(err))
// }

// console.log(cont);

app.get('/test', (req, res) => {res.status(200).send("Server is live")})

//this searches and returns the gifs
app.get('/api/gif/:searchParam', cont.getGifs); 

//this will display the saved gifs
app.get('/api/gifs', (req, res) => {res.status(200).send(gifTile)})

//this will add the saved gif, search, and description to the gifTile array above.
app.post('/api/gif', (req, res, next) => {
    // console.log(req.body);
    gifTile.push(req.body[0])
}
);

//This updates the gif tile array, allowing the user to pick a new gif.
// app.put("/api/gifs:id", (req, res, next) => {
    
// } );

//this updates the gifTile array, allowing the user to set a new description.
// app.put("/api/desc:id");

//this will be used to delete an entire gif object from the gifTile array above.
app.delete('/api/gifs/:id', (req, res, next) => {
    let i = req.params.id;
  
    gifTile.splice(i,1);
    res.sendStatus(200)
    
} );






app.listen(dock, console.log(`The party is lit at port: ${dock}`))