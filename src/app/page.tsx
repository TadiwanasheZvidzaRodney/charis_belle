import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", user.id)
      .maybeSingle();
    profile = data;
  }

  const isLoggedIn = !!user;
  const isAdmin = profile?.role === "admin";
  const displayName = profile?.full_name || user?.email?.split("@")[0] || "Guest";

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/CharisBelleLogo.webp"
              alt="Charis Belle"
              width={48}
              height={48}
              className="rounded-full shadow-sm"
              priority
            />
            <span className="font-serif text-xl text-[#247245] tracking-wide">
              Charis Belle
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-sm font-medium text-gray-700 hover:text-[#247245] transition">
              Services
            </Link>
            <Link href="#gallery" className="text-sm font-medium text-gray-700 hover:text-[#247245] transition">
              Gallery
            </Link>
            <Link href="#about" className="text-sm font-medium text-gray-700 hover:text-[#247245] transition">
              About
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-gray-700 hover:text-[#247245] transition">
              Testimonials
            </Link>
            <Link href="#contact" className="text-sm font-medium text-gray-700 hover:text-[#247245] transition">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    className="hidden sm:inline text-sm font-medium text-[#247245] hover:underline"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  href="/profile"
                  className="text-sm font-medium text-gray-700 hover:text-[#247245] transition"
                >
                  {displayName}
                </Link>
                <Link
                  href="#contact"
                  className="rounded-full bg-[#247245] px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#1b5c36]"
                >
                  Book Now
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 hover:text-[#247245] transition"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full bg-[#247245] px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#1b5c36]"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-[#FAEDCD] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FAEDCD] via-[#FAEDCD] to-[#D4A373]/20" />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="text-center lg:text-left">
                <p className="text-sm font-medium uppercase tracking-widest text-[#247245]">
                  Nails • Makeup • Beauty
                </p>
                <h1 className="mt-4 font-serif text-4xl leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                  Stunning Nails &{" "}
                  <span className="text-[#D4A373]">Flawless Makeup</span>
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-gray-600 sm:text-xl">
                  From gorgeous nail art to show-stopping makeup looks, we help you 
                  look and feel your best for any occasion. Experience the 
                  Charis Belle difference.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                  <Link
                    href="#contact"
                    className="rounded-full bg-[#247245] px-8 py-4 text-center text-base font-medium text-white shadow-lg transition hover:bg-[#1b5c36] hover:shadow-xl"
                  >
                    Book an Appointment
                  </Link>
                  <Link
                    href="#services"
                    className="rounded-full border-2 border-[#247245] px-8 py-4 text-center text-base font-medium text-[#247245] transition hover:bg-[#247245]/5"
                  >
                    View Services
                  </Link>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5">
                  <Image
                    src="/CharisBelleLogo.webp"
                    alt="Charis Belle Beauty Services"
                    width={600}
                    height={750}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#D4A373]/30 blur-2xl" />
                <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-[#247245]/20 blur-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-[#D4A373]">
                What We Offer
              </p>
              <h2 className="mt-2 font-serif text-3xl text-gray-900 sm:text-4xl lg:text-5xl">
                Our Services
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                From stunning nail art to flawless makeup, we offer premium beauty 
                services designed to make you look and feel your absolute best.
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <ServiceCard
                title="Acrylic Nails"
                description="Beautiful, durable acrylic nail extensions in any length and shape. Choose from hundreds of colors and designs to express your unique style."
                price="From $45"
                image="/CharisBelleLogo.webp"
              />
              <ServiceCard
                title="Gel Manicure"
                description="Long-lasting gel polish that stays chip-free for weeks. Includes nail shaping, cuticle care, and your choice of color or nail art."
                price="From $35"
                image="/CharisBelleLogo.webp"
              />
              <ServiceCard
                title="Nail Art & Designs"
                description="Express yourself with custom nail art! From elegant French tips to bold, creative designs — we bring your vision to life."
                price="From $10+"
                image="/CharisBelleLogo.webp"
              />
              <ServiceCard
                title="Full Glam Makeup"
                description="Stunning makeup for any occasion — weddings, parties, photoshoots, or a special night out. Flawless finish guaranteed."
                price="From $75"
                image="/CharisBelleLogo.webp"
              />
              <ServiceCard
                title="Bridal Makeup"
                description="Look breathtaking on your special day. Includes trial session, day-of application, and touch-up kit. We create your perfect bridal look."
                price="From $150"
                image="/CharisBelleLogo.webp"
              />
              <ServiceCard
                title="Soft Glam / Natural Makeup"
                description="Enhance your natural beauty with a soft, radiant look perfect for everyday wear, graduations, or professional headshots."
                price="From $55"
                image="/CharisBelleLogo.webp"
              />
              <ServiceCard
                title="Pedicure"
                description="Treat your feet to a relaxing pedicure with exfoliation, massage, and polish. Add gel or nail art for extra glam."
                price="From $40"
                image="/CharisBelleLogo.webp"
              />
              <ServiceCard
                title="Nail Repair & Refills"
                description="Keep your nails looking fresh with regular fills and repairs. We fix breaks and maintain your perfect manicure."
                price="From $25"
                image="/CharisBelleLogo.webp"
              />
              <ServiceCard
                title="Lash Extensions"
                description="Classic, hybrid, and volume lash extensions to complement your makeup look. Wake up beautiful every day."
                price="From $100"
                image="/CharisBelleLogo.webp"
              />
            </div>

            <div className="mt-12 text-center">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#D4A373] px-8 py-4 text-base font-medium text-white shadow-lg transition hover:bg-[#c08f5e]"
              >
                Book Your Appointment
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="bg-[#FAEDCD]/50 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-[#D4A373]">
                Our Work
              </p>
              <h2 className="mt-2 font-serif text-3xl text-gray-900 sm:text-4xl lg:text-5xl">
                Gallery
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                See the stunning transformations we've created for our clients.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Gallery placeholders - replace with actual images */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="group aspect-square overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl"
                >
                  <Image
                    src="/CharisBelleLogo.webp"
                    alt={`Gallery image ${i}`}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600">
                Follow us on Instagram for more inspiration{" "}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#247245] hover:underline"
                >
                  @charisbellebeauty
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-[#FAEDCD] shadow-xl">
                  <Image
                    src="/CharisBelleLogo.webp"
                    alt="About Charis Belle"
                    width={500}
                    height={625}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 rounded-2xl bg-[#247245] p-6 text-white shadow-xl">
                  <p className="text-3xl font-bold">💅</p>
                  <p className="text-sm">Nail & Makeup Experts</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-[#D4A373]">
                  About Us
                </p>
                <h2 className="mt-2 font-serif text-3xl text-gray-900 sm:text-4xl">
                  Your Beauty, Our Passion
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-gray-600">
                  At Charis Belle, we're passionate about helping you look and feel 
                  amazing. Whether you're here for a fresh set of nails, stunning 
                  makeup for a special event, or just some self-care, we've got you covered.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  Our talented artists stay on top of the latest trends and techniques 
                  to bring you the best in nail art and makeup artistry. We use only 
                  premium, long-lasting products and pride ourselves on creating a 
                  relaxing, welcoming space where you can unwind and be pampered.
                </p>
                
                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-3xl font-bold text-[#247245]">500+</p>
                    <p className="text-sm text-gray-600">Happy Clients</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[#247245]">100%</p>
                    <p className="text-sm text-gray-600">Quality Products</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[#247245]">5★</p>
                    <p className="text-sm text-gray-600">Average Rating</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[#247245]">Certified</p>
                    <p className="text-sm text-gray-600">Professional Artists</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="bg-[#247245] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-[#D4A373]">
                Testimonials
              </p>
              <h2 className="mt-2 font-serif text-3xl text-white sm:text-4xl lg:text-5xl">
                What Our Clients Say
              </h2>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <TestimonialCard
                quote="My nails have never looked better! The nail art designs are absolutely stunning and last for weeks. I always get so many compliments!"
                author="Sarah M."
                service="Acrylic Nails"
              />
              <TestimonialCard
                quote="Got my makeup done for my wedding and I looked like a dream! The team really listened to what I wanted and made it even better."
                author="Emily R."
                service="Bridal Makeup"
              />
              <TestimonialCard
                quote="Best gel manicure I've ever had! The nail art is always on point and lasts forever. This is my go-to spot now!"
                author="Jessica T."
                service="Gel Manicure"
              />
            </div>
          </div>
        </section>

        {/* Contact / Booking Section */}
        <section id="contact" className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-[#D4A373]">
                  Get in Touch
                </p>
                <h2 className="mt-2 font-serif text-3xl text-gray-900 sm:text-4xl">
                  Book Your Appointment
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Ready to enhance your natural beauty? Contact us to schedule your 
                  appointment or ask any questions. We'd love to hear from you!
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FAEDCD] text-xl">
                      📍
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Location</p>
                      <p className="text-gray-600">123 Beauty Lane, Suite 100<br />Your City, State 12345</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FAEDCD] text-xl">
                      📞
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">(555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FAEDCD] text-xl">
                      ✉️
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">hello@charisbelle.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FAEDCD] text-xl">
                      🕐
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Hours</p>
                      <p className="text-gray-600">
                        Mon - Fri: 9:00 AM - 7:00 PM<br />
                        Sat: 10:00 AM - 5:00 PM<br />
                        Sun: Closed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-[#247245] hover:text-white"
                  >
                    <span className="sr-only">Instagram</span>
                    📸
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-[#247245] hover:text-white"
                  >
                    <span className="sr-only">Facebook</span>
                    📘
                  </a>
                  <a
                    href="https://wa.me/15551234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-[#247245] hover:text-white"
                  >
                    <span className="sr-only">WhatsApp</span>
                    💬
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="rounded-2xl bg-[#FAEDCD] p-8 shadow-lg">
                <h3 className="font-serif text-2xl text-gray-900">Send us a message</h3>
                <form className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#247245] focus:outline-none focus:ring-2 focus:ring-[#247245]/20"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#247245] focus:outline-none focus:ring-2 focus:ring-[#247245]/20"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#247245] focus:outline-none focus:ring-2 focus:ring-[#247245]/20"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-[#247245] focus:outline-none focus:ring-2 focus:ring-[#247245]/20"
                    >
                      <option value="">Select a service</option>
                      <option value="acrylic-nails">Acrylic Nails</option>
                      <option value="gel-manicure">Gel Manicure</option>
                      <option value="nail-art">Nail Art & Designs</option>
                      <option value="pedicure">Pedicure</option>
                      <option value="full-glam-makeup">Full Glam Makeup</option>
                      <option value="bridal-makeup">Bridal Makeup</option>
                      <option value="soft-glam-makeup">Soft Glam / Natural Makeup</option>
                      <option value="lash-extensions">Lash Extensions</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#247245] focus:outline-none focus:ring-2 focus:ring-[#247245]/20"
                      placeholder="Tell us about your preferred date/time or any questions..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#247245] px-6 py-4 text-base font-medium text-white shadow-lg transition hover:bg-[#1b5c36]"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!isLoggedIn && (
          <section className="bg-[#D4A373] py-16">
            <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
              <h2 className="font-serif text-3xl text-white sm:text-4xl">
                Join Our Community
              </h2>
              <p className="mt-4 text-lg text-white/90">
                Sign up to receive exclusive offers, appointment reminders, and beauty tips.
              </p>
              <Link
                href="/signup"
                className="mt-8 inline-block rounded-full bg-white px-10 py-4 text-base font-medium text-[#D4A373] shadow-lg transition hover:bg-[#FAEDCD]"
              >
                Create Your Account
              </Link>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/CharisBelleLogo.webp"
                  alt="Charis Belle"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="font-serif text-lg">Charis Belle</span>
              </div>
              <p className="mt-4 text-sm text-gray-400">
                Premium nail art, makeup artistry, and beauty services. 
                Look stunning for any occasion.
              </p>
            </div>

            <div>
              <h4 className="font-medium">Quick Links</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li><Link href="#services" className="hover:text-white">Services</Link></li>
                <li><Link href="#gallery" className="hover:text-white">Gallery</Link></li>
                <li><Link href="#about" className="hover:text-white">About</Link></li>
                <li><Link href="#contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium">Services</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>Acrylic Nails</li>
                <li>Gel Manicure</li>
                <li>Nail Art</li>
                <li>Full Glam Makeup</li>
                <li>Bridal Makeup</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium">Contact</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-400">
                <li>123 Beauty Lane</li>
                <li>Your City, State 12345</li>
                <li>(555) 123-4567</li>
                <li>hello@charisbelle.com</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 sm:flex-row">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Charis Belle. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              {isLoggedIn ? (
                <>
                  <Link href="/profile" className="hover:text-white">My Profile</Link>
                  {isAdmin && <Link href="/admin/dashboard" className="hover:text-white">Admin</Link>}
                </>
              ) : (
                <>
                  <Link href="/login" className="hover:text-white">Log in</Link>
                  <Link href="/signup" className="hover:text-white">Sign up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({
  title,
  description,
  price,
  image,
}: {
  title: string;
  description: string;
  price: string;
  image: string;
}) {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl">
      <div className="aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-xl font-semibold text-gray-900">{title}</h3>
          <span className="shrink-0 rounded-full bg-[#FAEDCD] px-3 py-1 text-sm font-medium text-[#247245]">
            {price}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function TestimonialCard({
  quote,
  author,
  service,
}: {
  quote: string;
  author: string;
  service: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg">
      <div className="mb-4 text-4xl text-[#D4A373]">"</div>
      <p className="text-gray-700 leading-relaxed">{quote}</p>
      <div className="mt-6 border-t border-gray-100 pt-4">
        <p className="font-medium text-gray-900">{author}</p>
        <p className="text-sm text-[#247245]">{service}</p>
      </div>
    </div>
  );
}
