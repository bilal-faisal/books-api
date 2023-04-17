import React from "react";

const Home = () => {
  return (
    <div className="text-center mx-auto w-1/3">
      <h1 className="text-2xl my-10">Books API</h1>
      <p className="text-lg">
        <b>url:</b> alpha-books-api.vercel.app/api/
      </p>

      <h2 className="mt-4 text-left text-lg font-semibold text-gray-900 dark:text-white">
        Endpoints:
      </h2>
      <ul className="text-left pl-5 space-y-0.5 text-gray-500 list-disc list-inside dark:text-gray-400">
        <li>GET /status</li>
        <li>GET /books</li>
        <li>GET /books/:bookId</li>
        <li>POST /orders</li>
        <li>GET /orders</li>
        <li>GET /orders/:orderId</li>
        <li>PATCH /orders/:orderId</li>
        <li>DELETE /orders/:orderId</li>
        <li>POST /api-clients/</li>
      </ul>
    </div>
  );
};

export default Home;
