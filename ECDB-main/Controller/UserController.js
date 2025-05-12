const { UserSchema } = require("../Models/UserSchema");
const bcrypt = require("bcryptjs");
const { jwtAuthMiddleware, generateToken, verifyToken } = require('../jwt')

exports.store = async (req, res) => {
    try {
        console.log("Register route hit", req.body);

        const { name, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        // the hashed password is stored in the database and contains hashed password and salt
        console.log("Hashed password:", hashedPassword);

        const userData = await UserSchema.create({
            name,
            lastName,
            email,
            password: hashedPassword,
        });

        // Method - 1 : the user data is stored in the database and contains user id and email 
        const token = generateToken({ id: userData._id, email: userData.email });
        // the token is generated and contains user id and email
        console.log("Token generated:", token);

        // Method - 2 : the user data is stored in the database and contains user id and email

        // const token = jwt.sign({ id: userData._id, email: userData.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Method - 3 : the user data is stored in the database and contains user id and email

        // const payload = { id: userData._id, email: userData.email };
        // const token = generateToken(payload);
        // Generate the token using the payload and secret key

        res.status(200).json({ token: token, message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const users = await UserSchema.find({}).select('+password');
        res.json(users);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    console.log("Login route hit", req.body);
    const { email, password } = req.body;
    // Check if user exists
    await UserSchema.findOne({ email })
        .then((user) => {
            if (!user) {
                // return res.status(404).json({ message: "User not found" });
                return res.json({ message: "User not found" });
            }

            // Check if password is correct using bcrypt
            // bcrypt.compare(password, user.password).then((isMatch) => {
            //     if (isMatch) {
            //         return res.status(200).json({ message: "Login successful" });
            //     } else {
            //         return res.status(401).json({ message: "Password is incorrect" });
            //     }
            // });

            // Check if password is correct using jwt
            const isMatch = bcrypt.compareSync(password, user.password);
            if (isMatch) {
                const token = generateToken({ id: user._id, email: user.email });
                return res.status(200).json({ token: token, message: "Login successful" });
            } else {
                return res.status(401).json({ message: "Password is incorrect" });
            }
        })
        .catch((err) => {
            console.error("Error during login:", err);
            return res.status(500).json({ message: "Internal server error" });
        });
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lastName, email, password } = req.body;
        console.log("Update route hit", name, lastName, email, password + " id : " + id);

        const updatedUser = await UserSchema.findByIdAndUpdate(
            id,
            { name, lastName, email, password },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await UserSchema.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
