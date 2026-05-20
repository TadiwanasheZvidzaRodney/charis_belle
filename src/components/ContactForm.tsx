'use client'

import { useActionState } from 'react'
import { submitContactForm, type ContactFormState } from '@/app/actions/contact'

const inputClass =
  'mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#247245] focus:outline-none focus:ring-2 focus:ring-[#247245]/20'

export function ContactForm() {
  const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(
    submitContactForm,
    null
  )

  return (
    <div className="rounded-2xl bg-[#FAEDCD] p-8 shadow-lg">
      <h3 className="font-serif text-2xl text-gray-900">Send us a message</h3>
      
      {state?.success && (
        <div className="mt-4 rounded-lg bg-green-50 p-4 text-green-800 ring-1 ring-green-200">
          <p className="flex items-center gap-2">
            <span className="text-xl">✓</span>
            {state.success}
          </p>
        </div>
      )}
      
      {state?.error && (
        <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-700 ring-1 ring-red-200">
          <p className="flex items-center gap-2">
            <span className="text-xl">✕</span>
            {state.error}
          </p>
        </div>
      )}
      
      <form action={formAction} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={isPending}
            className={inputClass}
            placeholder="Nyasha Charis"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={isPending}
            className={inputClass}
            placeholder="charis@gmail.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone / WhatsApp
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            disabled={isPending}
            className={inputClass}
            placeholder="+263 71 922 7377"
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700">
            Service Interested In
          </label>
          <select
            id="service"
            name="service"
            disabled={isPending}
            className={inputClass}
          >
            <option value="">Select a service</option>
            <option value="Acrylic Nails">Acrylic Nails</option>
            <option value="Gel Manicure">Gel Manicure</option>
            <option value="Nail Art & Designs">Nail Art & Designs</option>
            <option value="Pedicure">Pedicure</option>
            <option value="Full Glam Makeup">Full Glam Makeup</option>
            <option value="Bridal Makeup">Bridal Makeup</option>
            <option value="Soft Glam / Natural Makeup">Soft Glam / Natural Makeup</option>
            <option value="Lash Extensions">Lash Extensions</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            disabled={isPending}
            className={inputClass}
            placeholder="Tell us about your preferred date/time or any questions..."
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-[#247245] px-6 py-4 text-base font-medium text-white shadow-lg transition hover:bg-[#1b5c36] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  )
}
