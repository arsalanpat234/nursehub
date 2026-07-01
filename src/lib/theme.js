// src/lib/theme.js
// Shared design tokens — matches the existing App.jsx visual style exactly
// (dark navy background, blue→purple gradient accents, card-based layout).
// Extracted so new Phase 1+ components stay visually consistent without
// duplicating the style object in every file.

export const colors = {
  bg: "#060d1a",
  card: "#0f172a",
  border: "#1e293b",
  text: "#ffffff",
  textMuted: "#94a3b8",
  textFaint: "#64748b",
  blue: "#38bdf8",
  purple: "#818cf8",
  green: "#34d399",
  red: "#f43f5e",
  orange: "#fb923c",
  yellow: "#fbbf24",
}

export const gradient = "linear-gradient(135deg,#38bdf8,#818cf8)"

export const S = {
  card: { background: colors.card, border: `1px solid ${colors.border}`, borderRadius: "14px", padding: "16px", marginBottom: "12px" },
  input: { width: "100%", background: colors.bg, border: `1px solid ${colors.border}`, color: "white", padding: "12px", borderRadius: "8px", marginBottom: "10px", fontSize: "0.9rem", boxSizing: "border-box", outline: "none" },
  select: { width: "100%", background: colors.bg, border: `1px solid ${colors.border}`, color: "white", padding: "12px", borderRadius: "8px", marginBottom: "10px", fontSize: "0.9rem", boxSizing: "border-box" },
  btn: { background: gradient, border: "none", color: "white", padding: "12px", borderRadius: "10px", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem" },
  btnOutline: { background: "none", border: `1px solid ${colors.blue}`, color: colors.blue, padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600 },
  badge: (color) => ({ display: "inline-block", background: `${color}20`, color, padding: "2px 10px", borderRadius: "20px", fontSize: "0.68rem", fontWeight: 700 }),
  h2: { fontSize: "1.3rem", fontWeight: 800, marginBottom: "16px", margin: "0 0 16px" },
  error: { color: colors.red, fontSize: "0.82rem", marginBottom: "12px", background: "rgba(244,63,94,0.1)", padding: "10px", borderRadius: "8px" },
  success: { color: colors.green, fontSize: "0.82rem", marginBottom: "12px", background: "rgba(52,211,153,0.1)", padding: "10px", borderRadius: "8px" },
}
