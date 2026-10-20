
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-amber-100 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-7 text-center text-sm text-stone-500">
        <p>© {new Date().getFullYear()} Brownie Bliss.</p>
        <p className="mt-1">Sweetness in Every Bite 🍫</p>
      </div>
    </footer>
  );
}
