import Image from 'next/image'
import Link from 'next/link'

const footerLinks = {
  services: [
    { href: '/services#facials', label: 'Facials' },
    { href: '/services#skincare', label: 'Skincare' },
    { href: '/services#makeup', label: 'Makeup' },
    { href: '/services#bridal', label: 'Bridal' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/contact', label: 'Contact' },
    { href: '/book', label: 'Book Appointment' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#247245] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/CharisBelleLogo.webp"
                alt="Charis Belle"
                width={48}
                height={48}
                className="rounded-full"
              />
              <span className="font-serif text-xl tracking-wide">
                Charis Belle
              </span>
            </Link>
            <p className="mt-4 text-sm text-white/70 max-w-xs">
              Your trusted beauty expert. Enhancing your natural beauty with
              personalized care and professional expertise.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>123 Beauty Lane, Harare</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+263771234567" className="hover:text-white">
                  +263 77 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:hello@charisbelle.co.zw" className="hover:text-white">
                  hello@charisbelle.co.zw
                </a>
              </li>
            </ul>
            <div className="mt-4 flex gap-4">
              <a href="#" className="text-white/70 hover:text-white text-xl">
                📘
              </a>
              <a href="#" className="text-white/70 hover:text-white text-xl">
                📸
              </a>
              <a href="#" className="text-white/70 hover:text-white text-xl">
                🐦
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Charis Belle. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/60">
            {footerLinks.legal.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
