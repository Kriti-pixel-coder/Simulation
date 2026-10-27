import { motion, AnimatePresence } from "framer-motion"

const inputStyle = {
  width: "100%", padding: "12px 16px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12, color: "var(--text-primary)",
  fontSize: 15, outline: "none", fontFamily: "inherit",
}

function ComplexityBar({ value }) {
  const label = value < 30 ? "Low" : value < 60 ? "Medium" : value < 80 ? "High" : "Very High"
  const color  = value < 30 ? "#22C55E" : value < 60 ? "#F4B942" : value < 80 ? "#F59E0B" : "#FF6B6B"
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>Estimated Complexity</span>
        <span style={{ fontSize: 13, fontWeight: 700, color }}>{label}</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <motion.div
          animate={{ width: `${Math.min(100, value)}%` }}
          style={{ height: "100%", background: `linear-gradient(90deg, ${color}, ${color}80)`, borderRadius: 3 }}
        />
      </div>
    </div>
  )
}

export default function SimSetupStep({ data, onChange, onLaunch, launching }) {
  const complexity = Math.min(100, (data.population / 20) + (data.days * 1.5))

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
      <div>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1, marginBottom: 8, color: "var(--text-primary)" }}>
          Simulation Setup
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: 32, fontSize: 15 }}>
          Configure the engine parameters. The simulation uses your personas.json data.
        </p>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", marginBottom: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
            Population Size
          </label>
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 10 }}>Number of personas to simulate (max 1000 from your JSON)</p>
          <input
            type="number" style={inputStyle}
            value={data.population}
            min={100} max={1000} step={100}
            onChange={(e) => onChange({ population: Number(e.target.value) })}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", marginBottom: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
            Simulation Days
          </label>
          <input
            type="number" style={inputStyle}
            value={data.days}
            min={7} max={90}
            onChange={(e) => onChange({ days: Number(e.target.value) })}
          />
        </div>

        <div style={{ marginBottom: 32 }}>
          <label style={{ display: "block", marginBottom: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
            Random Seed
          </label>
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 10 }}>Same seed = reproducible simulation</p>
          <input
            type="number" style={inputStyle}
            value={data.seed}
            onChange={(e) => onChange({ seed: Number(e.target.value) })}
          />
        </div>

        <ComplexityBar value={complexity} />

        {/* Data source notice */}
        <div style={{
          marginTop: 20, padding: "14px 16px",
          background: "rgba(34,197,94,0.07)",
          border: "1px solid rgba(34,197,94,0.2)",
          borderRadius: 12,
          display: "flex", gap: 10, alignItems: "flex-start",
        }}>
          <span style={{ fontSize: 18 }}>✅</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#22C55E", marginBottom: 2 }}>personas.json loaded</div>
            <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>
              1,000 real personas detected across 5 segments: students, young_professionals, freelancers, mid_career, outside_target
            </div>
          </div>
        </div>
      </div>

      {/* Right: Launch card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          position: "sticky", top: 100,
          padding: 40,
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          textAlign: "center",
        }}
      >
        {/* Orbit animation */}
        <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto 32px" }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px dashed rgba(244,185,66,0.25)" }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute", inset: 16, borderRadius: "50%", border: "1px dashed rgba(139,92,246,0.2)" }}
          />
          <div style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ fontSize: 40 }}>🌐</div>
          </div>
          {/* Orbiting dot */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute", inset: 0 }}
          >
            <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 8, height: 8, borderRadius: "50%", background: "#F4B942", boxShadow: "0 0 10px #F4B942" }} />
          </motion.div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>Ready to Launch</div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>
            {data.population.toLocaleString()} personas · {data.days} days simulation<br />
            AI-powered market adoption engine
          </div>
        </div>

        <AnimatePresence mode="wait">
          {launching ? (
            <motion.div key="launching" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ fontSize: 18, color: "#22C55E", marginBottom: 12, fontWeight: 700 }}
              >
                🚀 Launching Market…
              </motion.div>
              <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <motion.div
                  animate={{ width: ["0%", "100%"] }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  style={{ height: "100%", background: "linear-gradient(90deg, #F4B942, #22C55E)", borderRadius: 2 }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.button
              key="launch-btn"
              whileHover={{ scale: 1.04, boxShadow: "0 8px 40px rgba(244,185,66,0.45)" }}
              whileTap={{ scale: 0.97 }}
              onClick={onLaunch}
              style={{
                width: "100%", padding: "18px",
                background: "linear-gradient(135deg, #F4B942 0%, #FFD36B 100%)",
                border: "none", borderRadius: 14,
                color: "#261232", fontSize: 16, fontWeight: 800,
                cursor: "pointer", fontFamily: "inherit",
                boxShadow: "0 4px 32px rgba(244,185,66,0.35)",
                letterSpacing: -0.3,
              }}
            >
              🚀 Launch Market
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
