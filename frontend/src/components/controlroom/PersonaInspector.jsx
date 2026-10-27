import { motion } from "framer-motion"
import { STATUS_COLORS, SEGMENT_LABELS } from "../../hooks/usePersonas"

// Radial gauge component
function RadialGauge({ value, max = 1, label, color = "#F4B942", size = 80 }) {
  const pct   = Math.min(1, Math.max(0, typeof value === "number" ? value : parseFloat(value) || 0))
  const r     = size / 2 - 8
  const circ  = 2 * Math.PI * r
  const dash  = circ * 0.75          // 270° arc
  const offset= dash - pct * dash

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Track */}
          <circle
            cx={size/2} cy={size/2} r={r}
            fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={6}
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            transform={`rotate(135 ${size/2} ${size/2})`}
          />
          {/* Fill */}
          <motion.circle
            cx={size/2} cy={size/2} r={r}
            fill="none" stroke={color} strokeWidth={6}
            strokeDasharray={`${dash} ${circ}`}
            initial={{ strokeDashoffset: dash }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            strokeLinecap="round"
            transform={`rotate(135 ${size/2} ${size/2})`}
          />
        </svg>
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: size * 0.2, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1, fontFamily: "JetBrains Mono, monospace" }}>
            {(pct * (max === 1 ? 100 : max)).toFixed(max === 1 ? 0 : 0)}{max === 1 ? "%" : ""}
          </span>
        </div>
      </div>
      <span style={{ fontSize: 9.5, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 600, textAlign: "center" }}>
        {label}
      </span>
    </div>
  )
}

// Contribution bar
function ContribBar({ label, value, color }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color, fontFamily: "JetBrains Mono, monospace" }}>
          {(value * 100).toFixed(0)}%
        </span>
      </div>
      <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value * 100}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ height: "100%", background: `linear-gradient(90deg, ${color}, ${color}80)`, borderRadius: 2 }}
        />
      </div>
    </div>
  )
}

