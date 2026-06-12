import { useState, useEffect } from "react"
import { supabase } from "./supabase"

const jobs = [
  { title: "ICU Nurse", hospital: "Johns Hopkins Hospital", location: "USA, Baltimore", salary: "$85,000/yr", type: "Full Time", country: "USA" },
  { title: "Cardiac Nurse", hospital: "NHS Trust London", location: "UK, London", salary: "£42,000/yr", type: "Full Time", country: "UK" },
  { title: "ER Nurse", hospital: "Toronto General", location: "Canada, Toronto", salary: "CA$75,000/yr", type: "Full Time", country: "Canada" },
  { title: "Staff Nurse", hospital: "King Faisal Specialist", location: "Saudi Arabia, Riyadh", salary: "SAR 8,000/mo", type: "Full Time", country: "Saudi Arabia" },
  { title: "Pediatric Nurse", hospital: "Royal Children's Hospital", location: "Australia, Melbourne", salary: "AU$72,000/yr", type: "Full Time", country: "Australia" },
  { title: "ICU Nurse", hospital: "Cleveland Clinic Abu Dhabi", location: "UAE, Abu Dhabi", salary: "AED 12,000/mo", type: "Full Time", country: "UAE" },
]

const news = [
  { title: "Global Nursing Shortage Reaches Critical Levels in 2026", date: "June 10, 2026", tag: "Global", color: "#f43f5e" },
  { title: "UAE Announces 5,000 New Nursing Positions", date: "June 8, 2026", tag: "UAE", color: "#38bdf8" },
  { title: "UK NHS Increases Nurse Salaries by 8%", date: "June 5, 2026", tag: "UK", color: "#818cf8" },
  { title: "Saudi Arabia Fast-Tracks Nursing License", date: "June 3, 2026", tag: "Saudi Arabia", color: "#34d399" },
  { title: "Canada Launches New Immigration Pathway for Nurses", date: "May 30, 2026", tag: "Canada", color: "#fb923c" },
]

const exams = [
  { name: "NCLEX-RN", flag: "🇺🇸🇨🇦", desc: "USA & Canada Nursing License", color: "#38bdf8", tag: "Most Popular" },
  { name: "DHA", flag: "🇦🇪", desc: "Dubai Health Authority License", color: "#34d399", tag: "High Demand" },
  { name: "HAAD", flag: "🇦🇪", desc: "Abu Dhabi Health Authority", color: "#818cf8", tag: "" },
  { name: "Prometric", flag: "🌍", desc: "Saudi Arabia, Oman, Kuwait, Qatar", color: "#fb923c", tag: "Gulf" },
  { name: "OET", flag: "🇬🇧🇦🇺", desc: "Occupational English Test", color: "#f43f5e", tag: "" },
  { name: "IELTS", flag: "🌍", desc: "UK, Australia, Canada, NZ", color: "#fbbf24", tag: "" },
  { name: "MOH UAE", flag: "🇦🇪", desc: "Ministry of Health UAE License", color: "#a78bfa", tag: "" },
]

const examAds = [
  { name: "NCLEX Academy Pakistan", exam: "NCLEX-RN", offer: "Online Prep Course — 3 Months", price: "PKR 15,000", contact: "nclex@example.com", badge: "⭐ Featured" },
  { name: "Gulf Nurses Training Center", exam: "DHA / HAAD / Prometric", offer: "Complete Gulf Exam Package", price: "PKR 20,000", contact: "gulf@example.com", badge: "🔥 Hot" },
  { name: "OET Language Institute", exam: "OET / IELTS", offer: "English for Healthcare Professionals", price: "PKR 12,000", contact: "oet@example.com", badge: "" },
]

