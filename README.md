# 🚂 Week 2: Express.js – Server-Side Framework

# 🛍️ Express.js RESTful API – Product Management

This project is a RESTful API built with **Express.js** that allows you to perform CRUD operations on a `products` resource. It includes middleware for logging, authentication, validation, and proper error handling.

---

## 🚀 Getting Started

### 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/)

### 🛠️ Installation

```bash
git clone https://github.com/your-username/express-api.git
cd express-api
npm install
npm run dev
npm start

```

### 📋 Endpoints
#### GET /api/products
- Description: List all products

- Optional Query Params:

 - category – Filter by category

 - search – Search by name

 - page – Page number (default: 1)

 - limit – Items per page (default: 10)

### Middleware
- Logger – Logs request method, URL, and timestamp

- Authentication – Requires x-api-key for protected routes

- Validation – Validates product body on POST and PUT

- Global Error Handler – Returns JSON error with status codes

### 🧪 Testing
You can test this API using:
- Postman