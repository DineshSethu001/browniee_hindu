
import ProductCard from "./ProductCard";

export default function ProductList({ products, onAdd }) {
  if (products.length === 0) {
    return (
      <p className="col-span-full py-12 text-center text-stone-500">
        No brownies available right now.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
}
 