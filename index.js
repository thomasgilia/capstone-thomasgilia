require("dotenv").config();
const express = require("express");
const routes = require("./routes/index");
const cors = require('cors')
const app = express();
require("./db");
const exphbs = require('express-handlebars');
app.use(cors())
app.use(express.urlencoded({ extended: true }));    
app.use(express.json()); 
   
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "localhost:8000"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(routes);

app.use(express.static("public"));        


app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.listen(process.env.PORT || 3000, () => {
  console.log("Now listening");
});
