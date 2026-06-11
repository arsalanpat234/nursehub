import { useState, useEffect } from "react"
import { supabase } from "./supabase"

const jobs = [
  { title: "ICU Nurse", hospital: "Johns Hopkins Hospital", location: "USA, Baltimore", salary: "$85,000/yr", type: "Full Time", flag: "🇺🇸" },
  { title: "Cardiac Nurse", hospital: "NHS Trust London", location: "UK, London", salary: "£42,000/yr", type: "Full Time", flag: "🇬🇧" },
  { title: "ER Nurse", hospital: "Toronto General", location: "Canada, Toronto", salary: "CA$75,000/yr", type: "Full Time", flag: "🇨🇦" },
  { title: "Staff Nurse", hospital: "King Faisal Specialist", location: "Saudi Arabia, Riyadh", salary: "SAR 8,000/mo", type: "Contract", flag: "🇸🇦" },
  { title: "Pediatric Nurse", hospital: "Royal Children's Hospital", location: "Australia, Melbourne", salary: "AU$72,000/yr", type: "Full Time", flag: "🇦🇺" },
  { title: "ICU Nurse", hospital: "Cleveland Clinic Abu Dhabi", location: "UAE, Abu Dhabi", salary: "AED 12,000/mo", type: "Full Time", flag: "🇦🇪" },
]

