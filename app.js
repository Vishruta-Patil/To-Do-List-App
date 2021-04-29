//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const ejs = require("ejs");
const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true})
const itemsSchema = {
  name:String   
}
const Item = mongoose.model("Item",itemsSchema)

const item1 = new Item ({
  name: "Welcome to your todolist!!"
});
const item2 = new Item ({
  name: "Hit the + button to add new item"
});
const item3 = new Item ({
  name: "<< Hit this to delete an item."
});

const defaultItems = [item1,item2,item3];


app.get("/", function(req, res){
  Item.find({},function(err,foundItems) {
    if(foundItems.length == 0) {
      Item.insertMany(defaultItems,function(err) {
    if(err) {console.log(err)}
  else  {console.log("Sucessfully saved items in the DB")}
});

res.redirect("/");
    }
    else {
      res.render("list",{Date:day, listNewItem:foundItems})     
    }
  });
  

  let today = new Date();    
  let options={
    month:"long",
    day:"numeric",   
    year:"numeric",
    weekday:"long"
  }
  let day = today.toLocaleDateString("en-US",options);
});


app.post("/",function(req,res){
 const itemName =req.body.newItem;
  const item = new Item ({
    name: itemName
  });
  item.save();
  res.redirect("/");
});


app.post('/delete',function(req,res){
 const checkedId = req.body.noyItem;
 Item.findByIdAndRemove (checkedId,function(err){
   if(err) {console.log(err);}
   else {
     console.log("Sucessfully deleted");
     res.redirect("/");
   }
 })
});

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
