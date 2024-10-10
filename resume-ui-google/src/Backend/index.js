const express = require("express");
const app = express();
const cors = require("cors");
const collection = require("./mongodb");

// Admin access token
const ADMIN_ACCESS_TOKEN = "123456789"; // The only valid access token for admin account creation

// Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/signup', async (req, res) => {
    const { name, password, role, accessToken } = req.body;

    try {
        // If the role is 'admin', check the access token
        if (role === 'admin') {
            if (accessToken !== ADMIN_ACCESS_TOKEN) {
                return res.status(401).json({ message: "Invalid admin access token. Cannot create admin account." });
            }
        }

        // Save user details to the database
        const data = { name, password, role };
        await collection.insertMany([data]);
        res.status(200).json({ message: "Signup successful" });
    } catch (error) {
        res.status(500).json({ message: "Error signing up" });
    }
});

app.post('/login', async (req, res) => {
    const { name, password, role } = req.body;

    try {
        // Check if the user exists
        const check = await collection.findOne({ name });

        // Check if user exists, passwords match, and role is correct
        if (check && check.password === password && check.role === role) {
            res.status(200).json({ message: "Login successful", role: check.role });
        } else {
            res.status(401).json({ message: "Invalid login details" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});