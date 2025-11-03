# Digital Banking Dashboard - Backend

A complete banking backend API built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Account Management**: Multiple account types (savings/current) per user
- **Transactions**: Secure money transfers with transaction history
- **Admin Panel**: User management and account freezing capabilities
- **Role-Based Access Control**: User and admin roles with protected routes

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Copy `.env.example` to `.env` and update the values:
   ```bash
   copy .env.example .env
   ```

   Update `.env` with your values:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/digital-banking
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   ```

   **For MongoDB Atlas:**
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/digital-banking
   ```

4. **Start MongoDB (if using local):**
   ```bash
   mongod
   ```

5. **Run the server:**
   
   Development mode:
   ```bash
   npm run dev
   ```

   Production mode:
   ```bash
   npm start
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register new user | Public |
| POST | `/login` | Login user | Public |
| GET | `/me` | Get current user | Private |

### User Routes (`/api/users`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/:id` | Get user by ID | Private |
| GET | `/:id/accounts` | Get user accounts | Private |
| POST | `/:id/accounts` | Create new account | Private |

### Transaction Routes (`/api/transactions`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/transfer` | Transfer money | Private |
| GET | `/:userId` | Get user transactions | Private |
| GET | `/account/:accountId` | Get account transactions | Private |

### Admin Routes (`/api/admin`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/users` | Get all users | Admin |
| GET | `/transactions` | Get all transactions | Admin |
| GET | `/stats` | Get dashboard stats | Admin |
| PUT | `/freeze/:id` | Freeze/unfreeze account | Admin |
| PUT | `/approve/:id` | Approve/disapprove user | Admin |
| DELETE | `/users/:id` | Delete user | Admin |

## Example API Requests

### Register User
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Transfer Money
```json
POST /api/transactions/transfer
Headers: { Authorization: "Bearer <token>" }
{
  "senderAccountId": "account_id_here",
  "receiverAccountNumber": "123456789012",
  "amount": 100.50
}
```

## Database Models

### User
- name: String
- email: String (unique)
- password: String (hashed)
- role: String (user/admin)
- accounts: Array of Account IDs
- isApproved: Boolean

### Account
- user: User ID reference
- accountType: String (savings/current)
- balance: Number
- accountNumber: String (unique, auto-generated)
- isFrozen: Boolean

### Transaction
- senderAccount: Account ID reference
- receiverAccount: Account ID reference
- amount: Number
- date: Date
- type: String (debit/credit)
- status: String (success/failed/pending)
- description: String

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes with middleware
- Role-based access control
- Transaction atomicity with MongoDB sessions
- Input validation

## Error Handling

The API uses centralized error handling with descriptive error messages:

- `400`: Bad Request (invalid input)
- `401`: Unauthorized (invalid/missing token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found (resource doesn't exist)
- `500`: Internal Server Error

## Testing

Create test users via API or use the frontend registration.

**Sample Admin Account:**
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```

## Deployment

### Deploy to Render/Railway/Heroku

1. Create a new web service
2. Connect your repository
3. Set environment variables
4. Deploy

### Environment Variables for Production
```
PORT=5000
MONGO_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<strong-random-secret>
NODE_ENV=production
```

## Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── userController.js     # User management
│   ├── transactionController.js  # Transaction logic
│   └── adminController.js    # Admin operations
├── models/
│   ├── User.js               # User schema
│   ├── Account.js            # Account schema
│   └── Transaction.js        # Transaction schema
├── routes/
│   ├── authRoutes.js         # Auth endpoints
│   ├── userRoutes.js         # User endpoints
│   ├── transactionRoutes.js  # Transaction endpoints
│   └── adminRoutes.js        # Admin endpoints
├── middlewares/
│   ├── authMiddleware.js     # JWT verification
│   └── roleMiddleware.js     # Role checking
├── utils/
│   ├── errorHandler.js       # Error handling
│   └── generateToken.js      # JWT generation
├── .env                      # Environment variables
├── .env.example              # Example env file
├── .gitignore
├── package.json
└── server.js                 # Entry point
```

## License

MIT
