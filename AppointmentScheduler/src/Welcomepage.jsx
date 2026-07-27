import { serviceImageUrl, serviceAlt } from "./ServiceImages";

function WelcomePage({ onStart }) {
  return (
    <section className="card welcome-card">
      <img
        className="welcome-photo"
        src={serviceImageUrl("Consultation", 900)}
        alt={serviceAlt("Consultation")}
      />
      <h2>Welcome to SpotBooker</h2>
      <p className="section-subtitle">
        Book and manage appointments for checkups, dental cleanings, hair cuts,
        and consultations — all in one place.
      </p>
      <h3 className="section-heading">What you can do</h3>
      <ul className="feature-list">
        <li>Book an appointment in a few taps</li>
        <li>See everything on one dashboard</li>
        <li>Cancel or reschedule anytime</li>
      </ul>
      <button onClick={onStart} className="book-button">
        Get started
      </button>
    </section>
  );
}

export default WelcomePage;
