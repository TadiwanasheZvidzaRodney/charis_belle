import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Gallery · Charis Belle",
  description: "View our stunning nail art and makeup transformations",
};

const galleryImages = [
  { src: "/gallery/card1.webp", alt: "Nail art design 1" },
  { src: "/gallery/card2.webp", alt: "Nail art design 2" },
  { src: "/gallery/card3.webp", alt: "Makeup look 1" },
  { src: "/gallery/card4.webp", alt: "Nail art design 3" },
  { src: "/gallery/card5.webp", alt: "Makeup look 2" },
  { src: "/gallery/card6.webp", alt: "Nail art design 4" },
  { src: "/gallery/card7.webp", alt: "Makeup look 3" },
  { src: "/gallery/card8.webp", alt: "Nail art design 5" },
  { src: "/gallery/card9.webp", alt: "Makeup look 4" },
  { src: "/gallery/card10.webp", alt: "Nail art design 6" },
];

export default async function GalleryPage() {
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

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#services" className="text-sm font-medium text-gray-700 hover:text-[#247245] transition">
              Services
            </Link>
            <Link href="/gallery" className="text-sm font-medium text-[#247245] transition">
              Gallery
            </Link>
            <Link href="/#about" className="text-sm font-medium text-gray-700 hover:text-[#247245] transition">
              About
            </Link>
            <Link href="/#testimonials" className="text-sm font-medium text-gray-700 hover:text-[#247245] transition">
              Testimonials
            </Link>
            <Link href="/#contact" className="text-sm font-medium text-gray-700 hover:text-[#247245] transition">
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
                  href="/#contact"
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
        {/* Hero */}
        <section className="bg-[#FAEDCD] py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-medium uppercase tracking-widest text-[#D4A373]">
              Our Work
            </p>
            <h1 className="mt-2 font-serif text-4xl text-gray-900 sm:text-5xl">
              Gallery
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Browse through our stunning nail art designs and flawless makeup looks. 
              Every client is unique, and so is every creation.
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="group aspect-square overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-gray-600">
                Follow us on Instagram for daily inspiration{" "}
                <a
                  href="https://instagram.com/charis_belle_expert/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#247245] hover:underline"
                >
                  @charis_belle_expert
                </a>
              </p>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#247245] px-8 py-4 text-base font-medium text-white shadow-lg transition hover:bg-[#1b5c36]"
              >
                Book Your Appointment
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <Image
                src="/CharisBelleLogo.webp"
                alt="Charis Belle"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-sm text-gray-400">
                © {new Date().getFullYear()} Charis Belle. All rights reserved.
              </span>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/" className="hover:text-white">Home</Link>
              <Link href="/#services" className="hover:text-white">Services</Link>
              <Link href="/#contact" className="hover:text-white">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
