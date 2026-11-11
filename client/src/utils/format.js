// "2026-01-15T00:00:00.000Z" -> "January 2026"
export function formatMonthYear(isoDate) {
  if (!isoDate) return "";
  return new Date(isoDate).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    timeZone: "UTC", // dates are stored at midnight UTC, so read them in UTC
  });
}

// "2026-01-15T00:00:00.000Z" -> "2026-01-15" (what <input type="date"> expects)
export function toDateInput(isoDate) {
  return isoDate ? String(isoDate).slice(0, 10) : "";
}
