# Ace Pods — Brand Identity (StoryBrand SB7)

Finalized 2026-07-06. Reference doc for all sales-facing copy (website, WhatsApp, showroom). Built from the founder interview (brand character = Guide, not confident authority) and confirmed by two independent Deep Research reports. Full decision trail in [GROWTH-RESEARCH-FINDINGS.md](GROWTH-RESEARCH-FINDINGS.md).

Chosen story: **Story 1 — Verifiable Decision.** Two other story options (Flexible Asset / lease-CapEx angle; Team You're Responsible For / HR-guilt angle) were drafted and set aside — see findings file for why. Story 2's asset-flexibility argument stays available as a secondary layer for facilities/procurement stakeholders further down the approval chain.

---

## BrandScript

```
CHARACTER
An HR/ops manager at an MNC (or an SME owner directly) has already decided
they want a pod, and already researched options via AI search, before
ever making contact. What's left to decide is who to trust with
RM15,000-28,000 of company money.
[Note: the "already decided, already researched" buying-stage claim is
based on founder experience, not yet verified against real inquiry logs —
see GROWTH-RESEARCH-FINDINGS.md. Treat as working assumption, not settled fact.]

PROBLEM
Villain:      Unverifiable claims and after-the-sale abandonment — every
              seller says "soundproof, private, modern," and nobody can
              tell who's actually credible until the money is spent.
External:     Open-plan office has no private space for calls, HR
              conversations, or confidential meetings.
Internal:     Anxious and unsure who to trust. Afraid of picking a pod
              that turns out badly soundproofed, or a seller who
              disappears after delivery — and being the one who has
              to explain the wasted budget.
Philosophical: It shouldn't take blind faith to spend this much of a
              company's money on an unverifiable claim.

GUIDE
Empathy:   "We know what it's like to be the one who makes this call —
           there's no do-over, and if it turns out to be a bad
           soundproofing box, or the seller vanishes after delivery,
           you're the one who explains it."
Authority: Independently certified -27 dB(A) — not a self-reported number.
           180+ pods installed since 2023. Same local team, factory to
           installation to after-sales, no importer to chase later.
           Showroom in Klang — test it yourself before deciding.
           Installed at Parker Hannifin, CMA CGM, Taylor's, and others.

PLAN
Process:   1. Visit the showroom — hear the difference yourself.
           2. Get one transparent, all-in quote — nothing added later.
           3. Installed in a day by the team that built it.
Agreement: Certified rating, not marketing copy. Same team start to finish.
           [30-day fix-or-refund guarantee — still pending legal
           confirmation before this can go live.]

CALL TO ACTION
Direct (primary):        "Book a Showroom Visit"
Transitional (secondary): "Get Pricing" — self-serve, for buyers not
                          ready to visit yet.

FAILURE
Buy on a spec sheet you can't verify, and you're the one explaining
the wasted budget when it doesn't hold up.

URGENCY (real, not manufactured)
- Installation capacity is genuinely limited — slots book 4-6 weeks out,
  so delaying the decision pushes the actual install date further out.
  [Sourced fact — used previously in site copy, not a new claim]
- Every month without private space is another month of the exact
  friction already named in Failure — overheard confidential conversations,
  team frustration, distraction — compounding, not one-time.
  [Inference from the Failure framing above, labeled as such]

SUCCESS
A private, professional space installed in a day — a decision you
never have to defend.

TRANSFORMATION
From: anxious, unsure who to trust, exposed if it goes wrong.
To:   confident decision-maker who can point to a certified, tested choice.
```

**One-liner:** "Open-plan offices make private calls nearly impossible, and most 'soundproof' pods are unverified guesses. Ace is Malaysia's only independently certified acoustic pod, built and supported by one local team from factory to installation — so your decision is one you never have to defend."

---

## Ready-to-use headline options
1. "Malaysia's only independently certified acoustic pod — not a self-reported number."
2. "One local team, factory to installation. Nothing to chase after the sale."
3. "Test it yourself before you decide. Our showroom is in Klang."

**Subheadline:** "180+ pods installed since 2023. Certified -27 dB(A). Same team, start to finish — verify before you buy, not after."

**Urgency line (use near the CTA):** "Installation slots book 4-6 weeks out — the sooner you visit the showroom, the sooner your team gets the space."

---

## Live-site fixes this implies (not yet made — pending go-ahead)

1. **CTA hierarchy fix.** Currently "Get Pricing" and "Book Viewing" carry equal visual weight everywhere on the live homepage (`src/App.jsx`). Fix: "Book a Showroom Visit" becomes the one bold, consistently-colored primary button (also the strongest trust-building action available). "Get Pricing" becomes the secondary, quieter option.
2. **No transitional/low-commitment offer exists site-wide.** The "free noise assessment" copy only lives on the floating WhatsApp pill — should become a real secondary offer elsewhere on the page too.
3. **No empathy/Guide-voice language anywhere on the live site.** Every section is credential-stacking (stats, certifications) with no acknowledgment of the buyer's actual anxiety. Needs the empathy line above worked into the hero or a new section.
4. **No About/story page exists at all.** Nav is a pure product catalog (Office Pods, Portfolio, Office Chairs, Pricing, Installation & Support, Pod Relocation, FAQ) — there's no page where Guide identity has anywhere to live.
5. **Don't over-explain "why you need a pod."** Per the confirmed buyer-research finding, buyers already know this. Site copy should shift weight toward vendor-trust confirmation, not category education.
6. **No real urgency framing exists anywhere on the live site.** Add the install-capacity/cost-of-delay line near the primary CTA (see Urgency section above) — currently nothing gives a visitor a reason to act this week instead of next month.

None of these have been applied to the live site yet — this file is the reference to work from once ready.

**Still blocked on you, not something I can resolve in this document:** the 30-day fix-or-refund guarantee still needs legal/commercial confirmation from the Ace team before it can be stated as a real agreement — this has been open since before this session (see pre-publish checklist).
