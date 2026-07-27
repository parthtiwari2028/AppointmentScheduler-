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
    <section className="card">
      <h2>Dashboard</h2>
      <p className="section-subtitle">Here's a snapshot of what's coming up.</p>

      <div className="stats-grid">
        <div className="stat-tile">
          <span className="stat-value">{appointments.length}</span>
          <span className="stat-label">Total appointments</span>
        </div>
        <div className="stat-tile">
          <span className="stat-value">
            {next ? formatDate(next.date) : "—"}
          </span>
          <span className="stat-label">Next booking</span>
        </div>
        <div className="stat-tile">
          <span className="stat-value">{mostBookedService(appointments)}</span>
          <span className="stat-label">Most booked</span>
        </div>
      </div>

      <h3 className="section-heading">Recent activity</h3>
      {recent.length === 0 ? (
        <p className="empty-state">
          No appointments yet — book one to see it here.
        </p>
      ) : (
        <ul className="activity-list">
          {recent.map((appointment) => (
            <li key={appointment.id} className="activity-row">
              <img
                className="service-photo small-photo"
                src={appointmentPhotoUrl(
                  appointment.service,
                  appointment.id,
                  100,
                )}
                alt={serviceAlt(appointment.service)}
              />
              <div>
                <strong>{appointment.name}</strong>
                <p className="activity-meta">
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
