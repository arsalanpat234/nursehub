// src/components/profile/SpecialtyPicker.jsx
// Multi-select specialty chips. Replaces the old single-value dropdown.

import { colors } from "../../lib/theme"

export const SPECIALTY_OPTIONS = [
  "ICU", "ER / Emergency", "CCU", "NICU", "Oncology",
  "Dialysis", "Operating Room", "General Ward", "Pediatrics",
  "Cardiac", "Community",
]

export default function SpecialtyPicker({ value = [], onChange }) {
  const toggle = (spec) => {
    if (value.includes(spec)) onChange(value.filter((s) => s !== spec))
    else onChange([...value, spec])
  }

  return (
    <div style={{ marginBottom: "10px" }}>
      <label style={{ display: "block", color: colors.textFaint, fontSize: "0.78rem", marginBottom: "8px" }}>
        Specialties (select all that apply)
      </label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {SPECIALTY_OPTIONS.map((spec) => {
          const active = value.includes(spec)
          return (
            <button
              key={spec}
              type="button"
              onClick={() => toggle(spec)}
              style={{
                padding: "7px 14px",
                borderRadius: "20px",
                border: `1px solid ${active ? colors.blue : colors.border}`,
                background: active ? "rgba(56,189,248,0.15)" : colors.bg,
                color: active ? colors.blue : colors.textFaint,
                fontSize: "0.78rem",
                fontWeight: active ? 700 : 400,
                cursor: "pointer",
              }}
            >
              {active ? "✓ " : ""}{spec}
            </button>
          )
        })}
      </div>
    </div>
  )
}
