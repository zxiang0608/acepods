import { Link } from 'react-router-dom';

const WHATSAPP_LINK = 'https://wa.link/9umr4q';

// Open Pods category page (D20) — doorless/semi-open pod structures.
// Imagery staged from the Markant (Open Pod) drive folder; ZX to confirm final card picks.
export default function OpenPodsPage() {
  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32">
      <div className="mx-auto max-w-3xl px-5 pb-20">
        <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#007653]">Coming to the range</p>
        <h1 className="mt-3 text-[28px] font-bold leading-[1.2] tracking-tight text-[#172126] md:text-[40px]">
          Open pods. Privacy without walls.
        </h1>
        <p className="mt-4 text-[15.5px] leading-relaxed text-[#4b5563] md:text-[17px]">
          Not every space needs a fully enclosed booth. Open pods use high acoustic backs, wraparound
          shells and smart zoning to carve out private spots inside open-plan offices — keeping teams
          connected to the room while giving each seat a sense of its own territory.
        </p>

        <section className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {[
            ['Focus without isolation', 'High-backed open seating that cuts visual and noise distraction while you stay part of the office.'],
            ['Flexible footprints', 'Lower commitment than enclosed booths — rearrange zones as teams change.'],
            ['Light and openness', 'No doors or full enclosures; daylight keeps flowing through the floor.'],
            ['Same Ace delivery', 'Supplied, delivered and installed by the same team as our pods — one project, one quote.']
          ].map(([title, desc]) => (
            <div key={title} className="rounded-[6px] border border-[#e8e8e8] bg-[#f7f6f2] px-6 py-6">
              <h2 className="text-[16px] font-semibold text-[#172126]">{title}</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-[#4b5563]">{desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 rounded-[6px] border border-dashed border-[#c8ccd0] px-6 py-10 text-center md:px-10">
          <h2 className="text-[19px] font-bold tracking-tight text-[#172126] md:text-[24px]">
            Full range arriving soon
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[14.5px] leading-relaxed text-[#4b5563]">
            We're finalising our open-pod lineup and configurations. Register your interest now and we'll
            contact you first when models, dimensions and pricing are released — with early-bird project slots.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-[6px] bg-[#007653] px-7 text-[15px] font-semibold text-white transition-colors hover:bg-[#005f43]"
          >
            Register interest on WhatsApp
          </a>
        </section>

        <section className="mt-10 text-center">
          <Link to="/office-pods" className="text-[14px] font-semibold text-[#007653] underline-offset-4 hover:underline">
            Looking for fully enclosed booths? See our pods →
          </Link>
        </section>
      </div>
    </div>
  );
}
