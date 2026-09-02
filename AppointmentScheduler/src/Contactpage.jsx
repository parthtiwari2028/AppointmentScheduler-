function ContactPage() {
  const rows = [
    { label: "Email", value: "support@spotbooker.com" },
    { label: "Phone", value: "123-456-7890" },
    { label: "Address", value: "Akbar Road, New Delhi" },
  ];

  const hours = [
    { label: "Mon – Fri", value: "9:00 AM – 5:00 PM" },
    { label: "Saturday", value: "10:00 AM – 2:00 PM" },
  ];

  return (
    <section className="p-6 bg-white/[0.93] border border-surface-line/95 rounded-[22px] shadow-[0_18px_40px_-24px_rgba(22,35,31,0.34)]">
      <h2 className="mb-1.5 text-ink font-display tracking-[-0.01em] text-[1.35rem]">
        Contact
      </h2>
      <p className="mb-[18px] text-ink-muted text-[0.92rem]">
        Have a question? Reach us using any of the details below.
      </p>

      <div className="grid gap-0.5 mb-[18px] border border-surface-line rounded-xl overflow-hidden">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex justify-between gap-3 py-3 px-3.5 bg-sand text-[0.92rem]"
          >
            <span className="text-ink-muted font-semibold">{row.label}</span>
            <span>{row.value}</span>
          </div>
        ))}
      </div>

      <h3 className="mt-[22px] mb-3 text-base text-ink pt-[18px] border-t border-surface-line font-display">
        Working hours
      </h3>
      <div className="grid gap-0.5 mb-[18px] border border-surface-line rounded-xl overflow-hidden">
        {hours.map((row) => (
          <div
            key={row.label}
            className="flex justify-between gap-3 py-3 px-3.5 bg-sand text-[0.92rem]"
          >
            <span className="text-ink-muted font-semibold">{row.label}</span>
            <span>{row.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ContactPage;
