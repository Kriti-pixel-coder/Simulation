import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePersonas, STATUS_COLORS, SEGMENT_COLORS, SEGMENT_LABELS } from "../../hooks/usePersonas"
import PersonaInspector from "./PersonaInspector"
import AIPanel from "./AIPanel"
import KPIBar from "./KPIBar"
import MarketNetwork from "./MarketNetwork"
import EventFeed from "./EventFeed"
import CommandBar from "./CommandBar"

export default function ControlRoom({ config, onBranch, onReport }) {
  const hook = usePersonas()
  const { personas, loading, kpis, runSimStep, selected, setSelected } = hook

  const [simStatus, setSimStatus]   = useState("running")   // running | paused | completed
  const [day, setDay]               = useState(0)
  const [speed, setSpeed]           = useState(1)           // 1 | 2 | 4 | 8
  const [events, setEvents]         = useState([])
  const intervalRef                 = useRef(null)

  const SIM_DAYS = config?.sim?.days || 30

  // ── Sim tick ──────────────────────────────────────────────
  const tick = useCallback(() => {
    setDay((d) => {
      if (d >= SIM_DAYS) {
        setSimStatus("completed")
        return d
      }
      runSimStep()
      // Randomly generate an event
      if (Math.random() < 0.35) {
        const eventTypes = [
          { type: "VIRAL_ADOPTION", label: "Viral Adoption Wave", color: "#22C55E", icon: "⚡" },
          { type: "REFERRAL_BURST", label: "Referral Burst Detected", color: "#F4B942", icon: "🔗" },
          { type: "PRICE_SIGNAL",   label: "Price Sensitivity Spike", color: "#FF6B6B", icon: "📊" },
          { type: "COMPETITOR",     label: "Competitor Activity", color: "#8B5CF6", icon: "⚔️" },
          { type: "CHANNEL_PEAK",   label: "Social Channel Peak", color: "var(--text-primary)", icon: "📱" },
        ]
        const ev = eventTypes[Math.floor(Math.random() * eventTypes.length)]
        const count = Math.floor(Math.random() * 40) + 5
        setEvents((prev) => [
          {
            ...ev,
            id: Date.now(),
            day: d + 1,
            detail: `${count} personas affected`,
            impact: (Math.random() > 0.5 ? "+" : "−") + (Math.random() * 12).toFixed(1) + "% impact",
          },
          ...prev.slice(0, 29),
        ])
      }
      return d + 1
    })
  }, [runSimStep, SIM_DAYS])

  // ── Interval management ───────────────────────────────────
  useEffect(() => {
    if (simStatus === "running") {
      const ms = { 1: 1500, 2: 750, 4: 375, 8: 188 }[speed] || 1500
      intervalRef.current = setInterval(tick, ms)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [simStatus, speed, tick])

  const handleRun   = () => setSimStatus("running")
  const handlePause = () => setSimStatus("paused")
  const handleStep  = () => { if (simStatus !== "running") tick() }
  const handleReset = () => { setDay(0); setSimStatus("paused"); setEvents([]) }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, paddingTop: 80 }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          style={{ width: 48, height: 48, borderRadius: "50%", border: "3px solid rgba(244,185,66,0.2)", borderTopColor: "#F4B942" }} />
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Loading 1000 personas…</p>
      </div>
    )
  }

  return (
    <div style={{ height: "100vh", paddingTop: 68, paddingBottom: 10, display: "flex", flexDirection: "column", overflow: "hidden", boxSizing: "border-box" }}>
      {/* Command Bar */}
      <CommandBar
        simStatus={simStatus} day={day} totalDays={SIM_DAYS} speed={speed}
        onRun={handleRun} onPause={handlePause} onStep={handleStep} onReset={handleReset}
        onSpeedChange={setSpeed} onBranch={() => onBranch({ day, kpis })} onReport={onReport}
      />

      {/* KPI Strip */}
      <KPIBar kpis={kpis} />

      {/* Main 3-col layout */}
      <div style={{
        flex: 1,
        minHeight: 0,
        margin: "0 16px",
        display: "grid",
        gridTemplateColumns: "250px 1fr 330px",
        borderRadius: 14,
        border: "1px solid var(--glass-border)",
        background: "var(--glass-bg)",
        overflow: "hidden",
      }}>

        {/* Left Sidebar — Segment + Filter */}
        <div style={{ padding: "14px 12px", borderRight: "1px solid var(--glass-border)", overflowY: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
          <SegmentSidebar hook={hook} />
        </div>

        {/* Center — Live Market Network */}
        <div style={{ position: "relative", overflow: "hidden", height: "100%", width: "100%" }}>
          <MarketNetwork personas={hook.filtered} onSelect={setSelected} selected={selected} simStatus={simStatus} />
        </div>

        {/* Right — AI Panel + Event Feed */}
        <div style={{ borderLeft: "1px solid var(--glass-border)", display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
          <div style={{ maxHeight: "48%", overflowY: "auto", borderBottom: "1px solid var(--glass-border)", flexShrink: 0 }}>
            <AIPanel kpis={kpis} personas={personas} day={day} />
          </div>
          <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
            <EventFeed events={events} />
          </div>
        </div>
      </div>

      {/* Persona Inspector Drawer */}
      <AnimatePresence>
        {selected && (
          <PersonaInspector persona={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Segment Sidebar ──────────────────────────────────────────
function SegmentSidebar({ hook }) {
  const { segmentCounts, statusCounts, filterSegment, setFilterSeg, filterStatus, setFilterStat, searchQuery, setSearchQuery } = hook

  return (
    <>
      {/* Search */}
      <div>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search personas…"
          style={{
            width: "100%", padding: "10px 14px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10, color: "var(--text-primary)",
            fontSize: 13, outline: "none", fontFamily: "inherit",
          }}
        />
      </div>

      {/* Segments */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 10 }}>
          Segments
        </div>
        {[["all", "All Personas", hook.personas.length], ...Object.entries(segmentCounts)].map(([id, label, count]) => {
          const isAll = id === "all"
          const segId = isAll ? "all" : id
          const segLabel = isAll ? label : (SEGMENT_LABELS[id] || id)
          const segCount = isAll ? count : segmentCounts[id]
          const color = SEGMENT_COLORS[id] || "var(--text-muted)"
          const active = filterSegment === segId
          return (
            <motion.button key={segId} whileHover={{ x: 3 }} onClick={() => setFilterSeg(segId)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", padding: "8px 12px", marginBottom: 4,
                background: active ? `${color}15` : "transparent",
                border: `1px solid ${active ? color + "40" : "transparent"}`,
                borderRadius: 8, cursor: "pointer", fontFamily: "inherit",
                transition: "all 0.15s",
              }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {!isAll && <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, boxShadow: active ? `0 0 6px ${color}` : "none" }} />}
                <span style={{ fontSize: 12, fontWeight: active ? 700 : 500, color: active ? "var(--text-primary)" : "var(--text-secondary)" }}>{segLabel}</span>
              </div>
              <span style={{ fontSize: 11, fontFamily: "JetBrains Mono, monospace", color: active ? color : "var(--text-muted)", fontWeight: 600 }}>{segCount}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Status Filter */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 10 }}>
          Status Filter
        </div>
        {[["all", "All"], ...Object.keys(STATUS_COLORS).map((s) => [s, s.charAt(0).toUpperCase() + s.slice(1)])].map(([id, label]) => {
          const color = STATUS_COLORS[id] || "var(--text-muted)"
          const active = filterStatus === id
          const cnt = id === "all" ? hook.personas.length : (hook.statusCounts[id] || 0)
          return (
            <motion.button key={id} whileHover={{ x: 3 }} onClick={() => setFilterStat(id)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", padding: "7px 12px", marginBottom: 3,
                background: active && id !== "all" ? `${color}12` : "transparent",
                border: "1px solid transparent", borderRadius: 7,
                cursor: "pointer", fontFamily: "inherit",
              }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {id !== "all" && <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, opacity: active ? 1 : 0.5 }} />}
                <span style={{ fontSize: 12, color: active ? "var(--text-primary)" : "var(--text-secondary)", fontWeight: active ? 600 : 400 }}>{label}</span>
              </div>
              <span style={{ fontSize: 11, fontFamily: "JetBrains Mono, monospace", color: active ? color : "var(--text-muted)" }}>{cnt}</span>
            </motion.button>
          )
        })}
      </div>
    </>
  )
}
