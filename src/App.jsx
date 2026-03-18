import React, { useState } from "react";
import SeatGrid from "./components/SeatGrid";
import BookingForm from "./components/BookingForm";

// ✅ Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Load seats from sessionStorage, or create fresh 48 seats
const createSeats = () => {
  const saved = sessionStorage.getItem("seats");
  if (saved) return JSON.parse(saved);
  return Array.from({ length: 48 }, (_, i) => ({
    id: i + 1,
    booked: false,
    user: null,
  }));
};

function App() {
  const [seats, setSeats] = useState(createSeats);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSeatClick = (seat) => {
    if (seat.booked) {
      toast.warning("Seat already booked ");
      return;
    }
    setSelectedSeat(seat);
    setShowForm(true);
  };

  const handleBooking = (name, phone) => {
    setSeats((prev) => {
      const updated = prev.map((s) =>
        s.id === selectedSeat.id
          ? { ...s, booked: true, user: { name, phone } }
          : s
      );
      sessionStorage.setItem("seats", JSON.stringify(updated));
      return updated;
    });
    toast.success(`Seat ${selectedSeat.id} booked successfully `);
    setShowForm(false);
    setSelectedSeat(null);
  };

  return (
    <div className="container">
      <h1>Ticket Booking System</h1>

      <SeatGrid seats={seats} onSeatClick={handleSeatClick} />

      {showForm && (
        <BookingForm
          onSubmit={handleBooking}
          onClose={() => setShowForm(false)}
          selectedSeat={selectedSeat}
        />
      )}

      {/* ✅ Toast container */}
      <ToastContainer position="top-center" autoClose={2000} theme="dark" />
    </div>
  );
}

export default App;