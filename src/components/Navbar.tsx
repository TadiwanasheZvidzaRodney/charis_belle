import Image from 'next/image'
import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  return (
    <header className="border-b border-black/5 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/CharisBelleLogo.webp"
            alt="Charis Belle"
            width={48}
            height={48}
            className="rounded-full shadow-sm"
            priority
          />
          <span className="font-serif text-xl text-[#247245] tracking-wide hidden sm:inline">
            Charis Belle
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-[#247245] transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/book"
            className="hidden sm:inline-flex rounded-full bg-[#247245] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#1b5c36]"
          >
            Book Now
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 hover:text-[#247245] transition"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-[#D4A373] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#c08f5e]"
          >
            Sign up
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden border-t border-gray-100 px-4 py-2 flex justify-center gap-4 overflow-x-auto">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-gray-600 hover:text-[#247245] whitespace-nowrap"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
