const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// In-memory data store for events
let events = [];
let idCounter = 1;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Get all events
app.get('/events', (req, res) => {
  res.json(events);
});

// Create a new event
app.post('/events', (req, res) => {
  const event = req.body;
  event.id = idCounter++;
  events.push(event);
  res.status(201).json(event);
});

// Delete an event by ID
app.delete('/events/:id', (req, res) => {
  const { id } = req.params;
  events = events.filter(event => event.id !== parseInt(id));
  res.status(200).json({ message: 'Event deleted' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
