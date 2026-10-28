
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Seats() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const busId = params.get("busId") || "1";
  const from = params.get("from") || "Hyderabad";
  const to = params.get("to") || "Bangalore";
  const date = params.get("date") || "";

  const price = busId === "1" ? 1200 : busId === "2" ? 900 : 750;

  const [selectedSeats, setSelectedSeats] = useState([]);

  const bookedSeats = ["A2", "B3", "C1", "D4"];

  const seats = [
    ["A1", "A2", "A3", "A4"],
    ["B1", "B2", "B3", "B4"],
    ["C1", "C2", "C3", "C4"],
    ["D1", "D2", "D3", "D4"],
    ["E1", "E2", "E3", "E4"],
  ];

  function selectSeat(seat) {
    if (bookedSeats.includes(seat)) {
      return;
    }

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(
        selectedSeats.filter((s) => s !== seat)
      );
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  }

  const totalPrice = selectedSeats.length * price;

  function continueBooking() {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    navigate("/booking", {
      state: {
        busId,
        from,
        to,
        date,
        seats: selectedSeats,
        price,
        totalPrice,
      },
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-2">
          Select Your Seats
        </h1>

        <p className="text-gray-600 mb-6">
          {from} → {to}
          {date && ` | ${date}`}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Seat Layout */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">

            <div className="flex justify-end mb-6">
              <div className="border-2 border-gray-400 rounded-lg p-3">
                🛞 Driver
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">

              {seats.flat().map((seat) => {
                const isBooked = bookedSeats.includes(seat);
                const isSelected = selectedSeats.includes(seat);

                return (
                  <button
                    key={seat}
                    disabled={isBooked}
                    onClick={() => selectSeat(seat)}
                    className={`h-14 rounded-lg font-bold border-2 transition
                      ${
                        isBooked
                          ? "bg-gray-400 text-white border-gray-400 cursor-not-allowed"
                          : isSelected
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white text-gray-700 border-blue-500 hover:bg-blue-100"
                      }`}
                  >
                    {seat}
                  </button>
                );
              })}

            </div>

            {/* Seat Legend */}
            <div className="flex flex-wrap justify-center gap-5 mt-8">

              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-white border-2 border-blue-500 rounded" />
                Available
              </div>

              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-green-600 rounded" />
                Selected
              </div>

              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-gray-400 rounded" />
                Booked
              </div>

            </div>
          </div>

          {/* Booking Summary */}
          <div className="bg-white p-6 rounded-xl shadow h-fit">

            <h2 className="text-xl font-bold mb-5">
              Booking Summary
            </h2>

            <div className="space-y-3 text-gray-600">
              <p>
                <strong>From:</strong> {from}
              </p>

              <p>
                <strong>To:</strong> {to}
              </p>

              <p>
                <strong>Date:</strong> {date || "Not selected"}
              </p>

              <p>
                <strong>Bus ID:</strong> {busId}
              </p>

              <p>
                <strong>Price per seat:</strong> ₹{price}
              </p>

              <p>
                <strong>Selected seats:</strong>{" "}
                {selectedSeats.length
                  ? selectedSeats.join(", ")
                  : "None"}
              </p>

              <p>
                <strong>Total seats:</strong>{" "}
                {selectedSeats.length}
              </p>
            </div>

            <div className="border-t mt-5 pt-5">
              <p className="text-gray-600">Total Amount</p>

              <h2 className="text-3xl font-bold text-green-700 mt-2">
                ₹{totalPrice}
              </h2>
            </div>

            <button
              onClick={continueBooking}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg mt-6"
            >
              Continue Booking
            </button>

            <button
              onClick={() => setSelectedSeats([])}
              className="w-full border border-gray-300 hover:bg-gray-100 py-3 rounded-lg mt-3"
            >
              Clear Selection
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
