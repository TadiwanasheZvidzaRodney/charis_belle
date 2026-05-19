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
    <div className="flex min-h-screen flex-col bg-[#FAEDCD]">
      {/* Header */}
      <header className="border-b border-black/5 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
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

          <nav className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    className="text-sm font-medium text-[#247245] hover:underline"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#247245] transition"
                >
                  <span className="hidden sm:inline">👋</span>
                  <span>{displayName}</span>
                </Link>
                <Link
                  href="/profile"
                  className="rounded-full bg-[#D4A373] px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#c08f5e]"
                >
                  My Profile
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
                  className="rounded-full bg-[#D4A373] px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#c08f5e]"
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="text-center lg:text-left">
              {isLoggedIn ? (
                <>
                  <h1 className="font-serif text-4xl leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                    Welcome back,{" "}
                    <span className="text-[#D4A373]">{displayName}</span>
                  </h1>
                  <p className="mt-6 text-lg leading-relaxed text-gray-600 sm:text-xl">
                    Great to see you again! Check your profile to update your preferences,
                    or explore our latest offerings. We're here to help you look and feel your best.
                  </p>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                    <Link
                      href="/profile"
                      className="rounded-full bg-[#247245] px-8 py-3.5 text-center text-base font-medium text-white shadow-lg transition hover:bg-[#1b5c36] hover:shadow-xl"
                    >
                      View My Profile
                    </Link>
                    <Link
                      href="#features"
                      className="rounded-full border-2 border-[#247245] px-8 py-3.5 text-center text-base font-medium text-[#247245] transition hover:bg-[#247245]/5"
                    >
                      Our Services
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="font-serif text-4xl leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                    Beauty that celebrates{" "}
                    <span className="text-[#D4A373]">you</span>
                  </h1>
                  <p className="mt-6 text-lg leading-relaxed text-gray-600 sm:text-xl">
                    Join Charis Belle and receive personalized beauty tips, exclusive
                    birthday treats, and gentle reminders for your next appointment.
                    Because you deserve to feel special every day.
                  </p>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                    <Link
                      href="/signup"
                      className="rounded-full bg-[#247245] px-8 py-3.5 text-center text-base font-medium text-white shadow-lg transition hover:bg-[#1b5c36] hover:shadow-xl"
                    >
                      Get Started — It's Free
                    </Link>
                    <Link
                      href="#features"
                      className="rounded-full border-2 border-[#247245] px-8 py-3.5 text-center text-base font-medium text-[#247245] transition hover:bg-[#247245]/5"
                    >
                      Learn More
                    </Link>
                  </div>
                </>
              )}
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

        {/* Features Section */}
        <section id="features" className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="font-serif text-3xl text-gray-900 sm:text-4xl">
                Why our clients love us
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Simple, thoughtful touches that make all the difference.
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
                icon="✨"
                title="Exclusive Offers"
                description="Be the first to know about new services and special promotions."
              />
              <FeatureCard
                icon="📱"
                title="Easy Profile"
                description="Manage your preferences and contact details in one simple place."
              />
              <FeatureCard
                icon="💖"
                title="Personal Touch"
                description="Every message is crafted with care, just for you."
              />
              <FeatureCard
                icon="🔒"
                title="Your Privacy"
                description="Your data is safe with us. We only use it to make your experience better."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#247245] py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            {isLoggedIn ? (
              <>
                <h2 className="font-serif text-3xl text-white sm:text-4xl">
                  Keep your profile up to date
                </h2>
                <p className="mt-4 text-lg text-white/80">
                  Make sure we have your latest info so you never miss a special treat!
                </p>
                <Link
                  href="/profile"
                  className="mt-8 inline-block rounded-full bg-white px-10 py-4 text-base font-medium text-[#247245] shadow-lg transition hover:bg-[#FAEDCD]"
                >
                  Update My Profile
                </Link>
              </>
            ) : (
              <>
                <h2 className="font-serif text-3xl text-white sm:text-4xl">
                  Ready to feel special?
                </h2>
                <p className="mt-4 text-lg text-white/80">
                  Join hundreds of happy clients who never miss a birthday treat.
                </p>
                <Link
                  href="/signup"
                  className="mt-8 inline-block rounded-full bg-white px-10 py-4 text-base font-medium text-[#247245] shadow-lg transition hover:bg-[#FAEDCD]"
                >
                  Create Your Free Account
                </Link>
              </>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/5 bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <Image
                src="/CharisBelleLogo.webp"
                alt="Charis Belle"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-sm text-gray-600">
                © {new Date().getFullYear()} Charis Belle. All rights reserved.
              </span>
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
              {isLoggedIn ? (
                <>
                  <Link href="/profile" className="hover:text-[#247245]">
                    My Profile
                  </Link>
                  {isAdmin && (
                    <Link href="/admin/dashboard" className="hover:text-[#247245]">
                      Admin
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link href="/login" className="hover:text-[#247245]">
                    Log in
                  </Link>
                  <Link href="/signup" className="hover:text-[#247245]">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
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
    <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6 transition hover:border-[#D4A373]/30 hover:bg-white hover:shadow-md">
      <div className="mb-4 text-3xl">{icon}</div>
      <h3 className="font-serif text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
    </div>
  );
}
