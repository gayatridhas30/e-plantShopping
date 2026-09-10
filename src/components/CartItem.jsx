import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart
} from "../redux/CartSlice";
import { Link } from "react-router-dom";

function CartItem() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Coming Soon!");
  };

  return (
    <div className="cart-page">
      <nav className="navbar">
        <Link to="/" className="nav-logo">
          Paradise Nursery
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/plants">Plants</Link>
          <Link to="/cart" className="cart-link">
            🛒 Cart <span>{cartCount}</span>
          </Link>
        </div>
      </nav>

      <div className="cart-container">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some beautiful plants to your cart.</p>

            <Link to="/plants" className="continue-button">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-list">
              {cartItems.map((item) => {
                const itemTotal = item.price * item.quantity;

                return (
                  <div className="cart-item" key={item.id}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-image"
                    />

                    <div className="cart-details">
                      <h2>{item.name}</h2>

                      <p>
                        Unit Price: ${item.price.toFixed(2)}
                      </p>

                      <p>
                        Total: ${itemTotal.toFixed(2)}
                      </p>

                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            dispatch(decreaseQuantity(item.id))
                          }
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() =>
                            dispatch(increaseQuantity(item.id))
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="delete-button"
                        onClick={() =>
                          dispatch(removeFromCart(item.id))
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-summary">
              <h2>
                Total Items: {cartCount}
              </h2>

              <h2>
                Total Amount: ${totalAmount.toFixed(2)}
              </h2>

              <div className="cart-actions">
                <button
                  className="checkout-button"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>

                <Link
                  to="/plants"
                  className="continue-button"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;