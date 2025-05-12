const { ProductModel } = require("../Models/ProductSchema");

exports.productAdd = async (req, res) => {
    try {
        const { title, price, description, category } = req.body;

        if (req.file) {
            const singleImg = req.file?.filename;
            const newProduct = new ProductModel({ title, price, description, category, image: singleImg });
            await newProduct.save();
            console.log("Product created successfully", newProduct);
            return res.status(201).json(newProduct);
        }
        else {
            return res.status(400).json({ message: "Image is required" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.body, req.file, id, "data from update product route");

        const { title, price, description, category } = req.body;

        // const product = await ProductModel.findById(id);
        // if (!product) {
        //     return res.status(404).json({ message: "Product not found" });
        // }
        // // Update the product details
        // product.title = title || product.title;
        // product.price = price || product.price;
        // product.description = description || product.description;
        // product.category = category || product.category;
        // // Save the updated product
        // await product.save();
        // res.json(product);


        // Second Method for Update
        const singleImg = req.file?.filename;

        const updateData = {
            title,
            price,
            description,
            category
        };

        if (singleImg) {
            updateData.image = singleImg;
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await ProductModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
