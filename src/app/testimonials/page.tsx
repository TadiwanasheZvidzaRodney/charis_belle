"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const testimonials = [
  {
    id: 1,
    name: "Sarah Moyo",
    role: "Bride",
    image: null,
    rating: 5,
    text: "Charis Belle made my wedding day absolutely perfect! The bridal makeup was stunning and lasted all day. I felt like a princess. The attention to detail and genuine care made the experience unforgettable.",
    service: "Bridal Package",
  },
  {
    id: 2,
    name: "Tendai Chirara",
    role: "Regular Client",
    image: null,
    rating: 5,
    text: "I've been coming to Charis Belle for over two years now. The facials are amazing, and my skin has never looked better. The birthday surprises always make me feel so special!",
    service: "Facials & Skincare",
  },
  {
    id: 3,
    name: "Grace Mutasa",
    role: "First-time Client",
    image: null,
    rating: 5,
    text: "From the moment I walked in, I felt welcomed and cared for. The consultation was thorough, and the results exceeded my expectations. I've already booked my next appointment!",
    service: "Facial Treatment",
  },
  {
    id: 4,
    name: "Nyasha Dube",
    role: "Corporate Client",
    image: null,
    rating: 5,
    text: "We booked Charis Belle for our company event, and the team was absolutely professional. Every attendee received personalized attention, and the makeup looked flawless in all our photos.",
    service: "Corporate Event",
  },
  {
    id: 5,
    name: "Rudo Chikwanha",
    role: "Regular Client",
    image: null,
    rating: 5,
    text: "The appointment reminders are so helpful! I never miss my skincare sessions anymore. The products they use are gentle on my sensitive skin, and I've seen real improvements.",
    service: "Skincare Routine",
  },
  {
    id: 6,
    name: "Tariro Mapfumo",
    role: "Bride",
    image: null,
    rating: 5,
    text: "My bridesmaids and I all had our makeup done here. The team handled all of us with such grace and efficiency. We all looked beautiful and the photos are magazine-worthy!",
    service: "Bridal Party Package",
  },
];

const stats = [
  { value: "500+", label: "Happy Clients" },
  { value: "50+", label: "Weddings" },
  { value: "8+", label: "Years Experience" },
  { value: "4.9", label: "Average Rating" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${
            i < rating ? "text-[#D4A373]" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 flex-shrink-0 rounded-full bg-[#247245] flex items-center justify-center text-white font-serif text-lg">
          {testimonial.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="font-serif text-lg text-gray-900">{testimonial.name}</h3>
          <p className="text-sm text-gray-500">{testimonial.role}</p>
        </div>
      </div>

      <div className="mt-4">
        <StarRating rating={testimonial.rating} />
      </div>

      <blockquote className="mt-4 text-gray-600 leading-relaxed">
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <span className="inline-block rounded-full bg-[#FAEDCD] px-3 py-1 text-xs font-medium text-[#247245]">
          {testimonial.service}
        </span>
      </div>
    </div>
  );
}

export default function TestimonialsPage() {
  const [filter, setFilter] = useState("all");

  const filteredTestimonials =
    filter === "all"
      ? testimonials
      : testimonials.filter((t) =>
          t.service.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div className="flex min-h-screen flex-col bg-[#FAEDCD]">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="text-center">
            <p className="mb-4 text-sm font-medium tracking-wider text-[#247245] uppercase">
              Client Stories
            </p>
            <h1 className="font-serif text-4xl leading-tight text-gray-900 sm:text-5xl">
              What Our <span className="text-[#D4A373]">Clients</span> Say
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-gray-600">
              Don&apos;t just take our word for it. Here&apos;s what our amazing clients
              have to say about their experience with Charis Belle.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-[#247245] py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-serif text-4xl font-bold text-white sm:text-5xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filter & Testimonials */}
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {["all", "Bridal", "Facials", "Skincare", "Corporate"].map(
                (category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      filter === category
                        ? "bg-[#247245] text-white"
                        : "bg-[#FAEDCD] text-gray-700 hover:bg-[#247245]/10"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                )
              )}
            </div>

            {/* Testimonials Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>

            {filteredTestimonials.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No testimonials found for this category.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Featured Review */}
        <section className="bg-[#FAEDCD] py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <div className="text-5xl mb-6">💬</div>
            <blockquote className="font-serif text-2xl text-gray-900 leading-relaxed sm:text-3xl">
              &ldquo;Charis Belle isn&apos;t just a beauty service — it&apos;s an experience.
              From the personalized attention to the birthday surprises, they
              make you feel like family.&rdquo;
            </blockquote>
            <div className="mt-8">
              <div className="h-16 w-16 mx-auto rounded-full bg-[#247245] flex items-center justify-center text-white font-serif text-2xl">
                T
              </div>
              <p className="mt-4 font-medium text-gray-900">Tendai Chirara</p>
              <p className="text-sm text-gray-500">Client since 2022</p>
            </div>
          </div>
        </section>

        {/* Leave a Review CTA */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="rounded-3xl bg-[#247245] p-8 sm:p-12 text-center">
              <h2 className="font-serif text-2xl text-white sm:text-3xl">
                Had a Great Experience?
              </h2>
              <p className="mt-4 text-white/80 max-w-xl mx-auto">
                We&apos;d love to hear from you! Share your story and help others
                discover the Charis Belle experience.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="rounded-full bg-white px-8 py-3.5 text-base font-medium text-[#247245] shadow-lg transition hover:bg-gray-100"
                >
                  Share Your Story
                </Link>
                <Link
                  href="/book"
                  className="rounded-full border-2 border-white px-8 py-3.5 text-base font-medium text-white transition hover:bg-white/10"
                >
                  Book Your Visit
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
