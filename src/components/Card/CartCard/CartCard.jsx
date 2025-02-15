import { Link } from "react-router-dom";
import { useDocumentTitle, useAuth, useUserData } from "../../../hooks";
import {
  changeItemQuantityInCart,
  deleteFromCart,
} from "../../../contexts/Providers/UserDataProvider/helpers";
import "./cart-card.css";

function CartCard({ prod, dynamic = true }) {
  const { userDataDispatch } = useUserData();
  const { _id, title, src, qty, price } = prod;
  const { computable } = price;
  const {
    authState: { token },
  } = useAuth();
  useDocumentTitle("Cart | CarSmart");

  const increaseQuantity = () => {
    changeItemQuantityInCart(token, _id, "increment", userDataDispatch);
  };

  const decreaseQuantity = () => {
    qty <= 1
      ? removeItem()
      : changeItemQuantityInCart(token, _id, "decrement", userDataDispatch);
  };

  const removeItem = () => {
    deleteFromCart(token, _id, userDataDispatch);
  };

  return (
    <div className="cart-card flex-row">
      <div className="cart-left flex-row">
        <Link to={`/product/${_id}`} className="cart-img-container">
          <img src={src} />
        </Link>
        <div className="item-details flex-column">
          <h4 className="item-title">{title}</h4>
          <div className="item-actions-wrapper flex-row">
            <h5>Qty: </h5>
            {dynamic && (
              <button
                className="fab-btn flex-column"
                onClick={() => decreaseQuantity()}
              >
                <img
                  className="fab-icon"
                  src="https://res.cloudinary.com/carsmart/image/upload/v1648460321/icons/minus-sign_vynjuq.png"
                />
              </button>
            )}
            <span className="item-quantity">{qty}</span>
            {dynamic && (
              <button
                className="fab-btn flex-column item-action"
                onClick={() => increaseQuantity()}
              >
                <img
                  className="fab-icon"
                  src="https://res.cloudinary.com/carsmart/image/upload/v1648460320/icons/plus_iisvhs.png"
                />
              </button>
            )}
            {dynamic && (
              <>
                <span> | </span>
                <h5 className="item-action" onClick={() => removeItem()}>
                  Remove
                </h5>
              </>
            )}
          </div>
        </div>
      </div>

      <h4 className="item-price">₹ {computable.toLocaleString()}</h4>
    </div>
  );
}

export default CartCard;
