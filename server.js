const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'events.json');

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Events laden
function loadEvents() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

// Events speichern
function saveEvents(events) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(events));
}

// API-Routen
app.get('/api/events', (req, res) => {
  const events = loadEvents();
  res.json(events);
});

app.post('/api/events', (req, res) => {
  const events = loadEvents();
  const newEvent = {
    id: Date.now(),
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
    isClosed: req.body.isClosed || false // Standardwert: false
  };
  events.push(newEvent);
  saveEvents(events);
  res.json(newEvent);
});

app.put('/api/events/:id', (req, res) => {
  const events = loadEvents();
  const eventId = parseInt(req.params.id, 10);
  const index = events.findIndex(event => event.id === eventId);

  if (index !== -1) {
    events[index] = { ...events[index], ...req.body };
    saveEvents(events);
    res.json(events[index]);
  } else {
    res.status(404).send('Event not found');
  }
});

app.delete('/api/events/:id', (req, res) => {
  const events = loadEvents();
  const eventId = parseInt(req.params.id, 10);
  const updatedEvents = events.filter(event => event.id !== eventId);
  saveEvents(updatedEvents);
  res.json({ message: 'Event deleted' });
});



const express = require('express');
const basicAuth = require('express-basic-auth');

app.use(express.static('public'));

// Passwortschutz für /manage.html
app.use('/manage.html', basicAuth({
  users: { 'admin': 'meinPasswort' }, // Benutzername und Passwort festlegen
  challenge: true, // Zeigt den Browser-Authentifizierungsdialog an
}));

// Start des Servers
app.listen(3000, () => {
  console.log('Server läuft auf http://localhost:3000');
});



// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
