const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB Atlas
const uri = 'mongodb+srv://mubin9786:mubin9786@cluster0.73d76.mongodb.net/';
mongoose
  .connect(uri)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define Schema and Model
const FormDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
}, { timestamps: true });

const FormData = mongoose.model('FormData', FormDataSchema);

// Routes
app.post('/submit', async (req, res) => {
    try {
        const formData = new FormData(req.body);
        await formData.save();
        res.status(201).send('Data saved successfully');
        
    } catch (error) {
        res.status(400).send('Error saving data');
    }
});

app.get('/data', async (req, res) => {
    try {
        const data = await FormData.find();
        res.json(data);
    } catch (error) {
        res.status(400).send('Error fetching data');
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
