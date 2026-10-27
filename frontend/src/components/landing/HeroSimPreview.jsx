import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Activity, Users, TrendingUp, Zap, Shield, ArrowUpRight } from "lucide-react"

export default function HeroSimPreview({ onLaunch }) {
  const [day, setDay] = useState(8)
  const [usersCount, setUsersCount] = useState(242)
  const [consideringCount, setConsideringCount] = useState(384)
  const [viralActive, setViralActive] = useState(false)
  const [logs, setLogs] = useState([
    { id: 1, name: "Aryan H.", role: "Student (Fintech)", action: "Adopted via viral peer referral", tag: "Adopter", color: "#22C55E", time: "just now" },
    { id: 2, name: "Priya M.", role: "Founder (SMB)", action: "Evaluating pricing vs RazorPay", tag: "Considering", color: "#8B5CF6", time: "1m ago" },
    { id: 3, name: "Vikram R.", role: "VP Tech (Enterprise)", action: "Initiated multi-seat pilot", tag: "Pipeline", color: "#F4B942", time: "3m ago" },
  ])

  // Live auto-tick simulation preview
  useEffect(() => {
    const timer = setInterval(() => {
      setDay((d) => (d >= 30 ? 1 : d + 1))
      setUsersCount((u) => {
        const next = Math.min(840, Math.floor(u + Math.random() * 18 + 5))
        return next >= 840 ? 180 : next
      })
      setConsideringCount((c) => Math.max(120, Math.floor(c + (Math.random() - 0.45) * 12)))

      const sampleNames = [
        { name: "Ananya S.", role: "Freelance Designer", action: "Converted after 7-day trial" },
        { name: "Rahul K.", role: "DevOps Lead", action: "Shifted from competitor product" },
        { name: "Rohan V.", role: "College Senior", action: "Invited 4 cohort classmates" },
        { name: "Neha D.", role: "Growth Marketer", action: "Triggered organic word-of-mouth" },
      ]
      const pick = sampleNames[Math.floor(Math.random() * sampleNames.length)]
      setLogs((prev) => [
        {
          id: Date.now(),
          name: pick.name,
          role: pick.role,
          action: pick.action,
          tag: "Live",
          color: "#22C55E",
          time: "now",
        },
        ...prev.slice(0, 2),
      ])
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  const triggerViralBurst = () => {
    setViralActive(true)
    setUsersCount((u) => u + 75)
    setLogs((prev) => [
      {
        id: Date.now(),
        name: "Viral Referral Wave",
        role: "Autonomous Agent Cluster",
        action: "+75 personas converted instantaneously",
        tag: "Surge",
        color: "#F4B942",
        time: "now",
      },
      ...prev.slice(0, 2),
    ])
    setTimeout(() => setViralActive(false), 1400)
  }

  return (
    <div
      style={{
        position: "relative",
        borderRadius: 24,
        background: "rgba(30, 14, 42, 0.75)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 25px 80px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* Top Cockpit Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 20px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          background: "rgba(255, 255, 255, 0.03)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F56", opacity: 0.8 }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E", opacity: 0.8 }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27C93F", opacity: 0.8 }} />
          </div>
          <span style={{ fontSize: 11, fontFamily: "JetBrains Mono, monospace", color: "var(--text-muted)", letterSpacing: "0.04em" }}>
            cluster_01 • 1,000 synthetic agents active
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontSize: 11,
            fontWeight: 700,
            padding: "3px 9px",
            borderRadius: 999,
            background: "rgba(34, 197, 94, 0.15)",
            border: "1px solid rgba(34, 197, 94, 0.3)",
            color: "#22C55E",
            fontFamily: "JetBrains Mono, monospace",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 8px #22C55E" }} />
            SIMULATING DAY {day}/30
          </span>
        </div>
      </div>

      {/* Main Cockpit Body */}
      <div style={{ padding: "20px 24px" }}>
        {/* Metric Cards Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 18 }}>
          <div style={{
            padding: "14px 16px",
            borderRadius: 14,
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.07)",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>
                Active Users
              </span>
              <Users size={14} color="#22C55E" />
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "var(--text-primary)", fontFamily: "JetBrains Mono, monospace" }}>
              {usersCount}
              <span style={{ fontSize: 13, color: "#22C55E", marginLeft: 8, fontWeight: 700 }}>
                +{((usersCount / 1000) * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          <div style={{
            padding: "14px 16px",
            borderRadius: 14,
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.07)",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>
                Considering
              </span>
              <Activity size={14} color="#8B5CF6" />
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "var(--text-primary)", fontFamily: "JetBrains Mono, monospace" }}>
              {consideringCount}
              <span style={{ fontSize: 13, color: "#8B5CF6", marginLeft: 8, fontWeight: 700 }}>
                in funnel
              </span>
            </div>
          </div>

          <div style={{
            padding: "14px 16px",
            borderRadius: 14,
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.07)",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>
                Diffusion Velocity
              </span>
              <TrendingUp size={14} color="#F4B942" />
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#F4B942", fontFamily: "JetBrains Mono, monospace" }}>
              3.8×
              <span style={{ fontSize: 13, color: "var(--text-muted)", marginLeft: 8, fontWeight: 500 }}>
                Bass Model
              </span>
            </div>
          </div>
        </div>

        {/* Live Mini Diffusion Wave Graphic */}
        <div style={{
          padding: "14px 18px",
          borderRadius: 14,
          background: "linear-gradient(180deg, rgba(244, 185, 66, 0.06) 0%, rgba(139, 92, 246, 0.02) 100%)",
          border: "1px solid rgba(244, 185, 66, 0.15)",
          marginBottom: 16,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 6 }}>
              <Zap size={14} color="#F4B942" />
              Autonomous Adoption Trajectory (Monte Carlo Curve)
            </span>
            <button
              onClick={triggerViralBurst}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "4px 10px",
                borderRadius: 999,
                background: viralActive ? "#F4B942" : "rgba(244, 185, 66, 0.15)",
                border: "1px solid rgba(244, 185, 66, 0.35)",
                color: viralActive ? "#180F24" : "#F4B942",
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <span>⚡</span>
              <span>Test Shock: +Viral Referral</span>
            </button>
          </div>

          {/* Adoption Curve Progress Bar with Milestones */}
          <div style={{ position: "relative", height: 8, borderRadius: 999, background: "rgba(255, 255, 255, 0.08)", overflow: "hidden", marginBottom: 8 }}>
            <motion.div
              animate={{ width: `${(usersCount / 1000) * 100}%` }}
              transition={{ ease: "easeOut", duration: 0.6 }}
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #F4B942 0%, #22C55E 100%)",
                boxShadow: "0 0 12px rgba(34, 197, 94, 0.6)",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace" }}>
            <span>Innovators (2.5%)</span>
            <span>Early Adopters (13.5%)</span>
            <span>Early Majority (34%)</span>
            <span>Late Majority (34%)</span>
          </div>
        </div>

        {/* Live Feed Stream */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Real-time Persona State Transitions
          </span>
          <AnimatePresence initial={false}>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "9px 14px",
                  borderRadius: 10,
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  fontSize: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: log.color, boxShadow: `0 0 8px ${log.color}` }} />
                  <div>
                    <span style={{ fontWeight: 700, color: "var(--text-primary)", marginRight: 6 }}>{log.name}</span>
                    <span style={{ color: "var(--text-muted)", fontSize: 11 }}>({log.role})</span>
                    <span style={{ color: "var(--text-secondary)", marginLeft: 8 }}>{log.action}</span>
                  </div>
                </div>
                <span style={{ fontSize: 10.5, color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace" }}>{log.time}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Cockpit Bottom Bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 24px",
        background: "rgba(255, 255, 255, 0.02)",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "var(--text-muted)" }}>
          <Shield size={14} color="#F4B942" />
          <span>Multi-agent deterministic seed • Zero hallucinations</span>
        </div>
        <button
          onClick={onLaunch}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            color: "#F4B942",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <span>Open Full Control Room</span>
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  )
}
