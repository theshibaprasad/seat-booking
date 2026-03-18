import React, { useState } from "react";
import { toast } from "react-toastify";

function BookingForm({ onSubmit, onClose, selectedSeat }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Phone validation (start 6-9 and exactly 10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phone)) {
      toast.error("Invalid phone number ");
      return;
    }

    onSubmit(name, phone);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Book Seat #{selectedSeat?.id}</h3>

        <form onSubmit={handleSubmit}>
          
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Phone (validated) */}
          <input
            type="text"
            placeholder="Enter Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <div className="buttons">
            <button type="submit">Confirm</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;