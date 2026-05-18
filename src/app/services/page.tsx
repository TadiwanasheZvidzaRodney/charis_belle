import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'Services · Charis Belle',
  description: 'Explore our range of professional beauty services including facials, makeup, skincare, and bridal packages.',
}

const services = [
  {
    id: 'facials',
    icon: '✨',
    title: 'Facials',
    description: 'Rejuvenating facial treatments to cleanse, exfoliate, and nourish your skin.',
    treatments: [
      { name: 'Classic Facial', duration: '60 min', price: '$50' },
      { name: 'Deep Cleansing Facial', duration: '75 min', price: '$70' },
      { name: 'Anti-Aging Facial', duration: '90 min', price: '$90' },
      { name: 'Hydrating Facial', duration: '60 min', price: '$60' },
    ],
  },
  {
    id: 'makeup',
    icon: '💄',
    title: 'Makeup',
    description: 'Professional makeup application for any occasion, from natural to glamorous.',
    treatments: [
      { name: 'Natural Day Look', duration: '45 min', price: '$40' },
      { name: 'Evening Glam', duration: '60 min', price: '$60' },
      { name: 'Special Occasion', duration: '75 min', price: '$80' },
      { name: 'Makeup Lesson', duration: '90 min', price: '$100' },
    ],
  },
  {
    id: 'skincare',
    icon: '💆‍♀️',
    title: 'Skincare',
    description: 'Customized skincare consultations and treatments for healthy, glowing skin.',
    treatments: [
      { name: 'Skin Analysis', duration: '30 min', price: '$25' },
      { name: 'Acne Treatment', duration: '60 min', price: '$65' },
      { name: 'Chemical Peel', duration: '45 min', price: '$80' },
      { name: 'Microdermabrasion', duration: '60 min', price: '$90' },
    ],
  },
  {
    id: 'bridal',
    icon: '👰',
    title: 'Bridal',
    description: 'Complete bridal beauty packages to make your special day unforgettable.',
    treatments: [
      { name: 'Bridal Makeup Trial', duration: '90 min', price: '$80' },
      { name: 'Wedding Day Makeup', duration: '120 min', price: '$150' },
      { name: 'Bridal Package (Face + Makeup)', duration: '180 min', price: '$250' },
      { name: 'Bridal Party (per person)', duration: '60 min', price: '$70' },
    ],
  },
  {
    id: 'body',
    icon: '🧴',
    title: 'Body Treatments',
    description: 'Relaxing body treatments to pamper and rejuvenate from head to toe.',
    treatments: [
      { name: 'Body Scrub', duration: '45 min', price: '$55' },
      { name: 'Body Wrap', duration: '60 min', price: '$70' },
      { name: 'Back Facial', duration: '45 min', price: '$50' },
      { name: 'Full Body Package', duration: '120 min', price: '$140' },
    ],
  },
  {
    id: 'lashes',
    icon: '👁️',
    title: 'Lashes & Brows',
    description: 'Enhance your eyes with professional lash and brow services.',
    treatments: [
      { name: 'Lash Lift & Tint', duration: '60 min', price: '$65' },
      { name: 'Brow Shaping', duration: '20 min', price: '$20' },
      { name: 'Brow Tinting', duration: '15 min', price: '$15' },
      { name: 'Lash Extensions (Full Set)', duration: '120 min', price: '$150' },
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[#FAEDCD] py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
            <p className="text-sm font-medium text-[#247245] tracking-wider uppercase mb-4">
              Our Services
            </p>
            <h1 className="font-serif text-4xl text-gray-900 sm:text-5xl">
              Beauty services tailored for <span className="text-[#D4A373]">you</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              From relaxing facials to stunning bridal looks, we offer a complete
              range of professional beauty services to enhance your natural beauty.
            </p>
            <Link
              href="/book"
              className="mt-8 inline-block rounded-full bg-[#247245] px-8 py-3.5 text-base font-medium text-white shadow-lg transition hover:bg-[#1b5c36]"
            >
              Book Appointment
            </Link>
          </div>
        </section>

        {/* Services List */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="space-y-16">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  id={service.id}
                  className={`scroll-mt-24 grid gap-8 lg:grid-cols-2 lg:items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="text-5xl mb-4">{service.icon}</div>
                    <h2 className="font-serif text-3xl text-gray-900">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                      {service.description}
                    </p>
                    <Link
                      href="/book"
                      className="mt-6 inline-flex items-center gap-2 text-[#247245] font-medium hover:underline"
                    >
                      Book this service →
                    </Link>
                  </div>

                  <div className={`bg-[#FAEDCD]/50 rounded-2xl p-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Available Treatments
                    </h3>
                    <div className="space-y-3">
                      {service.treatments.map((treatment) => (
                        <div
                          key={treatment.name}
                          className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              {treatment.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {treatment.duration}
                            </p>
                          </div>
                          <p className="font-semibold text-[#247245]">
                            {treatment.price}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#247245] py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="font-serif text-3xl text-white">
              Ready to book your treatment?
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Schedule your appointment today and let us take care of you.
            </p>
            <Link
              href="/book"
              className="mt-8 inline-block rounded-full bg-white px-10 py-4 text-base font-medium text-[#247245] shadow-lg transition hover:bg-[#FAEDCD]"
            >
              Book Now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
