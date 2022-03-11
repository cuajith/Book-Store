const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/book-routes');

//middleware
app.use(express.json())
app.use(cors())
app.use('/books',router)

//Database Connection
mongoose.connect("mongodb+srv://ajith080:mongoatlas@cluster0.62w7s.mongodb.net/bookStore?retryWrites=true&w=majority").
then(()=> console.log("Database Connected"))

app.listen(5000, ()=>{
    console.log("Server Started")
})