# AuthCapi — Authentication & Product CRUD API

A simple e-commerce REST API with JWT authentication and a React frontend.

Built with Node.js, Express, MongoDB, and React (Vite + Tailwind CSS).

---

## Project Structure

```
AuthCapi/
├── backend/      Express API
└── frontend/     React app (Vite)
```

---

## Setup

### Prerequisites

- Node.js 18+
- MongoDB running locally on port 27017

### Backend

```bash
cd backend
cp .env.example .env    # fill in your secrets
npm install
npm run dev             # starts on http://localhost:5000
```

**`.env` values:**

| Key | Description |
|-----|-------------|
| `PORT` | Server port (default 5000) |
| `MONGO_URI` | MongoDB connection string |
| `ACCESS_TOKEN_SECRET` | Secret for signing access tokens |
| `REFRESH_TOKEN_SECRET` | Secret for signing refresh tokens |
| `NODE_ENV` | `development` or `production` |

### Frontend

```bash
cd frontend
npm install
npm run dev             # starts on http://localhost:5173
```

---

## API Endpoints

### Auth

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login, returns access token + sets cookie |
| POST | `/api/auth/refresh-token` | Public* | Issue a new access token using the refresh cookie |
| POST | `/api/auth/logout` | Authenticated | Invalidate refresh token |
| GET | `/api/auth/me` | Authenticated | Get current user info |

*Requires a valid `refreshToken` httpOnly cookie

### Products

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/products` | Public | List all products |
| GET | `/api/products/:id` | Public | Get a single product |
| POST | `/api/products` | Authenticated | Create a product |
| PUT | `/api/products/:id` | Authenticated | Update a product |
| DELETE | `/api/products/:id` | Authenticated | Delete a product |

Authenticated routes require `Authorization: Bearer <accessToken>` header.

---

## Auth Flow

1. **Register** → account created, no tokens returned
2. **Login** → access token in JSON body, refresh token as `httpOnly` cookie
3. **Requests** → send access token in `Authorization: Bearer` header
4. **Refresh** → call `/api/auth/refresh-token`, browser sends cookie automatically
5. **Logout** → refresh token deleted from DB and cookie cleared

---

## Validation

All inputs are validated with `express-validator`. Invalid requests get a `400` response:

```json
{
  "errors": [
    { "path": "email", "msg": "Valid email is required" }
  ]
}
```

---

## Tech Stack

- **Backend:** Node.js, Express, MongoDB (Mongoose), bcrypt, jsonwebtoken, express-validator
- **Frontend:** React, Vite, Tailwind CSS, React Router
