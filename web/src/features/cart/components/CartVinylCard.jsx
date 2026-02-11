import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const CartVinylCard = ({ vinyl }) => {
  const [quantity, setQuantity] = useState(vinyl.quantity);

  const handleIncrease = () => {
    if (quantity < vinyl.vinyl.stock) setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleRemove = () => {
    console.log("Remove item", vinyl.id);
  };

  return (
    <div className="d-flex p-3 my-4 cardCartVinyl align-items-center">
      <div className="imgWrapperCart">
        <img
          src={vinyl.vinyl.urlImage}
          alt={vinyl.vinyl.title}
          className="imgVinylCart"
        />
      </div>
      <div className=" flex-grow-1">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="text-white">{vinyl.vinyl.title}</h4>
          <button onClick={handleRemove} className="btnRemove">
            <FaRegTrashAlt />
          </button>
        </div>
        <p className="text-secondary">{vinyl.vinyl.artist.name}</p>
        <div className="d-flex align-items-center gap-3 mt-2 ">
          <div className="containerAddBtn">
            <button
              className="btnAddDec"
              onClick={handleDecrease}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="text-white mx-3">{quantity}</span>
            <button
              className="btnAddDec"
              onClick={handleIncrease}
              disabled={quantity >= vinyl.vinyl.stock}
            >
              +
            </button>
          </div>
          <span className="ms-auto fw-bold text-white">
            ${(vinyl.price * quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartVinylCard;
