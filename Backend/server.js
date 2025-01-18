const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({origin: 'https://singup-form-387o.vercel.app'}));

// Connect to MongoDB Atlas
const uri = process.env.MONGO_URI;
mongoose
  .connect(uri)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define Schema and Model
const FormDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    phone:Number,
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

// Update Route
app.put('/api/data/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const result = await FormData.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: 'Failed to update data' });
    }
});

// Delete data
app.delete('/api/data/:id', async (req, res) => {
    const { id } = req.params;
//console.log(id)
    try {
        
        const data =  await FormData.findByIdAndDelete(id);
        console.log(data)
        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete data' });
    }
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
