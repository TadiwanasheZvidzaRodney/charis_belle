"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: "📍",
    title: "Visit Us",
    details: ["123 Beauty Lane", "Avondale, Harare", "Zimbabwe"],
  },
  {
    icon: "📞",
    title: "Call Us",
    details: ["+263 77 123 4567", "+263 24 123 4567"],
  },
  {
    icon: "✉️",
    title: "Email Us",
    details: ["hello@charisbelle.co.zw", "bookings@charisbelle.co.zw"],
  },
  {
    icon: "🕐",
    title: "Opening Hours",
    details: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 4:00 PM", "Sun: Closed"],
  },
];

const faqs = [
  {
    question: "Do I need to book an appointment?",
    answer:
      "While walk-ins are welcome when we have availability, we highly recommend booking an appointment to ensure you get your preferred time slot and service provider.",
  },
  {
    question: "What should I bring to my appointment?",
    answer:
      "Just yourself! We provide all products and tools needed for your treatment. If you have specific products you'd like us to use, feel free to bring them along.",
  },
  {
    question: "How far in advance should I book for bridal services?",
    answer:
      "We recommend booking bridal packages at least 3-6 months in advance to ensure availability and allow time for trial sessions.",
  },
  {
    question: "Do you offer home services?",
    answer:
      "Yes! We offer home service for bridal packages and special events. Additional travel charges may apply depending on location.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message sent!", {
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAEDCD]">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="text-center">
            <p className="mb-4 text-sm font-medium tracking-wider text-[#247245] uppercase">
              Get in Touch
            </p>
            <h1 className="font-serif text-4xl leading-tight text-gray-900 sm:text-5xl">
              Contact <span className="text-[#D4A373]">Us</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-gray-600">
              Have a question or want to book an appointment? We&apos;d love to hear
              from you. Reach out using any of the methods below.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className="rounded-2xl bg-[#FAEDCD]/50 p-6 text-center transition hover:shadow-lg"
                >
                  <span className="text-4xl">{info.icon}</span>
                  <h3 className="mt-4 font-serif text-xl text-gray-900">
                    {info.title}
                  </h3>
                  <div className="mt-2 space-y-1">
                    {info.details.map((detail, index) => (
                      <p key={index} className="text-sm text-gray-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="bg-[#FAEDCD] py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Contact Form */}
              <div className="rounded-3xl bg-white p-8 shadow-lg">
                <h2 className="font-serif text-2xl text-gray-900">
                  Send Us a Message
                </h2>
                <p className="mt-2 text-gray-600">
                  Fill out the form below and we&apos;ll get back to you within 24
                  hours.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#247245] focus:outline-none focus:ring-1 focus:ring-[#247245]"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#247245] focus:outline-none focus:ring-1 focus:ring-[#247245]"
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#247245] focus:outline-none focus:ring-1 focus:ring-[#247245]"
                        placeholder="+263 77 123 4567"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#247245] focus:outline-none focus:ring-1 focus:ring-[#247245]"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="booking">Booking Question</option>
                        <option value="bridal">Bridal Services</option>
                        <option value="corporate">Corporate Events</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#247245] focus:outline-none focus:ring-1 focus:ring-[#247245] resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-[#247245] px-8 py-3.5 text-base font-medium text-white shadow-lg transition hover:bg-[#1b5c36] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>

              {/* Map Placeholder / Additional Info */}
              <div className="space-y-8">
                {/* Map */}
                <div className="rounded-3xl bg-white p-4 shadow-lg overflow-hidden h-64 lg:h-80">
                  <div className="w-full h-full rounded-2xl bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-5xl">🗺️</span>
                      <p className="mt-4 text-gray-600 font-medium">
                        123 Beauty Lane, Avondale
                      </p>
                      <p className="text-sm text-gray-500">Harare, Zimbabwe</p>
                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-[#247245] text-sm font-medium hover:underline"
                      >
                        Open in Google Maps →
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="rounded-3xl bg-white p-8 shadow-lg">
                  <h3 className="font-serif text-xl text-gray-900">
                    Follow Us
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Stay updated with our latest work and promotions.
                  </p>
                  <div className="mt-6 flex gap-4">
                    <a
                      href="#"
                      className="h-12 w-12 rounded-full bg-[#FAEDCD] flex items-center justify-center text-2xl transition hover:bg-[#247245] hover:text-white"
                    >
                      📷
                    </a>
                    <a
                      href="#"
                      className="h-12 w-12 rounded-full bg-[#FAEDCD] flex items-center justify-center text-2xl transition hover:bg-[#247245] hover:text-white"
                    >
                      📘
                    </a>
                    <a
                      href="#"
                      className="h-12 w-12 rounded-full bg-[#FAEDCD] flex items-center justify-center text-2xl transition hover:bg-[#247245] hover:text-white"
                    >
                      💬
                    </a>
                    <a
                      href="#"
                      className="h-12 w-12 rounded-full bg-[#FAEDCD] flex items-center justify-center text-2xl transition hover:bg-[#247245] hover:text-white"
                    >
                      🐦
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <p className="uppercase mb-2 text-sm font-medium tracking-wider text-[#D4A373]">
                Common Questions
              </p>
              <h2 className="font-serif text-3xl text-gray-900 sm:text-4xl">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-[#FAEDCD]/50 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
                  >
                    <span className="font-medium text-gray-900">
                      {faq.question}
                    </span>
                    <span
                      className={`text-2xl text-[#247245] transition-transform ${
                        openFaq === index ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
