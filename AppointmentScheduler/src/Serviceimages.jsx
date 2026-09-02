// Real photography, sourced from Unsplash (free license, no attribution
// required — https://unsplash.com/license). All 10 appointment types below
// have a hand-verified, on-topic photo. Anything typed that ISN'T one of
// these 10 falls back to LoremFlickr keyword-matching (free, no key needed:
// https://loremflickr.com) — good enough for arbitrary text, but not as
// reliable as a real curated photo, which is why the 10 offered here are
// all curated rather than auto-matched.

const cdn = (id, w) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const services = {
  "General Checkup": {
    blurb: "A routine visit to check in on your overall health.",
    photos: ["photo-1532938911079-1b06ac7ceec7"], // Online Marketing
    alt: "Doctor performing a general checkup",
  },
  "Dental Cleaning": {
    blurb: "A thorough clean and polish for a healthy smile.",
    photos: ["photo-1588776814546-1ffcf47267a5"], // Jonathan Borba
    alt: "Dentist examining a patient",
  },
  "Hair Cut": {
    blurb: "A fresh cut, shaped and styled to your preference.",
    photos: ["photo-1634480257305-7f4ca3582e6a"], // Hair Spies
    alt: "Stylist cutting a client's hair",
  },
  Consultation: {
    blurb: "A one-on-one conversation to talk through your needs.",
    photos: ["photo-1573497491208-6b1acb260507"], // Christina @ wocintechchat.com
    alt: "Two people in a one-on-one conversation",
  },
  "Eye Checkup": {
    blurb: "A vision test to check your eyes are working their best.",
    photos: ["photo-1646083774155-2a40b675641d"], // Bartosz Sujkowski
    alt: "A pair of glasses on a white surface",
  },
  Physiotherapy: {
    blurb: "Guided movement and exercises to recover and rebuild strength.",
    photos: ["photo-1758654860100-32cd2e83e74a"], // Navy Medicine
    alt: "Therapist assisting a patient with physical therapy",
  },
  "Skin Consultation": {
    blurb: "A dermatology visit to check in on your skin's health.",
    photos: ["photo-1677682692989-0e54aa104350"], // Iwaria Inc.
    alt: "A woman having a skin treatment",
  },
  "Massage Therapy": {
    blurb: "Hands-on therapy to ease tension and help you relax.",
    photos: ["photo-1519824145371-296894a0daa9"], // Toa Heftiba
    alt: "A therapist massaging a client's back",
  },
  "Mental Health Counseling": {
    blurb:
      "A confidential conversation with a counselor about how you're doing.",
    photos: ["photo-1758273241086-f3585ef8c2f8"], // Vitaly Gariev
    alt: "A therapist listening to a patient in a counseling session",
  },
  Vaccination: {
    blurb: "A quick, routine shot to keep you protected.",
    photos: ["photo-1576765974257-b414b9ea0051"], // CDC
    alt: "A nurse administering a vaccine",
  },
};

// All 10 curated names, offered as quick-pick chips in the booking form.
export const quickPicks = Object.keys(services);

// Kept for backwards compatibility with anything still importing this name.
export const serviceNames = quickPicks;

function normalize(str) {
  return String(str || "")
    .trim()
    .toLowerCase();
}

// Looks up a curated preset by name, ignoring case/extra spaces, so
// "hair cut" and "Hair Cut" both match. Returns null for anything typed
// that isn't one of the 10 curated types.
function findPreset(serviceName) {
  const target = normalize(serviceName);
  const key = quickPicks.find((name) => normalize(name) === target);
  return key ? services[key] : null;
}

function hashCode(str) {
  let hash = 0;
  const text = String(str || "default");
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Turns free-typed text like "Podiatry!" into a LoremFlickr keyword tag
// like "podiatry" so the returned photo is at least topically related.
function toKeywords(serviceName) {
  const cleaned = normalize(serviceName).replace(/[^a-z0-9\s]/g, " ");
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "appointment";
  return words.slice(0, 3).join(",");
}

// Builds a photo URL for any appointment type.
// - One of the 10 curated types → its verified, on-topic Unsplash photo.
// - Anything else typed → auto-matched via LoremFlickr, keyed off a seed so
//   the same text always gets the same photo instead of a new one on every
//   render.
function photoFor(serviceName, seed, width) {
  const preset = findPreset(serviceName);
  if (preset) {
    return cdn(preset.photos[0], width);
  }
  const keywords = toKeywords(serviceName);
  const lock = hashCode(seed || serviceName);
  return `https://loremflickr.com/${width}/${width}/${keywords}?lock=${lock}`;
}

// Photo for a specific booked appointment.
export function appointmentPhotoUrl(serviceName, appointmentId, width = 300) {
  return photoFor(serviceName, appointmentId ?? serviceName, width);
}

// Photo for the live "what you're about to book" preview.
export function serviceImageUrl(serviceName, width = 300) {
  return photoFor(serviceName, serviceName, width);
}

export function serviceAlt(serviceName) {
  const preset = findPreset(serviceName);
  if (preset) return preset.alt;
  return serviceName ? `${serviceName} appointment` : "Appointment";
}

export function serviceBlurb(serviceName) {
  const preset = findPreset(serviceName);
  if (preset) return preset.blurb;
  return serviceName
    ? `Your ${serviceName.toLowerCase()} appointment, all set up.`
    : "Tell us what you're booking and we'll find a matching photo.";
}

// Hero / banner photo used at the top of the app.
export function heroImageUrl(width = 1600) {
  return cdn("photo-1758691461957-474a7686e388", width); // Vitaly Gariev
}
