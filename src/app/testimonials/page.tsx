import Link from 'next/link';

export const metadata = {
  title: 'Testimonials | Charisbelle Beauty',
  description: 'See what our clients say about Charisbelle Beauty.',
};

const testimonials = [
  {
    name: 'Sarah M.',
    service: 'Bridal Makeup',
    quote: 'Charisbelle made me feel like a queen on my wedding day. My makeup was flawless and lasted all day and night!',
    rating: 5,
  },
  {
    name: 'Tendai K.',
    service: 'Acrylic Nails',
    quote: 'Best nails I\'ve ever had! The attention to detail is incredible and they last so long.',
    rating: 5,
  },
  {
    name: 'Michelle R.',
    service: 'Full Glam Makeup',
    quote: 'I always get so many compliments when I leave Charisbelle. Truly talented artist!',
    rating: 5,
  },
  {
    name: 'Nyasha P.',
    service: 'Gel Manicure',
    quote: 'Professional service every time. My nails always look stunning and the gel lasts for weeks.',
    rating: 5,
  },
  {
    name: 'Grace T.',
    service: 'Nail Art',
    quote: 'The nail art designs are absolutely gorgeous. She brings my vision to life every single time.',
    rating: 5,
  },
  {
    name: 'Chido M.',
    service: 'Natural Makeup',
    quote: 'Perfect natural look for my photoshoot. Everyone thought I wasn\'t wearing makeup!',
    rating: 5,
  },
];

export default function TestimonialsPage() {
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
          Client Testimonials
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Don&apos;t just take our word for it — hear what our amazing clients have to say!
        </p>
      </section>

      {/* Testimonials Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
              
              {/* Author */}
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-pink-600 text-sm">{testimonial.service}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-pink-600 py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience the Difference?</h2>
        <p className="text-pink-100 mb-8 max-w-xl mx-auto">
          Join our growing list of satisfied clients and let us help you look your best.
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
