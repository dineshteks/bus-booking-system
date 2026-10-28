
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red-600">
          🚌 BusGo
        </Link>

        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-red-600">
            Home
          </Link>
          <Link to="/buses" className="hover:text-red-600">
            Buses
          </Link>
          <Link to="/mybookings" className="hover:text-red-600">
            My Booking
          </Link>
          <button className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
