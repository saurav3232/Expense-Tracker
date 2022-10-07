const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/expenseDb");
const expenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  date: String,
});
const expense = mongoose.model("expenses", expenseSchema);
const app = express();
const port = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});
app.get("/list", async (req, res) => {
  let data = await expense.find();
  res.send(data);
});

app.post("/create", async (req, res) => {
  let data = new expense(req.body);
  let result = await data.save();
  console.log(result);
  res.send(result);
});

app.delete("/delete/:expenseHeader", async (req, res) => {
  console.log(req.params.expenseHeader);
  let data = await expense.deleteOne({
    title:req.params.expenseHeader
  });
  res.send(data);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
