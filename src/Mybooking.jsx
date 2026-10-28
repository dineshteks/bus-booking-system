
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyBooking() {
  const navigate = useNavigate();

  // Sample booking data
  const [bookings, setBookings] = useState([
    {
      bookingId: "BUS1001",
      name: "Dinesh Kumar",
      from: "Hyderabad",
      to: "Bangalore",
      date: "2026-11-05",
      seats: ["A1", "A3"],
      totalPrice: 2400,
      status: "Confirmed",
    },
    {
      bookingId: "BUS1002",
      name: "Rahul Kumar",
      from: "Chennai",
      to: "Hyderabad",
      date: "2026-11-10",
      seats: ["B1"],
      totalPrice: 900,
      status: "Confirmed",
    },
  ]);

  function cancelBooking(bookingId) {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (confirmCancel) {
      setBookings((previousBookings) =>
        previousBookings.filter(
          (booking) => booking.bookingId !== bookingId
        )
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              My Bookings
            </h1>

            <p className="text-gray-500 mt-2">
              View your bus tickets and journey details.
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg font-semibold"
          >
            + Book New Ticket
          </button>
        </div>

        {/* Booking Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Total Bookings</p>
            <h2 className="text-3xl font-bold mt-2">
              {bookings.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Confirmed Bookings</p>
            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {bookings.filter(
                (booking) => booking.status === "Confirmed"
              ).length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Total Amount</p>
            <h2 className="text-3xl font-bold text-red-600 mt-2">
              ₹
              {bookings.reduce(
                (total, booking) => total + booking.totalPrice,
                0
              )}
            </h2>
          </div>

        </div>

        {/* Booking Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full text-left min-w-[900px]">

            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-4">Booking ID</th>
                <th className="p-4">Passenger</th>
                <th className="p-4">Journey</th>
                <th className="p-4">Date</th>
                <th className="p-4">Seats</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking.bookingId}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4 font-semibold">
                    {booking.bookingId}
                  </td>

                  <td className="p-4">
                    {booking.name}
                  </td>

                  <td className="p-4">
                    {booking.from} → {booking.to}
                  </td>

                  <td className="p-4">
                    {booking.date}
                  </td>

                  <td className="p-4">
                    {booking.seats.join(", ")}
                  </td>

                  <td className="p-4 font-bold">
                    ₹{booking.totalPrice}
                  </td>

                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {booking.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        cancelBooking(booking.bookingId)
                      }
                      className="bg-red-100 text-red-600 hover:bg-red-600 hover:text-white px-3 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}

              {bookings.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center p-10 text-gray-500"
                  >
                    No bookings found. Book your first bus ticket!
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}
