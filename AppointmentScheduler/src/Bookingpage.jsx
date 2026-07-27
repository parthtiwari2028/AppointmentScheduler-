import {
  serviceNames,
  serviceImageUrl,
  serviceAlt,
  serviceBlurb,
  appointmentPhotoUrl,
} from "./ServiceImages";

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
  return (
    <>
      <section className="card">
        <h2>Book an appointment</h2>
        <p className="section-subtitle">
          Choose a service, then pick a time that works for you.
        </p>

        <div
          className="service-grid"
          role="radiogroup"
          aria-label="Choose a service"
        >
          {serviceNames.map((option) => (
            <button
              type="button"
              key={option}
              className={`service-option${option === service ? " selected" : ""}`}
              onClick={() => setService(option)}
              role="radio"
              aria-checked={option === service}
            >
              <img
                src={serviceImageUrl(option, 240)}
                alt={serviceAlt(option)}
              />
              <span className="service-option-label">{option}</span>
              {option === service && (
                <span className="service-option-check">✓</span>
              )}
            </button>
          ))}
        </div>

        <div className="service-preview">
          <img
            className="service-photo"
            src={serviceImageUrl(service, 200)}
            alt={serviceAlt(service)}
          />
          <div>
            <p className="service-name">{service}</p>
            <p className="service-copy">{serviceBlurb(service)}</p>
          </div>
        </div>

        <form onSubmit={bookAppointment}>
          <label>
            Your name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
            />
          </label>

          <div className="form-row">
            <label>
              Date
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </label>

            <label>
              Time
              <input
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
              />
            </label>
          </div>

          <button type="submit" className="book-button">
            Confirm booking
          </button>
        </form>
      </section>

      <section className="card">
        <h2>Your appointments</h2>
        <p className="section-subtitle">
          {appointments.length === 0
            ? "Nothing on the books yet."
            : `${appointments.length} appointment${appointments.length === 1 ? "" : "s"} scheduled.`}
        </p>

        {appointments.length === 0 ? (
          <p className="empty-state">
            Once you book, your appointments will show up here with all the
            details.
          </p>
        ) : (
          <ul className="appointment-list">
            {appointments.map((appointment) => (
              <li key={appointment.id} className="appointment-card">
                <img
                  className="service-photo appointment-photo"
                  src={appointmentPhotoUrl(
                    appointment.service,
                    appointment.id,
                    160,
                  )}
                  alt={serviceAlt(appointment.service)}
                />
                <div className="appointment-details">
                  <div className="appointment-top-row">
                    <strong>{appointment.name}</strong>
                    <span className="status-badge">Confirmed</span>
                  </div>
                  <p className="appointment-service">{appointment.service}</p>
                  <p className="appointment-when">
                    {formatDate(appointment.date)} ·{" "}
                    {formatTime(appointment.time)}
                  </p>
                </div>
                <button
                  onClick={() => cancelAppointment(appointment.id)}
                  className="cancel-button"
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
