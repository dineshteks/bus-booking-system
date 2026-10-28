
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [from, setFrom] = useState("Hyderabad");
  const [to, setTo] = useState("Bangalore");
  const [date, setDate] = useState("");

  function searchBuses(e) {
    e.preventDefault();

    if (from === to) {
      alert("Source and destination must be different");
      return;
    }

    if (!date) {
      alert("Please select journey date");
      return;
    }

    navigate(
      `/buses?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}`
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-r from-red-700 to-orange-500 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-5">
            Travel Easy, Travel Smart
          </h1>

          <p className="text-lg mb-10">
            Book your bus tickets for your next journey.
          </p>

          <form
            onSubmit={searchBuses}
            className="bg-white text-gray-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-xl"
          >
            <div>
              <label className="block font-semibold mb-2">
                From
              </label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full border rounded-lg p-3"
              >
                <option>Hyderabad</option>
                <option>Bangalore</option>
                <option>Chennai</option>
                <option>Vijayawada</option>
                <option>Visakhapatnam</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                To
              </label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full border rounded-lg p-3"
              >
                <option>Bangalore</option>
                <option>Hyderabad</option>
                <option>Chennai</option>
                <option>Vijayawada</option>
                <option>Visakhapatnam</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Journey Date
              </label>
              <input
                type="date"
                min={new Date().toLocaleDateString("en-CA")}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold p-3 rounded-lg"
              >
                Search Buses
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">
          Why Choose BusGo?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white shadow rounded-xl">
            <div className="text-4xl mb-3">🚌</div>
            <h3 className="font-bold text-xl mb-2">
              Easy Booking
            </h3>
            <p className="text-gray-600">
              Find and book your bus in a few simple steps.
            </p>
          </div>

          <div className="p-6 bg-white shadow rounded-xl">
            <div className="text-4xl mb-3">💺</div>
            <h3 className="font-bold text-xl mb-2">
              Choose Your Seat
            </h3>
            <p className="text-gray-600">
              Select your preferred seat before booking.
            </p>
          </div>

          <div className="p-6 bg-white shadow rounded-xl">
            <div className="text-4xl mb-3">🎫</div>
            <h3 className="font-bold text-xl mb-2">
              Booking Details
            </h3>
            <p className="text-gray-600">
              Review your ticket details after booking.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
