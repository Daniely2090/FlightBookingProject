const sequelize = require('./config/database');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5002;

const FlightPlan = require('./models/FlightPlan');
const Reservation = require('./models/Reservation');

// Add default flight plans if none exist
async function initializeFlightPlans() {
  const count = await FlightPlan.count();
  if (count === 0) {
    await FlightPlan.bulkCreate([
      {
        origin: 'Tokyo',
        destination: 'London',
        flightNumber: 'JL401',
        airline: 'Japan Airlines',
        departureTime: '2025-07-01T10:00:00',
        price: 650
      },
      {
        origin: 'Las Vegas',
        destination: 'Hawaii',
        flightNumber: 'HA89',
        airline: 'Hawaiian Airlines',
        departureTime: '2025-07-02T14:30:00',
        price: 480
      },
      {
        origin: 'Paris',
        destination: 'Maldives',
        flightNumber: 'AF123',
        airline: 'Air France',
        departureTime: '2025-07-03T08:00:00',
        price: 730
      },
      {
        origin: 'Tel Aviv',
        destination: 'Phuket',
        flightNumber: 'LY987',
        airline: 'El Al',
        departureTime: '2025-07-04T23:15:00',
        price: 820
      },
      {
        origin: 'Cape Town',
        destination: 'Johannesburg',
        flightNumber: 'SA204',
        airline: 'South African Airways',
        departureTime: '2025-07-05T17:00:00',
        price: 120
      },
      {
        origin: 'Dubai',
        destination: 'Tulum',
        flightNumber: 'EK777',
        airline: 'Emirates',
        departureTime: '2025-07-06T02:00:00',
        price: 990
      },
      {
        origin: 'Costa Rica',
        destination: 'Peru',
        flightNumber: 'AV456',
        airline: 'Avianca',
        departureTime: '2025-07-07T13:00:00',
        price: 410
      },
      {
        origin: 'Barcelona',
        destination: 'Miami',
        flightNumber: 'IB741',
        airline: 'Iberia',
        departureTime: '2025-07-08T09:45:00',
        price: 620
      },
      {
        origin: 'Madrid',
        destination: 'Ibiza',
        flightNumber: 'VY101',
        airline: 'Vueling',
        departureTime: '2025-07-09T19:30:00',
        price: 95
      },
      {
        origin: 'Rome',
        destination: 'Mauritius',
        flightNumber: 'AZ300',
        airline: 'ITA Airways',
        departureTime: '2025-07-10T22:15:00',
        price: 740
      },
      {
        origin: 'Bangkok',
        destination: 'Philippines',
        flightNumber: 'TG999',
        airline: 'Thai Airways',
        departureTime: '2025-07-11T06:00:00',
        price: 320
      },
      {
        origin: 'San Francisco',
        destination: 'Sri Lanka',
        flightNumber: 'UA802',
        airline: 'United Airlines',
        departureTime: '2025-07-12T15:00:00',
        price: 880
      }
    ]);
    console.log('🌍 New flight plans added to the database');
  }
}

// ✅ שינוי כאן – בלי force:true!
sequelize.sync().then(() => {
  console.log('✅ Database synced successfully');
  initializeFlightPlans();
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Flight Booking API');
});

// FlightPlan routes
app.get('/flights', async (req, res) => {
  try {
    const flights = await FlightPlan.findAll();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch flight plans' });
  }
});

app.get('/flights/search', async (req, res) => {
  const { origin, destination } = req.query;
  try {
    const flights = await FlightPlan.findAll({
      where: {
        ...(origin && { origin }),
        ...(destination && { destination })
      }
    });
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: 'Flight search failed' });
  }
});

app.get('/flights/:id', async (req, res) => {
  try {
    const flight = await FlightPlan.findByPk(req.params.id);
    if (flight) {
      res.json(flight);
    } else {
      res.status(404).json({ error: 'Flight plan not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving flight plan' });
  }
});

// Reservation routes
app.get('/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch reservations' });
  }
});

app.post('/reservations', async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'Reservation creation failed' });
  }
});

app.get('/reservations/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (reservation) {
      res.json(reservation);
    } else {
      res.status(404).json({ error: 'Reservation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving reservation' });
  }
});

// Start server only if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
