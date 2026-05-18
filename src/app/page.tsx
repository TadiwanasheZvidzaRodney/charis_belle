import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAEDCD]">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="text-center lg:text-left">
              <p className="mb-4 text-sm font-medium tracking-wider text-[#247245] uppercase">
                Welcome to Charis Belle
              </p>
              <h1 className="font-serif text-4xl leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Beauty that celebrates{" "}
                <span className="text-[#D4A373]">you</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-600 sm:text-xl">
                Experience personalized beauty services that enhance your natural
                radiance. From facials to bridal makeup, we're here to make you
                feel extraordinary.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  href="/book"
                  className="rounded-full bg-[#247245] px-8 py-3.5 text-center text-base font-medium text-white shadow-lg transition hover:bg-[#1b5c36] hover:shadow-xl"
                >
                  Book Appointment
                </Link>
                <Link
                  href="/services"
                  className="rounded-full border-2 border-[#247245] px-8 py-3.5 text-center text-base font-medium text-[#247245] transition hover:bg-[#247245]/5"
                >
                  Our Services
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="aspect-square overflow-hidden rounded-3xl bg-white p-4 shadow-2xl ring-1 ring-black/5">
                <Image
                  src="/CharisBelleLogo.webp"
                  alt="Charis Belle Beauty"
                  width={500}
                  height={500}
                  className="h-full w-full rounded-2xl object-contain"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#D4A373]/20 blur-2xl" />
              <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-[#247245]/10 blur-2xl" />
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <p className="uppercase mb-2 text-sm font-medium tracking-wider text-[#D4A373]">
                What We Offer
              </p>
              <h2 className="font-serif text-3xl text-gray-900 sm:text-4xl">
                Our Services
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-gray-600 sm:mx-auto">
                Discover our range of professional beauty services designed to
                enhance your natural beauty.
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <ServiceCard
                icon="✨"
                title="Facials"
                description="Rejuvenating treatments for glowing, healthy skin."
                href="/services#facials"
              />
              <ServiceCard
                icon="💄"
                title="Makeup"
                description="Professional makeup for any occasion."
                href="/services#makeup"
              />
              <ServiceCard
                icon="💆‍♀️"
                title="Skincare"
                description="Customized skincare routines and treatments."
                href="/services#skincare"
              />
              <ServiceCard
                icon="👰"
                title="Bridal"
                description="Complete bridal beauty packages."
                href="/services#bridal"
              />
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 font-medium text-[#247245] hover:underline"
              >
                View all services →
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-[#FAEDCD] py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <p className="uppercase mb-2 text-sm font-medium tracking-wider text-[#D4A373]">
                Why Charis Belle
              </p>
              <h2 className="font-serif text-3xl text-gray-900 sm:text-4xl">
                Why clients love us
              </h2>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon="🎂"
                title="Birthday Surprises"
                description="Receive a special treat on your birthday — because your day should be celebrated!"
              />
              <FeatureCard
                icon="💌"
                title="Gentle Reminders"
                description="Never miss your next appointment with friendly, personalized reminders."
              />
              <FeatureCard
                icon="👩‍🔬"
                title="Expert Care"
                description="Trained professionals dedicated to your beauty and wellness."
              />
              <FeatureCard
                icon="🌿"
                title="Quality Products"
                description="We use only premium, skin-friendly products for all treatments."
              />
              <FeatureCard
                icon="💖"
                title="Personal Touch"
                description="Every service is tailored to your unique needs and preferences."
              />
              <FeatureCard
                icon="🔒"
                title="Your Privacy"
                description="Your data is safe with us. We only use it to serve you better."
              />
            </div>
          </div>
        </section>

        {/* Testimonials Preview */}
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <p className="uppercase mb-2 text-sm font-medium tracking-wider text-[#D4A373]">
                Testimonials
              </p>
              <h2 className="font-serif text-3xl text-gray-900 sm:text-4xl">
                What our clients say
              </h2>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <TestimonialCard
                quote="Charis Belle transformed my skin! The facials are amazing and the staff is so professional."
                author="Sarah M."
                role="Regular Client"
              />
              <TestimonialCard
                quote="My bridal makeup was absolutely perfect. I felt like a queen on my special day!"
                author="Linda K."
                role="Bride"
              />
              <TestimonialCard
                quote="The birthday surprises are such a lovely touch. It really shows they care about their clients."
                author="Grace T."
                role="Member since 2023"
              />
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/testimonials"
                className="inline-flex items-center gap-2 font-medium text-[#247245] hover:underline"
              >
                Read more testimonials →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#247245] py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="font-serif text-3xl text-white sm:text-4xl">
              Ready to feel beautiful?
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Book your appointment today and experience the Charis Belle
              difference.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
              <Link
                href="/book"
                className="inline-block rounded-full bg-white px-10 py-4 text-base font-medium text-[#247245] shadow-lg transition hover:bg-[#FAEDCD]"
              >
                Book Appointment
              </Link>
              <Link
                href="/contact"
                className="inline-block rounded-full border-2 border-white px-10 py-4 text-base font-medium text-white transition hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ServiceCard({
  icon,
  title,
  description,
  href,
}: {
  icon: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-gray-100 bg-gray-50/50 p-6 transition hover:border-[#D4A373]/30 hover:bg-white hover:shadow-lg"
    >
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="font-serif text-xl font-semibold text-gray-900 group-hover:text-[#247245]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
    </Link>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="mb-4 text-3xl">{icon}</div>
      <h3 className="font-serif text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
    </div>
  );
}

function TestimonialCard({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role: string;
}) {
  return (
    <div className="rounded-2xl bg-[#FAEDCD]/50 p-6">
      <p className="text-gray-700 italic">"{quote}"</p>
      <div className="mt-4">
        <p className="font-semibold text-gray-900">{author}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  );
}
