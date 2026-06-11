import { useState } from "react"

export default function App() {
  const [page, setPage] = useState("home")
  const [userType, setUserType] = useState("")

  return (
    <div style={{minHeight:"100vh",background:"#0f172a",color:"white",fontFamily:"sans-serif"}}>
      {/* NAVBAR */}
      <nav style={{background:"#1e293b",padding:"16px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #334155"}}>
        <h1 style={{color:"#38bdf8",fontSize:"1.5rem",fontWeight:"bold",margin:0}}>🏥 NurseHub</h1>
        <div style={{display:"flex",gap:"12px"}}>
          <button onClick={()=>setPage("jobs")} style={{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:"0.9rem"}}>Jobs</button>
          <button onClick={()=>setPage("news")} style={{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:"0.9rem"}}>News</button>
          <button onClick={()=>setPage("login")} style={{background:"#38bdf8",border:"none",color:"#0f172a",cursor:"pointer",fontSize:"0.9rem",padding:"8px 16px",borderRadius:"8px",fontWeight:"bold"}}>Login</button>
        </div>
      </nav>

      {/* HOME */}
      {page === "home" && (
        <div style={{textAlign:"center",padding:"60px 24px"}}>
          <h2 style={{fontSize:"2.5rem",fontWeight:"bold",marginBottom:"16px"}}>Find Nursing Jobs <span style={{color:"#38bdf8"}}>Worldwide</span></h2>
          <p style={{color:"#94a3b8",fontSize:"1.1rem",marginBottom:"40px"}}>USA • UK • Canada • Australia • Saudi Arabia • UAE • Qatar • Kuwait</p>
          <div style={{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap",marginBottom:"48px"}}>
            <button onClick={()=>setPage("jobs")} style={{background:"#38bdf8",border:"none",color:"#0f172a",padding:"14px 32px",borderRadius:"10px",fontSize:"1rem",fontWeight:"bold",cursor:"pointer"}}>🔍 Browse Jobs</button>
            <button onClick={()=>{setPage("register");setUserType("recruiter")}} style={{background:"none",border:"2px solid #38bdf8",color:"#38bdf8",padding:"14px 32px",borderRadius:"10px",fontSize:"1rem",cursor:"pointer"}}>Post a Job</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"16px",maxWidth:"800px",margin:"0 auto"}}>
            {[["🌍","Worldwide Jobs","USA, UK, Canada, Gulf & more"],["🔒","Secure Documents","Encrypted & watermarked"],["📱","Mobile Scanner","Scan & send docs instantly"],["💼","Top Recruiters","Verified healthcare recruiters"]].map(([icon,title,desc])=>(
              <div key={title} style={{background:"#1e293b",padding:"24px",borderRadius:"12px",border:"1px solid #334155"}}>
                <div style={{fontSize:"2rem",marginBottom:"8px"}}>{icon}</div>
                <h3 style={{margin:"0 0 8px",fontSize:"1rem"}}>{title}</h3>
                <p style={{color:"#94a3b8",fontSize:"0.85rem",margin:0}}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* JOBS */}
      {page === "jobs" && (
        <div style={{padding:"32px 24px",maxWidth:"900px",margin:"0 auto"}}>
          <h2 style={{marginBottom:"24px"}}>🔍 Browse Nursing Jobs</h2>
          <div style={{display:"flex",gap:"12px",marginBottom:"24px",flexWrap:"wrap"}}>
            {["All","USA","UK","Canada","Australia","Saudi Arabia","UAE"].map(c=>(
              <button key={c} style={{background:"#1e293b",border:"1px solid #334155",color:"white",padding:"8px 16px",borderRadius:"8px",cursor:"pointer",fontSize:"0.85rem"}}>{c}</button>
            ))}
          </div>
          {[{title:"ICU Nurse",hospital:"Johns Hopkins Hospital",location:"USA, Baltimore",salary:"$85,000/yr",type:"Full Time"},{title:"Cardiac Nurse",hospital:"NHS Trust London",location:"UK, London",salary:"£42,000/yr",type:"Full Time"},{title:"ER Nurse",hospital:"Toronto General",location:"Canada, Toronto",salary:"CA$75,000/yr",type:"Full Time"},{title:"Staff Nurse",hospital:"King Faisal Specialist",location:"Saudi Arabia, Riyadh",salary:"SAR 8,000/mo",type:"Contract"},{title:"Pediatric Nurse",hospital:"Royal Children's Hospital",location:"Australia, Melbourne",salary:"AU$72,000/yr",type:"Full Time"}].map((job,i)=>(
            <div key={i} style={{background:"#1e293b",border:"1px solid #334155",borderRadius:"12px",padding:"20px",marginBottom:"16px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"8px"}}>
                <div>
                  <h3 style={{margin:"0 0 4px",color:"#38bdf8"}}>{job.title}</h3>
                  <p style={{margin:"0 0 4px",color:"#e2e8f0"}}>{job.hospital}</p>
                  <p style={{margin:0,color:"#94a3b8",fontSize:"0.85rem"}}>📍 {job.location}</p>
                </div>
                <div style={{textAlign:"right"}}>
                  <p style={{margin:"0 0 4px",color:"#4ade80",fontWeight:"bold"}}>{job.salary}</p>
                  <span style={{background:"#0f172a",padding:"4px 10px",borderRadius:"20px",fontSize:"0.75rem",color:"#94a3b8"}}>{job.type}</span>
                </div>
              </div>
              <button onClick={()=>setPage("login")} style={{marginTop:"12px",background:"#38bdf8",border:"none",color:"#0f172a",padding:"8px 20px",borderRadius:"8px",cursor:"pointer",fontWeight:"bold",fontSize:"0.85rem"}}>Apply Now</button>
            </div>
          ))}
        </div>
      )}

      {/* NEWS */}
      {page === "news" && (
        <div style={{padding:"32px 24px",maxWidth:"900px",margin:"0 auto"}}>
          <h2 style={{marginBottom:"24px"}}>📰 Nursing News</h2>
          {[{title:"Global Nursing Shortage Reaches Critical Levels in 2026",date:"June 10, 2026",tag:"Global"},{title:"UAE Announces 5,000 New Nursing Positions for International Nurses",date:"June 8, 2026",tag:"UAE"},{title:"UK NHS Increases Nurse Salaries by 8% Amid Recruitment Drive",date:"June 5, 2026",tag:"UK"},{title:"Saudi Arabia Fast-Tracks Nursing License for Pakistani & Indian Nurses",date:"June 3, 2026",tag:"Saudi Arabia"},{title:"Canada Launches New Immigration Pathway for Nurses in 2026",date:"May 30, 2026",tag:"Canada"}].map((news,i)=>(
            <div key={i} style={{background:"#1e293b",border:"1px solid #334155",borderRadius:"12px",padding:"20px",marginBottom:"16px"}}>
              <span style={{background:"#0f172a",color:"#38bdf8",padding:"4px 10px",borderRadius:"20px",fontSize:"0.75rem"}}>{news.tag}</span>
              <h3 style={{margin:"12px 0 8px",fontSize:"1rem"}}>{news.title}</h3>
              <p style={{color:"#94a3b8",fontSize:"0.8rem",margin:0}}>📅 {news.date}</p>
            </div>
          ))}
        </div>
      )}

      {/* LOGIN */}
      {page === "login" && (
        <div style={{padding:"48px 24px",maxWidth:"400px",margin:"0 auto",textAlign:"center"}}>
          <h2 style={{marginBottom:"8px"}}>Welcome Back</h2>
          <p style={{color:"#94a3b8",marginBottom:"32px"}}>Login to your NurseHub account</p>
          <div style={{background:"#1e293b",padding:"32px",borderRadius:"16px",border:"1px solid #334155"}}>
            <input placeholder="Email" style={{width:"100%",background:"#0f172a",border:"1px solid #334155",color:"white",padding:"12px",borderRadius:"8px",marginBottom:"12px",fontSize:"1rem",boxSizing:"border-box"}} />
            <input type="password" placeholder="Password" style={{width:"100%",background:"#0f172a",border:"1px solid #334155",color:"white",padding:"12px",borderRadius:"8px",marginBottom:"20px",fontSize:"1rem",boxSizing:"border-box"}} />
            <button style={{width:"100%",background:"#38bdf8",border:"none",color:"#0f172a",padding:"14px",borderRadius:"10px",fontSize:"1rem",fontWeight:"bold",cursor:"pointer",marginBottom:"16px"}}>Login</button>
            <p style={{color:"#94a3b8",fontSize:"0.9rem",margin:0}}>No account? <span onClick={()=>setPage("register")} style={{color:"#38bdf8",cursor:"pointer"}}>Register free</span></p>
          </div>
        </div>
      )}

      {/* REGISTER */}
      {page === "register" && (
        <div style={{padding:"48px 24px",maxWidth:"400px",margin:"0 auto",textAlign:"center"}}>
          <h2 style={{marginBottom:"8px"}}>Create Account</h2>
          <p style={{color:"#94a3b8",marginBottom:"24px"}}>Join NurseHub today — it's free!</p>
          <div style={{display:"flex",gap:"12px",marginBottom:"24px",justifyContent:"center"}}>
            <button onClick={()=>setUserType("nurse")} style={{flex:1,padding:"12px",borderRadius:"10px",border:"2px solid",borderColor:userType==="nurse"?"#38bdf8":"#334155",background:userType==="nurse"?"#0f172a":"#1e293b",color:"white",cursor:"pointer"}}>👩‍⚕️ Nurse</button>
            <button onClick={()=>setUserType("recruiter")} style={{flex:1,padding:"12px",borderRadius:"10px",border:"2px solid",borderColor:userType==="recruiter"?"#38bdf8":"#334155",background:userType==="recruiter"?"#0f172a":"#1e293b",color:"white",cursor:"pointer"}}>🏢 Recruiter</button>
          </div>
          <div style={{background:"#1e293b",padding:"32px",borderRadius:"16px",border:"1px solid #334155"}}>
            <input placeholder="Full Name" style={{width:"100%",background:"#0f172a",border:"1px solid #334155",color:"white",padding:"12px",borderRadius:"8px",marginBottom:"12px",fontSize:"1rem",boxSizing:"border-box"}} />
            <input placeholder="Email" style={{width:"100%",background:"#0f172a",border:"1px solid #334155",color:"white",padding:"12px",borderRadius:"8px",marginBottom:"12px",fontSize:"1rem",boxSizing:"border-box"}} />
            <input type="password" placeholder="Password" style={{width:"100%",background:"#0f172a",border:"1px solid #334155",color:"white",padding:"12px",borderRadius:"8px",marginBottom:"20px",fontSize:"1rem",boxSizing:"border-box"}} />
            <button style={{width:"100%",background:"#38bdf8",border:"none",color:"#0f172a",padding:"14px",borderRadius:"10px",fontSize:"1rem",fontWeight:"bold",cursor:"pointer"}}>Create Account</button>
            {userType==="recruiter" && <p style={{color:"#94a3b8",fontSize:"0.8rem",marginTop:"12px"}}>Recruiter plans from $29/month</p>}
            {userType==="nurse" && <p style={{color:"#4ade80",fontSize:"0.8rem",marginTop:"12px"}}>✅ Free to join! Premium $10/month</p>}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{background:"#1e293b",padding:"24px",textAlign:"center",color:"#64748b",fontSize:"0.8rem",marginTop:"48px",borderTop:"1px solid #334155"}}>
        <p style={{margin:0}}>© 2026 NurseHub — Global Nursing Jobs Platform | Made by a Nurse, for Nurses 🏥</p>
      </footer>
    </div>
  )
}
