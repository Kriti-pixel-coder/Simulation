import { motion } from "framer-motion"

const SPEEDS = [1, 2, 4, 8]

export default function CommandBar({
  simStatus, day, totalDays, speed,
  onRun, onPause, onStep, onReset,
  onSpeedChange, onBranch, onReport
}) {
  const progress = totalDays > 0 ? (day / totalDays) * 100 : 0

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{
        position: "relative",
        zIndex: 20,
        margin: "0 16px 8px",
        padding: "10px 18px",
        background: "var(--glass-bg)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid var(--glass-border)",
        borderRadius: 14,
        display: "flex",
        alignItems: "center",
        gap: 16,
        flexWrap: "nowrap",
        flexShrink: 0,
        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
      }}
    >
      {/* Status badge */}
      <StatusBadge status={simStatus} />

      {/* Day counter */}
      <div style={{ display: "flex", flexDirection: "column", minWidth: 100 }}>
        <span style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>Progress</span>
        <span style={{ fontSize: 15, fontWeight: 800, color: "var(--text-primary)", fontFamily: "JetBrains Mono, monospace", letterSpacing: -0.5 }}>
          Day <span style={{ color: "#F4B942" }}>{day}</span> / {totalDays}
        </span>
        {/* Mini progress bar */}
        <div style={{ height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 1, marginTop: 4, overflow: "hidden" }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            style={{ height: "100%", background: "linear-gradient(90deg, #F4B942, #FFD36B)", borderRadius: 1 }}
          />
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.08)" }} />

      {/* Speed selector */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginRight: 4 }}>Speed</span>
        {SPEEDS.map((s) => (
          <button
            key={s}
            onClick={() => onSpeedChange(s)}
            style={{
              padding: "4px 10px",
              background: speed === s ? "rgba(244,185,66,0.2)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${speed === s ? "rgba(244,185,66,0.4)" : "rgba(255,255,255,0.08)"}`,
              borderRadius: 6,
              color: speed === s ? "#F4B942" : "var(--text-muted)",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "JetBrains Mono, monospace",
              transition: "all 0.15s",
            }}
          >
            {s}×
          </button>
        ))}
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.08)" }} />

      {/* Controls */}
      <div style={{ display: "flex", gap: 8 }}>
        {simStatus !== "running" ? (
          <CtrlBtn onClick={onRun} color="#22C55E" label={day === 0 ? "Run" : "Resume"} icon="▶" />
        ) : (
          <CtrlBtn onClick={onPause} color="#F4B942" label="Pause" icon="⏸" />
        )}
        <CtrlBtn onClick={onStep}  color="#8B5CF6" label="Step"  icon="⏭" disabled={simStatus === "running"} />
        <CtrlBtn onClick={onReset} color="#FF6B6B" label="Reset" icon="↺" />
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.08)" }} />

      {/* Branch + Export */}
      <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
        <button onClick={onBranch}
          style={{
            padding: "8px 16px",
            background: "rgba(139,92,246,0.15)",
            border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: 8,
            color: "#8B5CF6",
            fontSize: 12, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
          }}
        >
          ⑂ Branch
        </button>
        <button onClick={onReport}
          style={{
            padding: "8px 16px",
            background: "linear-gradient(135deg, #F4B942, #FFD36B)",
            border: "none",
            borderRadius: 8,
            color: "#261232",
            fontSize: 12, fontWeight: 800,
            cursor: "pointer", fontFamily: "inherit",
          }}
        >
          📋 Report
        </button>
      </div>
    </motion.div>
  )
}

function StatusBadge({ status }) {
  const map = {
    running:   { color: "#22C55E", label: "RUNNING",   dot: true },
    paused:    { color: "#F4B942", label: "PAUSED",    dot: false },
    completed: { color: "#8B5CF6", label: "COMPLETED", dot: false },
  }
  const s = map[status] || map.paused

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 7,
      padding: "6px 14px",
      background: `${s.color}15`,
      border: `1px solid ${s.color}35`,
      borderRadius: 999,
    }}>
      <div style={{
        width: 7, height: 7, borderRadius: "50%", background: s.color,
        boxShadow: s.dot ? `0 0 8px ${s.color}` : "none",
        animation: s.dot ? "pulse-ring 2s infinite" : "none",
      }} />
      <span style={{ fontSize: 10, fontWeight: 800, color: s.color, letterSpacing: "0.1em" }}>{s.label}</span>
    </div>
  )
}

function CtrlBtn({ onClick, color, label, icon, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "7px 14px",
        background: `${color}12`,
        border: `1px solid ${color}30`,
        borderRadius: 8,
        color: disabled ? "#3D4555" : color,
        fontSize: 12, fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "inherit",
        display: "flex", alignItems: "center", gap: 5,
        opacity: disabled ? 0.4 : 1,
        transition: "all 0.15s",
      }}
    >
      <span style={{ fontSize: 11 }}>{icon}</span> {label}
    </button>
  )
}
