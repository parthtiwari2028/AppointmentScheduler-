import { useEffect, useState } from "react";
import { heroImageUrl } from "./ServiceImages";
import DashboardPage from "./DashboardPage";
import BookingPage from "./BookingPage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import WelcomePage from "./WelcomePage";

function App() {
  const [appointments, setAppointments] = useState(() => {
    const savedAppointments = localStorage.getItem("appointments");
    return savedAppointments ? JSON.parse(savedAppointments) : [];
  });

  const [currentPage, setCurrentPage] = useState("welcome");
  const [name, setName] = useState("");
  const [service, setService] = useState("General Checkup");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  function bookAppointment(event) {
    event.preventDefault();

    if (name === "" || date === "" || time === "") {
      alert("Please enter your name, date, and time.");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      name: name,
      service: service,
      date: date,
      time: time,
    };

    setAppointments([...appointments, newAppointment]);
    setName("");
    setService("General Checkup");
    setDate("");
    setTime("");
  }

  function cancelAppointment(id) {
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== id,
    );
    setAppointments(updatedAppointments);
  }

  return (
    <main className="app">
      <header className="hero" style={{ backgroundImage: `url(${heroImageUrl()})` }}>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">Stay organized</p>
          <h1>SpotBooker</h1>
          <p className="hero-text">
            Book and manage your appointments in one place.
          </p>
        </div>
      </header>

      <nav className="top-nav">
        <span className="brand">SpotBooker</span>
        <div className="nav-links">
          <button onClick={() => setCurrentPage("dashboard")}>Dashboard</button>
          <button onClick={() => setCurrentPage("booking")}>Book</button>
          <button onClick={() => setCurrentPage("about")}>About</button>
          <button onClick={() => setCurrentPage("contact")}>Contact</button>
        </div>
      </nav>

      {currentPage === "welcome" ? (
        <WelcomePage onStart={() => setCurrentPage("dashboard")} />
      ) : (
        <>
          {currentPage === "dashboard" ? (
            <DashboardPage appointments={appointments} />
          ) : currentPage === "about" ? (
            <AboutPage />
          ) : currentPage === "contact" ? (
            <ContactPage />
          ) : (
            <BookingPage
              appointments={appointments}
              name={name}
              setName={setName}
              service={service}
              setService={setService}
              date={date}
              setDate={setDate}
              time={time}
              setTime={setTime}
              bookAppointment={bookAppointment}
              cancelAppointment={cancelAppointment}
            />
          )}
        </>
      )}

      <footer className="footer">
        <div className="footer-content">
          <div>
            <h3>SpotBooker</h3>
            <p>Simple and easy booking for your daily schedule.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <p>Dashboard</p>
            <p>Book</p>
            <p>About</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Email: support@spotbooker.com</p>
            <p>Phone: 123-456-7890</p>
          </div>
        </div>
        <p className="footer-copy">© 2026 SpotBooker</p>
      </footer>
    </main>
  );
}

export default App;
