"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const teamMembers = [
  {
    name: "Charis Belle",
    role: "Founder & Lead Aesthetician",
    image: "/CharisBelleLogo.webp",
    bio: "With over 10 years of experience in the beauty industry, Charis founded Charis Belle to bring personalized, professional beauty care to every client.",
  },
];

const milestones = [
  {
    year: "2015",
    title: "The Beginning",
    description: "Started as a small home-based beauty service with a passion for skincare.",
  },
  {
    year: "2017",
    title: "First Studio",
    description: "Opened our first dedicated beauty studio in Harare.",
  },
  {
    year: "2019",
    title: "Growing Team",
    description: "Expanded our team and services to include bridal packages.",
  },
  {
    year: "2021",
    title: "Digital Transformation",
    description: "Launched online booking and personalized client experiences.",
  },
  {
    year: "2024",
    title: "Charis Belle CRM",
    description: "Introduced our custom CRM for enhanced client relationships.",
  },
];

const values = [
  {
    icon: "💎",
    title: "Excellence",
    description: "We strive for perfection in every service we provide.",
  },
  {
    icon: "🤝",
    title: "Trust",
    description: "Building lasting relationships through honesty and reliability.",
  },
  {
    icon: "💖",
    title: "Care",
    description: "Every client is treated with genuine warmth and attention.",
  },
  {
    icon: "🌟",
    title: "Innovation",
    description: "Staying ahead with the latest beauty trends and techniques.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAEDCD]">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="text-center lg:text-left">
              <p className="mb-4 text-sm font-medium tracking-wider text-[#247245] uppercase">
                Our Story
              </p>
              <h1 className="font-serif text-4xl leading-tight text-gray-900 sm:text-5xl">
                About <span className="text-[#D4A373]">Charis Belle</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Born from a passion for enhancing natural beauty, Charis Belle
                has grown into a trusted name in personalized beauty care. We
                believe that everyone deserves to feel beautiful, confident, and
                celebrated.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                Our mission is simple: to provide exceptional beauty services
                that make you look and feel your best, while building genuine
                relationships with our clients.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="aspect-square overflow-hidden rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-black/5">
                <Image
                  src="/CharisBelleLogo.webp"
                  alt="Charis Belle Beauty"
                  width={500}
                  height={500}
                  className="h-full w-full rounded-2xl object-contain"
                  priority
                />
              </div>
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#D4A373]/20 blur-2xl" />
              <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-[#247245]/10 blur-2xl" />
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <p className="uppercase mb-2 text-sm font-medium tracking-wider text-[#D4A373]">
                What Drives Us
              </p>
              <h2 className="font-serif text-3xl text-gray-900 sm:text-4xl">
                Our Core Values
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                These principles guide everything we do at Charis Belle.
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl bg-[#FAEDCD]/50 p-6 text-center transition hover:shadow-lg"
                >
                  <span className="text-4xl">{value.icon}</span>
                  <h3 className="mt-4 font-serif text-xl text-gray-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section className="bg-[#FAEDCD] py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <p className="uppercase mb-2 text-sm font-medium tracking-wider text-[#D4A373]">
                Our Journey
              </p>
              <h2 className="font-serif text-3xl text-gray-900 sm:text-4xl">
                Milestones Along the Way
              </h2>
            </div>

            <div className="mt-12 relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-[#247245]/20 hidden lg:block" />

              <div className="space-y-8 lg:space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`relative flex flex-col lg:flex-row items-center gap-4 lg:gap-8 ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`flex-1 ${
                        index % 2 === 0 ? "lg:text-right" : "lg:text-left"
                      }`}
                    >
                      <div className="rounded-2xl bg-white p-6 shadow-md">
                        <span className="text-sm font-bold text-[#247245]">
                          {milestone.year}
                        </span>
                        <h3 className="mt-1 font-serif text-xl text-gray-900">
                          {milestone.title}
                        </h3>
                        <p className="mt-2 text-gray-600">{milestone.description}</p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="relative z-10 h-4 w-4 rounded-full bg-[#247245] ring-4 ring-white hidden lg:block" />

                    <div className="flex-1 hidden lg:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <p className="uppercase mb-2 text-sm font-medium tracking-wider text-[#D4A373]">
                The Face Behind the Brand
              </p>
              <h2 className="font-serif text-3xl text-gray-900 sm:text-4xl">
                Meet the Founder
              </h2>
            </div>

            <div className="mt-12 flex justify-center">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="max-w-md text-center rounded-2xl bg-[#FAEDCD]/50 p-8 shadow-lg"
                >
                  <div className="mx-auto h-32 w-32 overflow-hidden rounded-full bg-white p-2 shadow-md">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="h-full w-full rounded-full object-contain"
                    />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-[#247245] font-medium">{member.role}</p>
                  <p className="mt-4 text-gray-600 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#247245] py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="font-serif text-3xl text-white sm:text-4xl">
              Ready to Experience the Difference?
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Join our family of satisfied clients and discover personalized
              beauty care that truly celebrates you.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/book"
                className="rounded-full bg-white px-8 py-3.5 text-base font-medium text-[#247245] shadow-lg transition hover:bg-gray-100"
              >
                Book an Appointment
              </Link>
              <Link
                href="/contact"
                className="rounded-full border-2 border-white px-8 py-3.5 text-base font-medium text-white transition hover:bg-white/10"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
