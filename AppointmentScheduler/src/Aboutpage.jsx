
function AboutPage() {
  return (
    <section className="card">
      <h2>About SpotBooker</h2>
      <p className="section-subtitle">
        SpotBooker brings appointment booking for checkups, dental visits,
        hair cuts, and consultations into one simple dashboard.
      </p>

      <h3 className="section-heading">What you get</h3>
      <ul className="feature-list">
        <li>Book an appointment in a few taps</li>
        <li>See every upcoming booking at a glance</li>
        <li>Cancel or adjust plans without calling anyone</li>
        <li>Move between services without losing your place</li>
      </ul>

      <h3 className="section-heading">Built for everyday use</h3>
      <p className="section-subtitle" style={{ marginBottom: 0 }}>
        No accounts, no clutter — just a clear way to keep track of what's
        booked and what's next.
      </p>
    </section>
  );
}

export default AboutPage;
