
import { useSearchParams, useNavigate } from "react-router-dom";

const buses = [
  {
    id: 1,
    name: "Orange Travels",
    type: "AC Sleeper",
    departure: "21:00",
    arrival: "06:00",
    price: 1200,
    seats: 12,
  },
  {
    id: 2,
    name: "VRL Travels",
    type: "AC Seater",
    departure: "20:30",
    arrival: "05:30",
    price: 900,
    seats: 18,
  },
  {
    id: 3,
    name: "SRS Travels",
    type: "Non-AC Sleeper",
    departure: "22:00",
    arrival: "07:00",
    price: 750,
    seats: 9,
  },
];

export default function Buses() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const from = params.get("from") || "Hyderabad";
  const to = params.get("to") || "Bangalore";
  const date = params.get("date") || "";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-3">
          Available Buses
        </h1>

        <p className="text-gray-600 mb-8">
          {from} → {to} {date && `| ${date}`}
        </p>

        <div className="space-y-5">
          {buses.map((bus) => (
            <div
              key={bus.id}
              className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              <div>
                <h2 className="text-xl font-bold">
                  {bus.name}
                </h2>
                <p className="text-gray-500">{bus.type}</p>
                <p className="mt-3">
                  {bus.departure} → {bus.arrival}
                </p>
                <p className="text-green-700 mt-2">
                  {bus.seats} seats available
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold">
                  ₹{bus.price}
                </p>
                <button
                  onClick={() =>
                    navigate(
                      `/seats?busId=${bus.id}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}`
                    )
                  }
                  className="mt-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
                >
                  Select Seats
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
