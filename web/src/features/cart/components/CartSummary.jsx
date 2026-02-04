import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartSummary = ({ summary }) => {
  const [promoCode, setPromoCode] = useState("");
  const navigate = useNavigate();

  const shipping = summary.total >= 50 ? 0 : 30;
  const finalTotal = (parseFloat(summary.total) + shipping).toFixed(2);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="bgOrderSumCard rounded p-4 ">
      <h3 className="text-white mb-4">Order Summary</h3>

      <div className="d-flex justify-content-between mb-3">
        <span className="text-secondary">Subtotal</span>
        <span className="text-white">€{summary.total.toFixed(2)}</span>
      </div>

      <div className="d-flex justify-content-between mb-4 pb-3 border-bottom border-secondary">
        <span className="text-secondary">Shipping</span>
        <span className="text-white-50" style={{ fontSize: "0.9rem" }}>
          {shipping === 0 ? "Free" : "Calculated at next step"}
        </span>
      </div>

      <div className="d-flex justify-content-between mb-4">
        <span className="text-white fw-bold">Total</span>
        <span className="text-info fw-bold fs-4">€{finalTotal}</span>
      </div>

      <div className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control bg-dark text-white border-secondary"
            placeholder="Promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            style={{
              padding: "0.75rem",
              borderRadius: "0.375rem 0 0 0.375rem",
            }}
          />
          <button
            className="btn btn-outline-info text-info border-secondary"
            type="button"
            style={{
              borderRadius: "0 0.375rem 0.375rem 0",
              minWidth: "80px",
            }}
          >
            APPLY
          </button>
        </div>
      </div>

      <button
        className="btn btn-info text-dark w-100 fw-bold py-3 mb-3"
        onClick={handleCheckout}
        style={{
          borderRadius: "0.5rem",
          fontSize: "1rem",
        }}
      >
        🔒 Secure Checkout
      </button>

      <div className="d-flex justify-content-center align-items-center gap-3 text-secondary">
        <div className="text-center">
          <div className="mb-1">
            <i className="bi bi-shield-check fs-4"></i>
          </div>
          <small style={{ fontSize: "0.75rem" }}>Secure payment</small>
        </div>
        <div className="text-center">
          <div className="mb-1">
            <i className="bi bi-box-seam fs-4"></i>
          </div>
          <small style={{ fontSize: "0.75rem" }}>Safe packaging</small>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
