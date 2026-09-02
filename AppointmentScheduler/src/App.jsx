import { useEffect, useState } from "react";
import { heroImageUrl } from "./ServiceImages";
import Logo from "./Logo";
import DashboardPage from "./DashboardPage";
import BookingPage from "./BookingPage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import WelcomePage from "./WelcomePage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

function App() {
  const [appointments, setAppointments] = useState(() => {
    const savedAppointments = localStorage.getItem("appointments");
    return savedAppointments ? JSON.parse(savedAppointments) : [];
  });

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [authView, setAuthView] = useState("login");
  const [currentPage, setCurrentPage] = useState("welcome");
  const [name, setName] = useState("");
  const [service, setService] = useState("General Checkup");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  function signup(fullName, email, password) {
    const existing = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );
    if (existing) {
      return {
        success: false,
        message: "An account with that email already exists.",
      };
    }

    const newUser = { name: fullName, email, password };
    setUsers([...users, newUser]);
    setCurrentUser({ name: newUser.name, email: newUser.email });
    setCurrentPage("welcome");
    return { success: true };
  }

  function login(email, password) {
    const match = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password,
    );
    if (!match) {
      return { success: false, message: "Incorrect email or password." };
    }

    setCurrentUser({ name: match.name, email: match.email });
    setCurrentPage("welcome");
    return { success: true };
  }

  function logout() {
    setCurrentUser(null);
    setAuthView("login");
    setCurrentPage("welcome");
  }

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
    <main className="w-full max-w-[1320px] mx-auto min-h-[calc(100vh-40px)] pb-6 flex flex-col gap-[18px]">
      <header
        className="relative flex justify-between items-center gap-6 min-h-[300px] py-9 px-10 rounded-[28px] overflow-hidden shadow-[0_24px_50px_-18px_rgba(11,61,64,0.55)] bg-cover"
        style={{
          backgroundImage: `url(${heroImageUrl()})`,
          backgroundPosition: "center 25%",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(255,255,255,0.18), transparent 30%), linear-gradient(120deg, rgba(255,255,255,0.14) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-[560px]">
          <p className="mb-1.5 text-white/[0.78] text-[0.76rem] font-bold tracking-[0.09em] uppercase">
            Stay organized
          </p>
          <h1 className="mb-2 text-white font-display text-[2rem] tracking-[-0.01em]">
            SpotBooker
          </h1>
          <p className="m-0 text-white/85 text-base">
            Book and manage your appointments in one place.
          </p>
        </div>
      </header>

      {!currentUser ? (
        authView === "login" ? (
          <LoginPage
            onLogin={login}
            onSwitchToSignup={() => setAuthView("signup")}
          />
        ) : (
          <SignupPage
            onSignup={signup}
            onSwitchToLogin={() => setAuthView("login")}
          />
        )
      ) : (
        <>
          <nav className="flex justify-between items-center py-3.5 px-[18px] bg-white/[0.86] border border-surface-line/95 rounded-[18px] shadow-[0_15px_35px_-24px_rgba(22,35,31,0.45)] backdrop-blur-[10px] flex-col gap-2.5 sm:flex-row">
            <span className="flex items-center gap-2 font-display font-bold text-teal-dark tracking-[0.01em]">
              <Logo className="w-[26px] h-[26px]" />
              SpotBooker
            </span>
            <div className="flex gap-1 flex-wrap justify-center">
              <button
                className="py-2 px-3.5 border-none rounded-lg bg-transparent text-ink-muted font-semibold text-[0.92rem] cursor-pointer transition-colors duration-150 hover:bg-sage hover:text-teal-dark"
                onClick={() => setCurrentPage("dashboard")}
              >
                Dashboard
              </button>
              <button
                className="py-2 px-3.5 border-none rounded-lg bg-transparent text-ink-muted font-semibold text-[0.92rem] cursor-pointer transition-colors duration-150 hover:bg-sage hover:text-teal-dark"
                onClick={() => setCurrentPage("booking")}
              >
                Book
              </button>
              <button
                className="py-2 px-3.5 border-none rounded-lg bg-transparent text-ink-muted font-semibold text-[0.92rem] cursor-pointer transition-colors duration-150 hover:bg-sage hover:text-teal-dark"
                onClick={() => setCurrentPage("about")}
              >
                About
              </button>
              <button
                className="py-2 px-3.5 border-none rounded-lg bg-transparent text-ink-muted font-semibold text-[0.92rem] cursor-pointer transition-colors duration-150 hover:bg-sage hover:text-teal-dark"
                onClick={() => setCurrentPage("contact")}
              >
                Contact
              </button>
            </div>
            <div className="flex items-center gap-2.5 justify-center">
              <span className="font-semibold text-[0.88rem] text-ink-muted">
                {currentUser.name}
              </span>
              <button
                className="py-[7px] px-3 border border-surface-line rounded-lg bg-sand text-ink font-semibold text-[0.82rem] cursor-pointer hover:bg-sage"
                onClick={logout}
              >
                Log out
              </button>
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
        </>
      )}

      <footer className="mt-1 p-[22px] bg-white/90 border border-surface-line/95 rounded-[22px] shadow-[0_18px_40px_-24px_rgba(22,35,31,0.34)]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-ink-muted">
          <div>
            <h3 className="mb-2 text-ink font-display">SpotBooker</h3>
            <p className="my-1 text-[0.9rem]">
              Simple and easy booking for your daily schedule.
            </p>
          </div>
          <div>
            <h4 className="mb-2 text-ink font-display">Quick Links</h4>
            <p className="my-1 text-[0.9rem]">Dashboard</p>
            <p className="my-1 text-[0.9rem]">Book</p>
            <p className="my-1 text-[0.9rem]">About</p>
          </div>
          <div>
            <h4 className="mb-2 text-ink font-display">Contact</h4>
            <p className="my-1 text-[0.9rem]">Email: support@spotbooker.com</p>
            <p className="my-1 text-[0.9rem]">Phone: 123-456-7890</p>
          </div>
        </div>
        <p className="mt-3.5 pt-3.5 border-t border-surface-line text-center text-ink-soft text-[0.85rem]">
          © 2026 SpotBooker
        </p>
      </footer>
    </main>
  );
}

export default App;
