  Product Ratings & Review Analytics Dashboard

A full-stack analytics dashboard built using React, Redux Toolkit, Node.js, Express, and PostgreSQL to analyze product performance, customer reviews, and discount trends.

  Features

Upload CSV/Excel product dataset

Products per Category (Bar Chart)

Top Reviewed Products (Bar Chart)

Discount Distribution (Histogram)

Category-wise Average Rating (Bar Chart)

Search by product name

Filter by category & rating

Server-side pagination

Loading & error handling

 Tech Stack

Frontend

React

Redux Toolkit

Material UI

Recharts

Axios

Backend

Node.js

Express

PostgreSQL

Multer

XLSX

  Setup
Backend
cd backend
npm install
npm run dev
Frontend
cd frontend
npm install
npm start

Backend runs on http://localhost:5000
Frontend runs on http://localhost:3000

  API Endpoints
POST   /api/upload-excel
GET    /api/analytics/products-per-category
GET    /api/analytics/top-reviewed-products
GET    /api/analytics/discount-distribution
GET    /api/analytics/category-average-rating
GET    /api/products?page=1&limit=10&search=&category=&rating=

  Purpose

Demonstrates full-stack development, data ingestion, SQL aggregations, state management, and interactive dashboard visualization.
