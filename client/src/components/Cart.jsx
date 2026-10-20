
export default function Cart({
  cartItems,
  onIncrease,
  onDecrease,
  subtotal,
  onCheckout,
}) {
  return (
    <section
      id="cart"
      className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm sm:p-7"
    >
      <h2 className="text-2xl font-extrabold text-amber-950">
        Your Cart 🛒
      </h2>

      {cartItems.length === 0 ? (
        <p className="mt-4 text-stone-500">
          Your cart is empty. Add something sweet!
        </p>
      ) : (
        <div className="mt-5 divide-y divide-amber-100">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 py-4"
            >
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-stone-900">
                  {item.name}
                </h3>
                <p className="mt-1 text-sm text-stone-600">
                  ₹{Number(item.price).toFixed(2)} each
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => onDecrease(item.id)}
                  aria-label={`Decrease ${item.name} quantity`}
                  className="h-8 w-8 rounded-full border border-amber-200 font-bold hover:bg-amber-50"
                >
                  −
                </button>

                <span className="w-5 text-center font-semibold">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  onClick={() => onIncrease(item.id)}
                  aria-label={`Increase ${item.name} quantity`}
                  className="h-8 w-8 rounded-full border border-amber-200 font-bold hover:bg-amber-50"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 flex items-center justify-between border-t border-amber-100 pt-5">
        <span className="font-semibold text-stone-700">Subtotal</span>
        <span className="text-2xl font-extrabold text-amber-950">
          ₹{subtotal.toFixed(2)}
        </span>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        disabled={cartItems.length === 0}
        className="mt-5 w-full rounded-full bg-amber-950 px-5 py-3 font-bold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Proceed to Checkout
      </button>
    </section>
  );
}
