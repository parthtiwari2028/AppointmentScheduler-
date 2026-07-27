// Real photography, sourced from Unsplash (free license, no attribution
// required — https://unsplash.com/license). Each service has more than one
// photo so that two bookings of the same service don't show an identical
// image — the photo is picked per-appointment, deterministically, from its id.

const cdn = (id, w) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const services = {
  "General Checkup": {
    blurb: "A routine visit to check in on your overall health.",
    photos: [
      "photo-1532938911079-1b06ac7ceec7", // Online Marketing
      "photo-1631558554184-319c88f4f8a4", // National Cancer Institute
    ],
    alt: "Doctor performing a general checkup",
  },
  "Dental Cleaning": {
    blurb: "A thorough clean and polish for a healthy smile.",
    photos: [
      "photo-1588776814546-1ffcf47267a5", // Jonathan Borba
      "photo-1758205308179-4e00e0e4060b", // Navy Medicine
    ],
    alt: "Dentist examining a patient",
  },
  "Hair Cut": {
    blurb: "A fresh cut, shaped and styled to your preference.",
    photos: [
      "photo-1634480257305-7f4ca3582e6a", // Hair Spies
      "photo-1634480258143-ffb5e6df0029", // Hair Spies
    ],
    alt: "Stylist cutting a client's hair",
  },
  Consultation: {
    blurb: "A one-on-one conversation to talk through your needs.",
    photos: [
      "photo-1573497491208-6b1acb260507", // Christina @ wocintechchat.com
      "photo-1758518730384-be3d205838e8", // Vitaly Gariev
    ],
    alt: "Two people in a one-on-one conversation",
  },
};

export const serviceNames = Object.keys(services);

function entryFor(serviceName) {
  return services[serviceName] || services["General Checkup"];
}

// Picks a photo for a specific appointment so repeat bookings of the same
// service still look distinct. Falls back to the first photo when no id
// is given (e.g. the live "selected service" preview while booking).
export function appointmentPhotoUrl(serviceName, appointmentId, width = 300) {
  const entry = entryFor(serviceName);
  const index = appointmentId
    ? Math.abs(hashCode(String(appointmentId))) % entry.photos.length
    : 0;
  return cdn(entry.photos[index], width);
}

export function serviceImageUrl(serviceName, width = 300) {
  return cdn(entryFor(serviceName).photos[0], width);
}

export function serviceAlt(serviceName) {
  return entryFor(serviceName).alt;
}

export function serviceBlurb(serviceName) {
  return entryFor(serviceName).blurb;
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

// Hero / banner photo used at the top of the app.
export function heroImageUrl(width = 1600) {
  return cdn("photo-1758691461957-474a7686e388", width); // Vitaly Gariev
}