export default function PersonaInspector({ persona, onClose }) {
  if (!persona) return null
  const { traits, state, channels, context } = persona
  const statusColor = STATUS_COLORS[state.status] || "#ACB8CC"

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 28, stiffness: 280 }}
      style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: 440, zIndex: 200,
        background: "rgba(38,18,50,0.96)",
        backdropFilter: "blur(32px)",
        borderLeft: "1px solid rgba(255,255,255,0.08)",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div style={{
        padding: "24px 24px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        position: "sticky", top: 0,
        background: "rgba(38,18,50,0.98)",
        backdropFilter: "blur(20px)",
        zIndex: 10,
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: `${statusColor}20`, border: `1px solid ${statusColor}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: statusColor }}>{persona.name[0]}</span>
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)" }}>{persona.name}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "capitalize" }}>{persona.occupation} · Age {persona.age}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{
              padding: "3px 10px", borderRadius: 999, fontSize: 10, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.07em",
              background: `${statusColor}18`, color: statusColor, border: `1px solid ${statusColor}30`,
            }}>
              {state.status}
            </span>
            <span style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace" }}>{persona.id}</span>
            <span style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "capitalize" }}>{persona.segment_name}</span>
          </div>
        </div>
        <button onClick={onClose} style={{ padding: "8px 12px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "var(--text-secondary)", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>
          ✕ Close
        </button>
      </div>

      <div style={{ padding: 24 }}>
        {/* Customer DNA */}
        <Section title="Customer DNA" color="#F4B942">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, justifyItems: "center", marginBottom: 8 }}>
            <RadialGauge value={traits.price_sensitivity} label="Price Sensitivity" color="#FF6B6B" />
            <RadialGauge value={traits.skepticism}        label="Skepticism"        color="#F59E0B" />
            <RadialGauge value={traits.openness}          label="Openness"          color="#22C55E" />
            <RadialGauge value={traits.influence}         label="Influence"         color="#8B5CF6" />
            <RadialGauge value={traits.trust_recs}        label="Trust Recs"        color="#F4B942" />
            <RadialGauge value={traits.need_strength}     label="Need Strength"     color="var(--text-primary)" />
          </div>
          <div style={{ padding: "12px 16px", background: "rgba(255,255,255,0.04)", borderRadius: 10, marginTop: 8 }}>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>Budget</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#F4B942" }}>₹{traits.budget.toLocaleString()}</div>
          </div>
          <div style={{ marginTop: 8, padding: "8px 14px", background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: 8 }}>
            <span style={{ fontSize: 11, color: "#8B5CF6", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>
              {traits.adopter_type?.replace("_", " ")}
            </span>
          </div>
        </Section>

        {/* Journey Timeline */}
        <Section title="Journey Timeline" color="#22C55E">
          <JourneyTimeline status={state.status} dayAdopted={state.day_adopted} />
        </Section>

        {/* Decision Factors (Channels) */}
        <Section title="Decision Factors" color="#8B5CF6">
          <ContribBar label="Social"     value={channels.social}    color="#F4B942" />
          <ContribBar label="Search"     value={channels.search}    color="#22C55E" />
          <ContribBar label="App Store"  value={channels.app_store} color="#8B5CF6" />
          <ContribBar label="Ads"        value={channels.ads}       color="#FF6B6B" />
          <ContribBar label="Need Strength" value={traits.need_strength} color="var(--text-primary)" />
        </Section>

        {/* Context */}
        <Section title="Persona Context" color="#F59E0B">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <ContextRow label="Need"        value={context.need} />
            <ContextRow label="Alternative" value={context.alternative || "None"} />
            {context.dealbreakers?.length > 0 && (
              <div>
                <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6, fontWeight: 600 }}>Dealbreakers</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {context.dealbreakers.map((d, i) => (
                    <span key={i} style={{ padding: "3px 10px", background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.2)", borderRadius: 999, fontSize: 11, color: "#FF6B6B" }}>
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Section>

        {/* State */}
        {(state.referred_by || state.day_adopted) && (
          <Section title="Adoption State" color="#ACB8CC">
            {state.referred_by && <ContextRow label="Referred By" value={state.referred_by} />}
            {state.day_adopted && <ContextRow label="Day Adopted" value={`Day ${state.day_adopted}`} />}
            {state.satisfaction && <ContextRow label="Satisfaction" value={`${(state.satisfaction * 100).toFixed(0)}%`} />}
            <ContextRow label="Days as User" value={state.days_as_user} />
          </Section>
        )}
      </div>
    </motion.div>
  )
}

function Section({ title, color, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <div style={{ width: 3, height: 16, borderRadius: 2, background: color }} />
        <span style={{ fontSize: 11, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.09em" }}>{title}</span>
      </div>
      {children}
    </div>
  )
}

function ContextRow({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 13, color: "var(--text-primary)", lineHeight: 1.5 }}>{value}</div>
    </div>
  )
}

function JourneyTimeline({ status }) {
  const stages = ["dormant", "aware", "considering", "user", "lapsed"]
  const activeIdx = stages.indexOf(status)

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
      {stages.map((stage, i) => {
        const isActive  = i === activeIdx
        const isDone    = i < activeIdx
        const color     = STATUS_COLORS[stage]
        return (
          <div key={stage} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 0 }}>
              <motion.div
                animate={isActive ? { scale: [1, 1.2, 1], boxShadow: [`0 0 0 ${color}`, `0 0 12px ${color}`, `0 0 0 ${color}`] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  width: 12, height: 12, borderRadius: "50%",
                  background: isActive || isDone ? color : "rgba(255,255,255,0.08)",
                  border: `2px solid ${isActive ? color : isDone ? color + "80" : "rgba(255,255,255,0.08)"}`,
                }}
              />
              <span style={{ fontSize: 9, color: isActive ? color : isDone ? "var(--text-muted)" : "#3D4555", textTransform: "capitalize", whiteSpace: "nowrap", fontWeight: isActive ? 700 : 400 }}>
                {stage}
              </span>
            </div>
            {i < stages.length - 1 && (
              <div style={{ flex: 1, height: 2, background: i < activeIdx ? STATUS_COLORS[stage] + "60" : "rgba(255,255,255,0.06)", margin: "0 2px", marginBottom: 16 }} />
            )}
          </div>
        )
      })}
    </div>
  )
}
