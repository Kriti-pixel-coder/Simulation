import { motion, AnimatePresence } from "framer-motion"

const EVENT_STYLES = {
  VIRAL_ADOPTION: { bg: "rgba(34,197,94,0.08)",   border: "rgba(34,197,94,0.25)",   color: "#22C55E" },
  REFERRAL_BURST: { bg: "rgba(244,185,66,0.08)",  border: "rgba(244,185,66,0.25)",  color: "#F4B942" },
  PRICE_SIGNAL:   { bg: "rgba(255,107,107,0.08)", border: "rgba(255,107,107,0.25)", color: "#FF6B6B" },
  COMPETITOR:     { bg: "rgba(139,92,246,0.08)",  border: "rgba(139,92,246,0.25)",  color: "#8B5CF6" },
  CHANNEL_PEAK:   { bg: "rgba(241,244,248,0.05)", border: "rgba(241,244,248,0.15)", color: "var(--text-primary)" },
}

function EventCard({ event }) {
  const style = EVENT_STYLES[event.type] || EVENT_STYLES.CHANNEL_PEAK

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      style={{
        margin: "0 12px 8px",
        padding: "12px 14px",
        background: style.bg,
        border: `1px solid ${style.border}`,
        borderRadius: 10,
        borderLeft: `3px solid ${style.color}`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 13 }}>{event.icon}</span>
          <span style={{ fontSize: 9.5, fontWeight: 800, color: style.color, textTransform: "uppercase", letterSpacing: "0.09em" }}>
            {event.label}
          </span>
        </div>
        <span style={{ fontSize: 9.5, color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace" }}>
          Day {event.day}
        </span>
      </div>
      <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{event.detail}</div>
      <div style={{ fontSize: 10.5, color: style.color, marginTop: 3, fontWeight: 700 }}>{event.impact}</div>
    </motion.div>
  )
}

export default function EventFeed({ events }) {
  return (
    <div>
      <div style={{
        padding: "12px 16px 8px",
        fontSize: 10, fontWeight: 700, color: "var(--text-muted)",
        textTransform: "uppercase", letterSpacing: "0.09em",
        position: "sticky", top: 0,
        background: "var(--glass-strong)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--glass-border)",
        zIndex: 5,
      }}>
        Live Event Center
        {events.length > 0 && (
          <span style={{ marginLeft: 8, padding: "1px 7px", background: "rgba(244,185,66,0.15)", border: "1px solid rgba(244,185,66,0.25)", borderRadius: 999, fontSize: 9, color: "#F4B942" }}>
            {events.length}
          </span>
        )}
      </div>

      {events.length === 0 ? (
        <div style={{ padding: "24px 16px", textAlign: "center", color: "#3D4555", fontSize: 12 }}>
          <div style={{ fontSize: 24, marginBottom: 8, opacity: 0.4 }}>📡</div>
          Run simulation to see live events
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {events.map((ev) => (
            <EventCard key={ev.id} event={ev} />
          ))}
        </AnimatePresence>
      )}
    </div>
  )
}
