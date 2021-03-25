//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

let items= ["Solve DSA problems", "Write assignments", "Buy books" ];

app.get("/", function(req, res){
  let today = new Date();

  let options={
    month:"long",
    day:"numeric",   
    year:"numeric",
    weekday:"long"
  }

  let day = today.toLocaleDateString("en-US",options);

  res.render("list",{Date:day, listNewItem:items})
});

app.post("/",function(req,res){
  item =req.body.newItem;
  items.push(item);
  res.redirect("/");

});

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