const faqs = [
  { q: "How do I register on NurseHub?", a: "Click Register, choose Nurse or Recruiter, fill your details and submit. No email confirmation needed!" },
  { q: "I cant login — what should I do?", a: "Make sure your email and password are correct. Use Forgot Password to reset." },
  { q: "How do I reset my password?", a: "Click Forgot Password on the login page, enter your email, and you will receive a reset link." },
  { q: "Why is a page not opening?", a: "Try refreshing the browser. If issue persists, clear browser cache and try again." },
  { q: "How do I post a job as a recruiter?", a: "Register as Recruiter, go to Dashboard, and click Post a Job. Basic listing is free!" },
  { q: "How do I advertise my exam prep course?", a: "Go to Exam Prep section and click Advertise Your Institute. Contact us at nursehub@support.com" },
]

const countries = ["All","USA","UK","Canada","Australia","Saudi Arabia","UAE"]
    
export default function App() {
  const [page, setPage] = useState("home")
  const [userType, setUserType] = useState("nurse")
  const [country, setCountry] = useState("All")
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [resetEmail, setResetEmail] = useState("")
  const [resetSent, setResetSent] = useState(false)
  const [faqOpen, setFaqOpen] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) setPage("dashboard")
    })
  }, [])

  const handleRegister = async () => {
    if (!form.email || !form.password || !form.name) { setError("Please fill all fields"); return }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return }
    setLoading(true); setError("")
    const { error } = await supabase.auth.signUp({
      email: form.email, password: form.password,
      options: { data: { name: form.name, user_type: userType } }
    })
    if (error) setError(error.message)
    else { setSuccess("Account created! You can now login."); setTimeout(() => { setPage("login"); setSuccess("") }, 2000) }
    setLoading(false)
  }

  const handleLogin = async () => {
    if (!form.email || !form.password) { setError("Please enter email and password"); return }
    setLoading(true); setError("")
    const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password })
    if (error) setError("Wrong email or password. Try again.")
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut(); setUser(null); setPage("home")
  }

  const handleForgotPassword = async () => {
    if (!resetEmail) { setError("Please enter your email"); return }
    setLoading(true); setError("")
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, { redirectTo: "https://nursehub-pied.vercel.app" })
    if (error) setError(error.message)
    else setResetSent(true)
    setLoading(false)
  }

  const filteredJobs = country === "All" ? jobs : jobs.filter(j => j.country === country)

  const navBtn = (label, pg, icon) => (
    <button onClick={() => setPage(pg)} style={{ background: page===pg?"rgba(56,189,248,0.15)":"none", border:"none", color:page===pg?"#38bdf8":"#94a3b8", padding:"8px 12px", borderRadius:"8px", cursor:"pointer", fontSize:"0.8rem", fontWeight:page===pg?700:400 }}>{icon} {label}</button>
  )

  return (
    <div style={{ minHeight:"100vh", background:"#060d1a", color:"white", fontFamily:"'Inter',system-ui,sans-serif" }}>
      <nav style={{ background:"rgba(15,23,42,0.95)", backdropFilter:"blur(12px)", padding:"0 16px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100, borderBottom:"1px solid #1e293b", height:"56px" }}>
        <div onClick={() => setPage("home")} style={{ display:"flex", alignItems:"center", gap:"8px", cursor:"pointer" }}>
          <span style={{ fontSize:"1.3rem" }}>🏥</span>
          <span style={{ color:"#38bdf8", fontSize:"1.1rem", fontWeight:800 }}>NurseHub</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"2px" }}>
          {navBtn("Jobs","jobs","💼")}
          {navBtn("News","news","📰")}
          {navBtn("Exams","exams","📚")}
          {navBtn("Help","help","❓")}
          {user ? navBtn("Dashboard","dashboard","👩‍⚕️") :
            <button onClick={() => setPage("login")} style={{ background:"linear-gradient(135deg,#38bdf8,#818cf8)", border:"none", color:"white", padding:"7px 14px", borderRadius:"8px", cursor:"pointer", fontWeight:700, fontSize:"0.8rem" }}>Login</button>}
        </div>
      </nav>{page==="home" && (
        <div>
          <div style={{ textAlign:"center", padding:"48px 24px 32px" }}>
            <h1 style={{ fontSize:"2rem", fontWeight:900, margin:"0 0 12px" }}>Find Your Dream<br /><span style={{ background:"linear-gradient(135deg,#38bdf8,#818cf8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Nursing Job</span> Worldwide</h1>
            <p style={{ color:"#64748b", marginBottom:"24px" }}>USA • UK • Canada • UAE • Saudi Arabia • Australia</p>
            <div style={{ display:"flex", gap:"10px", justifyContent:"center", flexWrap:"wrap" }}>
              <button onClick={() => setPage("jobs")} style={{ background:"linear-gradient(135deg,#38bdf8,#818cf8)", border:"none", color:"white", padding:"12px 24px", borderRadius:"12px", fontSize:"0.95rem", fontWeight:700, cursor:"pointer" }}>💼 Browse Jobs</button>
              <button onClick={() => setPage("exams")} style={{ background:"rgba(56,189,248,0.1)", border:"1px solid #38bdf8", color:"#38bdf8", padding:"12px 24px", borderRadius:"12px", fontSize:"0.95rem", fontWeight:700, cursor:"pointer" }}>📚 Exam Prep</button>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:"10px", padding:"0 24px 32px", maxWidth:"900px", margin:"0 auto" }}>
            {exams.map(ex => (
              <div key={ex.name} onClick={() => setPage("exams")} style={{ background:"#0f172a", border:`1px solid ${ex.color}40`, borderRadius:"12px", padding:"14px", cursor:"pointer", textAlign:"center" }}>
                <div style={{ fontSize:"1.5rem" }}>{ex.flag}</div>
                <div style={{ color:ex.color, fontWeight:800, fontSize:"0.85rem", marginTop:"6px" }}>{ex.name}</div>
                <div style={{ color:"#64748b", fontSize:"0.68rem", marginTop:"4px" }}>{ex.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {page==="jobs" && (
        <div style={{ padding:"24px", maxWidth:"900px", margin:"0 auto" }}>
          <h2 style={{ marginBottom:"16px", fontSize:"1.3rem", fontWeight:800 }}>💼 Nursing Jobs</h2>
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"16px" }}>
            {countries.map(c => (
              <button key={c} onClick={() => setCountry(c)} style={{ padding:"6px 12px", borderRadius:"20px", border:"1px solid", borderColor:country===c?"#38bdf8":"#1e293b", background:country===c?"rgba(56,189,248,0.1)":"#0f172a", color:country===c?"#38bdf8":"#64748b", cursor:"pointer", fontSize:"0.78rem", fontWeight:country===c?700:400 }}>{c}</button>
            ))}
          </div>
          {filteredJobs.map((j,i) => (
            <div key={i} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:"14px", padding:"16px", marginBottom:"10px" }}>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <div>
                  <h3 style={{ margin:"0 0 4px", fontSize:"0.95rem" }}>{j.title}</h3>
                  <p style={{ color:"#64748b", margin:"0 0 4px", fontSize:"0.82rem" }}>🏥 {j.hospital}</p>
                  <p style={{ color:"#64748b", margin:0, fontSize:"0.78rem" }}>📍 {j.location}</p>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ color:"#34d399", fontWeight:700, fontSize:"0.85rem" }}>{j.salary}</div>
                  <div style={{ color:"#64748b", fontSize:"0.72rem" }}>{j.type}</div>
                </div>
              </div>
              <button style={{ marginTop:"10px", background:"linear-gradient(135deg,#38bdf8,#818cf8)", border:"none", color:"white", padding:"7px 16px", borderRadius:"8px", cursor:"pointer", fontSize:"0.82rem" }}>Apply Now</button>
            </div>
          ))}
        </div>
      )}

      {page==="news" && (
        <div style={{ padding:"24px", maxWidth:"900px", margin:"0 auto" }}>
          <h2 style={{ marginBottom:"20px", fontSize:"1.3rem", fontWeight:800 }}>📰 Nursing News</h2>
          {news.map((n,i) => (
            <div key={i} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:"14px", padding:"16px", marginBottom:"12px", borderLeft:`3px solid ${n.color}` }}>
              <span style={{ background:`${n.color}20`, color:n.color, padding:"3px 10px", borderRadius:"20px", fontSize:"0.7rem", fontWeight:700 }}>{n.tag}</span>
              <h3 style={{ margin:"10px 0 6px", fontSize:"0.9rem" }}>{n.title}</h3>
              <p style={{ color:"#64748b", fontSize:"0.78rem", margin:0 }}>📅 {n.date}</p>
            </div>
          ))}
        </div>
      )}

      {page==="exams" && (
        <div style={{ padding:"24px", maxWidth:"900px", margin:"0 auto" }}>
          <h2 style={{ marginBottom:"8px", fontSize:"1.3rem", fontWeight:800 }}>📚 Nursing Exam Prep</h2>
          <p style={{ color:"#64748b", marginBottom:"20px", fontSize:"0.85rem" }}>NCLEX • DHA • HAAD • Prometric • OET • IELTS • MOH</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))", gap:"10px", marginBottom:"24px" }}>
            {exams.map(ex => (
              <div key={ex.name} style={{ background:"#0f172a", border:`1px solid ${ex.color}40`, borderRadius:"12px", padding:"14px", textAlign:"center" }}>
                <div style={{ fontSize:"1.6rem" }}>{ex.flag}</div>
                <div style={{ color:ex.color, fontWeight:800, fontSize:"0.9rem", margin:"6px 0 4px" }}>{ex.name}</div>
                <div style={{ color:"#64748b", fontSize:"0.7rem" }}>{ex.desc}</div>
                {ex.tag && <span style={{ display:"inline-block", marginTop:"6px", background:`${ex.color}20`, color:ex.color, padding:"2px 8px", borderRadius:"20px", fontSize:"0.65rem", fontWeight:700 }}>{ex.tag}</span>}
              </div>
            ))}
          </div>
          <div style={{ background:"linear-gradient(135deg,rgba(56,189,248,0.1),rgba(129,140,248,0.1))", border:"1px solid rgba(56,189,248,0.3)", borderRadius:"16px", padding:"20px", marginBottom:"24px", textAlign:"center" }}>
            <div style={{ fontSize:"1.8rem", marginBottom:"8px" }}>🏫</div>
            <h3 style={{ margin:"0 0 8px", color:"#38bdf8" }}>Advertise Your Institute</h3>
            <p style={{ color:"#64748b", fontSize:"0.82rem", margin:"0 0 14px" }}>Reach thousands of nurses preparing for NCLEX, DHA, HAAD, Prometric!</p>
            <a href="mailto:nursehub@support.com" style={{ background:"linear-gradient(135deg,#38bdf8,#818cf8)", color:"white", padding:"10px 20px", borderRadius:"10px", fontWeight:700, textDecoration:"none", fontSize:"0.85rem" }}>📧 Contact Us to Advertise</a>
            <p style={{ color:"#475569", fontSize:"0.72rem", marginTop:"10px" }}>Plans from $30/month</p>
          </div>
          <h3 style={{ fontSize:"1rem", fontWeight:800, marginBottom:"14px" }}>🌟 Featured Institutes</h3>
          {examAds.map((ad,i) => (
            <div key={i} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:"14px", padding:"16px", marginBottom:"10px", borderLeft:"3px solid #38bdf8" }}>
              {ad.badge && <span style={{ background:"rgba(56,189,248,0.1)", color:"#38bdf8", padding:"2px 10px", borderRadius:"20px", fontSize:"0.7rem", fontWeight:700 }}>{ad.badge}</span>}
              <h3 style={{ margin:"8px 0 4px", fontSize:"0.95rem" }}>{ad.name}</h3>
              <p style={{ color:"#38bdf8", margin:"0 0 4px", fontSize:"0.78rem" }}>📚 {ad.exam}</p>
              <p style={{ color:"#64748b", margin:0, fontSize:"0.78rem" }}>{ad.offer} — <span style={{ color:"#34d399", fontWeight:700 }}>{ad.price}</span></p>
              <a href={`mailto:${ad.contact}`} style={{ display:"inline-block", marginTop:"10px", background:"rgba(56,189,248,0.1)", border:"1px solid #38bdf8", color:"#38bdf8", padding:"7px 14px", borderRadius:"8px", fontSize:"0.78rem", fontWeight:600, textDecoration:"none" }}>📧 Contact Institute</a>
            </div>
          ))}
        </div>
      )}

      {page==="help" && (
        <div style={{ padding:"24px", maxWidth:"700px", margin:"0 auto" }}>
          <h2 style={{ marginBottom:"8px", fontSize:"1.3rem", fontWeight:800 }}>❓ Help Center</h2>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"24px" }}>
            {[["🔑","Login Issues","login"],["📝","Register","register"],["🔐","Reset Password","forgot"],["📧","Support",""]].map(([icon,label,pg]) => (
              <div key={label} onClick={() => pg ? setPage(pg) : window.open("mailto:nursehub@support.com")} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:"12px", padding:"14px", cursor:"pointer", display:"flex", alignItems:"center", gap:"10px" }}>
                <span style={{ fontSize:"1.2rem" }}>{icon}</span>
                <span style={{ fontSize:"0.82rem", fontWeight:600 }}>{label}</span>
              </div>
            ))}
          </div>
          {faqs.map((faq,i) => (
            <div key={i} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:"12px", marginBottom:"8px", overflow:"hidden" }}>
              <div onClick={() => setFaqOpen(faqOpen===i?null:i)} style={{ padding:"14px", cursor:"pointer", display:"flex", justifyContent:"space-between" }}>
                <span style={{ fontSize:"0.85rem", fontWeight:600 }}>{faq.q}</span>
                <span style={{ color:"#38bdf8", fontWeight:700 }}>{faqOpen===i?"−":"+"}</span>
              </div>
              {faqOpen===i && <div style={{ padding:"0 14px 14px", color:"#94a3b8", fontSize:"0.82rem" }}>{faq.a}</div>}
            </div>
          ))}
        </div>
      )}

      {page==="forgot" && (
        <div style={{ padding:"48px 24px", maxWidth:"380px", margin:"0 auto" }}>
          <div style={{ background:"#0f172a", padding:"28px", borderRadius:"16px", border:"1px solid #1e293b", textAlign:"center" }}>
            <span style={{ fontSize:"2rem" }}>🔐</span>
            <h2 style={{ margin:"8px 0 16px", fontSize:"1.3rem" }}>Reset Password</h2>
            {!resetSent ? <>
              {error && <p style={{ color:"#f43f5e", fontSize:"0.82rem", marginBottom:"12px" }}>{error}</p>}
              <input placeholder="Your email" value={resetEmail} onChange={e => setResetEmail(e.target.value)} style={{ width:"100%", background:"#060d1a", border:"1px solid #1e293b", color:"white", padding:"12px", borderRadius:"8px", marginBottom:"14px", fontSize:"0.9rem", boxSizing:"border-box" }} />
              <button onClick={handleForgotPassword} disabled={loading} style={{ width:"100%", background:"linear-gradient(135deg,#38bdf8,#818cf8)", border:"none", color:"white", padding:"12px", borderRadius:"10px", fontWeight:700, cursor:"pointer" }}>{loading?"Sending...":"Send Reset Link"}</button>
            </> : <div><div style={{ fontSize:"2rem" }}>✅</div><p style={{ color:"#34d399", fontWeight:700 }}>Reset link sent! Check your email.</p></div>}
            <p style={{ marginTop:"14px" }}><span onClick={() => setPage("login")} style={{ color:"#38bdf8", cursor:"pointer", fontSize:"0.85rem" }}>← Back to Login</span></p>
          </div>
        </div>
      )}

      {page==="dashboard" && user && (
        <div style={{ padding:"32px 24px", maxWidth:"600px", margin:"0 auto" }}>
          <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:"16px", padding:"32px", textAlign:"center" }}>
            <div style={{ fontSize:"3rem", marginBottom:"12px" }}>👩‍⚕️</div>
            <h2 style={{ margin:"0 0 8px" }}>Welcome to NurseHub!</h2>
            <p style={{ color:"#64748b", marginBottom:"20px" }}>{user.email}</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"20px" }}>
              {[["🔍","Browse Jobs","jobs"],["📚","Exam Prep","exams"],["📰","News","news"],["❓","Help","help"]].map(([icon,label,pg]) => (
                <div key={label} onClick={() => setPage(pg)} style={{ background:"#060d1a", border:"1px solid #1e293b", borderRadius:"10px", padding:"14px", cursor:"pointer" }}>
                  <div style={{ fontSize:"1.4rem", marginBottom:"6px" }}>{icon}</div>
                  <p style={{ margin:0, fontSize:"0.82rem", color:"#94a3b8" }}>{label}</p>
                </div>
              ))}
            </div>
            <button onClick={handleLogout} style={{ background:"none", border:"1px solid #334155", color:"#94a3b8", padding:"10px 24px", borderRadius:"8px", cursor:"pointer" }}>Logout</button>
          </div>
        </div>
      )}

      {page==="login" && (
        <div style={{ padding:"48px 24px", maxWidth:"380px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"24px" }}>
            <span style={{ fontSize:"2rem" }}>🏥</span>
            <h2 style={{ margin:"8px 0 4px", fontSize:"1.4rem", fontWeight:800 }}>Welcome Back</h2>
          </div>
          <div style={{ background:"#0f172a", padding:"24px", borderRadius:"16px", border:"1px solid #1e293b" }}>
            {error && <p style={{ color:"#f43f5e", fontSize:"0.82rem", marginBottom:"12px", background:"rgba(244,63,94,0.1)", padding:"10px", borderRadius:"8px" }}>{error}</p>}
            {success && <p style={{ color:"#34d399", fontSize:"0.82rem", marginBottom:"12px" }}>{success}</p>}
            <input placeholder="Email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} style={{ width:"100%", background:"#060d1a", border:"1px solid #1e293b", color:"white", padding:"12px", borderRadius:"8px", marginBottom:"10px", fontSize:"0.9rem", boxSizing:"border-box" }} />
            <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form,password:e.target.value})} style={{ width:"100%", background:"#060d1a", border:"1px solid #1e293b", color:"white", padding:"12px", borderRadius:"8px", marginBottom:"8px", fontSize:"0.9rem", boxSizing:"border-box" }} />
            <p onClick={() => { setPage("forgot"); setResetSent(false); setError("") }} style={{ color:"#38bdf8", fontSize:"0.8rem", textAlign:"right", cursor:"pointer", marginBottom:"14px" }}>Forgot Password?</p>
            <button onClick={handleLogin} disabled={loading} style={{ width:"100%", background:"linear-gradient(135deg,#38bdf8,#818cf8)", border:"none", color:"white", padding:"12px", borderRadius:"10px", fontWeight:700, cursor:"pointer", opacity:loading?0.7:1 }}>{loading?"Logging in...":"Login"}</button>
            <p style={{ color:"#64748b", fontSize:"0.82rem", textAlign:"center", marginTop:"14px" }}>No account? <span onClick={() => setPage("register")} style={{ color:"#38bdf8", cursor:"pointer", fontWeight:600 }}>Register free</span></p>
          </div>
        </div>
      )}

      {page==="register" && (
        <div style={{ padding:"48px 24px", maxWidth:"380px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"20px" }}>
            <span style={{ fontSize:"2rem" }}>🏥</span>
            <h2 style={{ margin:"8px 0 4px", fontSize:"1.4rem", fontWeight:800 }}>Create Account</h2>
          </div>
          <div style={{ display:"flex", gap:"8px", marginBottom:"16px" }}>
            <button onClick={() => setUserType("nurse")} style={{ flex:1, padding:"10px", borderRadius:"10px", border:"2px solid", borderColor:userType==="nurse"?"#38bdf8":"#1e293b", background:userType==="nurse"?"rgba(56,189,248,0.1)":"#0f172a", color:userType==="nurse"?"#38bdf8":"#94a3b8", cursor:"pointer", fontWeight:700 }}>👩‍⚕️ Nurse</button>
            <button onClick={() => setUserType("recruiter")} style={{ flex:1, padding:"10px", borderRadius:"10px", border:"2px solid", borderColor:userType==="recruiter"?"#38bdf8":"#1e293b", background:userType==="recruiter"?"rgba(56,189,248,0.1)":"#0f172a", color:userType==="recruiter"?"#38bdf8":"#94a3b8", cursor:"pointer", fontWeight:700 }}>🏢 Recruiter</button>
          </div>
          <div style={{ background:"#0f172a", padding:"24px", borderRadius:"16px", border:"1px solid #1e293b" }}>
            {error && <p style={{ color:"#f43f5e", fontSize:"0.82rem", marginBottom:"12px", background:"rgba(244,63,94,0.1)", padding:"10px", borderRadius:"8px" }}>{error}</p>}
            {success && <p style={{ color:"#34d399", fontSize:"0.82rem", marginBottom:"12px" }}>{success}</p>}
            <input placeholder="Full Name" value={form.name} onChange={e => setForm({...form,name:e.target.value})} style={{ width:"100%", background:"#060d1a", border:"1px solid #1e293b", color:"white", padding:"12px", borderRadius:"8px", marginBottom:"10px", fontSize:"0.9rem", boxSizing:"border-box" }} />
            <input placeholder="Email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} style={{ width:"100%", background:"#060d1a", border:"1px solid #1e293b", color:"white", padding:"12px", borderRadius:"8px", marginBottom:"10px", fontSize:"0.9rem", boxSizing:"border-box" }} />
            <input type="password" placeholder="Password (min 6)" value={form.password} onChange={e => setForm({...form,password:e.target.value})} style={{ width:"100%", background:"#060d1a", border:"1px solid #1e293b", color:"white", padding:"12px", borderRadius:"8px", marginBottom:"16px", fontSize:"0.9rem", boxSizing:"border-box" }} />
            <button onClick={handleRegister} disabled={loading} style={{ width:"100%", background:"linear-gradient(135deg,#38bdf8,#818cf8)", border:"none", color:"white", padding:"12px", borderRadius:"10px", fontWeight:700, cursor:"pointer", opacity:loading?0.7:1 }}>{loading?"Creating...":"Create Account"}</button>
            <p style={{ color:"#64748b", fontSize:"0.8rem", textAlign:"center", marginTop:"12px" }}>Already have account? <span onClick={() => setPage("login")} style={{ color:"#38bdf8", cursor:"pointer" }}>Login</span></p>
          </div>
        </div>
      )}

      <footer style={{ background:"#0f172a", padding:"20px", textAlign:"center", color:"#334155", fontSize:"0.78rem", marginTop:"32px", borderTop:"1px solid #1e293b" }}>
        © 2026 NurseHub — Made by a Nurse, for Nurses 🏥
      </footer>
    </div>
  )
}
      
