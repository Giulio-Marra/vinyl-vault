import React, { useState } from "react";
import { createCheckoutSession } from "../redux/cartService";

const CartSummary = ({ summary }) => {
  const [loading, setLoading] = useState(false);
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const shipping = summary.total >= 50 ? 0 : 30;
  const finalTotal = (parseFloat(summary.total) + shipping).toFixed(2);

  const handleCheckout = async () => {
    if (!token) return alert("Devi essere loggato!");
    setLoading(true);
    try {
      const data = await createCheckoutSession(token);
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bgOrderSumCard rounded p-4 text-white">
      <h3>Order Summary</h3>
      <div className="d-flex justify-content-between my-3">
        <span className="text-secondary">Subtotal</span>
        <span>€{summary.total.toFixed(2)}</span>
      </div>
      <div className="d-flex justify-content-between mb-4 pb-2 border-bottom border-secondary">
        <span className="text-secondary">Shipping</span>
        <span>{shipping === 0 ? "Free" : `€${shipping}`}</span>
      </div>
      <div className="d-flex justify-content-between mb-4">
        <span className="fw-bold fs-5">Total</span>
        <span className="text-info fw-bold fs-4">€{finalTotal}</span>
      </div>
      <button
        className="btn btn-info text-dark w-100 fw-bold py-3"
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? "Processing..." : "🔒 Secure Checkout"}
      </button>
    </div>
  );
};

export default CartSummary;
