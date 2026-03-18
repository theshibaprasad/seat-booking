import React from "react";

function SeatGrid({ seats, onSeatClick }) {
  return (
    <div className="grid">
      {seats.map((seat) => (
        <div
          key={seat.id}
          className={`seat ${seat.booked ? "booked" : "available"}`}
          onClick={() => onSeatClick(seat)}
        >
          {seat.id}

          {/* ✅ Tooltip */}
          {seat.booked && <span className="tooltip">Booked</span>}
        </div>
      ))}
    </div>
  );
}

export default SeatGrid;