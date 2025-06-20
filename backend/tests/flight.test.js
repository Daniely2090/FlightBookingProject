jest.setTimeout(60000); // הגדל את ה-timeout ל-60 שניות

const request = require('supertest');
const app = require('../server');
const sequelize = require('../config/database');

let server;
let PORT;

describe('Flight Booking API Tests', () => {
  beforeAll(async () => {
    server = app.listen(0); // הפעלת השרת על פורט דינמי
    PORT = server.address().port;

    let connected = false;
    for (let i = 0; i < 10; i++) {
      try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false });
        connected = true;
        console.log('Database connected successfully!');
        break;
      } catch (error) {
        console.log(`Database connection failed, retrying (${i + 1}/10)...`);
        await new Promise((resolve) => setTimeout(resolve, 5000)); // המתן 5 שניות
      }
    }
    if (!connected) {
      throw new Error('Failed to connect to the database after 10 attempts');
    }
  });

  afterAll(async () => {
    if (server) server.close(); // סגור את השרת
    await sequelize.close(); // סגור את החיבור למסד הנתונים
  });

  test('Server loads successfully', () => {
    expect(app).toBeDefined();
  });

  describe('GET /flights/search', () => {
    it('should return a list of flights matching search criteria', async () => {
      const response = await request(`http://localhost:${PORT}`).get('/flights/search?origin=Tel Aviv&destination=Phuket');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should return an empty array if no flights match', async () => {
      const response = await request(`http://localhost:${PORT}`).get('/flights/search?origin=InvalidCity&destination=InvalidCity');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('Database initialization', () => {
    it('should contain default flights', async () => {
      const flights = await sequelize.models.FlightPlan.findAll();
      expect(flights.length).toBeGreaterThan(0);
    });
  });

  test('Sample test to ensure Jest works', () => {
    expect(1 + 1).toBe(2);
  });
});
