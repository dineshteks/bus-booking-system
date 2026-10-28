
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state || {};

  const seats = booking.seats || [];
  const from = booking.from || "Hyderabad";
  const to = booking.to || "Bangalore";
  const date = booking.date || "";
  const price = booking.price || 1200;
  const totalPrice = booking.totalPrice || seats.length * price;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (seats.length === 0) {
      alert("Please select your seats first.");
      navigate("/");
      return;
    }

    const bookingDetails = {
      bookingId: "BUS" + Date.now(),
      name,
      email,
      phone,
      from,
      to,
      date,
      seats,
      price,
      totalPrice,
    };

    navigate("/confirmation", {
      state: bookingDetails,
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Passenger Details
        </h1>

        <p className="text-gray-600 mb-8">
          Enter your details to continue your bus booking.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Passenger Form */}
          <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-xl shadow">

            <h2 className="text-xl font-bold mb-6">
              Contact Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  minLength={3}
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  pattern="[0-9]{10}"
                  maxLength={10}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition"
              >
                Confirm Booking
              </button>

            </form>
          </div>

          {/* Booking Summary */}
          <div className="bg-white p-6 rounded-xl shadow h-fit">

            <h2 className="text-xl font-bold mb-5">
              Booking Summary
            </h2>

            <div className="space-y-4 text-gray-600">

              <div>
                <p className="text-sm">From</p>
                <p className="font-bold text-gray-800">{from}</p>
              </div>

              <div>
                <p className="text-sm">To</p>
                <p className="font-bold text-gray-800">{to}</p>
              </div>

              <div>
                <p className="text-sm">Journey Date</p>
                <p className="font-bold text-gray-800">
                  {date || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-sm">Selected Seats</p>
                <p className="font-bold text-gray-800">
                  {seats.length ? seats.join(", ") : "No seats selected"}
                </p>
              </div>

              <div>
                <p className="text-sm">Number of Seats</p>
                <p className="font-bold text-gray-800">
                  {seats.length}
                </p>
              </div>

            </div>

            <div className="border-t mt-6 pt-5">
              <p className="text-gray-600">Total Amount</p>
              <h2 className="text-3xl font-bold text-green-700 mt-2">
                ₹{totalPrice}
              </h2>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
