import { motion } from "framer-motion"

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12,
  color: "var(--text-primary)",
  fontSize: 15,
  outline: "none",
  fontFamily: "inherit",
  transition: "all 0.2s",
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", marginBottom: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
        {label}
      </label>
      {children}
    </div>
  )
}

function MetricRing({ value, label, color = "#F4B942" }) {
  const pct = Math.min(100, Math.max(0, value))
  const r = 36
  const circumference = 2 * Math.PI * r
  const strokeDashoffset = circumference - (pct / 100) * circumference

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ position: "relative", width: 96, height: 96 }}>
        <svg width={96} height={96} viewBox="0 0 96 96">
          <circle cx={48} cy={48} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={6} />
          <motion.circle
            cx={48}
            cy={48}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            transform="rotate(-90 48 48)"
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)" }}>{pct}%</span>
        </div>
      </div>
      <span style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600 }}>{label}</span>
    </div>
  )
}

export default function AudienceStep({ data, onChange }) {
  const handle = (k, v) => onChange({ [k]: v })

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
      <div>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1, marginBottom: 8, color: "var(--text-primary)" }}>
          Define Your Audience
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: 32, fontSize: 15 }}>
          Who are you selling to? Be specific about your ideal customer profile.
        </p>

        <Field label="Primary Region">
          <select style={{ ...inputStyle, cursor: "pointer" }} value={data.region} onChange={(e) => handle("region", e.target.value)}>
            {["India", "United States", "Europe", "Southeast Asia", "Global", "MENA", "LATAM"].map((r) => (
              <option key={r} style={{ background: "#3A1E4A" }}>{r}</option>
            ))}
          </select>
        </Field>

        <Field label="Audience Description">
          <textarea
            style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
            value={data.description}
            onChange={(e) => handle("description", e.target.value)}
            placeholder="Describe your target audience in detail..."
          />
        </Field>

        <Field label="Demographic Notes">
          <textarea
            style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
            value={data.demographicNotes}
            onChange={(e) => handle("demographicNotes", e.target.value)}
            placeholder="Age range, behavior patterns, income bracket..."
          />
        </Field>

        <Field label={`Outside Market % — ${data.outsideMarket}%`}>
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 10 }}>
            Percentage of population outside your target market
          </p>
          <input
            type="range"
            min={0}
            max={80}
            value={data.outsideMarket}
            onChange={(e) => handle("outsideMarket", Number(e.target.value))}
            style={{ width: "100%", accentColor: "#F4B942" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>0% — Niche</span>
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>80% — Broad</span>
          </div>
        </Field>
      </div>

      {/* Visual Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          position: "sticky",
          top: 100,
          padding: 32,
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#F4B942", marginBottom: 24, display: "block" }}>
          Audience Intelligence
        </span>

        <div style={{ display: "flex", gap: 24, justifyContent: "center", marginBottom: 32 }}>
          <MetricRing value={100 - data.outsideMarket} label="Target Coverage" color="#F4B942" />
          <MetricRing value={data.outsideMarket} label="Outside Market" color="var(--text-muted)" />
        </div>

        <div style={{ padding: 20, background: "rgba(255,255,255,0.04)", borderRadius: 12, marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Audience Profile</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>{data.region}</div>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
            {data.description || "Define your audience above"}
          </p>
        </div>

        <div style={{ padding: 16, background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: 12 }}>
          <div style={{ fontSize: 11, color: "#8B5CF6", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, fontWeight: 700 }}>Notes</div>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
            {data.demographicNotes || "Add demographic details for better simulation accuracy"}
          </p>
        </div>
      </motion.div>
    </div>
  )
}
