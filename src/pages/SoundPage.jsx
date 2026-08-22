import { Link } from 'react-router-dom';
import { buildCanonical } from '../seo/schema';

const WHATSAPP_LINK = 'https://wa.link/9umr4q';

// Sound page (D22) — acoustic performance explained. TÜV citation per ZX ruling 2026-08-22:
// model-specific to the tested pod only; never "soundproof"; never imply TÜV endorses Ace.
export default function SoundPage() {
  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32">
      <div className="mx-auto max-w-3xl px-5 pb-20">
        <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#007653]">Acoustic performance</p>
        <h1 className="mt-3 text-[28px] font-bold leading-[1.2] tracking-tight text-[#172126] md:text-[40px]">
          How our pods handle sound.
        </h1>

        <section className="mt-10 space-y-5 text-[15.5px] leading-relaxed text-[#374151]">
          <p>
            Every Ace pod is built as a layered acoustic enclosure: sound-absorbing inner panels, a solid
            core structure, laminated safety glazing and sealed joints. The goal is practical privacy — calls,
            video meetings and focused work that don't leak in or out.
          </p>
          <p>
            One pod in our range has been independently tested in a laboratory reverberation room to the
            ASTM E596 / E413 standards:
          </p>
        </section>

        {/* Evidence block */}
        <section className="mt-8 rounded-[6px] border border-[#e8e8e8] bg-[#f7f6f2] px-6 py-8 md:px-10">
          <h2 className="text-[19px] font-bold tracking-tight text-[#172126] md:text-[24px]">
            Independently tested noise reduction — NIC 27 dB
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#4b5563]">
            Our 1-seater phone booth achieved a Noise Isolation Class of <strong>27 dB</strong> in an
            independent laboratory test (TÜV SÜD PSB, ASTM E596/E413, ventilation on), measured on the
            specific tested unit.
          </p>
          <ul className="mt-4 space-y-2 text-[14.5px] leading-relaxed text-[#4b5563]">
            <li>• Tested with ventilation running — real working conditions</li>
            <li>• Result applies to this tested model, not across the range</li>
            <li>• Test report available for review on request</li>
          </ul>
        </section>

        <section className="mt-10 space-y-5 text-[15.5px] leading-relaxed text-[#374151]">
          <h2 className="text-[20px] font-bold tracking-tight text-[#172126] md:text-[26px]">
            What that means in practice
          </h2>
          <p>
            A normal office conversation is clearly unintelligible from outside; phone calls stay private;
            focus work stays undisturbed. No enclosed office pod is fully soundproof — and any supplier who
            claims theirs is should be treated with caution. We quote tested numbers where we have them and
            honest descriptions where we don't.
          </p>
          <p>
            Want to hear the difference yourself? Visit our Klang showroom by appointment and take a call
            inside the pod while a colleague speaks outside it.
          </p>
        </section>

        <section className="mt-12 flex flex-col gap-3 sm:flex-row">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-[6px] bg-[#007653] px-7 text-[15px] font-semibold text-white transition-colors hover:bg-[#005f43]"
          >
            Ask us about acoustics
          </a>
          <Link
            to="/office-pods"
            className="inline-flex h-12 items-center justify-center rounded-[6px] border border-[#172126] px-7 text-[15px] font-semibold text-[#172126] transition-colors hover:bg-[#172126] hover:text-white"
          >
            Compare pod models
          </Link>
        </section>
      </div>
    </div>
  );
}
