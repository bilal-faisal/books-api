# Books API

## Overview
The Books API is a comprehensive solution for book reservation and management. Built with Next.js and PostgreSQL, it offers a range of functionalities from retrieving book lists to managing orders with secure authentication.

## API Base URL
`https://books-apis.vercel.app/api`

## Endpoints

### Status
- `GET /status`
  - Description: Check the API's current status.

### Books
- `GET /books`
  - Description: Retrieve a list of available books.
- `GET /books/:bookId`
  - Description: Get detailed information about a specific book.

### Authentication
- `POST /token`
  - Body Parameters: `clientName`, `clientEmail`
  - Description: Generate a token for accessing protected routes.

### Orders
- `GET /orders`
  - Authorization: Bearer Token
  - Description: View all book orders.
- `POST /orders`
  - Authorization: Bearer Token
  - Body Parameters: `bookId`, `customerName`
  - Description: Place a new book order.
- `GET /orders/:orderId`
  - Authorization: Bearer Token
  - Description: View details of a specific order.
- `PATCH /orders/:orderId`
  - Authorization: Bearer Token
  - Body Parameter: `customerName`
  - Description: Update an existing order.
- `DELETE /orders/:orderId`
  - Authorization: Bearer Token
  - Description: Delete an existing order.

## Test API Locally
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`.
You can start editing the route by modifying routes present in `app/api/..`.

## Deployed on Vercel
This application is deployed on vercel. You can access it at `https://books-apis.vercel.app`