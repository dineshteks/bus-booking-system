
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyBooking() {
  const navigate = useNavigate();

  // Sample booking data
  const [bookings, setBookings] = useState([]);
 useEffect(() => {

    const getBookings = async () => {

      const accesstoken = sessionStorage.getItem("access");

      if (!accesstoken) {
        setMessage("Please login first");
        return;
      }

      try {

        const res = await axios.get(
          "http://127.0.0.1:8000/trainbookingapp/getbookings/",
          {
            headers: {
              Authorization: `Bearer ${accesstoken}`
            }
          }
        );

        console.log(res.data);
        setBookings(res.data);

      } catch (err) {

        console.log("Status:", err.response?.status);
        console.log("Error:", err.response?.data);

        setMessage(
          err.response?.status === 401
            ? "Session expired. Please login again."
            : "Unable to fetch bookings"
        );

      }
    };

    getBookings();

  }, []);

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
              {bookings.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Total Amount</p>
            <h2 className="text-3xl font-bold text-red-600 mt-2">
              ₹
              {bookings.reduce(
                (total, booking) => total + booking.amount,
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
                  key={booking.booking_id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4 font-semibold">
                    {booking.booking_id}
                  </td>

                  <td className="p-4">
                    {booking.name}
                  </td>

                  <td className="p-4">
                    {booking.source} → {booking.destination}
                  </td>

                  <td className="p-4">
                    {booking.journey_date}
                  </td>

                  <td className="p-4">
                    {booking.seats}
                  </td>

                  <td className="p-4 font-bold">
                    ₹{booking.amount}
                  </td>

                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      confirm
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        cancelBooking(booking.booking_id)
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
