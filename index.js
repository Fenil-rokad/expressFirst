const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;
const User = require("./models/User");

// Middleware
app.use(cors());
app.use(bodyParser.json());
mongoose.connect(
  "mongodb+srv://rohitrathod60371:Q2NJxWSjgYj9sPVu@cluster0.vrpxzev.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
console.log("Mongodb Connected Successfully");


// Method 1-> Post Method
app.post("/signup", async (req, res) => {
  try {
    const { name, email, age, address } = req.body;
    const user = new User({
      name,
      email,
      age,
      address,
    });
    const newUser = await user.save();
    return res
      .status(200)
      .json({ message: "My first api of signup is created", newUser });
  } catch (err) {
    return res.status(500).json({ message: "An Error occured", error });
  }
});
// GetMethod

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "An Error occured" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    if (!users) {
      return res
        .status(400)
        .json({ message: "User is not present kindly check your data" });
    }
    res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An Error occured" });
  }
});

// Update Details of an user

app.put("/users/:id", async (req, res) => {
  try {
    // findByIdAndUpdate
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(400).json({ messsage: "User not exists" });
    }
    res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: "An error occured" });
  }
});

// Delete Method

app.delete("/users/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(400).json({ messsage: "User not exists" });
    }
    res.json(deleted);
  } catch (error) {
    return res.status(500).json({ message: "An error occured" });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
