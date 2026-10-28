
import { useLocation, useNavigate } from "react-router-dom";

export default function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;

  if (!booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          No Booking Found
        </h1>

        <p className="text-gray-600 mb-6">
          Please book your bus tickets first.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
        >
          Go to Home
        </button>
      </div>
    );
  }

  const {
    bookingId,
    name,
    email,
    phone,
    from,
    to,
    date,
    seats,
    price,
    totalPrice,
  } = booking;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Success Message */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="bg-green-600 text-white text-center p-8">
            <div className="text-6xl mb-4">✓</div>

            <h1 className="text-3xl font-bold mb-2">
              Booking Confirmed!
            </h1>

            <p className="text-green-100">
              Thank you for booking with BusGo.
            </p>
          </div>

          {/* Booking Information */}
          <div className="p-6 md:p-8">

            <div className="text-center border-b pb-6 mb-6">
              <p className="text-gray-500">
                Booking Reference
              </p>

              <h2 className="text-2xl font-bold text-red-600 mt-2">
                {bookingId}
              </h2>
            </div>

            {/* Journey Details */}
            <h2 className="text-xl font-bold mb-5">
              Journey Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">

              <div>
                <p className="text-gray-500 text-sm">From</p>
                <h3 className="text-xl font-bold">{from}</h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">To</p>
                <h3 className="text-xl font-bold">{to}</h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Journey Date</p>
                <p className="font-semibold">
                  {date || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Selected Seats</p>
                <p className="font-semibold">
                  {seats?.length ? seats.join(", ") : "None"}
                </p>
              </div>

            </div>

            {/* Passenger Details */}
            <h2 className="text-xl font-bold mb-5">
              Passenger Details
            </h2>

            <div className="bg-gray-50 rounded-xl p-5 space-y-3 mb-8">

              <p>
                <span className="text-gray-500">Name: </span>
                <span className="font-semibold">{name}</span>
              </p>

              <p>
                <span className="text-gray-500">Email: </span>
                <span className="font-semibold">{email}</span>
              </p>

              <p>
                <span className="text-gray-500">Phone: </span>
                <span className="font-semibold">{phone}</span>
              </p>

            </div>

            {/* Payment Summary */}
            <div className="border-t border-dashed pt-6">

              <div className="flex justify-between mb-3">
                <span className="text-gray-600">
                  Price per seat
                </span>
                <span className="font-semibold">
                  ₹{price}
                </span>
              </div>

              <div className="flex justify-between mb-3">
                <span className="text-gray-600">
                  Total seats
                </span>
                <span className="font-semibold">
                  {seats?.length || 0}
                </span>
              </div>

              <div className="flex justify-between items-center border-t pt-4">
                <span className="text-xl font-bold">
                  Total Amount
                </span>

                <span className="text-2xl font-bold text-green-700">
                  ₹{totalPrice}
                </span>
              </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

              <button
                onClick={() => window.print()}
                className="flex-1 border border-gray-300 hover:bg-gray-100 font-semibold py-3 rounded-lg"
              >
                Print Ticket
              </button>

              <button
                onClick={() => navigate("/")}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg"
              >
                Back to Home
              </button>

            </div>

          </div>
        </div>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Have a safe and happy journey with BusGo!
        </p>

      </div>
    </div>
  );
}