const news = [
  { title: "Global Nursing Shortage Reaches Critical Levels in 2026", date: "June 10, 2026", tag: "Global", color: "#f43f5e" },
  { title: "UAE Announces 5,000 New Nursing Positions", date: "June 8, 2026", tag: "UAE", color: "#38bdf8" },
  { title: "UK NHS Increases Nurse Salaries by 8%", date: "June 5, 2026", tag: "UK", color: "#818cf8" },
  { title: "Saudi Arabia Fast-Tracks Nursing License", date: "June 3, 2026", tag: "Saudi Arabia", color: "#34d399" },
  { title: "Canada Launches New Immigration Pathway for Nurses", date: "May 30, 2026", tag: "Canada", color: "#fb923c" },
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
    setLoading(true)
    setError("")
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { name: form.name, user_type: userType } }
    })
    if (error) setError(error.message)
    else setSuccess("✅ Account created! Please check your email to verify.")
    setLoading(false)
  }

  const handleLogin = async () => {
    setLoading(true)
    setError("")
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })
    if (error) setError(error.message)
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setPage("home")
  }

  const filteredJobs = country === "All" ? jobs : jobs.filter(j => j.location.includes(country))

  return (
    <div style={{minHeight:"100vh",background:"#060d1a",color:"white",fontFamily:"'Inter',system-ui,sans-serif"}}>

      {/* NAVBAR */}
      <nav style={{background:"rgba(15,23,42,0.95)",backdropFilter:"blur(12px)",padding:"0 24px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(56,189,248,0.15)",position:"sticky",top:0,zIndex:100,height:"60px"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"}} onClick={()=>setPage("home")}>
          <span style={{fontSize:"1.5rem"}}>🏥</span>
          <span style={{color:"#38bdf8",fontSize:"1.2rem",fontWeight:800}}>NurseHub</span>
        </div>
        <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
          <button onClick={()=>setPage("jobs")} style={{background:"none",border:"none",color:page==="jobs"?"#38bdf8":"#94a3b8",cursor:"pointer",fontSize:"0.9rem",fontWeight:500,padding:"8px 12px"}}>Jobs</button>
          <button onClick={()=>setPage("news")} style={{background:"none",border:"none",color:page==="news"?"#38bdf8":"#94a3b8",cursor:"pointer",fontSize:"0.9rem",fontWeight:500,padding:"8px 12px"}}>News</button>
          {user ? (
            <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
              <button onClick={()=>setPage("dashboard")} style={{background:"rgba(56,189,248,0.1)",border:"1px solid rgba(56,189,248,0.3)",color:"#38bdf8",cursor:"pointer",fontSize:"0.85rem",padding:"8px 16px",borderRadius:"8px"}}>Dashboard</button>
              <button onClick={handleLogout} style={{background:"none",border:"1px solid #334155",color:"#94a3b8",cursor:"pointer",fontSize:"0.85rem",padding:"8px 16px",borderRadius:"8px"}}>Logout</button>
            </div>
          ) : (
            <button onClick={()=>setPage("login")} style={{background:"linear-gradient(135deg,#38bdf8,#818cf8)",border:"none",color:"white",cursor:"pointer",fontSize:"0.85rem",padding:"8px 18px",borderRadius:"8px",fontWeight:700}}>Login</button>
          )}
        </div>
      </nav>

      {/* HOME */}
      {page==="home" && (
        <div>
          <div style={{textAlign:"center",padding:"64px 24px 48px",background:"radial-gradient(ellipse at 50% 0%,rgba(56,189,248,0.12) 0%,transparent 70%)"}}>
            <h1 style={{fontSize:"2.4rem",fontWeight:900,lineHeight:1.15,marginBottom:"16px",letterSpacing:"-1px"}}>
              Find Nursing Jobs<br/><span style={{background:"linear-gradient(135deg,#38bdf8,#818cf8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Worldwide</span>
            </h1>
            <p style={{color:"#94a3b8",fontSize:"1rem",marginBottom:"32px"}}>USA • UK • Canada • Australia • Saudi Arabia • UAE • Qatar • Kuwait</p>
            <div style={{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"}}>
              <button onClick={()=>setPage("jobs")} style={{background:"linear-gradient(135deg,#38bdf8,#818cf8)",border:"none",color:"white",padding:"14px 32px",borderRadius:"10px",fontSize:"1rem",fontWeight:700,cursor:"pointer"}}>🔍 Browse Jobs</button>
              <button onClick={()=>{setPage("register");setUserType("recruiter")}} style={{background:"rgba(56,189,248,0.1)",border:"1px solid rgba(56,189,248,0.3)",color:"#38bdf8",padding:"14px 32px",borderRadius:"10px",fontSize:"1rem",cursor:"pointer",fontWeight:600}}>Post a Job</button>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"16px",maxWidth:"900px",margin:"0 auto",padding:"0 24px 64px"}}>
            {[["🌍","Worldwide Jobs","USA, UK, Canada, Gulf & more","#38bdf8"],["🔒","Secure Documents","Encrypted & watermarked","#818cf8"],["📱","Mobile Scanner","Scan & send docs instantly","#34d399"],["✅","Verified Recruiters","Every recruiter ID-verified","#fb923c"]].map(([icon,title,desc,color])=>(
              <div key={title} style={{background:"#0f172a",padding:"24px",borderRadius:"14px",border:"1px solid #1e293b"}}>
                <div style={{fontSize:"2rem",marginBottom:"12px"}}>{icon}</div>
                <h3 style={{margin:"0 0 8px",fontSize:"1rem",color}}>{title}</h3>
                <p style={{color:"#64748b",fontSize:"0.85rem",margin:0,lineHeight:1.5}}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* JOBS */}
      {page==="jobs" && (
        <div style={{padding:"32px 24px",maxWidth:"900px",margin:"0 auto"}}>
          <h2 style={{marginBottom:"20px",fontSize:"1.5rem",fontWeight:800}}>🔍 Nursing Jobs Worldwide</h2>
          <div style={{display:"flex",gap:"8px",marginBottom:"24px",overflowX:"auto",paddingBottom:"8px"}}>
            {countries.map(c=>(
              <button key={c} onClick={()=>setCountry(c)} style={{background:country===c?"linear-gradient(135deg,#38bdf8,#818cf8)":"#0f172a",border:"1px solid",borderColor:country===c?"transparent":"#1e293b",color:country===c?"white":"#94a3b8",padding:"8px 16px",borderRadius:"20px",cursor:"pointer",fontSize:"0.8rem",whiteSpace:"nowrap",fontWeight:country===c?700:400}}>{c}</button>
            ))}
          </div>
          {filteredJobs.map((job,i)=>(
            <div key={i} style={{background:"#0f172a",border:"1px solid #1e293b",borderRadius:"14px",padding:"20px",marginBottom:"14px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"12px"}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"}}>
                    <span style={{fontSize:"1.2rem"}}>{job.flag}</span>
                    <h3 style={{margin:0,color:"#38bdf8",fontSize:"1rem",fontWeight:700}}>{job.title}</h3>
                  </div>
                  <p style={{margin:"0 0 4px",color:"#e2e8f0",fontSize:"0.9rem"}}>{job.hospital}</p>
                  <p style={{margin:0,color:"#64748b",fontSize:"0.8rem"}}>📍 {job.location}</p>
                </div>
                <div style={{textAlign:"right"}}>
                  <p style={{margin:"0 0 6px",color:"#4ade80",fontWeight:700,fontSize:"0.95rem"}}>{job.salary}</p>
                  <span style={{background:"#1e293b",padding:"4px 10px",borderRadius:"20px",fontSize:"0.72rem",color:"#94a3b8"}}>{job.type}</span>
                </div>
              </div>
              <button onClick={()=>user?alert("Application submitted!"):setPage("login")} style={{marginTop:"14px",background:"linear-gradient(135deg,#38bdf8,#818cf8)",border:"none",color:"white",padding:"8px 20px",borderRadius:"8px",cursor:"pointer",fontWeight:700,fontSize:"0.85rem"}}>Apply Now →</button>
            </div>
          ))}
        </div>
      )}

      {/* NEWS */}
      {page==="news" && (
        <div style={{padding:"32px 24px",maxWidth:"900px",margin:"0 auto"}}>
          <h2 style={{marginBottom:"24px",fontSize:"1.5rem",fontWeight:800}}>📰 Nursing News</h2>
          {news.map((n,i)=>(
            <div key={i} style={{background:"#0f172a",border:"1px solid #1e293b",borderRadius:"14px",padding:"20px",marginBottom:"14px",borderLeft:`3px solid ${n.color}`}}>
              <span style={{background:`${n.color}20`,color:n.color,padding:"4px 12px",borderRadius:"20px",fontSize:"0.72rem",fontWeight:700}}>{n.tag}</span>
              <h3 style={{margin:"12px 0 8px",fontSize:"0.95rem",lineHeight:1.4}}>{n.title}</h3>
              <p style={{color:"#64748b",fontSize:"0.8rem",margin:0}}>📅 {n.date}</p>
            </div>
          ))}
        </div>
      )}

      {/* DASHBOARD */}
      {page==="dashboard" && user && (
        <div style={{padding:"32px 24px",maxWidth:"600px",margin:"0 auto"}}>
          <div style={{background:"#0f172a",border:"1px solid #1e293b",borderRadius:"16px",padding:"32px",textAlign:"center"}}>
            <div style={{fontSize:"3rem",marginBottom:"16px"}}>👩‍⚕️</div>
            <h2 style={{margin:"0 0 8px",fontSize:"1.5rem"}}>Welcome to NurseHub!</h2>
            <p style={{color:"#64748b",marginBottom:"24px"}}>{user.email}</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"24px"}}>
              {[["🔍","Browse Jobs"],["📄","My Applications"],["📁","Document Vault"],["⚙️","Profile Settings"]].map(([icon,label])=>(
                <div key={label} style={{background:"#060d1a",border:"1px solid #1e293b",borderRadius:"10px",padding:"16px",cursor:"pointer"}}>
                  <div style={{fontSize:"1.5rem",marginBottom:"8px"}}>{icon}</div>
                  <p style={{margin:0,fontSize:"0.85rem",color:"#94a3b8"}}>{label}</p>
                </div>
              ))}
            </div>
            <button onClick={handleLogout} style={{background:"none",border:"1px solid #334155",color:"#94a3b8",padding:"10px 24px",borderRadius:"8px",cursor:"pointer"}}>Logout</button>
          </div>
        </div>
      )}

      {/* LOGIN */}
      {page==="login" && (
        <div style={{padding:"48px 24px",maxWidth:"380px",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"32px"}}>
            <span style={{fontSize:"2.5rem"}}>🏥</span>
            <h2 style={{margin:"8px 0 4px",fontSize:"1.5rem",fontWeight:800}}>Welcome Back</h2>
            <p style={{color:"#64748b",fontSize:"0.9rem"}}>Login to your NurseHub account</p>
          </div>
          <div style={{background:"#0f172a",padding:"28px",borderRadius:"16px",border:"1px solid #1e293b"}}>
            {error && <p style={{color:"#f43f5e",fontSize:"0.85rem",marginBottom:"12px",background:"rgba(244,63,94,0.1)",padding:"10px",borderRadius:"8px"}}>{error}</p>}
            <input placeholder="Email address" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={{width:"100%",background:"#060d1a",border:"1px solid #1e293b",color:"white",padding:"12px 14px",borderRadius:"8px",marginBottom:"12px",fontSize:"0.9rem",boxSizing:"border-box"}} />
            <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} style={{width:"100%",background:"#060d1a",border:"1px solid #1e293b",color:"white",padding:"12px 14px",borderRadius:"8px",marginBottom:"20px",fontSize:"0.9rem",boxSizing:"border-box"}} />
            <button onClick={handleLogin} disabled={loading} style={{width:"100%",background:"linear-gradient(135deg,#38bdf8,#818cf8)",border:"none",color:"white",padding:"13px",borderRadius:"10px",fontSize:"1rem",fontWeight:700,cursor:"pointer",marginBottom:"16px",opacity:loading?0.7:1}}>
              {loading?"Logging in...":"Login"}
            </button>
            <p style={{color:"#64748b",fontSize:"0.85rem",margin:0,textAlign:"center"}}>No account? <span onClick={()=>setPage("register")} style={{color:"#38bdf8",cursor:"pointer",fontWeight:600}}>Register free</span></p>
          </div>
        </div>
      )}

      {/* REGISTER */}
      {page==="register" && (
        <div style={{padding:"48px 24px",maxWidth:"380px",margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:"24px"}}>
            <span style={{fontSize:"2.5rem"}}>🏥</span>
            <h2 style={{margin:"8px 0 4px",fontSize:"1.5rem",fontWeight:800}}>Create Account</h2>
            <p style={{color:"#64748b",fontSize:"0.9rem"}}>Join NurseHub today — it's free!</p>
          </div>
          <div style={{display:"flex",gap:"10px",marginBottom:"20px"}}>
            <button onClick={()=>setUserType("nurse")} style={{flex:1,padding:"12px",borderRadius:"10px",border:"2px solid",borderColor:userType==="nurse"?"#38bdf8":"#1e293b",background:userType==="nurse"?"rgba(56,189,248,0.1)":"#0f172a",color:userType==="nurse"?"#38bdf8":"#94a3b8",cursor:"pointer",fontWeight:700}}>👩‍⚕️ Nurse</button>
            <button onClick={()=>setUserType("recruiter")} style={{flex:1,padding:"12px",borderRadius:"10px",border:"2px solid",borderColor:userType==="recruiter"?"#38bdf8":"#1e293b",background:userType==="recruiter"?"rgba(56,189,248,0.1)":"#0f172a",color:userType==="recruiter"?"#38bdf8":"#94a3b8",cursor:"pointer",fontWeight:700}}>🏢 Recruiter</button>
          </div>
          <div style={{background:"#0f172a",padding:"28px",borderRadius:"16px",border:"1px solid #1e293b"}}>
            {error && <p style={{color:"#f43f5e",fontSize:"0.85rem",marginBottom:"12px",background:"rgba(244,63,94,0.1)",padding:"10px",borderRadius:"8px"}}>{error}</p>}
            {success && <p style={{color:"#34d399",fontSize:"0.85rem",marginBottom:"12px",background:"rgba(52,211,153,0.1)",padding:"10px",borderRadius:"8px"}}>{success}</p>}
            <input placeholder="Full Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={{width:"100%",background:"#060d1a",border:"1px solid #1e293b",color:"white",padding:"12px 14px",borderRadius:"8px",marginBottom:"12px",fontSize:"0.9rem",boxSizing:"border-box"}} />
            <input placeholder="Email address" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={{width:"100%",background:"#060d1a",border:"1px solid #1e293b",color:"white",padding:"12px 14px",borderRadius:"8px",marginBottom:"12px",fontSize:"0.9rem",boxSizing:"border-box"}} />
            <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} style={{width:"100%",background:"#060d1a",border:"1px solid #1e293b",color:"white",padding:"12px 14px",borderRadius:"8px",marginBottom:"20px",fontSize:"0.9rem",boxSizing:"border-box"}} />
            <button onClick={handleRegister} disabled={loading} style={{width:"100%",background:"linear-gradient(135deg,#38bdf8,#818cf8)",border:"none",color:"white",padding:"13px",borderRadius:"10px",fontSize:"1rem",fontWeight:700,cursor:"pointer",opacity:loading?0.7:1}}>
              {loading?"Creating...":"Create Account"}
            </button>
            {userType==="nurse" && <p style={{color:"#34d399",fontSize:"0.78rem",textAlign:"center",marginTop:"12px"}}>✅ Free to join! Premium $10/month</p>}
            {userType==="recruiter" && <p style={{color:"#94a3b8",fontSize:"0.78rem",textAlign:"center",marginTop:"12px"}}>Plans from $29/month</p>}
          </div>
        </div>
      )}

      <footer style={{background:"#0f172a",padding:"24px",textAlign:"center",color:"#334155",fontSize:"0.8rem",marginTop:"32px",borderTop:"1px solid #1e293b"}}>
        © 2026 NurseHub — Made by a Nurse, for Nurses 🏥
      </footer>
    </div>
  )
}
