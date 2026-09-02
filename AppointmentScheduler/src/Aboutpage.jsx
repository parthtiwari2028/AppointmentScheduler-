function AboutPage() {
  return (
    <section className="p-6 bg-white/[0.93] border border-surface-line/95 rounded-[22px] shadow-[0_18px_40px_-24px_rgba(22,35,31,0.34)]">
      <h2 className="mb-1.5 text-ink font-display tracking-[-0.01em] text-[1.35rem]">
        About SpotBooker
      </h2>
      <p className="mb-[18px] text-ink-muted text-[0.92rem]">
        SpotBooker brings appointment booking for checkups, dental visits, hair
        cuts, and consultations into one simple dashboard.
      </p>

      <h3 className="mt-[22px] mb-3 text-base text-ink pt-[18px] border-t border-surface-line font-display">
        What you get
      </h3>
      <ul className="grid gap-2 mb-[18px]">
        {[
          "Book an appointment in a few taps",
          "See every upcoming booking at a glance",
          "Cancel or adjust plans without calling anyone",
          "Move between services without losing your place",
        ].map((item) => (
          <li key={item} className="relative pl-[26px] text-ink text-[0.92rem]">
            <span className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-teal-tint shadow-[inset_0_0_0_2px_#0f5257]" />
            {item}
          </li>
        ))}
      </ul>

      <h3 className="mt-[22px] mb-3 text-base text-ink pt-[18px] border-t border-surface-line font-display">
        Built for everyday use
      </h3>
      <p className="text-ink-muted text-[0.92rem]">
        No accounts, no clutter — just a clear way to keep track of what's
        booked and what's next.
      </p>
    </section>
  );
}

export default AboutPage;
