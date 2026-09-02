import { useEffect, useState } from "react";
import {
  serviceNames,
  serviceImageUrl,
  serviceAlt,
  serviceBlurb,
  appointmentPhotoUrl,
} from "./Serviceimages";

function formatDate(value) {
  if (!value) return "";
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatTime(value) {
  if (!value) return "";
  const [hours, minutes] = value.split(":");
  const parsed = new Date();
  parsed.setHours(Number(hours), Number(minutes));
  return parsed.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

const inputClasses =
  "w-full py-2.5 px-3 border border-surface-line rounded-lg bg-surface text-[0.95rem] focus:outline focus:outline-2 focus:outline-teal focus:outline-offset-1";
const labelClasses = "grid gap-1.5 font-semibold text-[0.88rem] text-ink";
const cardClasses =
  "p-6 bg-white/[0.93] border border-surface-line/95 rounded-[22px] shadow-[0_18px_40px_-24px_rgba(22,35,31,0.34)]";

function BookingPage({
  appointments,
  name,
  setName,
  service,
  setService,
  date,
  setDate,
  time,
  setTime,
  bookAppointment,
  cancelAppointment,
}) {
  // The preview image updates a beat after typing stops, instead of firing
  // a new image request on every keystroke.
  const [previewService, setPreviewService] = useState(service);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPreviewService(service.trim() || "General Checkup");
    }, 350);
    return () => clearTimeout(timer);
  }, [service]);

  return (
    <>
      <section className={cardClasses}>
        <h2 className="mb-1.5 text-ink font-display tracking-[-0.01em] text-[1.35rem]">
          Book an appointment
        </h2>
        <p className="mb-[18px] text-ink-muted text-[0.92rem]">
         
        </p>

        <label className={labelClasses}>
          Appointment type
          <input
            type="text"
            className={inputClasses}
            value={service}
            onChange={(event) => setService(event.target.value)}
            placeholder="e.g. Eye Checkup, Massage, Physiotherapy..."
          />
        </label>

        <div className="flex flex-wrap gap-2 mt-2.5 mb-[18px]">
          {serviceNames.map((option) => (
            <button
              type="button"
              key={option}
              className={`py-[7px] px-[13px] border rounded-full text-[0.82rem] font-semibold cursor-pointer transition-colors duration-150 ${
                option === service
                  ? "bg-teal-tint border-teal text-teal-dark"
                  : "bg-sand border-surface-line text-ink-muted hover:border-teal hover:text-teal-dark"
              }`}
              onClick={() => setService(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3.5 mb-[18px] p-3.5 bg-sage border border-surface-line rounded-xl">
          <img
            className="flex-shrink-0 w-[72px] h-[72px] object-cover rounded-lg shadow-[0_4px_10px_rgba(15,82,87,0.16)]"
            src={serviceImageUrl(previewService, 200)}
            alt={serviceAlt(previewService)}
          />
          <div>
            <p className="m-0 font-bold text-ink">{previewService}</p>
            <p className="mt-0.5 text-ink-muted text-[0.9rem]">
              {serviceBlurb(previewService)}
            </p>
          </div>
        </div>

        <form onSubmit={bookAppointment} className="grid gap-3.5">
          <label className={labelClasses}>
            Your name
            <input
              type="text"
              className={inputClasses}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <label className={labelClasses}>
              Date
              <input
                type="date"
                className={inputClasses}
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </label>

            <label className={labelClasses}>
              Time
              <input
                type="time"
                className={inputClasses}
                value={time}
                onChange={(event) => setTime(event.target.value)}
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-1.5 py-3 px-[18px] border-none rounded-full font-semibold text-[0.92rem] cursor-pointer transition-all duration-150 text-white shadow-[0_10px_20px_-12px_rgba(15,82,87,0.7)] hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, #0f5257 0%, #1f6f74 100%)",
            }}
          >
            Confirm booking
          </button>
        </form>
      </section>

      <section className={cardClasses}>
        <h2 className="mb-1.5 text-ink font-display tracking-[-0.01em] text-[1.35rem]">
          Your appointments
        </h2>
        <p className="mb-[18px] text-ink-muted text-[0.92rem]">
          {appointments.length === 0
            ? "Nothing on the books yet."
            : `${appointments.length} appointment${appointments.length === 1 ? "" : "s"} scheduled.`}
        </p>

        {appointments.length === 0 ? (
          <p className="m-0 p-5 text-ink-soft bg-sand border border-dashed border-surface-line rounded-xl text-center text-[0.9rem]">
            Once you book, your appointments will show up here with all the
            details.
          </p>
        ) : (
          <ul className="grid gap-2.5">
            {appointments.map((appointment) => (
              <li
                key={appointment.id}
                className="flex items-center gap-3.5 p-3 border border-surface-line rounded-xl bg-sand flex-wrap sm:flex-nowrap"
              >
                <img
                  className="flex-shrink-0 w-14 h-14 object-cover rounded-lg shadow-[0_4px_10px_rgba(15,82,87,0.16)]"
                  src={appointmentPhotoUrl(
                    appointment.service,
                    appointment.id,
                    160,
                  )}
                  alt={serviceAlt(appointment.service)}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <strong>{appointment.name}</strong>
                    <span className="flex-shrink-0 py-[3px] px-[9px] bg-teal-tint text-teal-dark rounded-full text-[0.72rem] font-bold tracking-[0.02em]">
                      Confirmed
                    </span>
                  </div>
                  <p className="my-0.5 text-ink-muted text-[0.88rem]">
                    {appointment.service}
                  </p>
                  <p className="m-0 text-ink-soft text-[0.82rem]">
                    {formatDate(appointment.date)} ·{" "}
                    {formatTime(appointment.time)}
                  </p>
                </div>
                <button
                  onClick={() => cancelAppointment(appointment.id)}
                  className="flex-shrink-0 self-center w-full sm:w-auto py-2 px-3 border-none rounded-lg font-semibold text-[0.85rem] cursor-pointer transition-all duration-150 bg-[#fbe7e2] text-[#a13f2b] hover:brightness-95"
                  aria-label={`Cancel appointment for ${appointment.name}`}
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default BookingPage;
