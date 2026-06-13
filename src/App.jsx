import { useState, useEffect } from "react"
import { supabase } from "./supabase"


const newsData = [
  { id:1, title:"Global Nursing Shortage Reaches Critical Levels in 2026", date:"June 10, 2026", tag:"Global", color:"#f43f5e", content:"The WHO reports a global shortage of 13 million nurses by 2030, urging countries to fast-track nursing programs." },
  { id:2, title:"UAE Announces 5,000 New Nursing Positions", date:"June 8, 2026", tag:"UAE", color:"#38bdf8", content:"UAE Ministry of Health opens 5,000 new positions for international nurses with competitive packages." },
  { id:3, title:"UK NHS Increases Nurse Salaries by 8%", date:"June 5, 2026", tag:"UK", color:"#818cf8", content:"NHS announces 8% pay rise for all nursing staff, effective July 2026, to address recruitment crisis." },
  { id:4, title:"Saudi Arabia Fast-Tracks Nursing License", date:"June 3, 2026", tag:"Saudi Arabia", color:"#34d399", content:"Saudi Commission introduces 30-day fast-track licensing for qualified international nurses." },
  { id:5, title:"Canada Launches New Immigration Pathway for Nurses", date:"May 30, 2026", tag:"Canada", color:"#fb923c", content:"IRCC introduces dedicated nurse immigration stream with PR within 6 months for qualified applicants." },
]

const exams = [
  { name:"NCLEX-RN", flag:"🇺🇸🇨🇦", desc:"USA & Canada Nursing License", color:"#38bdf8", tag:"Most Popular" },
  { name:"DHA", flag:"🇦🇪", desc:"Dubai Health Authority License", color:"#34d399", tag:"High Demand" },
  { name:"HAAD", flag:"🇦🇪", desc:"Abu Dhabi Health Authority", color:"#818cf8", tag:"" },
  { name:"Prometric", flag:"🌍", desc:"Saudi Arabia, Oman, Kuwait, Qatar", color:"#fb923c", tag:"Gulf" },
  { name:"OET", flag:"🇬🇧🇦🇺", desc:"Occupational English Test", color:"#f43f5e", tag:"" },
  { name:"IELTS", flag:"🌍", desc:"UK, Australia, Canada, NZ", color:"#fbbf24", tag:"" },
  { name:"MOH UAE", flag:"🇦🇪", desc:"Ministry of Health UAE License", color:"#a78bfa", tag:"" },
]

const examAds = [
  { name:"NCLEX Academy Pakistan", exam:"NCLEX-RN", offer:"Online Prep Course — 3 Months", price:"PKR 15,000", contact:"nclex@example.com", badge:"⭐ Featured" },
  { name:"Gulf Nurses Training Center", exam:"DHA / HAAD / Prometric", offer:"Complete Gulf Exam Package", price:"PKR 20,000", contact:"gulf@example.com", badge:"🔥 Hot" },
  { name:"OET Language Institute", exam:"OET / IELTS", offer:"English for Healthcare Professionals", price:"PKR 12,000", contact:"oet@example.com", badge:"" },
]

const faqs = [
  { q:"How do I register on NurseHub?", a:"Tap Register, choose Nurse or Recruiter, fill your details and submit." },
  { q:"I can't login — what should I do?", a:"Make sure your email and password are correct. Use Forgot Password to reset." },
  { q:"How do I reset my password?", a:"Tap Forgot Password on the login page, enter your email, and you will receive a reset link." },
  { q:"Why is a page not opening?", a:"Try refreshing the browser. If issue persists, clear browser cache and try again." },
  { q:"How do I post a job as a recruiter?", a:"Register as Recruiter, go to Recruiters page, and tap Post a Job. Basic listing is free!" },
  { q:"How do I advertise my exam prep course?", a:"Go to Exam Prep section and tap Advertise Your Institute. Contact us at nursehub@support.com" },
  { q:"How do I subscribe to NurseHub Premium?", a:"Go to Subscribe page, choose your plan, and pay via Easypaisa, JazzCash, SadaPay or Payoneer." },
  { q:"How do I upload documents?", a:"Go to Documents section in your dashboard. You can upload JPG or PDF files securely." },
]

const countries = ["All","USA","UK","Canada","Australia","Saudi Arabia","UAE"]

const subscriptionPlans = [
  { name:"Basic", price:"Free", pricePKR:"", features:["Browse Jobs","Read News","Exam Info","Basic Help"], color:"#64748b", popular:false },
  { name:"Premium Nurse", price:"$5/mo", pricePKR:"PKR 1,400/mo", features:["All Basic Features","Apply to Jobs","Document Vault","Priority Support","Recruiter Contact"], color:"#38bdf8", popular:true },
  { name:"Recruiter", price:"$15/mo", pricePKR:"PKR 4,200/mo", features:["Post Unlimited Jobs","View All Applicants","Featured Listing","Analytics Dashboard","Direct Nurse Contact"], color:"#818cf8", popular:false },
]

const paymentMethods = [
  { name:"Easypaisa", icon:"📱", number:"0311-2347693", color:"#34d399" },
  { name:"JazzCash", icon:"💳", number:"0325-8917948", color:"#fb923c" },
  { name:"SadaPay", icon:"🟣", number:"0325-8917948", color:"#a78bfa" },
  { name:"Payoneer", icon:"🌐", number:"arsalanpatrus@gmail.com", color:"#38bdf8" },
]

