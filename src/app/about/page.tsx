import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Header */}
      <header className="py-6 px-4 border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/CharisBelleLogo.webp"
              alt="Charis Belle Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-2xl font-bold text-rose-600">Charis Belle</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-gray-600 hover:text-rose-600 transition">Home</Link>
            <Link href="/gallery" className="text-gray-600 hover:text-rose-600 transition">Gallery</Link>
            <Link href="/about" className="text-rose-600 font-semibold">About</Link>
          </nav>
        </div>
      </header>

      {/* About Hero */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About <span className="text-rose-600">Charis Belle</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Where beauty meets artistry. We specialize in creating stunning nail designs 
            and flawless makeup looks that make you feel confident and beautiful.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded with a passion for beauty and creativity, Charis Belle has grown 
                into a trusted name in nail artistry and makeup services. Our journey 
                began with a simple belief: everyone deserves to feel beautiful.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we continue to push boundaries with innovative techniques, 
                premium products, and personalized service that puts your unique 
                beauty at the center of everything we do.
              </p>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/gallery/card1.webp"
                alt="Charis Belle Studio"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for perfection in every brushstroke and nail design.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Care</h3>
              <p className="text-gray-600">
                Your comfort and satisfaction are our top priorities.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Creativity</h3>
              <p className="text-gray-600">
                We bring your unique vision to life with artistic flair.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience Charis Belle?</h2>
          <p className="text-xl mb-8 opacity-90">
            Book your appointment today and discover your most beautiful self.
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-white text-rose-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Charis Belle. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
