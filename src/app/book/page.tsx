"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

const services = [
  {
    id: "facial-basic",
    name: "Classic Facial",
    category: "Facials",
    duration: "60 min",
    price: "$50",
  },
  {
    id: "facial-deep",
    name: "Deep Cleansing Facial",
    category: "Facials",
    duration: "75 min",
    price: "$70",
  },
  {
    id: "facial-glow",
    name: "Glow Facial",
    category: "Facials",
    duration: "90 min",
    price: "$90",
  },
  {
    id: "makeup-day",
    name: "Day Makeup",
    category: "Makeup",
    duration: "45 min",
    price: "$40",
  },
  {
    id: "makeup-event",
    name: "Event Makeup",
    category: "Makeup",
    duration: "60 min",
    price: "$65",
  },
  {
    id: "makeup-glam",
    name: "Glam Makeup",
    category: "Makeup",
    duration: "75 min",
    price: "$85",
  },
  {
    id: "skincare-consultation",
    name: "Skincare Consultation",
    category: "Skincare",
    duration: "30 min",
    price: "$25",
  },
  {
    id: "skincare-treatment",
    name: "Treatment Session",
    category: "Skincare",
    duration: "60 min",
    price: "$55",
  },
  {
    id: "bridal-trial",
    name: "Bridal Trial",
    category: "Bridal",
    duration: "90 min",
    price: "$100",
  },
  {
    id: "bridal-full",
    name: "Bridal Day Package",
    category: "Bridal",
    duration: "3 hours",
    price: "$250",
  },
  {
    id: "bridal-party",
    name: "Bridal Party (per person)",
    category: "Bridal",
    duration: "60 min",
    price: "$75",
  },
];

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedService = services.find((s) => s.id === formData.service);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleServiceSelect = (serviceId: string) => {
    setFormData((prev) => ({ ...prev, service: serviceId }));
  };

  const handleTimeSelect = (time: string) => {
    setFormData((prev) => ({ ...prev, time }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success("Booking confirmed!", {
      description: `Your appointment for ${selectedService?.name} on ${formData.date} at ${formData.time} has been booked.`,
    });

    setStep(4);
    setIsSubmitting(false);
  };

  const canProceedStep1 = formData.service !== "";
  const canProceedStep2 = formData.date !== "" && formData.time !== "";
  const canProceedStep3 =
    formData.name !== "" && formData.email !== "" && formData.phone !== "";

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex min-h-screen flex-col bg-[#FAEDCD]">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="text-center">
            <p className="mb-4 text-sm font-medium tracking-wider text-[#247245] uppercase">
              Book Online
            </p>
            <h1 className="font-serif text-4xl leading-tight text-gray-900 sm:text-5xl">
              Book Your <span className="text-[#D4A373]">Appointment</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-gray-600">
              Choose your service, pick a time that works for you, and we&apos;ll
              take care of the rest.
            </p>
          </div>
        </section>

        {/* Progress Steps */}
        <section className="bg-white py-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="flex items-center justify-between">
              {[
                { num: 1, label: "Service" },
                { num: 2, label: "Date & Time" },
                { num: 3, label: "Your Details" },
                { num: 4, label: "Confirmation" },
              ].map((s, index) => (
                <div key={s.num} className="flex items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium ${
                      step >= s.num
                        ? "bg-[#247245] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step > s.num ? "✓" : s.num}
                  </div>
                  <span
                    className={`ml-2 hidden sm:inline text-sm ${
                      step >= s.num ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {s.label}
                  </span>
                  {index < 3 && (
                    <div
                      className={`ml-4 h-0.5 w-8 sm:w-16 ${
                        step > s.num ? "bg-[#247245]" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            {/* Step 1: Select Service */}
            {step === 1 && (
              <div className="rounded-3xl bg-white p-8 shadow-lg">
                <h2 className="font-serif text-2xl text-gray-900 mb-6">
                  Select a Service
                </h2>

                <div className="space-y-3">
                  {["Facials", "Makeup", "Skincare", "Bridal"].map((category) => (
                    <div key={category}>
                      <h3 className="text-sm font-semibold text-[#247245] uppercase tracking-wider mb-3">
                        {category}
                      </h3>
                      <div className="grid gap-3 sm:grid-cols-2 mb-6">
                        {services
                          .filter((s) => s.category === category)
                          .map((service) => (
                            <button
                              key={service.id}
                              onClick={() => handleServiceSelect(service.id)}
                              className={`text-left rounded-xl p-4 border-2 transition ${
                                formData.service === service.id
                                  ? "border-[#247245] bg-[#247245]/5"
                                  : "border-gray-200 hover:border-[#247245]/50"
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {service.name}
                                  </p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {service.duration}
                                  </p>
                                </div>
                                <span className="font-semibold text-[#247245]">
                                  {service.price}
                                </span>
                              </div>
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!canProceedStep1}
                    className="rounded-full bg-[#247245] px-8 py-3 text-base font-medium text-white shadow-lg transition hover:bg-[#1b5c36] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Select Date & Time */}
            {step === 2 && (
              <div className="rounded-3xl bg-white p-8 shadow-lg">
                <h2 className="font-serif text-2xl text-gray-900 mb-2">
                  Choose Date & Time
                </h2>
                <p className="text-gray-600 mb-6">
                  Selected service:{" "}
                  <span className="font-medium text-[#247245]">
                    {selectedService?.name}
                  </span>{" "}
                  ({selectedService?.duration})
                </p>

                <div className="grid gap-8 lg:grid-cols-2">
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={today}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-[#247245] focus:outline-none focus:ring-1 focus:ring-[#247245]"
                    />
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Time
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className={`rounded-lg py-2 px-3 text-sm font-medium transition ${
                            formData.time === time
                              ? "bg-[#247245] text-white"
                              : "bg-[#FAEDCD] text-gray-700 hover:bg-[#247245]/10"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="rounded-full border-2 border-gray-300 px-8 py-3 text-base font-medium text-gray-700 transition hover:border-gray-400"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!canProceedStep2}
                    className="rounded-full bg-[#247245] px-8 py-3 text-base font-medium text-white shadow-lg transition hover:bg-[#1b5c36] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Your Details */}
            {step === 3 && (
              <div className="rounded-3xl bg-white p-8 shadow-lg">
                <h2 className="font-serif text-2xl text-gray-900 mb-2">
                  Your Details
                </h2>
                <p className="text-gray-600 mb-6">
                  {selectedService?.name} on {formData.date} at {formData.time}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#247245] focus:outline-none focus:ring-1 focus:ring-[#247245]"
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
                        className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#247245] focus:outline-none focus:ring-1 focus:ring-[#247245]"
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>

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
                      required
                      className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#247245] focus:outline-none focus:ring-1 focus:ring-[#247245]"
                      placeholder="+263 77 123 4567"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="notes"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Special Requests (Optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#247245] focus:outline-none focus:ring-1 focus:ring-[#247245] resize-none"
                      placeholder="Any allergies, preferences, or special requests..."
                    />
                  </div>

                  {/* Summary */}
                  <div className="rounded-xl bg-[#FAEDCD]/50 p-6">
                    <h3 className="font-medium text-gray-900 mb-4">
                      Booking Summary
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service</span>
                        <span className="font-medium">{selectedService?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-medium">
                          {selectedService?.duration}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date</span>
                        <span className="font-medium">{formData.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time</span>
                        <span className="font-medium">{formData.time}</span>
                      </div>
                      <hr className="my-3" />
                      <div className="flex justify-between text-base">
                        <span className="font-medium text-gray-900">Total</span>
                        <span className="font-bold text-[#247245]">
                          {selectedService?.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="rounded-full border-2 border-gray-300 px-8 py-3 text-base font-medium text-gray-700 transition hover:border-gray-400"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!canProceedStep3 || isSubmitting}
                      className="rounded-full bg-[#247245] px-8 py-3 text-base font-medium text-white shadow-lg transition hover:bg-[#1b5c36] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Booking..." : "Confirm Booking"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="rounded-3xl bg-white p-8 shadow-lg text-center">
                <div className="mx-auto h-20 w-20 rounded-full bg-[#247245] flex items-center justify-center text-4xl text-white">
                  ✓
                </div>
                <h2 className="mt-6 font-serif text-3xl text-gray-900">
                  Booking Confirmed!
                </h2>
                <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto">
                  Thank you for booking with Charis Belle. We&apos;ve sent a
                  confirmation email to{" "}
                  <span className="font-medium">{formData.email}</span>.
                </p>

                <div className="mt-8 rounded-xl bg-[#FAEDCD]/50 p-6 max-w-sm mx-auto">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Appointment Details
                  </h3>
                  <div className="space-y-2 text-sm text-left">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service</span>
                      <span className="font-medium">{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date</span>
                      <span className="font-medium">{formData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time</span>
                      <span className="font-medium">{formData.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">
                        {selectedService?.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/"
                    className="rounded-full bg-[#247245] px-8 py-3 text-base font-medium text-white shadow-lg transition hover:bg-[#1b5c36]"
                  >
                    Back to Home
                  </a>
                  <button
                    onClick={() => {
                      setStep(1);
                      setFormData({
                        service: "",
                        date: "",
                        time: "",
                        name: "",
                        email: "",
                        phone: "",
                        notes: "",
                      });
                    }}
                    className="rounded-full border-2 border-[#247245] px-8 py-3 text-base font-medium text-[#247245] transition hover:bg-[#247245]/5"
                  >
                    Book Another
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Additional Info */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-8 sm:grid-cols-3">
              <div className="text-center">
                <span className="text-4xl">📧</span>
                <h3 className="mt-4 font-serif text-lg text-gray-900">
                  Confirmation Email
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  You&apos;ll receive a confirmation email with all the details.
                </p>
              </div>
              <div className="text-center">
                <span className="text-4xl">🔔</span>
                <h3 className="mt-4 font-serif text-lg text-gray-900">
                  Friendly Reminders
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  We&apos;ll send you a reminder before your appointment.
                </p>
              </div>
              <div className="text-center">
                <span className="text-4xl">💳</span>
                <h3 className="mt-4 font-serif text-lg text-gray-900">
                  Pay at Salon
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Payment is collected after your service is complete.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
