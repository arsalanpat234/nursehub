import { useState, useRef, useEffect } from "react";

const NURSEHUB_CONTEXT = `You are NurseHub's helpful support assistant. NurseHub is a worldwide nursing jobs platform for nurses and recruiters. 

Common issues you help with:
1. Verification email not received - Tell them to check spam, wait 2 minutes, or try registering again with same email
2. Invalid login credentials - Usually means email not verified yet. Tell them to check email for verification link
3. Forgot password - Tell them to use "Forgot Password" on login page, check email including spam folder
4. How to post a job - Only recruiters can post jobs. Register as Recruiter, verify email, then click "Post a Job"
5. How to find jobs - Click "Browse Jobs" on homepage, filter by country or specialty
6. Account deletion - Tell them to email support or they can contact via the platform
7. Premium subscription - Premium is $10/month, gives access to document vault and advanced features
8. Profile setup - After login, go to dashboard to complete your nurse profile

Always be friendly, brief, and helpful. Answer in simple English. If you don't know something, say "Please email us at support@nursehub.com".`;

const quickQuestions = [
  "Verification email nahi aaya",
  "Login nahi ho raha",
  "Password bhool gaya",
  "Job kaise post karein",
  "Jobs kaise dhundein",
];

export default function HelpPortal() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm NurseHub Support 👋\nAapka koi bhi masla batayein — main help karunga!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text) {
    const userMsg = text || input.trim();
    if (!userMsg) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const history = messages
        .slice(1)
        .concat({ role: "user", content: userMsg })
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: NURSEHUB_CONTEXT,
          messages: history,
        }),
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || "Sorry, kuch error hua. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(59,130,246,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            zIndex: 9999,
          }}
        >
          💬
        </button>
      )}

      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 360,
            maxWidth: "calc(100vw - 32px)",
            height: 520,
            background: "#0f172a",
            borderRadius: 16,
            boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            zIndex: 9999,
            border: "1px solid #1e3a5f",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #1e40af, #1d4ed8)",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                🏥
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>NurseHub Support</div>
                <div style={{ color: "#93c5fd", fontSize: 11 }}>● Online — Always here</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                borderRadius: 8,
                width: 30,
                height: 30,
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "12px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "82%",
                    padding: "10px 13px",
                    borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    background: msg.role === "user" ? "linear-gradient(135deg, #2563eb, #1d4ed8)" : "#1e293b",
                    color: "#f1f5f9",
                    fontSize: 13,
                    lineHeight: 1.5,
                    whiteSpace: "pre-wrap",
                    border: msg.role === "assistant" ? "1px solid #334155" : "none",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "16px 16px 16px 4px",
                    background: "#1e293b",
                    border: "1px solid #334155",
                    color: "#64748b",
                    fontSize: 13,
                  }}
                >
                  Typing...
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
                <div style={{ color: "#64748b", fontSize: 11, textAlign: "center" }}>
                  Common issues:
                </div>
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    style={{
                      background: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: 10,
                      color: "#93c5fd",
                      padding: "8px 12px",
                      cursor: "pointer",
                      fontSize: 12,
                      textAlign: "left",
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div
            style={{
              padding: "10px 12px",
              borderTop: "1px solid #1e293b",
              display: "flex",
              gap: 8,
              background: "#0f172a",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
              placeholder="Apna masla likhen..."
              style={{
                flex: 1,
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: 10,
                padding: "9px 12px",
                color: "#f1f5f9",
                fontSize: 13,
                outline: "none",
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              style={{
                background: loading || !input.trim() ? "#334155" : "linear-gradient(135deg, #2563eb, #1d4ed8)",
                border: "none",
                borderRadius: 10,
                width: 38,
                height: 38,
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                color: "#fff",
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
