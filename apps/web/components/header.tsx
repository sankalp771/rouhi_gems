import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/about", label: "About" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/65 backdrop-blur-xl">
      <div className="shell flex items-center justify-between px-2 py-4">
        <Link href="/" className="font-serif text-3xl text-ink">
          Rouhi Gems
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink/70 transition hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/catalogue"
          className="rounded-full border border-gold/25 bg-white/80 px-4 py-2 text-sm font-semibold text-ink transition hover:border-gold/60"
        >
          Create Your Piece
        </Link>
      </div>
    </header>
  );
}
