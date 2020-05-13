const express = require("express");
const bodyParser = require("body-parser")
const app = express();

let toDoItems = [];
let toDoItemsWork=[];

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname+ "/public"))

app.get("/", function(req, res){

let today = new Date();
const options= {weekday:"long", year: "numeric", month:"long", day: "numeric"}
let day= today.toLocaleDateString("nl-NL", options)


res.render ("list", {whatTitle: day, newInput: toDoItems})

})


app.post("/", function(req, res){

let item= req.body.toDoInput

if (req.body.list === "Work"){
  toDoItemsWork.push(item)
  res.redirect("/work")
}
else{
toDoItems.push(item)
res.redirect("/")
}
})

app.get("/work", function(req, res){

res.render("list", {whatTitle: "Work List", newInput:toDoItemsWork})
})

app.get("/about", function(req, res){

  res.render("about")
})

app.listen(3000, function(){
  console.log("running server on 3000")
});
