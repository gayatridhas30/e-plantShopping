import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import { Link } from "react-router-dom";
import plants from "../data/plants";

function ProductList() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const categories = [...new Set(plants.map((plant) => plant.category))];

  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  return (
    <div className="products-page">

      {/* NAVBAR */}
      <nav className="navbar">

        <Link to="/" className="nav-logo">
          Paradise Nursery
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/plants">Plants</Link>
          <Link to="/about">About</Link>

          <Link to="/cart" className="cart-link">
            🛒 Cart <span>{cartCount}</span>
          </Link>
        </div>

      </nav>


      {/* PAGE HEADER */}
      <header className="products-header">

        <h1>Our Plants</h1>

        <p>
          Discover a wide variety of beautiful plants for your home and garden.
        </p>

      </header>


      {/* PLANT CATEGORIES */}
      {categories.map((category) => {

        const categoryPlants = plants.filter(
          (plant) => plant.category === category
        );

        return (
          <section
            className="plant-category"
            key={category}
          >

            <h2>
              {category}
            </h2>

            <div className="plant-grid">

              {categoryPlants.map((plant) => (

                <div
                  className="plant-card"
                  key={plant.id}
                >

                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="plant-image"

                    onError={(event) => {
                      event.currentTarget.src =
                        "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=600&q=80";
                    }}
                  />

                  <div className="plant-info">

                    <h3>
                      {plant.name}
                    </h3>

                    <p>
                      {plant.description}
                    </p>

                    <strong>
                      ${plant.price.toFixed(2)}
                    </strong>

                    <button
                      onClick={() =>
                        dispatch(addToCart(plant))
                      }

                      disabled={isInCart(plant.id)}
                    >
                      {isInCart(plant.id)
                        ? "Added to Cart"
                        : "Add to Cart"}
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </section>
        );
      })}

    </div>
  );
}

export default ProductList;