import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Our Services | Charisbelle Beauty',
  description: 'Professional nail and makeup services by Charisbelle Beauty.',
};

const services = [
  {
    title: 'Acrylic Nails',
    description: 'Durable and beautiful acrylic nail extensions with custom designs.',
    price: 'From $45',
    image: '/gallery/card1.webp',
  },
  {
    title: 'Gel Manicure',
    description: 'Long-lasting gel polish with a flawless, chip-free finish.',
    price: 'From $35',
    image: '/gallery/card2.webp',
  },
  {
    title: 'Nail Art',
    description: 'Custom nail art designs from simple accents to intricate patterns.',
    price: 'From $15+',
    image: '/gallery/card3.webp',
  },
  {
    title: 'Full Glam Makeup',
    description: 'Complete makeup application for any special occasion.',
    price: 'From $75',
    image: '/gallery/card4.webp',
  },
  {
    title: 'Bridal Makeup',
    description: 'Flawless bridal looks that last all day and photograph beautifully.',
    price: 'From $150',
    image: '/gallery/card5.webp',
  },
  {
    title: 'Natural/Everyday Makeup',
    description: 'Enhance your natural beauty with a subtle, polished look.',
    price: 'From $55',
    image: '/gallery/card6.webp',
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-pink-600">
            Charisbelle
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-pink-600 transition-colors">Home</Link>
            <Link href="/services" className="text-pink-600 font-semibold">Services</Link>
            <Link href="/gallery" className="text-gray-700 hover:text-pink-600 transition-colors">Gallery</Link>
            <Link href="/about" className="text-gray-700 hover:text-pink-600 transition-colors">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-pink-600 transition-colors">Contact</Link>
          </nav>
          <Link
            href="/book"
            className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Our Services
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Professional nail and makeup services tailored to make you look and feel your best.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-pink-600 font-semibold">{service.price}</span>
                  <Link
                    href="/book"
                    className="text-pink-600 hover:text-pink-700 font-medium"
                  >
                    Book →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-pink-600 py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Book?</h2>
        <p className="text-pink-100 mb-8 max-w-xl mx-auto">
          Contact us today to schedule your appointment and experience the Charisbelle difference.
        </p>
        <Link
          href="/book"
          className="inline-block bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
        >
          Book Your Appointment
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <p>&copy; {new Date().getFullYear()} Charisbelle Beauty. All rights reserved.</p>
      </footer>
    </main>
  );
}
