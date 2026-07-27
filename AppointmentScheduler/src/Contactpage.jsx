function ContactPage() {
  return (
    <section className="card">
      <h2>Contact</h2>
      <p className="section-subtitle">
        Have a question? Reach us using any of the details below.
      </p>

      <div className="contact-grid">
        <div className="contact-row">
          <span className="contact-label">Email</span>
          <span>support@appointments.com</span>
        </div>
        <div className="contact-row">
          <span className="contact-label">Phone</span>
          <span>123-456-7890</span>
        </div>
        <div className="contact-row">
          <span className="contact-label">Address</span>
          <span>Akbar Road, New Delhi</span>
        </div>
      </div>

      <h3 className="section-heading">Working hours</h3>
      <div className="contact-grid">
        <div className="contact-row">
          <span className="contact-label">Mon – Fri</span>
          <span>9:00 AM – 5:00 PM</span>
        </div>
        <div className="contact-row">
          <span className="contact-label">Saturday</span>
          <span>10:00 AM – 2:00 PM</span>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
