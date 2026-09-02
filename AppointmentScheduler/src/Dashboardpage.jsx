import { appointmentPhotoUrl, serviceAlt } from "./ServiceImages";

function formatDate(value) {
  if (!value) return "";
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function mostBookedService(appointments) {
  if (appointments.length === 0) return "—";
  const counts = {};
  appointments.forEach((appointment) => {
    counts[appointment.service] = (counts[appointment.service] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function nextAppointment(appointments) {
  if (appointments.length === 0) return null;
  return [...appointments].sort((a, b) =>
    (a.date + a.time).localeCompare(b.date + b.time),
  )[0];
}

function DashboardPage({ appointments }) {
  const next = nextAppointment(appointments);
  const recent = [...appointments].reverse().slice(0, 4);

  return (
    <section className="p-6 bg-white/[0.93] border border-surface-line/95 rounded-[22px] shadow-[0_18px_40px_-24px_rgba(22,35,31,0.34)]">
      <h2 className="mb-1.5 text-ink font-display tracking-[-0.01em] text-[1.35rem]">
        Dashboard
      </h2>
      <p className="mb-[18px] text-ink-muted text-[0.92rem]">
        Here's a snapshot of what's coming up.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-2">
        <div
          className="flex flex-col gap-0.5 py-4 px-3.5 border border-surface-line rounded-xl"
          style={{ background: "linear-gradient(135deg, #e9f0ea, #f6f3ec)" }}
        >
          <span className="font-display text-[1.3rem] font-bold text-teal-dark whitespace-nowrap overflow-hidden text-ellipsis">
            {appointments.length}
          </span>
          <span className="text-[0.76rem] text-ink-muted">
            Total appointments
          </span>
        </div>
        <div
          className="flex flex-col gap-0.5 py-4 px-3.5 border border-surface-line rounded-xl"
          style={{ background: "linear-gradient(135deg, #e9f0ea, #f6f3ec)" }}
        >
          <span className="font-display text-[1.3rem] font-bold text-teal-dark whitespace-nowrap overflow-hidden text-ellipsis">
            {next ? formatDate(next.date) : "—"}
          </span>
          <span className="text-[0.76rem] text-ink-muted">Next booking</span>
        </div>
        <div
          className="flex flex-col gap-0.5 py-4 px-3.5 border border-surface-line rounded-xl"
          style={{ background: "linear-gradient(135deg, #e9f0ea, #f6f3ec)" }}
        >
          <span className="font-display text-[1.3rem] font-bold text-teal-dark whitespace-nowrap overflow-hidden text-ellipsis">
            {mostBookedService(appointments)}
          </span>
          <span className="text-[0.76rem] text-ink-muted">Most booked</span>
        </div>
      </div>

      <h3 className="mt-[22px] mb-3 text-base text-ink pt-[18px] border-t border-surface-line font-display">
        Recent activity
      </h3>
      {recent.length === 0 ? (
        <p className="m-0 p-5 text-ink-soft bg-sand border border-dashed border-surface-line rounded-xl text-center text-[0.9rem]">
          No appointments yet — book one to see it here.
        </p>
      ) : (
        <ul className="grid gap-1">
          {recent.map((appointment) => (
            <li
              key={appointment.id}
              className="flex items-center gap-3 py-2.5 px-1 border-t border-surface-line first:border-t-0"
            >
              <img
                className="w-11 h-11 rounded-[9px] object-cover shadow-[0_4px_10px_rgba(15,82,87,0.16)]"
                src={appointmentPhotoUrl(
                  appointment.service,
                  appointment.id,
                  100,
                )}
                alt={serviceAlt(appointment.service)}
              />
              <div>
                <strong>{appointment.name}</strong>
                <p className="mt-0.5 text-ink-muted text-[0.84rem]">
                  {appointment.service} · {formatDate(appointment.date)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default DashboardPage;
