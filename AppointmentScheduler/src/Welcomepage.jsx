import { serviceImageUrl, serviceAlt } from "./ServiceImages";

function WelcomePage({ onStart }) {
  return (
    <section className="p-6 bg-white/[0.93] border border-surface-line/95 rounded-[22px] shadow-[0_18px_40px_-24px_rgba(22,35,31,0.34)] text-left">
      <img
        className="w-full max-h-[240px] object-cover rounded-[18px] mb-4 shadow-[0_12px_30px_-18px_rgba(22,35,31,0.5)]"
        src={serviceImageUrl("Consultation", 900)}
        alt={serviceAlt("Consultation")}
      />
      <h2 className="mb-1.5 text-ink font-display tracking-[-0.01em] text-[1.35rem]">
        Welcome to SpotBooker
      </h2>
      <p className="mb-[18px] text-ink-muted text-[0.92rem]">
        Book and manage appointments for checkups, dental cleanings, hair cuts,
        and consultations — all in one place.
      </p>
      <h3 className="mt-[22px] mb-3 text-base text-ink pt-[18px] border-t border-surface-line font-display">
        What you can do
      </h3>
      <ul className="grid gap-2 mb-[18px]">
        {[
          "Book an appointment in a few taps",
          "See everything on one dashboard",
          "Cancel or reschedule anytime",
        ].map((item) => (
          <li key={item} className="relative pl-[26px] text-ink text-[0.92rem]">
            <span className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-teal-tint shadow-[inset_0_0_0_2px_#0f5257]" />
            {item}
          </li>
        ))}
      </ul>
      <button
        onClick={onStart}
        className="mt-1.5 py-3 px-[18px] border-none rounded-full font-semibold text-[0.92rem] cursor-pointer transition-all duration-150 text-white shadow-[0_10px_20px_-12px_rgba(15,82,87,0.7)] hover:brightness-110"
        style={{
          background: "linear-gradient(135deg, #0f5257 0%, #1f6f74 100%)",
        }}
      >
        Get started
      </button>
    </section>
  );
}

export default WelcomePage;
