const express = require('express');
const router = express.Router();
const { jwtAuthMiddleware } = require('../jwt')

const UserController = require("../Controller/UserController");

router.post("/register", UserController.store);
router.post("/login", UserController.login);
router.get("/getAll", UserController.getAll);
// router.put("/update/:id", UserController.updateUser);
// router.delete("/delete/:id", UserController.deleteUser);

// Product routes
const ProductController = require("../Controller/ProductController");
const upload = require('../upload');

router.post("/productAdd", jwtAuthMiddleware, upload.single('image'), ProductController.productAdd);
router.get("/getAllProducts", ProductController.getAllProducts);
router.get("/getSingleProduct/:id", ProductController.getSingleProduct);
router.put("/updateProduct/:id", jwtAuthMiddleware, upload.single('image'), ProductController.updateProduct);
router.delete("/deleteProduct/:id", jwtAuthMiddleware, ProductController.deleteProduct);


// Cart routes

const CartController = require("../Controller/CartController");
router.post("/addToCart", jwtAuthMiddleware, CartController.addToCart);
router.get("/getCart", jwtAuthMiddleware, CartController.getCart);
router.delete("/deletedProduct/:id", jwtAuthMiddleware, CartController.removeFromCart);
router.put("/updateCart/:productId", jwtAuthMiddleware, CartController.updateCart);


module.exports = router;
