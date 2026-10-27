import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ProductStep from "./ProductStep"
import AudienceStep from "./AudienceStep"
import SegmentsStep from "./SegmentsStep"
import CompetitorsStep from "./CompetitorsStep"
import GTMStep from "./GTMStep"
import SimSetupStep from "./SimSetupStep"

const STEPS = [
  { id: 1, label: "Product", sublabel: "01" },
  { id: 2, label: "Audience", sublabel: "02" },
  { id: 3, label: "Market Segments", sublabel: "03" },
  { id: 4, label: "Competitors", sublabel: "04" },
  { id: 5, label: "Go-To-Market", sublabel: "05" },
  { id: 6, label: "Simulation Setup", sublabel: "06" },
]

const DEFAULT_CONFIG = {
  product: {
    name: "NovaPay",
    description: "AI-powered fintech payments platform for SMBs",
    category: "Fintech",
    features: "Instant settlement, Smart invoicing, Analytics",
    price: "2499",
    currency: "INR",
    billingPeriod: "monthly",
  },
  audience: {
    region: "India",
    description: "SMB owners and freelancers aged 25-45",
    demographicNotes: "Tech-savvy, growth-oriented, price-conscious",
    outsideMarket: 20,
  },
  segments: {
    Students: 20,
    Professionals: 30,
    Founders: 25,
    Enterprises: 15,
    Others: 10,
  },
  competitors: [
    { name: "RazorPay", price: "1999", strength: 85, position: "Market Leader", notes: "Strong brand" },
    { name: "Stripe", price: "3200", strength: 78, position: "Premium Segment", notes: "International" },
  ],
  gtm: {
    Social: 30,
    Search: 25,
    Ads: 20,
    "App Store": 15,
    Referral: 10,
  },
  sim: {
    population: 1000,
    days: 30,
    seed: 42,
  },
}

export default function SetupStudio({ onLaunch }) {
  const [step, setStep] = useState(1)
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const [launching, setLaunching] = useState(false)

  const updateConfig = (key, value) =>
    setConfig((prev) => ({ ...prev, [key]: { ...prev[key], ...value } }))

  const handleLaunch = () => {
    setLaunching(true)
    setTimeout(() => {
      onLaunch(config)
    }, 2200)
  }

  return (
    <div style={{
      minHeight: "100vh",
      paddingTop: 80,
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Top Progress Bar */}
      <div style={{ padding: "24px 48px 0", maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        <div style={{ display: "flex", gap: 0, alignItems: "center" }}>
          {STEPS.map((s, i) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <motion.button
                onClick={() => setStep(s.id)}
                whileHover={{ scale: 1.02 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  padding: "12px 8px",
                  background: step === s.id ? "rgba(244,185,66,0.12)" : "transparent",
                  border: step === s.id ? "1px solid rgba(244,185,66,0.3)" : "1px solid transparent",
                  borderRadius: 12,
                  cursor: "pointer",
                  flex: 1,
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                }}
              >
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: step >= s.id ? "#F4B942" : "var(--text-muted)",
                  fontFamily: "JetBrains Mono, monospace",
                }}>
                  {s.sublabel}
                </span>
                <span style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: step === s.id ? "var(--text-primary)" : step > s.id ? "var(--text-secondary)" : "var(--text-muted)",
                  whiteSpace: "nowrap",
                }}>
                  {s.label}
                </span>
              </motion.button>
              {i < STEPS.length - 1 && (
                <div style={{
                  height: 2,
                  width: 24,
                  background: step > s.id ? "rgba(244,185,66,0.5)" : "rgba(255,255,255,0.08)",
                  borderRadius: 1,
                  flexShrink: 0,
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Progress line */}
        <div style={{ height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 1, marginTop: 16, overflow: "hidden" }}>
          <motion.div
            animate={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{ height: "100%", background: "linear-gradient(90deg, #F4B942, #FFD36B)", borderRadius: 1 }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div style={{ flex: 1, padding: "32px 48px", maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
              <ProductStep data={config.product} onChange={(v) => updateConfig("product", v)} />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
              <AudienceStep data={config.audience} onChange={(v) => updateConfig("audience", v)} />
            </motion.div>
          )}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
              <SegmentsStep data={config.segments} onChange={(v) => updateConfig("segments", v)} />
            </motion.div>
          )}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
              <CompetitorsStep data={config.competitors} onChange={(v) => setConfig((p) => ({ ...p, competitors: v }))} />
            </motion.div>
          )}
          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
              <GTMStep data={config.gtm} onChange={(v) => updateConfig("gtm", v)} />
            </motion.div>
          )}
          {step === 6 && (
            <motion.div key="step6" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
              <SimSetupStep data={config.sim} onChange={(v) => updateConfig("sim", v)} onLaunch={handleLaunch} launching={launching} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Nav */}
      <div style={{
        padding: "24px 48px",
        maxWidth: 1400,
        margin: "0 auto",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <button
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          style={{
            padding: "12px 28px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 999,
            color: "var(--text-secondary)",
            fontSize: 14,
            fontWeight: 600,
            cursor: step === 1 ? "not-allowed" : "pointer",
            opacity: step === 1 ? 0.4 : 1,
            fontFamily: "inherit",
            transition: "all 0.2s",
          }}
        >
          ← Previous
        </button>

        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
          Step {step} of {STEPS.length}
        </span>

        {step < 6 ? (
          <button
            onClick={() => setStep((s) => Math.min(6, s + 1))}
            style={{
              padding: "12px 28px",
              background: "linear-gradient(135deg, #F4B942, #FFD36B)",
              border: "none",
              borderRadius: 999,
              color: "#261232",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Continue →
          </button>
        ) : null}
      </div>
    </div>
  )
}
