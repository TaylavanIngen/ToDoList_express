//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/toDoListDB")
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
})

const Item = mongoose.model(
  "Item", itemsSchema
)

const washDishes = new Item({
  name: "Wash dishes"
})
const doGroceries = new Item({
  name: "Do groceries"
})
const petCat = new Item({
  name: "Pet the cat"
})



app.get("/", function(req, res) {
  Item.find({}, function(err, foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany([washDishes, doGroceries, petCat], function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log("Succesfully saved default")
        }
      })
      res.redirect("/")
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: foundItems
      })
    }

  })
});

app.post("/", function(req, res) {

  const item = new Item ({name: req.body.newItem})
  item.save();
    res.redirect("/");
  })

app.post("/delete", function(req, res){

const checkedItem= req.body.checkbox

  Item.findByIdAndRemove(checkedItem, function(err){
    if(!err){
      console.log("Succesfully deleted item")
        res.redirect("/")
    }
  })

})


app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
