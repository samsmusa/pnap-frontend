// src/components/RentModal.tsx

import React, { useState } from "react";
import "flowbite";
import { Button } from "flowbite-react";

const RentModal: React.FC = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(e.target.value);
  };

  const handleConfirmRent = () => {
    // Handle logic for confirming rent
    console.log(`Rent confirmed from ${fromDate} to ${toDate}`);
    // Add logic to close modal or perform further actions
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-lg mx-auto my-6">
        {/* Modal content */}
        <div className="bg-white shadow-lg rounded-lg">
          {/* Modal header */}
          <div className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
            <h3 className="text-lg font-semibold">Rent Modal</h3>
            <button className="text-white close-modal" aria-label="Close modal">
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.293 3.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-6">
            <div className="mb-4">
              <label
                htmlFor="fromDate"
                className="block text-sm font-medium text-gray-700"
              >
                From Date
              </label>
              <input
                type="date"
                id="fromDate"
                value={fromDate}
                onChange={handleFromDateChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="toDate"
                className="block text-sm font-medium text-gray-700"
              >
                To Date
              </label>
              <input
                type="date"
                id="toDate"
                value={toDate}
                onChange={handleToDateChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {/* Modal footer */}
            <div className="flex justify-end">
              <Button
                color="red"
                className="mr-2 bg-red-500 text-white"
                onClick={() => console.log("Go back")}
              >
                Go back
              </Button>
              <Button
                color="green "
                className="bg-green-500 text-white"
                onClick={handleConfirmRent}
              >
                Confirm Rent
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentModal;
