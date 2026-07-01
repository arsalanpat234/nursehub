// src/components/profile/EducationHistoryEditor.jsx
// Add/remove repeatable education entries: { degree, institution, year }

import { colors, S } from "../../lib/theme"

export default function EducationHistoryEditor({ value = [], onChange }) {
  const addEntry = () => {
    onChange([...value, { degree: "", institution: "", year: "" }])
  }

  const updateEntry = (index, field, val) => {
    const next = [...value]
    next[index] = { ...next[index], [field]: val }
    onChange(next)
  }

  const removeEntry = (index) => {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div style={{ marginBottom: "10px" }}>
      <label style={{ display: "block", color: colors.textFaint, fontSize: "0.78rem", marginBottom: "8px" }}>
        Education History
      </label>
      {value.map((entry, i) => (
        <div key={i} style={{ ...S.card, padding: "12px", marginBottom: "8px" }}>
          <input
            placeholder="Degree (e.g. BSN)"
            value={entry.degree}
            onChange={(e) => updateEntry(i, "degree", e.target.value)}
            style={S.input}
          />
          <input
            placeholder="Institution"
            value={entry.institution}
            onChange={(e) => updateEntry(i, "institution", e.target.value)}
            style={S.input}
          />
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              placeholder="Year (e.g. 2019)"
              value={entry.year}
              onChange={(e) => updateEntry(i, "year", e.target.value)}
              style={{ ...S.input, flex: 1, marginBottom: 0 }}
            />
            <button
              type="button"
              onClick={() => removeEntry(i)}
              style={{ background: "rgba(244,63,94,0.1)", border: `1px solid ${colors.red}`, color: colors.red, borderRadius: "8px", padding: "0 14px", cursor: "pointer", fontWeight: 700 }}
            >
              ✕
            </button>
          </div>
        </div>
      ))}
      <button type="button" onClick={addEntry} style={{ ...S.btnOutline, width: "100%" }}>
        ➕ Add Education
      </button>
    </div>
  )
}
