
import { useEffect, useState } from "react";

import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

const API_URL = "http://localhost:5000/api/products";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from the Express backend
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Unable to load products.");
        }

        const data = await response.json();

        const normalizedProducts = (data.products || []).map(
          (product) => ({
            ...product,
            id: String(product._id ?? product.id),
          })
        );

        setProducts(normalizedProducts);
      } catch(err) {
        setError(
          "Could not connect to the store. Please check whether the backend is running."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Add a product to the cart
  function addToCart(product) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  }

  // Increase item quantity
  function increaseQuantity(id) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  // Decrease item quantity or remove it
  function decreaseQuantity(id) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Calculate the number of items and subtotal
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );


async function handleCheckout() {
  if (cartItems.length === 0) return;

  try {
    // Create the order through your Express backend
    const response = await fetch(
      "http://localhost:5000/api/payment/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Could not create order.");
    }

    // Open Razorpay Checkout
    const options = {
      key: data.keyId,
      amount: data.order.amount,
      currency: data.order.currency,
      name: "Brownie Bliss",
      description: "Brownie order",
      order_id: data.order.id,

      handler: function (paymentResponse) {
        console.log("Payment response:", paymentResponse);
        alert(
          "Payment response received. The server must verify it before the order is marked paid."
        );
      },

      theme: {
        color: "#451a03",
      },
    };

    const checkout = new window.Razorpay(options);
    checkout.open();
  } catch (error) {
    console.error("Checkout error:", error);
    alert(error.message || "Unable to start checkout.");
  }
}

  return (
    <div className="min-h-screen bg-amber-50/50">
      <Header cartCount={cartCount} />

      <main className="mx-auto max-w-7xl px-5 py-10 sm:py-14">
        <section className="mb-12 rounded-3xl bg-amber-950 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
            Freshly baked happiness
          </p>

          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            Welcome to Brownie Bliss
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-amber-100 sm:text-lg">
            Rich chocolate, fudgy centres, and sweet moments
            made just for you.
          </p>

          <a
            href="#products"
            className="mt-8 inline-block rounded-full bg-amber-300 px-7 py-3 font-bold text-amber-950 transition hover:bg-amber-200"
          >
            Explore Brownies
          </a>
        </section>

        <section id="products" className="scroll-mt-24">
          <div className="mb-7">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">
              Made for chocolate lovers
            </p>

            <h2 className="mt-2 text-3xl font-black text-amber-950 sm:text-4xl">
              Our Brownies
            </h2>
          </div>

          {loading && (
            <p className="py-12 text-center text-stone-600">
              Loading delicious brownies...
            </p>
          )}

          {!loading && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-800">
              <p>{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-3 font-bold underline"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && (
            <ProductList
              products={products}
              onAdd={addToCart}
            />
          )}
        </section>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-amber-950">
              A little sweetness goes a long way 🍫
            </h2>
            <p className="mt-3 leading-7 text-stone-600">
              Choose your favourite treats, adjust your quantities,
              and review your order before checkout.
            </p>
          </section>

          <Cart
            cartItems={cartItems}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            subtotal={subtotal}
            onCheckout={handleCheckout}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
