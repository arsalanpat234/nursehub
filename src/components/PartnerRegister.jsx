import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function PartnerRegister() {
  const [form, setForm] = useState({
    name: "", slug: "", phone: "", city: "", description: ""
  });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const val = e.target.name === "slug"
      ? e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
      : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.slug || !form.phone) {
      setError("Name, Link ID aur Phone zaroori hai!"); return;
    }
    setLoading(true); setError("");
    const { error } = await supabase.from("partners").insert([form]);
    setLoading(false);
    if (error) setError(error.message);
    else setDone(true);
  };

  const inputStyle = {
    background: "#1a2540", border: "1px solid #333", borderRadius: "8px",
    padding: "12px 14px", color: "white", fontSize: "14px",
    outline: "none", width: "100%", boxSizing: "border-box"
  };

  return (
    <div style={{ background: "#0a0f1e", minHeight: "100vh", color: "white", fontFamily: "sans-serif" }}>
      <div style={{ background: "linear-gradient(135deg, #1a73e8, #0d47a1)", padding: "24px 16px", textAlign: "center" }}>
        <div style={{ fontSize: "40px" }}>🏫</div>
        <h1 style={{ margin: "8px 0", fontSize: "20px" }}>Partner Registration</h1>
        <p style={{ margin: 0, fontSize: "13px", opacity: 0.8 }}>Apna coaching center NurseHub pe register karein</p>
      </div>

      <div style={{ padding: "24px 16px" }}>
        {done ? (
          <div style={{ background: "#1a3a2a", border: "1px solid #00cc66", borderRadius: "12px", padding: "24px", textAlign: "center" }}>
            <div style={{ fontSize: "48px" }}>🎉</div>
            <h3 style={{ color: "#00cc66" }}>Registration Successful!</h3>
            <p style={{ color: "#aaa", fontSize: "13px" }}>Tumhara partner page:</p>
            <div style={{ background: "#0a0f1e", borderRadius: "8px", padding: "12px", marginTop: "8px" }}>
              <p style={{ color: "#1a73e8", fontSize: "14px", margin: 0, wordBreak: "break-all" }}>
                nursehub-pied.vercel.app/partner/{form.slug}
              </p>
            </div>
            <p style={{ color: "#aaa", fontSize: "12px", marginTop: "12px" }}>
              Yeh link apne students ko bhejein
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <p style={{ margin: "0 0 6px", fontSize: "13px", color: "#aaa" }}>Center Ka Naam *</p>
              <input name="name" placeholder="e.g. WISSEN NCLEX Coaching" value={form.name} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <p style={{ margin: "0 0 6px", fontSize: "13px", color: "#aaa" }}>Unique Link ID *</p>
              <input name="slug" placeholder="e.g. wissen" value={form.slug} onChange={handleChange} style={inputStyle} />
              {form.slug && (
                <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#1a73e8" }}>
                  🔗 nursehub-pied.vercel.app/partner/{form.slug}
                </p>
              )}
            </div>
            <div>
              <p style={{ margin: "0 0 6px", fontSize: "13px", color: "#aaa" }}>WhatsApp Number *</p>
              <input name="phone" placeholder="e.g. 0302-6078533" value={form.phone} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <p style={{ margin: "0 0 6px", fontSize: "13px", color: "#aaa" }}>City</p>
              <input name="city" placeholder="e.g. Karachi" value={form.city} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <p style={{ margin: "0 0 6px", fontSize: "13px", color: "#aaa" }}>Description (optional)</p>
              <textarea name="description" placeholder="Apne center ke baare mein likhein..." value={form.description} onChange={handleChange}
                style={{ ...inputStyle, height: "80px", resize: "none" }} />
            </div>
            {error && <p style={{ color: "#ff4444", fontSize: "13px", margin: 0 }}>❌ {error}</p>}
            <button onClick={handleSubmit} disabled={loading}
              style={{ background: "linear-gradient(135deg, #1a73e8, #0d47a1)", border: "none", borderRadius: "8px", padding: "14px", color: "white", fontSize: "15px", fontWeight: "bold", cursor: "pointer" }}>
              {loading ? "Registering..." : "🚀 Partner Ban Jao — Free"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
