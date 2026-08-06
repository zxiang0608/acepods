import React, { useState } from 'react';
import { pushDataLayerEvent } from '../lib/tracking';

const POD_OPTIONS = [
  { value: '', label: 'Select a pod (optional)' },
  { value: 'Ace Uno', label: 'Ace Uno — 1 pax, pod only from RM8,850' },
  { value: 'Ace Plus', label: 'Ace Plus — 1 pax, from RM14,500' },
  { value: 'Ace Flex', label: 'Ace Flex — 1 pax, from RM19,900' },
  { value: 'Ace Flex Duo', label: 'Ace Flex Duo — 2 pax, from RM23,900' },
  { value: 'Ace Meet', label: 'Ace Meet — 2–4 pax, from RM22,200' },
  { value: 'Ace Hub', label: 'Ace Hub — up to 6 pax, from RM27,800' }
];

export default function QuoteForm({ defaultPod = '' }) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    whatsapp: '',
    pod: defaultPod,
    message: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = `Office pod enquiry${form.pod ? ` — ${form.pod}` : ''}`;
    const body = [
      `Name: ${form.name}`,
      form.company ? `Company: ${form.company}` : null,
      `WhatsApp: ${form.whatsapp}`,
      form.pod ? `Pod of interest: ${form.pod}` : null,
      form.message ? `Message: ${form.message}` : null
    ]
      .filter(Boolean)
      .join('\n');

    pushDataLayerEvent('quote_form_submit', {
      cta_location: 'quote_form',
      pod_interest: form.pod || 'not specified'
    });

    window.location.href = `mailto:sales@aceofficepods.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const inputClass =
    'w-full rounded-[6px] border border-[#d0d3d7] bg-white px-3 py-2.5 text-[14px] text-[#172126] placeholder-[#9aa0a8] outline-none transition-colors focus:border-[#00855a] focus:ring-1 focus:ring-[#007653]/30';

  return (
    <section className="rounded-[10px] border border-[#ddd8cf] bg-white p-6">
      <h2 className="text-[20px] font-semibold tracking-tight text-[#172126]">Request a quote</h2>
      <p className="mt-1 text-[14px] text-[#68726f]">Fill in your details and we'll get back to you within one business day.</p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3" noValidate>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="qf-name" className="mb-1 block text-[13px] font-medium text-[#172126]">Name <span aria-hidden="true" className="text-[#c0392b]">*</span></label>
            <input
              id="qf-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="qf-company" className="mb-1 block text-[13px] font-medium text-[#172126]">Company</label>
            <input
              id="qf-company"
              name="company"
              type="text"
              autoComplete="organization"
              value={form.company}
              onChange={handleChange}
              placeholder="Company name (optional)"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="qf-whatsapp" className="mb-1 block text-[13px] font-medium text-[#172126]">WhatsApp number <span aria-hidden="true" className="text-[#c0392b]">*</span></label>
          <input
            id="qf-whatsapp"
            name="whatsapp"
            type="tel"
            required
            autoComplete="tel"
            value={form.whatsapp}
            onChange={handleChange}
            placeholder="+60 11-xxxx xxxx"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="qf-pod" className="mb-1 block text-[13px] font-medium text-[#172126]">Pod of interest</label>
          <select
            id="qf-pod"
            name="pod"
            value={form.pod}
            onChange={handleChange}
            className={inputClass}
          >
            {POD_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="qf-message" className="mb-1 block text-[13px] font-medium text-[#172126]">Message (optional)</label>
          <textarea
            id="qf-message"
            name="message"
            rows={3}
            value={form.message}
            onChange={handleChange}
            placeholder="Share any details about your space, quantity, or timeline..."
            className={`${inputClass} resize-none`}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-[6px] bg-[#00855a] px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#172126] sm:w-auto"
        >
          Send enquiry
        </button>
        <p className="text-[12px] text-[#68726f]">This will open your email app pre-filled. Alternatively, WhatsApp us at +60 11-5435 2700.</p>
      </form>
    </section>
  );
}
