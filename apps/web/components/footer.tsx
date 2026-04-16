import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-white/60">
      <div className="shell flex flex-col gap-6 px-2 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-3xl text-ink">Rouhi Gems</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-ink/60">
            Phase 1 foundation for a premium make-to-order jewellery storefront.
            Next steps after this UI slice are Supabase, Cloudinary, notifications,
            and the full order backend.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-ink/70">
          <Link href="/">Home</Link>
          <Link href="/catalogue">Catalogue</Link>
          <Link href="/custom-order">Custom Order</Link>
          <Link href="/about">About</Link>
        </div>
      </div>
    </footer>
  );
}

