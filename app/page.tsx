import Link from "next/link";
import React from "react";
import EndpointItem from "./components/EndpointItem";

const Home = () => {
  return (
    <div className="text-center my-10 mx-auto w-full px-6 md:w-2/3 lg:w-1/2">
      <h1 className="text-3xl mb-4 font-bold">Books API</h1>
      <p className="text-lg mb-2">Reserve your favorite books with ease.</p>
      <p>
        API Base URL:{" "}
        <Link
          href="/api"
          className="text-blue-600 hover:underline"
          target="_blank"
        >
          books-apis.vercel.app/api
        </Link>
      </p>

      <section className="mt-8 text-left">
        <h2 className="text-2xl font-semibold mb-4">API Endpoints:</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <EndpointItem
            method="GET"
            endpoint="/status"
            description="Check the current status of the API."
          />
          <EndpointItem
            method="GET"
            endpoint="/books"
            description="Retrieve a list of available books."
          />
          <EndpointItem
            method="GET"
            endpoint="/books/:bookId"
            description="Get details of a specific book by ID."
          />
          <EndpointItem
            method="POST"
            endpoint="/token"
            description="Generate a token for authentication. Requires clientName and clientEmail in the body."
          />
          <EndpointItem
            method="GET"
            endpoint="/orders"
            description="View all orders. Requires Bearer Token authorization."
          />
          <EndpointItem
            method="POST"
            endpoint="/orders"
            description="Create a new order. Requires Bearer Token and bookId, customerName in the body."
          />
          <EndpointItem
            method="GET"
            endpoint="/orders/:orderId"
            description="View details of a specific order by ID. Requires Bearer Token."
          />
          <EndpointItem
            method="PATCH"
            endpoint="/orders/:orderId"
            description="Update an existing order. Requires Bearer Token and customerName in the body."
          />
          <EndpointItem
            method="DELETE"
            endpoint="/orders/:orderId"
            description="Delete an existing order by ID. Requires Bearer Token."
          />
        </div>
      </section>

      <div className="mt-10">
        <div className="flex flex-col">
          <p className="pr-1">Explore the source code on GitHub:</p>
          <Link
            href="https://github.com/bilal-faisal/books-api-nextjs"
            className="text-blue-600 hover:underline"
          >
            Books API Project
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
