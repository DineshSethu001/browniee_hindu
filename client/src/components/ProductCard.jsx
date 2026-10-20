
export default function ProductCard({ product, onAdd }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="h-56 w-full object-cover"
        loading="lazy"
      />

      <div className="p-5">
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
          {product.category || "Brownie"}
        </span>

        <h3 className="mt-3 text-lg font-bold text-stone-900">
          {product.name}
        </h3>

        <p className="mt-2 min-h-12 text-sm leading-6 text-stone-600">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-xl font-extrabold text-amber-950">
            ₹{Number(product.price).toFixed(2)}
          </span>

          <button
            type="button"
            onClick={() => onAdd(product)}
            className="rounded-full bg-amber-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-800"
          >
            + Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
