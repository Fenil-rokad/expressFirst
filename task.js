const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const Product = require("./models/Product");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(
  "mongodb+srv://rohitrathod60371:Q2NJxWSjgYj9sPVu@cluster0.vrpxzev.mongodb.net/product_api?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => console.log("MongoDB Connected Successfully"))
.catch((error) => console.error("MongoDB Connection Failed:", error));

app.get("/", (req, res) => {
  res.send("Product API");
});

// POST method
app.post("/products", async (req, res) => {
  try {
    const { name, price, category, inStock } = req.body;

    if (!name || price == null) {
      return res.status(400).json({ message: "Name and price are required." });
    }

    if (price <= 0) {
      return res.status(400).json({ message: "Price must be greater than 0." });
    }

    const product = new Product({ name, price, category, inStock });
    const savedProduct = await product.save();

    res.status(201).json({ message: "Product created successfully", product: savedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error while adding product", error });
  }
});

// GET method
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error while fetching products", error });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});

// Update method
app.put("/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});

// Delete Method
app.delete("/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted", product: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error in deleting", error });
  }
});

app.get("/products/in-stock", async (req, res) => {
  try {
    const inStockProducts = await Product.find({ inStock: true });
    res.json(inStockProducts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching in-stock products", error });
  }
});

app.listen(port, () => {
  console.log(`Product API running on http://localhost:${port}`);
});
