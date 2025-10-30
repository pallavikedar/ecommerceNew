import Link from "next/link"

export default function Footer() {
  return (
    <footer className="mt-12 border-t">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-4">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">About</h3>
          <p className="text-sm opacity-80">
            Performance-first beauty and skincare. Designed to look good and feel better.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Shop</h3>
          <ul className="mt-2 space-y-1 text-sm opacity-80">
            <li>
              <Link href="#">Bestsellers</Link>
            </li>
            <li>
              <Link href="#">Makeup</Link>
            </li>
            <li>
              <Link href="#">Skincare</Link>
            </li>
            <li>
              <Link href="#">Combos</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Support</h3>
          <ul className="mt-2 space-y-1 text-sm opacity-80">
            <li>
              <Link href="#">Help & FAQs</Link>
            </li>
            <li>
              <Link href="#">Track Order</Link>
            </li>
            <li>
              <Link href="#">Returns</Link>
            </li>
            <li>
              <Link href="#">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Legal</h3>
          <ul className="mt-2 space-y-1 text-sm opacity-80">
            <li>
              <Link href="#">Terms</Link>
            </li>
            <li>
              <Link href="#">Privacy</Link>
            </li>
            <li>
              <Link href="#">Shipping Policy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs opacity-70">
        © {new Date().getFullYear()} Beauty Shop. All rights reserved.
      </div>
    </footer>
  )
}
