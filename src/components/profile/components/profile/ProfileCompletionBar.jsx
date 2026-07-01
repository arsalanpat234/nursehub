// src/components/profile/ProfileCompletionBar.jsx

import { colors } from "../../lib/theme"
import { calcProfileCompletion, completionLabel } from "../../lib/profileCompletion"

export default function ProfileCompletionBar({ profile }) {
  const pct = calcProfileCompletion(profile)
  const label = completionLabel(pct)
  const barColor = pct >= 90 ? colors.green : pct >= 60 ? colors.blue : pct >= 30 ? colors.orange : colors.red

  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "0.78rem", color: colors.textMuted, fontWeight: 600 }}>Profile Strength</span>
        <span style={{ fontSize: "0.78rem", color: barColor, fontWeight: 700 }}>{pct}% · {label}</span>
      </div>
      <div style={{ height: "8px", background: colors.bg, borderRadius: "20px", overflow: "hidden", border: `1px solid ${colors.border}` }}>
        <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${barColor}, ${barColor}aa)`, transition: "width 0.4s ease" }} />
      </div>
    </div>
  )
}
