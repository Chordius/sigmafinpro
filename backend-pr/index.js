const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express()
const userRoute = require("./routes/user.route.js")
const itemRoute = require("./routes/item.route.js")

// middleware config
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

var openingLine = "Hello World!"

// routes
app.use('', userRoute);
app.use('/item/', itemRoute);

app.get('/', (req, res) => {
    res.send(openingLine);
});

mongoose.connect('mongodb+srv://admin123:6Iu1TcQd4DQVmkq1@cluster0.eej3p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => { 
    console.log('Connected!') 
    app.listen(3000, () => {
        console.log('Server is running on port 3000')
    })
});