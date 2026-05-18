import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAEDCD] flex flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="mb-8 flex flex-col items-center gap-3">
        <Image
          src="/CharisBelleLogo.webp"
          alt="Charis Belle"
          width={96}
          height={96}
          priority
          className="rounded-full shadow-md"
        />
        <span className="font-serif text-2xl text-[#247245] tracking-wide">
          Charis Belle
        </span>
      </Link>

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5">
        {children}
      </div>
    </div>
  )
}
