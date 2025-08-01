# Aureus Job Board API

This is the backend server for the Aureus Job Board system. It provides authentication, job management, user profiles, and job application features using Node.js, Express, Prisma ORM, and PostgreSQL.

---

## 🚀 Features

- JWT-based Authentication (Access & Refresh tokens)
- Role-based Authorization (Admin & User)
- CRUD for Job Postings (Admin only)
- Job Applications (User)
- Profile Management
- Image Upload (for job postings)
- Swagger API Documentation

---

## 📦 Dependencies

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- bcrypt
- jsonwebtoken
- multer (file uploads)
- Swagger UI (API documentation)

---

## 🧪 Environment Setup

Create a `.env` file in the root directory with the following content:

```env
JWT_SECRET_KEY=3f2b4e5d1a7c8f6e9d0b124c7a38e0cd94f3bbd1a827fe3e6ceccf7bdc3a56ef
JWT_EXPIRE_MIN=15
JWT_EXPIRE_HR=8
PORT=4000
```

## 📚 API Documentation

Swagger is available at:

👉 http://localhost:4000/api-docs/#/

This contains full documentation of all available endpoints, request/response models, and error codes.

## 🧪 Testing with Postman

    •	Login: POST /login
    •	Register: POST /register
    •	Protected Routes require Authorization: <access_token> in the header.
    •	Use multipart/form-data when uploading images (e.g., create-job).

    Admin Credentials
    email: admin@admin.com
    pass: admin

Admin users can manage job postings. Normal users can only apply for jobs.