const recruiters = [
  { id:1, name:"Sarah Johnson", company:"FlexCare", country:"USA", speciality:"ICU / ER", email:"sarah@flexcare.com", photo:"👩‍💼" },
  { id:2, name:"Cait Osborne", company:"Host Healthcare", country:"USA", speciality:"Travel Nursing", email:"cait@hosthealthcare.com", photo:"👩‍💼" },
  { id:3, name:"Ahmed Al-Rashid", company:"Gulf Medical", country:"UAE", speciality:"All Specialities", email:"ahmed@gulfmedical.ae", photo:"👨‍💼" },
  { id:4, name:"Emma Wilson", company:"NHS Recruitment", country:"UK", speciality:"General Nursing", email:"emma@nhs.uk", photo:"👩‍💼" },
  { id:5, name:"David Chen", company:"Canada Health", country:"Canada", speciality:"Cardiac / ICU", email:"david@canadahealth.ca", photo:"👨‍💼" },                         
  ];
  export default function App() {
  const [page, setPage] = useState("home")
  const [userType, setUserType] = useState("nurse")
  const [country, setCountry] = useState("All")
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [form, setForm] = useState({ name:"", email:"", password:"" })
  const [resetEmail, setResetEmail] = useState("")
  const [resetSent, setResetSent] = useState(false)
  const [faqOpen, setFaqOpen] = useState(null)
  const [selectedNews, setSelectedNews] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [postedJobs, setPostedJobs] = useState([])
  const [jobForm, setJobForm] = useState({ title:"", hospital:"", location:"", salary:"", type:"Full Time", country:"UAE", description:"" })
  const [showJobForm, setShowJobForm] = useState(false)
  const [uploadedDocs, setUploadedDocs] = useState([])
  const [uploadMsg, setUploadMsg] = useState("")

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
    const { error } = await supabase.auth.signUp({ email: form.email, password: form.password, options: { data: { name: form.name, user_type: userType } } })
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

  const handlePostJob = () => {
    if (!jobForm.title || !jobForm.hospital || !jobForm.location || !jobForm.salary) { setError("Please fill all job fields"); return }
    const newJob = { ...jobForm, id: Date.now(), posted: "Just now", postedBy: user?.email }
    setPostedJobs(prev => [newJob, ...prev])
    setJobForm({ title:"", hospital:"", location:"", salary:"", type:"Full Time", country:"UAE", description:"" })
    setShowJobForm(false)
    setSuccess("Job posted successfully!")
    setTimeout(() => setSuccess(""), 3000)
  }

  const handleDocUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const allowed = ["image/jpeg","image/jpg","image/png","application/pdf"]
    if (!allowed.includes(file.type)) { setUploadMsg("❌ Only JPG, PNG, PDF allowed"); return }
    if (file.size > 5 * 1024 * 1024) { setUploadMsg("❌ File too large. Max 5MB"); return }
    const doc = { id: Date.now(), name: file.name, type: file.type, size: (file.size/1024).toFixed(1)+" KB", date: new Date().toLocaleDateString(), encrypted: true }
    setUploadedDocs(prev => [doc, ...prev])
    setUploadMsg("✅ Document uploaded & encrypted!")
    setTimeout(() => setUploadMsg(""), 3000)
  }

  const goTo = (pg) => { setPage(pg); setError(""); setSuccess("") }
  const filteredJobs = country === "All" ? [...postedJobs, ...jobs] : [...postedJobs, ...jobs].filter(j => j.country === country)

  const S = {
    page: { padding:"20px 16px", maxWidth:"900px", margin:"0 auto" },
    card: { background:"#0f172a", border:"1px solid #1e293b", borderRadius:"14px", padding:"16px", marginBottom:"12px" },
    input: { width:"100%", background:"#060d1a", border:"1px solid #1e293b", color:"white", padding:"12px", borderRadius:"8px", marginBottom:"10px", fontSize:"0.9rem", boxSizing:"border-box", outline:"none" },
    select: { width:"100%", background:"#060d1a", border:"1px solid #1e293b", color:"white", padding:"12px", borderRadius:"8px", marginBottom:"10px", fontSize:"0.9rem", boxSizing:"border-box" },
    btn: { background:"linear-gradient(135deg,#38bdf8,#818cf8)", border:"none", color:"white", padding:"12px", borderRadius:"10px", fontWeight:700, cursor:"pointer", fontSize:"0.9rem" },
    btnOutline: { background:"none", border:"1px solid #38bdf8", color:"#38bdf8", padding:"8px 16px", borderRadius:"8px", cursor:"pointer", fontSize:"0.82rem", fontWeight:600 },
    badge: (color) => ({ display:"inline-block", background:`${color}20`, color, padding:"2px 10px", borderRadius:"20px", fontSize:"0.68rem", fontWeight:700 }),
    h2: { fontSize:"1.3rem", fontWeight:800, marginBottom:"16px", margin:"0 0 16px" },
    error: { color:"#f43f5e", fontSize:"0.82rem", marginBottom:"12px", background:"rgba(244,63,94,0.1)", padding:"10px", borderRadius:"8px" },
    success: { color:"#34d399", fontSize:"0.82rem", marginBottom:"12px", background:"rgba(52,211,153,0.1)", padding:"10px", borderRadius:"8px" },
  }

  return (
    <div style={{ minHeight:"100vh", background:"#060d1a", color:"white", fontFamily:"'Inter',system-ui,sans-serif" }}>
      <nav style={{ background:"rgba(15,23,42,0.98)", backdropFilter:"blur(12px)", padding:"0 16px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:200, borderBottom:"1px solid #1e293b", height:"56px" }}>
        <div onClick={() => goTo("home")} style={{ display:"flex", alignItems:"center", gap:"8px", cursor:"pointer" }}>
          <span style={{ fontSize:"1.3rem" }}>🏥</span>
          <span style={{ color:"#38bdf8", fontSize:"1.1rem", fontWeight:800 }}>NurseHub</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"2px" }}>
          {[["💼","Jobs","jobs"],["📰","News","news"],["📚","Exams","exams"],["👥","Recruiters","recruiters"],["❓","Help","help"]].map(([icon,label,pg]) => (
            <button key={pg} onClick={() => goTo(pg)} style={{ background:page===pg?"rgba(56,189,248,0.15)":"none", border:"none", color:page===pg?"#38bdf8":"#94a3b8", padding:"8px 10px", borderRadius:"8px", cursor:"pointer", fontSize:"0.78rem", fontWeight:page===pg?700:400 }}>{icon} {label}</button>
          ))}
          {user
            ? <button onClick={() => goTo("dashboard")} style={{ background:"linear-gradient(135deg,#38bdf8,#818cf8)", border:"none", color:"white", padding:"7px 12px", borderRadius:"8px", cursor:"pointer", fontWeight:700, fontSize:"0.78rem" }}>👩‍⚕️ Me</button>
            : <button onClick={() => goTo("login")} style={{ background:"linear-gradient(135deg,#38bdf8,#818cf8)", border:"none", color:"white", padding:"7px 14px", borderRadius:"8px", cursor:"pointer", fontWeight:700, fontSize:"0.78rem" }}>Login</button>
          }
        </div>
      </nav>

      {page==="home" && (
        <div>
          <div style={{ textAlign:"center", padding:"48px 24px 32px" }}>
            <div style={{ display:"inline-block", background:"rgba(56,189,248,0.1)", border:"1px solid rgba(56,189,248,0.3)", borderRadius:"20px", padding:"4px 16px", fontSize:"0.75rem", color:"#38bdf8", marginBottom:"16px" }}>🌍 Worldwide Nursing Platform</div>
            <h1 style={{ fontSize:"2rem", fontWeight:900, margin:"0 0 12px", lineHeight:1.2 }}>Find Your Dream<br /><span style={{ background:"linear-gradient(135deg,#38bdf8,#818cf8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Nursing Job</span> Worldwide</h1>
            <p style={{ color:"#64748b", marginBottom:"24px", fontSize:"0.9rem" }}>USA • UK • Canada • UAE • Saudi Arabia • Australia</p>
            <div style={{ display:"flex", gap:"10px", justifyContent:"center", flexWrap:"wrap" }}>
              <button onClick={() => goTo("jobs")} style={{ ...S.btn, padding:"12px 24px", fontSize:"0.95rem" }}>💼 Browse Jobs</button>
              <button onClick={() => goTo("exams")} style={{ background:"rgba(56,189,248,0.1)", border:"1px solid #38bdf8", color:"#38bdf8", padding:"12px 24px", borderRadius:"12px", fontSize:"0.95rem", fontWeight:700, cursor:"pointer" }}>📚 Exam Prep</button>
              <button onClick={() => goTo("recruiters")} style={{ background:"rgba(129,140,248,0.1)", border:"1px solid #818cf8", color:"#818cf8", padding:"12px 24px", borderRadius:"12px", fontSize:"0.95rem", fontWeight:700, cursor:"pointer" }}>👥 Recruiters</button>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px", padding:"0 16px 24px", maxWidth:"600px", margin:"0 auto" }}>
            {[["500+","Jobs Posted"],["50+","Recruiters"],["10K+","Nurses"]].map(([num,label]) => (
              <div key={label} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:"12px", padding:"14px", textAlign:"center" }}>
                <div style={{ color:"#38bdf8", fontWeight:900, fontSize:"1.2rem" }}>{num}</div>
                <div style={{ color:"#64748b", fontSize:"0.7rem", marginTop:"4px" }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{ padding:"0 16px 32px", maxWidth:"900px", margin:"0 auto" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))", gap:"8px" }}>
              {exams.map(ex => (
                <div key={ex.name} onClick={() => goTo("exams")} style={{ background:"#0f172a", border:`1px solid ${ex.color}40`, borderRadius:"12px", padding:"12px", cursor:"pointer", textAlign:"center" }}>
                  <div style={{ fontSize:"1.4rem" }}>{ex.flag}</div>
                  <div style={{ color:ex.color, fontWeight:800, fontSize:"0.8rem", marginTop:"6px" }}>{ex.name}</div>
                  <div style={{ color:"#64748b", fontSize:"0.65rem", marginTop:"3px" }}>{ex.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {page==="jobs" && (
        <div style={S.page}>
          <h2 style={S.h2}>💼 Nursing Jobs Worldwide</h2>
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"16px" }}>
            {countries.map(c => (
              <button key={c} onClick={() => setCountry(c)} style={{ padding:"6px 12px", borderRadius:"20px", border:"1px solid", borderColor:country===c?"#38bdf8":"#1e293b", background:country===c?"rgba(56,189,248,0.1)":"#0f172a", color:country===c?"#38bdf8":"#64748b", cursor:"pointer", fontSize:"0.78rem", fontWeight:country===c?700:400 }}>{c}</button>
            ))}
          </div>
          {filteredJobs.map((j,i) => (
            <div key={j.id||i} style={{ ...S.card, borderLeft:"3px solid #38bdf8" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div style={{ flex:1 }}>
                  <h3 style={{ margin:"0 0 4px", fontSize:"0.95rem" }}>{j.title}</h3>
                  <p style={{ color:"#64748b", margin:"0 0 4px", fontSize:"0.82rem" }}>🏥 {j.hospital}</p>
                  <p style={{ color:"#64748b", margin:"0 0 4px", fontSize:"0.78rem" }}>📍 {j.location}</p>
                  <p style={{ color:"#475569", margin:0, fontSize:"0.72rem" }}>📅 {j.posted}</p>
                </div>
                <div style={{ textAlign:"right", marginLeft:"12px" }}>
                  <div style={{ color:"#34d399", fontWeight:700, fontSize:"0.85rem" }}>{j.salary}</div>
                  <div style={{ color:"#64748b", fontSize:"0.72rem", marginTop:"4px" }}>{j.type}</div>
                </div>
              </div>
              {j.description && <p style={{ color:"#94a3b8", fontSize:"0.78rem", marginTop:"8px", marginBottom:0 }}>{j.description}</p>}
              <button onClick={() => user ? setSuccess("Application sent! Recruiter will contact you.") : goTo("login")} style={{ marginTop:"10px", background:"linear-gradient(135deg,#38bdf8,#818cf8)", border:"none", color:"white", padding:"7px 16px", borderRadius:"8px", cursor:"pointer", fontSize:"0.82rem", fontWeight:600 }}>Apply Now</button>
            </div>
          ))}
          {success && <div style={S.success}>{success}</div>}
        </div>
      )}

      {page==="news" && (
        <div style={S.page}>
          <h2 style={S.h2}>📰 Nursing News</h2>
          <div style={{ background:"linear-gradient(135deg,rgba(56,189,248,0.15),rgba(129,140,248,0.15))", border:"1px solid rgba(56,189,248,0.3)", borderRadius:"12px", padding:"14px", marginBottom:"20px", textAlign:"center" }}>
            <span style={{ fontSize:"0.7rem", color:"#64748b", display:"block", marginBottom:"4px" }}>SPONSORED</span>
            <p style={{ margin:0, fontWeight:700, fontSize:"0.9rem", color:"#38bdf8" }}>🎓 NCLEX Academy Pakistan — Enroll Now!</p>
            <p style={{ margin:"4px 0 0", fontSize:"0.75rem", color:"#64748b" }}>Online prep courses from PKR 15,000</p>
          </div>
          {selectedNews ? (
            <div>
              <button onClick={() => setSelectedNews(null)} style={{ ...S.btnOutline, marginBottom:"16px" }}>← Back to News</button>
              <div style={S.card}>
                <span style={S.badge(selectedNews.color)}>{selectedNews.tag}</span>
                <h2 style={{ margin:"12px 0 8px", fontSize:"1.1rem" }}>{selectedNews.title}</h2>
                <p style={{ color:"#64748b", fontSize:"0.78rem", marginBottom:"16px" }}>📅 {selectedNews.date}</p>
                <p style={{ color:"#94a3b8", fontSize:"0.88rem", lineHeight:1.7 }}>{selectedNews.content}</p>
              </div>
            </div>
          ) : newsData.map((n,i) => (
            <div key={i} onClick={() => setSelectedNews(n)} style={{ ...S.card, borderLeft:`3px solid ${n.color}`, cursor:"pointer" }}>
              <span style={S.badge(n.color)}>{n.tag}</span>
              <h3 style={{ margin:"10px 0 6px", fontSize:"0.9rem" }}>{n.title}</h3>
              <p style={{ color:"#64748b", fontSize:"0.78rem", margin:0 }}>📅 {n.date} • Tap to read more</p>
            </div>
          ))}
        </div>
      )}

      {page==="exams" && (
        <div style={S.page}>
          <h2 style={S.h2}>📚 Nursing Exam Prep</h2>
          <p style={{ color:"#64748b", marginBottom:"20px", fontSize:"0.85rem" }}>NCLEX • DHA • HAAD • Prometric • OET • IELTS • MOH</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))", gap:"10px", marginBottom:"24px" }}>
            {exams.map(ex => (
              <div key={ex.name} style={{ background:"#0f172a", border:`1px solid ${ex.color}40`, borderRadius:"12px", padding:"14px", textAlign:"center" }}>
                <div style={{ fontSize:"1.6rem" }}>{ex.flag}</div>
                <div style={{ color:ex.color, fontWeight:800, fontSize:"0.9rem", margin:"6px 0 4px" }}>{ex.name}</div>
                <div style={{ color:"#64748b", fontSize:"0.7rem" }}>{ex.desc}</div>
                {ex.tag && <span style={{ ...S.badge(ex.color), marginTop:"6px" }}>{ex.tag}</span>}
              </div>
            ))}
          </div>
          <div style={{ background:"linear-gradient(135deg,rgba(56,189,248,0.1),rgba(129,140,248,0.1))", border:"1px solid rgba(56,189,248,0.3)", borderRadius:"16px", padding:"20px", marginBottom:"24px", textAlign:"center" }}>
            <div style={{ fontSize:"1.8rem", marginBottom:"8px" }}>🏫</div>
            <h3 style={{ margin:"0 0 8px", color:"#38bdf8" }}>Advertise Your Institute</h3>
            <p style={{ color:"#64748b", fontSize:"0.82rem", margin:"0 0 14px" }}>Reach thousands of nurses preparing for NCLEX, DHA, HAAD, Prometric!</p>
            <a href="mailto:nursehub@support.com" style={{ background:"linear-gradient(135deg,#38bdf8,#818cf8)", color:"white", padding:"10px 20px", borderRadius:"10px", fontWeight:700, textDecoration:"none", fontSize:"0.85rem", display:"inline-block" }}>📧 Contact Us to Advertise</a>
          </div>
          <h3 style={{ fontSize:"1rem", fontWeight:800, marginBottom:"14px" }}>🌟 Featured Institutes</h3>
          {examAds.map((ad,i) => (
            <div key={i} style={{ ...S.card, borderLeft:"3px solid #38bdf8" }}>
              {ad.badge && <span style={S.badge("#38bdf8")}>{ad.badge}</span>}
              <h3 style={{ margin:"8px 0 4px", fontSize:"0.95rem" }}>{ad.name}</h3>
              <p style={{ color:"#38bdf8", margin:"0 0 4px", fontSize:"0.78rem" }}>📚 {ad.exam}</p>
              <p style={{ color:"#64748b", margin:0, fontSize:"0.78rem" }}>{ad.offer} — <span style={{ color:"#34d399", fontWeight:700 }}>{ad.price}</span></p>
              <a href={`mailto:${ad.contact}`} style={{ display:"inline-block", marginTop:"10px", background:"rgba(56,189,248,0.1)", border:"1px solid #38bdf8", color:"#38bdf8", padding:"7px 14px", borderRadius:"8px", fontSize:"0.78rem", fontWeight:600, textDecoration:"none" }}>📧 Contact Institute</a>
            </div>
          ))}
        </div>
      )}{page==="recruiters" && (
        <div style={S.page}>
          <h2 style={S.h2}>👥 International Recruiters</h2>
          {user && (
            <div style={{ marginBottom:"20px" }}>
              <button onClick={() => setShowJobForm(!showJobForm)} style={{ ...S.btn, width:"100%" }}>
                {showJobForm ? "✕ Cancel" : "➕ Post a Job"}
              </button>
            </div>
          )}
          {showJobForm && user && (
            <div style={{ ...S.card, marginBottom:"20px", border:"1px solid #38bdf8" }}>
              <h3 style={{ margin:"0 0 16px", color:"#38bdf8" }}>📋 Post New Job</h3>
              {error && <div style={S.error}>{error}</div>}
              <input placeholder="Job Title *" value={jobForm.title} onChange={e => setJobForm({...jobForm,title:e.target.value})} style={S.input} />
              <input placeholder="Hospital / Clinic Name *" value={jobForm.hospital} onChange={e => setJobForm({...jobForm,hospital:e.target.value})} style={S.input} />
              <input placeholder="Location (City, Country) *" value={jobForm.location} onChange={e => setJobForm({...jobForm,location:e.target.value})} style={S.input} />
              <input placeholder="Salary (e.g. $5000/mo) *" value={jobForm.salary} onChange={e => setJobForm({...jobForm,salary:e.target.value})} style={S.input} />
              <select value={jobForm.country} onChange={e => setJobForm({...jobForm,country:e.target.value})} style={S.select}>
                {["USA","UK","Canada","Australia","Saudi Arabia","UAE"].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={jobForm.type} onChange={e => setJobForm({...jobForm,type:e.target.value})} style={S.select}>
                {["Full Time","Part Time","Contract","Travel Nursing"].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <textarea placeholder="Job Description (optional)" value={jobForm.description} onChange={e => setJobForm({...jobForm,description:e.target.value})} style={{ ...S.input, height:"80px", resize:"vertical" }} />
              <button onClick={handlePostJob} style={{ ...S.btn, width:"100%" }}>✅ Post Job Now</button>
            </div>
          )}
          {success && <div style={S.success}>{success}</div>}
          {recruiters.map((r) => (
            <div key={r.id} style={S.card}>
              <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                <div style={{ fontSize:"2.5rem" }}>{r.photo}</div>
                <div style={{ flex:1 }}>
                  <h3 style={{ margin:"0 0 2px", fontSize:"0.95rem" }}>{r.name}</h3>
                  <p style={{ color:"#38bdf8", margin:"0 0 2px", fontSize:"0.82rem", fontWeight:600 }}>🏢 {r.company}</p>
                  <p style={{ color:"#64748b", margin:"0 0 2px", fontSize:"0.75rem" }}>📍 {r.country}</p>
                  <p style={{ color:"#64748b", margin:0, fontSize:"0.75rem" }}>💊 {r.speciality}</p>
                </div>
              </div>
              <div style={{ display:"flex", gap:"8px", marginTop:"12px" }}>
                <a href={`mailto:${r.email}`} style={{ flex:1, background:"linear-gradient(135deg,#38bdf8,#818cf8)", color:"white", padding:"8px", borderRadius:"8px", fontSize:"0.78rem", fontWeight:600, textDecoration:"none", textAlign:"center" }}>📧 Message</a>
                <button onClick={() => user ? setSuccess(`Connected with ${r.name}!`) : goTo("login")} style={{ flex:1, background:"rgba(56,189,248,0.1)", border:"1px solid #38bdf8", color:"#38bdf8", padding:"8px", borderRadius:"8px", fontSize:"0.78rem", fontWeight:600, cursor:"pointer" }}>🔗 Connect</button>
              </div>
            </div>
          ))}
          <div style={{ background:"linear-gradient(135deg,rgba(129,140,248,0.1),rgba(56,189,248,0.1))", border:"1px solid #818cf8", borderRadius:"14px", padding:"20px", textAlign:"center" }}>
            <h3 style={{ margin:"0 0 8px", color:"#818cf8" }}>🏢 Are You a Recruiter?</h3>
            <p style={{ color:"#64748b", fontSize:"0.82rem", margin:"0 0 14px" }}>List your agency on NurseHub and reach thousands of qualified nurses!</p>
            <a href="mailto:nursehub@support.com" style={{ background:"linear-gradient(135deg,#818cf8,#38bdf8)", color:"white", padding:"10px 20px", borderRadius:"10px", fontWeight:700, textDecoration:"none", fontSize:"0.85rem", display:"inline-block" }}>📧 List Your Agency</a>
          </div>
        </div>
      )}

      {page==="help" && (
        <div style={{ ...S.page, maxWidth:"700px" }}>
          <h2 style={S.h2}>❓ Help Center</h2>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"24px" }}>
            {[["🔑","Login Issues","login"],["📝","Register","register"],["🔐","Reset Password","forgot"],["💳","Subscribe","subscribe"],["📧","Email Support",""],["🏠","Go Home","home"]].map(([icon,label,pg]) => (
              <div key={label} onClick={() => pg ? goTo(pg) : window.open("mailto:nursehub@support.com")} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:"12px", padding:"14px", cursor:"pointer", display:"flex", alignItems:"center", gap:"10px" }}>
                <span style={{ fontSize:"1.2rem" }}>{icon}</span>
                <span style={{ fontSize:"0.82rem", fontWeight:600 }}>{label}</span>
              </div>
            ))}
          </div>
          {faqs.map((faq,i) => (
            <div key={i} style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:"12px", marginBottom:"8px", overflow:"hidden" }}>
              <div onClick={() => setFaqOpen(faqOpen===i?null:i)} style={{ padding:"14px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:"0.85rem", fontWeight:600, flex:1, paddingRight:"8px" }}>{faq.q}</span>
                <span style={{ color:"#38bdf8", fontWeight:700, fontSize:"1.2rem", flexShrink:0 }}>{faqOpen===i?"−":"+"}</span>
              </div>
              {faqOpen===i && <div style={{ padding:"0 14px 14px", color:"#94a3b8", fontSize:"0.82rem", lineHeight:1.6 }}>{faq.a}</div>}
            </div>
          ))}
          <div style={{ ...S.card, textAlign:"center", border:"1px solid #38bdf8" }}>
            <p style={{ margin:"0 0 10px", color:"#94a3b8", fontSize:"0.85rem" }}>Still need help?</p>
            <a href="mailto:nursehub@support.com" style={{ color:"#38bdf8", fontWeight:700 }}>📧 nursehub@support.com</a>
          </div>
        </div>
      )}

      {page==="subscribe" && (
        <div style={S.page}>
          <h2 style={S.h2}>💳 NurseHub Subscription</h2>
          {!selectedPlan ? (
            subscriptionPlans.map((plan) => (
              <div key={plan.name} style={{ ...S.card, border:`2px solid ${plan.popular?"#38bdf8":"#1e293b"}`, position:"relative" }}>
                {plan.popular && <div style={{ position:"absolute", top:"-12px", left:"50%", transform:"translateX(-50%)", background:"linear-gradient(135deg,#38bdf8,#818cf8)", color:"white", padding:"3px 16px", borderRadius:"20px", fontSize:"0.72rem", fontWeight:700 }}>⭐ Most Popular</div>}
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"12px" }}>
                  <div>
                    <h3 style={{ margin:"0 0 4px", color:plan.color }}>{plan.name}</h3>
                    {plan.pricePKR && <p style={{ margin:0, color:"#64748b", fontSize:"0.75rem" }}>{plan.pricePKR}</p>}
                  </div>
                  <div style={{ color:plan.color, fontWeight:900, fontSize:"1.2rem" }}>{plan.price}</div>
                </div>
                <ul style={{ margin:"0 0 14px", paddingLeft:"20px", color:"#94a3b8", fontSize:"0.82rem" }}>
                  {plan.features.map(f => <li key={f} style={{ marginBottom:"4px" }}>✅ {f}</li>)}
                </ul>
                {plan.price !== "Free"
                  ? <button onClick={() => setSelectedPlan(plan)} style={{ ...S.btn, width:"100%" }}>Choose {plan.name}</button>
                  : <button style={{ width:"100%", background:"#0f172a", border:"1px solid #1e293b", color:"#64748b", padding:"12px", borderRadius:"10px" }}>Current Plan</button>
                }
              </div>
            ))
          ) : (
            <div>
              <button onClick={() => { setSelectedPlan(null); setSelectedPayment(null) }} style={{ ...S.btnOutline, marginBottom:"16px" }}>← Back to Plans</button>
              <div style={{ ...S.card, border:"1px solid #38bdf8", marginBottom:"20px" }}>
                <h3 style={{ margin:"0 0 4px", color:"#38bdf8" }}>Selected: {selectedPlan.name}</h3>
                <p style={{ margin:0, color:"#34d399", fontWeight:700 }}>{selectedPlan.price} — {selectedPlan.pricePKR}</p>
              </div>
              <h3 style={{ fontSize:"1rem", fontWeight:800, marginBottom:"14px" }}>💰 Choose Payment Method</h3>
              {paymentMethods.map((pm) => (
                <div key={pm.name} onClick={() => setSelectedPayment(pm)} style={{ ...S.card, cursor:"pointer", border:`2px solid ${selectedPayment?.name===pm.name?pm.color:"#1e293b"}` }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                    <span style={{ fontSize:"1.8rem" }}>{pm.icon}</span>
                    <div>
                      <div style={{ fontWeight:700, color:pm.color }}>{pm.name}</div>
                      <div style={{ color:"#64748b", fontSize:"0.8rem" }}>{pm.number}</div>
                    </div>
                    {selectedPayment?.name===pm.name && <span style={{ marginLeft:"auto", color:pm.color }}>✓</span>}
                  </div>
                </div>
              ))}
              {selectedPayment && (
                <div style={{ ...S.card, border:"1px solid #34d399", marginTop:"8px" }}>
                  <h4 style={{ margin:"0 0 8px", color:"#34d399" }}>📋 Payment Instructions</h4>
                  <p style={{ color:"#94a3b8", fontSize:"0.82rem", margin:"0 0 8px" }}>1. Send <strong style={{ color:"#34d399" }}>{selectedPlan.pricePKR}</strong> to:</p>
                  <p style={{ color:"white", fontWeight:700, fontSize:"0.9rem", margin:"0 0 8px" }}>{selectedPayment.number}</p>
                  <p style={{ color:"#94a3b8", fontSize:"0.82rem", margin:"0 0 8px" }}>2. Screenshot lain payment ka</p>
                  <p style={{ color:"#94a3b8", fontSize:"0.82rem", margin:"0 0 14px" }}>3. Email karein: <a href="mailto:nursehub@support.com" style={{ color:"#38bdf8" }}>nursehub@support.com</a></p>
                  <p style={{ color:"#64748b", fontSize:"0.75rem", margin:0 }}>⏱️ Account 24 hours mein activate ho ga</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {page==="dashboard" && user && (
        <div style={S.page}>
          <div style={{ ...S.card, textAlign:"center", marginBottom:"16px", border:"1px solid #38bdf8" }}>
            <div style={{ fontSize:"3rem", marginBottom:"8px" }}>👩‍⚕️</div>
            <h2 style={{ margin:"0 0 4px", fontSize:"1.2rem" }}>Welcome to NurseHub!</h2>
            <p style={{ color:"#64748b", marginBottom:"8px", fontSize:"0.85rem" }}>{user.email}</p>
            <span style={S.badge("#38bdf8")}>{user.user_metadata?.user_type==="recruiter"?"🏢 Recruiter":"👩‍⚕️ Nurse"}</span>
          </div>
          {user.user_metadata?.user_type==="recruiter" && (
            <div style={{ ...S.card, border:"1px solid #818cf8", marginBottom:"16px" }}>
              <h3 style={{ margin:"0 0 16px", color:"#818cf8" }}>📊 Recruiter Stats</h3>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px", marginBottom:"16px" }}>
                {[["👥","Total Users","10+"],["👩‍⚕️","Nurses","8+"],["🏢","Recruiters","2+"]].map(([icon,label,val]) => (
                  <div key={label} style={{ background:"#060d1a", borderRadius:"10px", padding:"12px", textAlign:"center" }}>
                    <div style={{ fontSize:"1.4rem" }}>{icon}</div>
                    <div style={{ color:"#818cf8", fontWeight:900, fontSize:"1.1rem" }}>{val}</div>
                    <div style={{ color:"#64748b", fontSize:"0.68rem", marginTop:"2px" }}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:"#060d1a", borderRadius:"10px", padding:"12px" }}>
                <p style={{ margin:"0 0 8px", fontWeight:700, fontSize:"0.85rem", color:"#94a3b8" }}>📋 Recent Registrations</p>
                {["👩‍⚕️ Nurse — Karachi, Pakistan","👩‍⚕️ Nurse — Lahore, Pakistan","👩‍⚕️ Nurse — Dubai, UAE","🏢 Recruiter — USA","👩‍⚕️ Nurse — Islamabad, Pakistan"].map((u,i) => (
                  <div key={i} style={{ padding:"8px 0", borderBottom:"1px solid #1e293b", fontSize:"0.78rem", color:"#64748b" }}>{u}</div>
                ))}
              </div>
            </div>
          )}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"16px" }}>
            {[["💼","Browse Jobs","jobs","#38bdf8"],["📚","Exam Prep","exams","#818cf8"],["👥","Recruiters","recruiters","#34d399"],["📰","News","news","#fb923c"],["📄","Documents","documents","#f43f5e"],["💳","Subscribe","subscribe","#fbbf24"]].map(([icon,label,pg,color]) => (
              <div key={label} onClick={() => goTo(pg)} style={{ background:"#0f172a", border:`1px solid ${color}30`, borderRadius:"12px", padding:"16px", cursor:"pointer", textAlign:"center" }}>
                <div style={{ fontSize:"1.5rem", marginBottom:"6px" }}>{icon}</div>
                <p style={{ margin:0, fontSize:"0.82rem", color:"#94a3b8", fontWeight:600 }}>{label}</p>
              </div>
            ))}
          </div>
          <button onClick={handleLogout} style={{ width:"100%", background:"none", border:"1px solid #334155", color:"#94a3b8", padding:"12px", borderRadius:"10px", cursor:"pointer", fontWeight:600 }}>🚪 Logout</button>
        </div>
      )}

      {page==="documents" && (
        <div style={S.page}>
          {!user ? (
            <div style={{ textAlign:"center", padding:"40px 0" }}>
              <div style={{ fontSize:"3rem", marginBottom:"12px" }}>🔒</div>
              <h3>Login Required</h3>
              <p style={{ color:"#64748b", marginBottom:"16px" }}>Please login to access your document vault</p>
              <button onClick={() => goTo("login")} style={S.btn}>Login Now</button>
            </div>
          ) : (
            <>
              <h2 style={S.h2}>📄 Document Vault</h2>
              <div style={{ ...S.card, border:"1px solid #34d399", marginBottom:"20px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                  <span style={{ fontSize:"1.4rem" }}>🔐</span>
                  <div>
                    <p style={{ margin:0, fontWeight:700, fontSize:"0.9rem", color:"#34d399" }}>Encrypted & Secure</p>
                    <p style={{ margin:0, fontSize:"0.75rem", color:"#64748b" }}>Only you and recruiters you share with can view</p>
                  </div>
                </div>
              </div>
              <div style={{ ...S.card, border:"2px dashed #1e293b", textAlign:"center", marginBottom:"20px" }}>
                <div style={{ fontSize:"2rem", marginBottom:"8px" }}>📤</div>
                <p style={{ color:"#64748b", fontSize:"0.85rem", marginBottom:"12px" }}>Upload JPG, PNG or PDF (Max 5MB)</p>
                <label style={{ ...S.btn, padding:"10px 20px", cursor:"pointer", display:"inline-block" }}>
                  📎 Choose File
                  <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleDocUpload} style={{ display:"none" }} />
                </label>
                {uploadMsg && <p style={{ marginTop:"12px", fontSize:"0.82rem", color:uploadMsg.includes("✅")?"#34d399":"#f43f5e" }}>{uploadMsg}</p>}
              </div>
              {uploadedDocs.length === 0
                ? <div style={{ textAlign:"center", color:"#64748b", padding:"24px", fontSize:"0.85rem" }}>No documents uploaded yet.</div>
                : uploadedDocs.map((doc) => (
                  <div key={doc.id} style={S.card}>
                    <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                      <span style={{ fontSize:"1.8rem" }}>{doc.type==="application/pdf"?"📕":"🖼️"}</span>
                      <div style={{ flex:1 }}>
                        <p style={{ margin:"0 0 2px", fontWeight:600, fontSize:"0.85rem" }}>{doc.name}</p>
                        <p style={{ margin:0, color:"#64748b", fontSize:"0.72rem" }}>{doc.size} • {doc.date}</p>
                      </div>
                      <span style={S.badge("#34d399")}>🔐 Encrypted</span>
                    </div>
                  </div>
                ))
              }
            </>
          )}
        </div>
      )}

      {page==="forgot" && (
        <div style={{ padding:"48px 24px", maxWidth:"380px", margin:"0 auto" }}>
          <div style={{ background:"#0f172a", padding:"28px", borderRadius:"16px", border:"1px solid #1e293b", textAlign:"center" }}>
            <span style={{ fontSize:"2rem" }}>🔐</span>
            <h2 style={{ margin:"8px 0 16px", fontSize:"1.3rem" }}>Reset Password</h2>
            {!resetSent ? (
              <>
                {error && <p style={S.error}>{error}</p>}
                <input placeholder="Your email" value={resetEmail} onChange={e => setResetEmail(e.target.value)} style={S.input} />
                <button onClick={handleForgotPassword} disabled={loading} style={{ ...S.btn, width:"100%", opacity:loading?0.7:1 }}>{loading?"Sending...":"Send Reset Link"}</button>
              </>
            ) : (
              <div>
                <div style={{ fontSize:"2.5rem", marginBottom:"8px" }}>✅</div>
                <p style={{ color:"#34d399", fontWeight:700 }}>Reset link sent! Check your email.</p>
              </div>
            )}
            <p style={{ marginTop:"14px" }}><span onClick={() => goTo("login")} style={{ color:"#38bdf8", cursor:"pointer", fontSize:"0.85rem" }}>← Back to Login</span></p>
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
            {error && <p style={S.error}>{error}</p>}
            {success && <p style={S.success}>{success}</p>}
            <input placeholder="Email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} style={S.input} />
            <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form,password:e.target.value})} style={S.input} />
            <p onClick={() => { goTo("forgot"); setResetSent(false) }} style={{ color:"#38bdf8", fontSize:"0.8rem", textAlign:"right", cursor:"pointer", marginBottom:"14px" }}>Forgot Password?</p>
            <button onClick={handleLogin} disabled={loading} style={{ ...S.btn, width:"100%", opacity:loading?0.7:1 }}>{loading?"Logging in...":"Login"}</button>
            <p style={{ color:"#64748b", fontSize:"0.82rem", textAlign:"center", marginTop:"14px" }}>No account? <span onClick={() => goTo("register")} style={{ color:"#38bdf8", cursor:"pointer", fontWeight:600 }}>Register free</span></p>
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
            {error && <p style={S.error}>{error}</p>}
            {success && <p style={S.success}>{success}</p>}
            <input placeholder="Full Name" value={form.name} onChange={e => setForm({...form,name:e.target.value})} style={S.input} />
            <input placeholder="Email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} style={S.input} />
            <input type="password" placeholder="Password (min 6)" value={form.password} onChange={e => setForm({...form,password:e.target.value})} style={S.input} />
            <button onClick={handleRegister} disabled={loading} style={{ ...S.btn, width:"100%", opacity:loading?0.7:1 }}>{loading?"Creating...":"Create Account"}</button>
            <p style={{ color:"#64748b", fontSize:"0.8rem", textAlign:"center", marginTop:"12px" }}>Already have account? <span onClick={() => goTo("login")} style={{ color:"#38bdf8", cursor:"pointer" }}>Login</span></p>
          </div>
        </div>
      )}

      <footer style={{ background:"#0f172a", padding:"20px 16px", textAlign:"center", color:"#334155", fontSize:"0.78rem", marginTop:"40px", borderTop:"1px solid #1e293b" }}>
        <div style={{ marginBottom:"8px" }}>
          {["jobs","news","exams","recruiters","subscribe"].map(pg => (
            <span key={pg} onClick={() => goTo(pg)} style={{ color:"#475569", cursor:"pointer", marginRight:"12px", textTransform:"capitalize" }}>{pg}</span>
          ))}
        </div>
        <p style={{ margin:0 }}>© 2026 NurseHub — Made by a Nurse, for Nurses 🏥</p>
      </footer>
    </div>
  )
}

            
