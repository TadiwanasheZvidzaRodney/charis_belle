import Link from 'next/link';

export const metadata = {
  title: 'Book an Appointment | Charisbelle Beauty',
  description: 'Book your nail or makeup appointment with Charisbelle Beauty.',
};

export default function BookPage() {
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
            <Link href="/services" className="text-gray-700 hover:text-pink-600 transition-colors">Services</Link>
            <Link href="/gallery" className="text-gray-700 hover:text-pink-600 transition-colors">Gallery</Link>
            <Link href="/about" className="text-gray-700 hover:text-pink-600 transition-colors">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-pink-600 transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Book Your Appointment
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Ready to look and feel amazing? Choose how you&apos;d like to book your appointment.
        </p>
      </section>

      {/* Booking Options */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-8">
          {/* WhatsApp Booking */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Book via WhatsApp</h2>
            <p className="text-gray-600 mb-6">
              Quick and easy! Send us a message on WhatsApp and we&apos;ll get back to you within minutes.
            </p>
            <a
              href="https://wa.me/263771234567?text=Hi!%20I'd%20like%20to%20book%20an%20appointment%20for%20"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full bg-green-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-green-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Message on WhatsApp
            </a>
          </div>

          {/* Phone/Call Booking */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Call Us Directly</h2>
            <p className="text-gray-600 mb-6">
              Prefer to talk? Give us a call and we&apos;ll help you find the perfect time slot.
            </p>
            <a
              href="tel:+263771234567"
              className="inline-flex items-center justify-center w-full bg-pink-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-pink-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call +263 77 123 4567
            </a>
          </div>
        </div>

        {/* Services Preview */}
        <div className="mt-12 bg-pink-50 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Our Services</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'Acrylic Nails', price: 'From $45' },
              { name: 'Gel Manicure', price: 'From $35' },
              { name: 'Nail Art', price: 'From $15+' },
              { name: 'Full Glam Makeup', price: 'From $75' },
              { name: 'Bridal Makeup', price: 'From $150' },
              { name: 'Natural Makeup', price: 'From $55' },
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-lg p-4 flex justify-between items-center">
                <span className="font-medium text-gray-900">{service.name}</span>
                <span className="text-pink-600 font-semibold">{service.price}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-6 text-gray-600">
            <Link href="/services" className="text-pink-600 hover:text-pink-700 font-medium">
              View all services →
            </Link>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <p>&copy; {new Date().getFullYear()} Charisbelle Beauty. All rights reserved.</p>
      </footer>
    </main>
  );
}
