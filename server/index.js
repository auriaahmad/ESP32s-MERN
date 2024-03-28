// Our Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const Temperature = require('./models.js');

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/sensordb')
    .then(() => {
        console.log('Connected to MongoDB');
        // Let us run the server. So it's running
        app.listen(3005, '0.0.0.0', () => {
            console.log('Server is running on port 3005');
            // res.send("connected");
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

    app.get ('/',(req, res)=>{
        res.send('<h1>connected to http://localhost:3005<h1/>')
    })
    app.post('/temperature', async (req, res) => {
        const { temp, timestamp } = req.body; // Assuming the request body contains 'value' and 'timestamp' fields
    
        try {
            // Create a new Temperature document
            const temperature = new Temperature({
                temp,
                timestamp: new Date(timestamp) // Convert timestamp to Date object
            });
    
            // Save the temperature data to MongoDB
            await temperature.save();
    
            res.status(201).send({ message: 'Temperature data saved successfully' });
        } catch (err) {
            console.error('Error saving temperature data', err);
            res.status(500).send({ error: 'An internal server error occurred' });
        }
    });

    app.get('/data', async (req, res) => {
        try {
          let numPoints = parseInt(req.query.numPoints) || 10; // Default to 10 if numPoints is not provided or not a number
          if (numPoints <= 0) {
            numPoints = 10; // Ensure numPoints is at least 1
          }
          // Retrieve temperature data from MongoDB
          const temperatures = await Temperature.find().sort({ timestamp: -1 }).limit(numPoints);
          res.status(200).json(temperatures);
        } catch (err) {
          console.error('Error fetching temperature data', err);
          res.status(500).send({ error: 'An internal server error occurred' });
        }
      });