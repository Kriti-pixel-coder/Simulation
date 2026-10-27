import { motion } from "framer-motion"

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{
        display: "block",
        marginBottom: 8,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--text-secondary)",
      }}>
        {label}
      </label>
      {children}
    </div>
  )
}

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

export default function ProductStep({ data, onChange }) {
  const handle = (k, v) => onChange({ [k]: v })

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
      {/* Form */}
      <div>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1, marginBottom: 8, color: "var(--text-primary)" }}>
          Define Your Product
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: 32, fontSize: 15 }}>
          Start by telling us what you're bringing to market.
        </p>

        <Field label="Product Name">
          <input
            style={inputStyle}
            value={data.name}
            onChange={(e) => handle("name", e.target.value)}
            placeholder="e.g. NovaPay"
          />
        </Field>

        <Field label="Product Description">
          <textarea
            style={{ ...inputStyle, minHeight: 90, resize: "vertical" }}
            value={data.description}
            onChange={(e) => handle("description", e.target.value)}
            placeholder="Describe what your product does..."
          />
        </Field>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field label="Category">
            <select
              style={{ ...inputStyle, cursor: "pointer" }}
              value={data.category}
              onChange={(e) => handle("category", e.target.value)}
            >
              {["Fintech", "SaaS", "E-Commerce", "HealthTech", "EdTech", "Consumer", "B2B", "Marketplace"].map((c) => (
                <option key={c} style={{ background: "#3A1E4A" }}>{c}</option>
              ))}
            </select>
          </Field>

          <Field label="Billing Period">
            <select
              style={{ ...inputStyle, cursor: "pointer" }}
              value={data.billingPeriod}
              onChange={(e) => handle("billingPeriod", e.target.value)}
            >
              <option style={{ background: "#3A1E4A" }} value="monthly">Monthly</option>
              <option style={{ background: "#3A1E4A" }} value="yearly">Yearly</option>
              <option style={{ background: "#3A1E4A" }} value="one-time">One-time</option>
              <option style={{ background: "#3A1E4A" }} value="freemium">Freemium</option>
            </select>
          </Field>
        </div>

        <Field label="Key Features">
          <input
            style={inputStyle}
            value={data.features}
            onChange={(e) => handle("features", e.target.value)}
            placeholder="e.g. Instant settlement, Analytics, API"
          />
        </Field>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field label="Price">
            <input
              style={inputStyle}
              type="number"
              value={data.price}
              onChange={(e) => handle("price", e.target.value)}
              placeholder="2499"
            />
          </Field>
          <Field label="Currency">
            <select
              style={{ ...inputStyle, cursor: "pointer" }}
              value={data.currency}
              onChange={(e) => handle("currency", e.target.value)}
            >
              {["INR", "USD", "EUR", "GBP", "AED"].map((c) => (
                <option key={c} style={{ background: "#3A1E4A" }}>{c}</option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      {/* Live Preview Card */}
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
        <div style={{ marginBottom: 20 }}>
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#F4B942",
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 16,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 8px #22C55E" }} />
            Live Preview
          </span>

          <h3 style={{ fontSize: 32, fontWeight: 800, letterSpacing: -1, color: "var(--text-primary)", marginBottom: 4 }}>
            {data.name || "Your Product"}
          </h3>
          <span style={{
            display: "inline-block",
            padding: "4px 12px",
            background: "rgba(139,92,246,0.15)",
            border: "1px solid rgba(139,92,246,0.25)",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700,
            color: "#8B5CF6",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}>
            {data.category}
          </span>

          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
            {data.description || "Your product description will appear here."}
          </p>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
            {(data.features || "").split(",").filter(Boolean).map((f, i) => (
              <span key={i} style={{
                padding: "4px 12px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 999,
                fontSize: 12,
                color: "var(--text-primary)",
              }}>
                {f.trim()}
              </span>
            ))}
          </div>

          <div style={{
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            padding: "20px 24px",
            background: "rgba(244,185,66,0.08)",
            border: "1px solid rgba(244,185,66,0.2)",
            borderRadius: 16,
          }}>
            <span style={{ fontSize: 40, fontWeight: 900, color: "#F4B942", letterSpacing: -2 }}>
              {data.currency === "INR" ? "₹" : data.currency === "USD" ? "$" : "€"}{Number(data.price || 0).toLocaleString()}
            </span>
            <span style={{ fontSize: 14, color: "var(--text-muted)" }}>/ {data.billingPeriod}</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
