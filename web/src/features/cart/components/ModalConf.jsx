import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const ModalConf = ({ show, onHide }) => {
  const navigate = useNavigate();

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body className="text-center">
        <p className="">Added to cart successfully</p>
        <div className="d-flex justify-content-center gap-3 mt-3">
          <button className="btnGoCart p-2" onClick={() => navigate("/cart")}>
            Go to Cart
          </button>
          <button className="btnGoToShopping" onClick={onHide}>
            Continue Shopping
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalConf;
