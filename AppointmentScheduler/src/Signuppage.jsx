import { useState } from "react";
import { serviceImageUrl, serviceAlt } from "./ServiceImages";

const inputClasses =
  "w-full py-2.5 px-3 border border-surface-line rounded-lg bg-surface text-[0.95rem] focus:outline focus:outline-2 focus:outline-teal focus:outline-offset-1";
const labelClasses = "grid gap-1.5 font-semibold text-[0.88rem] text-ink";

function SignupPage({ onSignup, onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (name === "" || email === "" || password === "") {
      setError("Please fill in every field.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    const result = onSignup(name, email, password);
    if (!result.success) {
      setError(result.message);
    }
  }

  return (
    <div className="grid gap-[18px] md:grid-cols-2 md:items-stretch md:min-h-[420px]">
      <div className="hidden md:block">
        <img
          className="w-full h-full min-h-[260px] object-cover rounded-[22px] shadow-[0_18px_40px_-24px_rgba(22,35,31,0.34)]"
          src={serviceImageUrl("General Checkup", 700)}
          alt={serviceAlt("General Checkup")}
        />
      </div>
      <section className="p-6 bg-white/[0.93] border border-surface-line/95 rounded-[22px] shadow-[0_18px_40px_-24px_rgba(22,35,31,0.34)] max-w-[420px] w-full mx-auto md:max-w-none md:mx-0 md:flex md:flex-col md:justify-center">
        <h2 className="mb-1.5 text-ink font-display tracking-[-0.01em] text-[1.35rem]">
          Create your account
        </h2>
        <p className="mb-[18px] text-ink-muted text-[0.92rem]">
          Sign up to start booking appointments.
        </p>

        {error && (
          <p className="mb-3 py-2.5 px-3 bg-[#fbe7e2] text-[#a13f2b] rounded-lg text-[0.86rem]">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid gap-3.5">
          <label className={labelClasses}>
            Full name
            <input
              type="text"
              className={inputClasses}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
            />
          </label>

          <label className={labelClasses}>
            Email
            <input
              type="email"
              className={inputClasses}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <label className={labelClasses}>
              Password
              <input
                type="password"
                className={inputClasses}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 6 characters"
              />
            </label>

            <label className={labelClasses}>
              Confirm password
              <input
                type="password"
                className={inputClasses}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Re-enter password"
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
            Create account
          </button>
        </form>

        <p className="mt-4 text-center text-ink-muted text-[0.88rem]">
          Already have an account?{" "}
          <button
            type="button"
            className="border-none bg-transparent p-0 text-teal font-bold underline cursor-pointer"
            onClick={onSwitchToLogin}
          >
            Log in
          </button>
        </p>
      </section>
    </div>
  );
}

export default SignupPage;
