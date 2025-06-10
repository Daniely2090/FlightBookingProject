# Flight Booking System

This project is a full-stack Flight Booking System that allows users to search available flights, view details, and make reservations.  
It includes a frontend built with React, a backend using Node.js and Express, and a PostgreSQL database managed with Sequelize.  
The system is fully containerized with Docker, and supports local and cloud deployment.

---

## Features

### Frontend
- Search flights by origin and destination
- Display flight details (origin, destination, airline, price, time)
- Book flights by submitting passenger name and seat number
- Built with React and Axios

### Backend
- REST API built with Express
- Sequelize ORM for database interaction
- Routes for flights and reservations
- Auto-population of default flights on startup

### Database
- PostgreSQL
- Tables: FlightPlan, Reservation
- Managed via Sequelize

---

## Technologies Used

- Frontend: React, Axios
- Backend: Node.js, Express.js, Sequelize
- Database: PostgreSQL
- Containerization: Docker, Docker Compose
- Deployment: Local and cloud-compatible

---

## Setup Instructions

### 1. Prerequisites
- Install [Node.js](https://nodejs.org/)
- Install [Docker](https://www.docker.com/)
- PostgreSQL running locally or in Docker

---

### 2. Clone the Repository

```bash
git clone https://github.com/<your-username>/FlightBookingProject.git
cd FlightBookingProject
```

---

### 3. Running the Project Locally

#### Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder with the following:

```env
DATABASE_HOST=localhost
DATABASE_USER=admin
DATABASE_PASSWORD=secret
DATABASE_NAME=flightdb
DATABASE_PORT=5432
```

Then run:

```bash
npm start
```

---

#### Frontend

```bash
cd frontend
npm install
npm start
```

> The frontend runs on `http://localhost:3000`

---

#### Database

1. Ensure PostgreSQL is running
2. Create a database named `flightdb`

---

### 4. Run with Docker

Build and start all services:

```bash
docker-compose up --build
```

Service URLs:
- Frontend: http://localhost:3000  
- Backend: http://localhost:5002

---

## API Endpoints

### Flights
- `GET /flights` – All flights  
- `GET /flights/:id` – Single flight  
- `GET /flights/search?origin=X&destination=Y` – Filtered flights  

### Reservations
- `GET /reservations` – All reservations  
- `POST /reservations` – Create new reservation

---

## CI/CD Pipeline (Optional)

The repository includes a GitHub Actions workflow (`.github/workflows/ci-cd.yml`) that can be extended for:
- Dependency installation
- Running backend tests
- Building the frontend

> Currently minimal setup — more steps can be added as needed.

---

## License

This project is released under the MIT License.

---

## Author


Gal Warsulker 206493173
Daniel Yehudai
meryl hassid
Avigail benitta
Liron Sasonker 207354366