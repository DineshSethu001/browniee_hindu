
export default function Header({ cartCount }) {
  return (
    <header className="sticky top-0 z-20 border-b border-amber-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a href="/" className="text-2xl font-black tracking-tight text-amber-950">
          🍫 Brownie Bliss
        </a>

        <a
          href="#cart"
          className="rounded-full bg-amber-950 px-5 py-2.5 font-semibold text-white transition hover:bg-amber-800"
        >
          🛒 Cart ({cartCount})
        </a>
      </div>
    </header>
  );
}
