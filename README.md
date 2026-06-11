# Ride-Share App

A modern ride-sharing application built with Node.js and React.

## Features
- User authentication
- Real-time ride matching
- Driver and passenger management
- Payment processing
- Rating and reviews system

## Tech Stack
- **Backend**: Node.js, Express.js
- **Frontend**: React, React Router
- **Database**: MongoDB or PostgreSQL
- **Real-time**: Socket.io
- **Authentication**: JWT

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB or PostgreSQL

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dusneza/dusneza.git
cd dusneza
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in root:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_API_KEY=your_stripe_key
```

4. Start the server:
```bash
npm run dev
```

5. Start the frontend (in a new terminal):
```bash
cd client
npm start
```

## Project Structure

```
├── server/              # Backend code
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── controllers/     # Route controllers
│   └── middleware/      # Custom middleware
├── client/              # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── .env                 # Environment variables
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Rides
- `GET /api/rides` - Get available rides
- `POST /api/rides/request` - Request a ride
- `GET /api/rides/:id` - Get ride details

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

## Deployment

### Heroku
```bash
heroku create your-app-name
git push heroku main
```

### Vercel (Frontend)
```bash
vercel deploy
```

## Contributing

Feel free to submit issues and enhancement requests.

## License

MIT License - see LICENSE file for details
