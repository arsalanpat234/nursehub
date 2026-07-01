// src/lib/profileCompletion.js
// Calculates a 0-100 profile completion score for a nurse profile.
// Pure function, no side effects — safe to call on every render.

const WEIGHTED_FIELDS = [
  { key: "specialties", weight: 15, check: (v) => Array.isArray(v) && v.length > 0 },
  { key: "experience", weight: 10, check: (v) => !!v },
  { key: "location", weight: 10, check: (v) => !!v },
  { key: "bio", weight: 10, check: (v) => !!v && v.trim().length > 10 },
  { key: "license_number", weight: 10, check: (v) => !!v },
  { key: "license_country", weight: 5, check: (v) => !!v },
  { key: "education", weight: 15, check: (v) => Array.isArray(v) && v.length > 0 },
  { key: "preferred_countries", weight: 10, check: (v) => Array.isArray(v) && v.length > 0 },
  { key: "ielts", weight: 5, check: (v) => !!v },
  { key: "oet", weight: 5, check: (v) => !!v },
  { key: "nclex", weight: 5, check: (v) => !!v && v !== "Not Started" },
]

export function calcProfileCompletion(profile) {
  if (!profile) return 0
  let score = 0
  for (const field of WEIGHTED_FIELDS) {
    if (field.check(profile[field.key])) score += field.weight
  }
  return Math.min(100, Math.round(score))
}

export function completionLabel(pct) {
  if (pct >= 90) return "Recruiter Ready"
  if (pct >= 60) return "Almost There"
  if (pct >= 30) return "Getting Started"
  return "Just Created"
}
