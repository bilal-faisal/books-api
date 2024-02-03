import React from "react";

type EndpointItem = {
  method: string;
  endpoint: string;
  description: string;
};

const EndpointItem = ({ method, endpoint, description }: EndpointItem) => {
  return (
    <div className="mb-3">
      <p className="font-semibold">
        <span className="mr-2">{method}</span>
        <span className="text-blue-600">{endpoint}</span>
      </p>
      <p className="ml-8 text-gray-700">{description}</p>
    </div>
  );
};

export default EndpointItem;
