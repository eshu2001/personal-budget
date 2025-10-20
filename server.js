const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Budget = require('./models/budget_schema');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // serve HTML/CSS/JS files


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/personal_budget', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html')); // adjust relative path
});

// GET budget items
app.get('/budget', async (req, res) => {
    try {
        const budgetItems = await Budget.find({});
        res.json({ myBudget: budgetItems });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST new budget item
app.post('/budget', async (req, res) => {
    try {
        const { title, value, color } = req.body;
        const newBudget = new Budget({ title, value, color });
        await newBudget.save();
        res.status(201).json(newBudget);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
