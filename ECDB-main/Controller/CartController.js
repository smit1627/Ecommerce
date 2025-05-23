const { CartUser } = require("../Models/CartSchema");

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;
        console.log("Add to cart route hit", userId, productId, quantity);

        // Check if the user already has a cart
        let cart = await CartUser.findOne({ userId });

        if (cart) {
            // Cart exists, check if product already in cart
            const existingItem = cart.items.find(item => item.productId.toString() === productId);
            if (existingItem) {
                // Decide on the behavior you want:
                // Option 1: Replace quantity completely
                existingItem.quantity = quantity;

                // Option 2: Add specified quantity to existing
                // existingItem.quantity += quantity;

                // Option 3: If you want to set a maximum quantity
                // existingItem.quantity = Math.min(existingItem.quantity + quantity, MAX_QUANTITY);
            } else {
                // Product not in cart, add new item
                cart.items.push({ productId, quantity });
            }
        } else {
            // No cart exists, create new cart
            cart = new CartUser({
                userId,
                items: [{ productId, quantity }]
            });
        }

        // Save the cart (whether new or updated)
        const updatedCart = await cart.save();

        // Populate the cart with user and product details
        const populatedCart = await CartUser.findById(updatedCart._id)
            .populate('userId', 'name email')
            .populate('items.productId', 'description price image')
            .exec();

        res.status(200).json(populatedCart);
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await CartUser.findOne({ userId })
            .populate('userId', 'name email profile') // Replace with the user fields you need
            .populate('items.productId', 'name price description image category') // Replace with the product fields you need
            .exec();

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const itemId = req.params.id;

        const updatedCart = await CartUser.findOneAndUpdate(
            { userId },
            { $pull: { items: { _id: itemId } } }, // REMOVE the item from the items array
            { new: true } // return the updated cart
        )
            .populate('userId', 'name email')
            .populate('items.productId', 'name price description image category');

        if (!updatedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json({
            message: "Item deleted from cart successfully",
            cart: updatedCart
        });

        // This method wouldn't work if you're deleting an item inside items[]
        // const id = req.params.id;
        // const userDelete = await CartUser.findByIdAndDelete({ _id: id });
        // // const userDelete = await CartUser.findByIdAndDelete(id);
        // if (!userDelete) {
        //   return res.status(404).json({ message: "Cart not found" });
        // }
        // res.status(200).json({ message: "Item deleted from cart successfully" });
    } catch (error) {
        console.error("Error deleting item from cart:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

//   Note for delete an cart product inside the item
//   🚫 Don't use this if you're deleting an item inside items[]:

// if you're deleting a specific cart item, not the entire cart, you should use $pull with findOneAndUpdate, not findOneAndDelete.

// Summary:
// Goal	Method to Use
// Delete entire cart by _id - 	findByIdAndDelete(id) or findOneAndDelete({ _id: id })
// Delete an item in items[]	findOneAndUpdate({ userId }, { $pull: { items: { _id: itemId } } })

exports.updateCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;
        const { quantity } = req.body;

        // Find the user's cart
        let cart = await CartUser.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Find the item by productId
        const item = cart.items.find(item => item.productId._id == productId);

        if (!item) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        // Update the quantity
        item.quantity = quantity;

        // Save the updated cart
        const updatedCart = await cart.save();

        // Populate the cart before sending response
        const populatedCart = await CartUser.findById(updatedCart._id)
            .populate('userId', 'name email')
            .populate('items.productId', 'name price description image category');

        res.status(200).json({
            message: "Cart item quantity updated successfully",
            cart: populatedCart
        });

    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
