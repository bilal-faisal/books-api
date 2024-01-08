import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="text-center my-10 mx-auto w-full px-6 md:w-1/3">
      <h1 className="text-2xl mb-2 font-semibold">Books API</h1>
      <div className="text-base">
        <p>This API allows you to reserve a book.</p>
        <p>
          The API is available at:
          <Link href="/api" className="pl-2 underline">
            books-apis.vercel.app/api
          </Link>
        </p>
      </div>

      <h2 className="mt-6 mb-3 text-left text-xl font-semibold text-gray-900 dark:text-white">
        Endpoints
      </h2>
      <ul className="text-left pl-8 space-y-4 list-disc list-inside dark:text-gray-400">
        <li>
          <span className="pr-3">GET</span>
          <span className="endpoint-style">/status</span>
        </li>
        <li>
          <span className="pr-3">GET</span>
          <span className="endpoint-style">/books</span>
        </li>
        <li>
          <span className="pr-3">GET</span>
          <span className="endpoint-style">/books/:bookId</span>
        </li>
        <li>
          <span className="pr-3">POST</span>
          <span className="endpoint-style">/token</span>
          <div className="pl-8 pt-1 text-gray-800">
            <p>Body Parameters: clientName, clientEmail</p>
          </div>
        </li>
        <li>
          <span className="pr-3">GET</span>
          <span className="endpoint-style">/orders</span>
          <div className="pl-8 pt-1 text-gray-800">
            <p>Authorization: Bearer Token</p>
          </div>
        </li>
        <li>
          <span className="pr-3">POST</span>
          <span className="endpoint-style">/orders</span>
          <div className="pl-8 pt-1 text-gray-800">
            <p>Authorization: Bearer Token</p>
            <p>Body Parameters: bookId, customerName</p>
          </div>
        </li>
        <li>
          <span className="pr-3">GET</span>
          <span className="endpoint-style">/orders/:orderId</span>
          <div className="pl-8 pt-1 text-gray-800">
            <p>Authorization: Bearer Token</p>
          </div>
        </li>
        <li>
          <span className="pr-3">PATCH</span>
          <span className="endpoint-style">/orders/:orderId</span>
          <div className="pl-8 pt-1 text-gray-800">
            <p>Authorization: Bearer Token</p>
            <p>Body Parameter: customerName</p>
          </div>
        </li>
        <li>
          <span className="pr-3">DELETE</span>
          <span className="endpoint-style">/orders/:orderId</span>
          <div className="pl-8 pt-1 text-gray-800">
            <p>Authorization: Bearer Token</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Home;
