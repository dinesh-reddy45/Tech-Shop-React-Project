import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {increaseQuantity,decreaseQuantity,removeFromCart,clearCart,} from "../redux/cartSlice";

import {ShoppingCart,ShoppingCart as EmptyCart,Plus,Minus,Trash2,} from "lucide-react";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const handleCheckout = () => {
    const loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    if (!loggedInUser) {
      alert("Please Login to confirm your order!");
      return;
    }

    dispatch(clearCart());

    alert(
      `Order Confirmed! Thank you, ${loggedInUser.username}.`
    );
  };

  // Total quantity of products
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Original price
  const originalPrice = cartItems.reduce(
    (total, item) =>
      total + item.originalPrice * item.quantity,
    0
  );

  // Final price
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.finalPrice * item.quantity,
    0
  );

  // Discount
  const discount = originalPrice - totalPrice;

  // Empty Cart
  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-[75vh] flex-col items-center justify-center bg-[#141414] text-center">

        <div className="mb-6 text-red-600">
          <ShoppingCart size={120} strokeWidth={1.5} />
        </div>

        <h1 className="mb-6 text-2xl font-bold text-gray-300">
          Your Cart is Empty
        </h1>

        <Link
          to="/"
          className="bg-red-600 px-8 py-3 text-white transition hover:bg-red-700"
        >
          Start Shopping
        </Link>

      </main>
    );
  }

  return (
    <section className="min-h-[75vh] bg-[#141414] px-4 py-10 text-gray-300 lg:px-8">

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">

        {/* Cart Products */}
        <section className="bg-[#191a1e] p-6">

          {cartItems.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-5 border-b border-gray-700 py-8 sm:flex-row sm:items-center"
            >

              {/* Product Image */}
              <div className="flex h-36 w-full shrink-0 items-center justify-center sm:w-36">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-1 flex-col">

                <div className="flex items-start justify-between gap-4">

                  <h2 className="text-lg font-medium text-gray-200">
                    {item.title}
                  </h2>

                  <button
                    onClick={() =>
                      dispatch(removeFromCart(item.id))
                    }
                    className="text-gray-400 transition hover:text-red-600"
                    aria-label="Remove product"
                  >
                    <Trash2 size={20} />
                  </button>

                </div>

                {/* Prices */}
                <div className="mt-4 flex items-center gap-4">

                  <span className="text-xl font-bold text-gray-200">
                    ₹{item.finalPrice.toLocaleString("en-IN")}
                  </span>

                  <span className="text-sm text-gray-500 line-through">
                    ₹{item.originalPrice.toLocaleString("en-IN")}
                  </span>

                </div>

                {/* Quantity Controls */}
                <div className="mt-6 flex w-fit items-center border border-gray-700">

                  <button
                    onClick={() =>
                      dispatch(decreaseQuantity(item.id))
                    }
                    className="bg-[#242529] px-4 py-2 hover:bg-[#303136]"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="px-6 font-bold text-red-600">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(increaseQuantity(item.id))
                    }
                    className="bg-[#242529] px-4 py-2 hover:bg-[#303136]"
                  >
                    <Plus size={18} />
                  </button>

                </div>

              </div>

            </article>
          ))}

        </section>

        {/* Order Summary */}
        <aside className="h-fit bg-[#141414] lg:sticky lg:top-8">

          <h2 className="mb-10 text-xl font-bold text-gray-200">
            Order Summary ({totalQuantity} items)
          </h2>

          <div className="space-y-7">

            <div className="flex justify-between gap-3">
              <span>Original Price</span>
              <span className="font-semibold">
                ₹{originalPrice.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between gap-3">
              <span>Discount</span>
              <span className="font-semibold text-green-600">
                - ₹{discount.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between gap-3">
              <span>Delivery</span>
              <span className="font-semibold text-green-600">
                Free
              </span>
            </div>

          </div>

          <hr className="my-10 border-gray-700" />

          <div className="mb-12 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold">
              Total Price
            </h2>

            <span className="text-2xl font-bold">
              ₹{totalPrice.toLocaleString("en-IN")}
            </span>
          </div>

          <button
            className="w-full bg-red-600 py-3 text-lg text-white transition hover:bg-red-700"
            onClick={handleCheckout}
          >
            Checkout
          </button>

        </aside>

      </div>

    </section>
  );
}

export default Cart;
