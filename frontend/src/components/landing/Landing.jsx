import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  GitBranch,
  FileText,
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from "lucide-react"
import SpotlightCard from "../ui/SpotlightCard"
import ShinyText from "../ui/ShinyText"
import BorderBeam from "../ui/BorderBeam"
import HeroSimPreview from "./HeroSimPreview"

export default function Landing({ onStart, onLogin }) {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [mode, setMode] = useState("login") // "login" | "signup"
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")
  const [forgotSent, setForgotSent] = useState(false)

  // Direct 1-Click Launch into Setup
  const handleLaunchStudio = () => {
    const userProfile = {
      id: "analyst_lead",
      name: "Lead Strategist",
      email: "strategist@marketsim.ai",
      role: "Senior Simulation Architect",
      authProvider: "session",
    }
    if (onLogin) onLogin(userProfile)
    else if (onStart) onStart(userProfile)
  }

  const handleOpenAuth = (authMode = "login") => {
    setMode(authMode)
    setError("")
    setAuthModalOpen(true)
  }

  const handleAuthSubmit = (e) => {
    if (e) e.preventDefault()
    setError("")

    if (!userId.trim()) {
      setError("Please enter your User ID or Email")
      return
    }
    if (!password) {
      setError("Please enter your password")
      return
    }
    if (mode === "signup") {
      if (!fullName.trim()) {
        setError("Please enter your full name")
        return
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters")
        return
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match")
        return
      }
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      const userProfile = {
        id: userId.trim(),
        name: mode === "signup" ? fullName.trim() : (userId.includes("@") ? userId.split("@")[0] : userId.trim()),
        email: userId.includes("@") ? userId.trim() : `${userId.trim().toLowerCase()}@marketsim.ai`,
        role: "Market Strategist",
        authProvider: "credentials",
      }
      setAuthModalOpen(false)
      if (onLogin) onLogin(userProfile)
      else if (onStart) onStart(userProfile)
    }, 600)
  }

  const handleGoogleSignIn = (isSignUp = false) => {
    setIsLoading(true)
    setError("")
    setTimeout(() => {
      setIsLoading(false)
      const googleUser = {
        id: "google_user_8912",
        name: isSignUp ? "New Google User" : "Jatin Sharma",
        email: "jatin.sharma@gmail.com",
        role: "Lead Analyst",
        authProvider: "google",
      }
      setAuthModalOpen(false)
      if (onLogin) onLogin(googleUser)
      else if (onStart) onStart(googleUser)
    }, 500)
  }

  const handleDemoLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      const demoUser = {
        id: "analyst_demo",
        name: "Demo Strategist",
        email: "demo@marketsim.ai",
        role: "Senior Simulation Architect",
        authProvider: "demo",
      }
      setAuthModalOpen(false)
      if (onLogin) onLogin(demoUser)
      else if (onStart) onStart(demoUser)
    }, 350)
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    if (!forgotEmail) return
    setForgotSent(true)
    setTimeout(() => {
      setShowForgotModal(false)
      setForgotSent(false)
      setForgotEmail("")
    }, 2000)
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--deep-aubergine)",
        color: "var(--text-primary)",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Background Dot Grid with Vignette Mask (21st.dev / React Bits Pattern) */}
      <div
        className="bg-dot-matrix"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
        }}
      />

      {/* Ambient Radial Spotlight Blooms */}
      <div
        style={{
          position: "fixed",
          top: "-10%",
          left: "25%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(244, 185, 66, 0.12) 0%, transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "40%",
          right: "-5%",
          width: 550,
          height: 550,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)",
          filter: "blur(100px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ============================================================
          TOP NAV BAR (Executive Floating Dock)
          ============================================================ */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--glass-border)",
          background: "rgba(38, 18, 50, 0.65)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #F4B942, #FFD36B)",
                boxShadow: "0 0 14px #F4B942",
              }}
            />
            <span
              style={{
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-primary)",
              }}
            >
              Market Sim <span style={{ color: "#F4B942", fontWeight: 500 }}>AI</span>
            </span>

            {/* Live Status Pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "3px 10px",
                borderRadius: 999,
                background: "rgba(34, 197, 94, 0.12)",
                border: "1px solid rgba(34, 197, 94, 0.25)",
                color: "#22C55E",
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "JetBrains Mono, monospace",
                marginLeft: 8,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 8px #22C55E" }} />
              <span>1,000 AGENTS LIVE</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <nav style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 13, fontWeight: 600 }}>
            <a href="#features" style={{ color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "var(--text-primary)"} onMouseOut={(e) => e.target.style.color = "var(--text-secondary)"}>
              Capabilities
            </a>
            <a href="#personas" style={{ color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "var(--text-primary)"} onMouseOut={(e) => e.target.style.color = "var(--text-secondary)"}>
              Persona Engine
            </a>
            <a href="#architecture" style={{ color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "var(--text-primary)"} onMouseOut={(e) => e.target.style.color = "var(--text-secondary)"}>
              Branch Lab
            </a>
          </nav>

          {/* Action CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDemoLogin}
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                background: "rgba(244, 185, 66, 0.12)",
                border: "1px solid rgba(244, 185, 66, 0.3)",
                color: "var(--marigold)",
                fontSize: 12.5,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span>⚡ 1-Click Demo</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleOpenAuth("login")}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                background: "linear-gradient(135deg, #F4B942, #E5A832)",
                border: "none",
                color: "#180F24",
                fontSize: 12.5,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: "0 4px 16px rgba(244, 185, 66, 0.25)",
              }}
            >
              Sign In
            </motion.button>
          </div>
        </div>
      </header>

      {/* ============================================================
          HERO SECTION (21st.dev / React Bits Inspired)
          ============================================================ */}
      <section style={{ position: "relative", zIndex: 1, padding: "64px 24px 48px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 48 }}>
          {/* Animated Announcement Pill with BorderBeam */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="badge-border-beam"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 18px",
              marginBottom: 24,
              fontSize: 12.5,
              fontWeight: 700,
              cursor: "pointer",
            }}
            onClick={handleLaunchStudio}
          >
            <BorderBeam size={100} duration={6} colorFrom="#F4B942" colorTo="#8B5CF6" />
            <Sparkles size={14} color="#F4B942" />
            <span>Agentic Intelligence v2.4 • 1,000 Autonomous Synthetic Personas</span>
            <ChevronRight size={14} />
          </motion.div>

          {/* Main Grand Headline with ShinyText */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)",
              fontWeight: 850,
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              maxWidth: 960,
              margin: "0 0 20px 0",
            }}
          >
            Simulate Market Adoption Before You{" "}
            <ShinyText text="Burn Capital" color="#F4B942" speed={3.5} />
          </motion.h1>

          {/* High-craft Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
              color: "var(--text-secondary)",
              maxWidth: 720,
              lineHeight: 1.6,
              margin: "0 0 32px 0",
            }}
          >
            Stress-test go-to-market strategies, measure price elasticity, and branch counterfactual what-if scenarios with 1,000 mathematically grounded AI consumer agents.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLaunchStudio}
              className="btn-magnetic"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 32px",
                borderRadius: 9999,
                background: "linear-gradient(135deg, #F4B942 0%, #E5A832 100%)",
                color: "#180F24",
                fontSize: 14.5,
                fontWeight: 800,
                cursor: "pointer",
                border: "none",
                boxShadow: "0 8px 30px rgba(244, 185, 66, 0.32)",
                fontFamily: "inherit",
              }}
            >
              <span>Launch Simulation Studio</span>
              <ArrowRight size={17} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenAuth("signup")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                borderRadius: 9999,
                background: "var(--glass-bg)",
                backdropFilter: "blur(20px)",
                border: "1px solid var(--glass-border-hover)",
                color: "var(--text-primary)",
                fontSize: 14.5,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.2s ease",
              }}
            >
              <span>Create Free Account</span>
            </motion.button>
          </motion.div>
        </div>

        {/* ============================================================
            INTERACTIVE LIVE COCKPIT PREVIEW (Embedded directly on Hero)
            ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 1080, margin: "0 auto 40px" }}
        >
          <HeroSimPreview onLaunch={handleLaunchStudio} />
        </motion.div>
      </section>

      {/* ============================================================
          EXECUTIVE STATS STRIP
          ============================================================ */}
      <section style={{ position: "relative", zIndex: 1, borderY: "1px solid var(--glass-border)", background: "rgba(255, 255, 255, 0.02)", padding: "28px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24, textAlign: "center" }}>
          <div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "var(--text-primary)", fontFamily: "JetBrains Mono, monospace" }}>
              1,000
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginTop: 4 }}>
              Autonomous Personas
            </div>
          </div>
          <div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#F4B942", fontFamily: "JetBrains Mono, monospace" }}>
              Bass Model
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginTop: 4 }}>
              Innovation & Imitation Curves
            </div>
          </div>
          <div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#22C55E", fontFamily: "JetBrains Mono, monospace" }}>
              Branch Lab
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginTop: 4 }}>
              Counterfactual What-If Forking
            </div>
          </div>
          <div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#8B5CF6", fontFamily: "JetBrains Mono, monospace" }}>
              Zero Hallucination
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginTop: 4 }}>
              Deterministic Empirical Seed
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          BENTO GRID CAPABILITIES (Spotlight Cards from React Bits)
          ============================================================ */}
      <section id="features" style={{ position: "relative", zIndex: 1, padding: "80px 24px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--marigold)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
            Core Platform Architecture
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: 800, letterSpacing: -0.6, margin: 0 }}>
            Precision Tools for Market Strategists
          </h2>
        </div>

        {/* 4-Tile Bento Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 20 }}>
          {/* Tile 1: 1,000 Autonomous Personas (7 cols) */}
          <div style={{ gridColumn: "span 7" }}>
            <SpotlightCard style={{ height: "100%", padding: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(244, 185, 66, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#F4B942" }}>
                  <User size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 750, margin: 0 }}>1,000 Micro-Agent Personas</h3>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Heterogeneous psychological traits & verified budgets</span>
                </div>
              </div>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 20 }}>
                Every persona in the network possesses unique budget constraints, openness to innovation, price sensitivity, and social influence vectors. They communicate organically through peer referral channels.
              </p>
              {/* Segment Mini Chips */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Students (₹1.5k avg)", "Young Pros (₹5.8k avg)", "Founders (₹12k avg)", "Enterprises (₹45k avg)"].map((s) => (
                  <span key={s} style={{ padding: "6px 12px", borderRadius: 8, background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.08)", fontSize: 12, fontFamily: "JetBrains Mono, monospace" }}>
                    {s}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </div>

          {/* Tile 2: Bass Diffusion Engine (5 cols) */}
          <div style={{ gridColumn: "span 5" }}>
            <SpotlightCard style={{ height: "100%", padding: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(34, 197, 94, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#22C55E" }}>
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 750, margin: 0 }}>Bass Diffusion Physics</h3>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Coefficients of Innovation & Imitation</span>
                </div>
              </div>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Replaces speculative estimates with deterministic contagion curves. Calculates S-curve saturation points, viral tipping thresholds, and product fatigue rates.
              </p>
            </SpotlightCard>
          </div>

          {/* Tile 3: Counterfactual Branch Lab (5 cols) */}
          <div style={{ gridColumn: "span 5" }}>
            <SpotlightCard style={{ height: "100%", padding: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(139, 92, 246, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#8B5CF6" }}>
                  <GitBranch size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 750, margin: 0 }}>Counterfactual Branching</h3>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Fork simulation timelines at any day</span>
                </div>
              </div>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Take your market state at Day 15 and fork it. Test: "What if we discount by 20% vs launching a competitor defensive campaign?" Compare side-by-side metric diffs.
              </p>
            </SpotlightCard>
          </div>

          {/* Tile 4: Executive AI Intelligence (7 cols) */}
          <div style={{ gridColumn: "span 7" }}>
            <SpotlightCard style={{ height: "100%", padding: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(244, 185, 66, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#F4B942" }}>
                  <FileText size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 750, margin: 0 }}>McKinsey-Grade Intelligence</h3>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Board-ready strategic synthesis</span>
                </div>
              </div>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 16 }}>
                Automatically aggregates persona sentiment, conversion obstacles, segment pricing cliffs, and competitor vulnerability into executive-level action memos.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#22C55E", fontWeight: 700 }}>
                <ShieldCheck size={16} />
                <span>Instant automated export to executive briefing decks & PDF</span>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* ============================================================
          PERSONA EXPLORER SPOTLIGHT PREVIEW
          ============================================================ */}
      <section id="personas" style={{ position: "relative", zIndex: 1, padding: "40px 24px 80px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.4rem)", fontWeight: 800, margin: "0 0 8px 0" }}>
            Meet the Synthetic Agents
          </h2>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0 }}>
            Sample agents extracted directly from our 1,000-persona empirical dataset
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
          {[
            { name: "Aryan H.", age: 22, role: "College Student", segment: "Students", budget: "₹1,200", open: "0.85", status: "Active User", color: "#22C55E" },
            { name: "Priya M.", age: 29, role: "Founder / CEO", segment: "Founders", budget: "₹14,500", open: "0.72", status: "Considering", color: "#8B5CF6" },
            { name: "Vikram R.", age: 41, role: "VP Technology", segment: "Enterprises", budget: "₹65,000", open: "0.45", status: "Aware", color: "#F4B942" },
            { name: "Ananya S.", age: 26, role: "Freelance Designer", segment: "Freelancers", budget: "₹3,400", open: "0.79", status: "Active User", color: "#22C55E" },
          ].map((p) => (
            <SpotlightCard key={p.name} style={{ padding: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)" }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{p.role} • {p.age}y</div>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 999, background: `${p.color}15`, border: `1px solid ${p.color}35`, color: p.color, fontFamily: "JetBrains Mono, monospace" }}>
                  {p.status}
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 12, borderTop: "1px solid var(--glass-border)", paddingTop: 12 }}>
                <div>
                  <span style={{ color: "var(--text-muted)", display: "block", fontSize: 10 }}>BUDGET</span>
                  <span style={{ fontWeight: 700, fontFamily: "JetBrains Mono, monospace", color: "#F4B942" }}>{p.budget}</span>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)", display: "block", fontSize: 10 }}>OPENNESS</span>
                  <span style={{ fontWeight: 700, fontFamily: "JetBrains Mono, monospace", color: "var(--text-primary)" }}>{p.open}</span>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* ============================================================
          BOTTOM CALL TO ACTION
          ============================================================ */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 24px 100px", maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
        <SpotlightCard style={{ padding: "56px 36px", border: "1px solid rgba(244, 185, 66, 0.25)" }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 850, letterSpacing: -0.8, margin: "0 0 16px 0" }}>
            Ready to test your product against 1,000 AI agents?
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", maxWidth: 580, margin: "0 auto 32px" }}>
            Configure your pricing, choose your audience segments, and launch a complete 30-day simulation in under 60 seconds.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLaunchStudio}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 34px",
                borderRadius: 9999,
                background: "linear-gradient(135deg, #F4B942, #E5A832)",
                color: "#180F24",
                fontSize: 14.5,
                fontWeight: 800,
                cursor: "pointer",
                border: "none",
                boxShadow: "0 8px 30px rgba(244, 185, 66, 0.35)",
              }}
            >
              <span>Launch Setup Studio</span>
              <ArrowRight size={17} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDemoLogin}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "14px 28px",
                borderRadius: 9999,
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border-hover)",
                color: "var(--text-primary)",
                fontSize: 14.5,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <span>1-Click Test Drive</span>
            </motion.button>
          </div>
        </SpotlightCard>
      </section>

      {/* ============================================================
          AUTHENTICATION MODAL (Frosted Glass Overlay)
          ============================================================ */}
      <AnimatePresence>
        {authModalOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(10, 4, 16, 0.75)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 999,
              padding: 16,
            }}
            onClick={() => setAuthModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: 460,
                background: "rgba(35, 16, 48, 0.95)",
                border: "1px solid var(--glass-border-hover)",
                borderRadius: 24,
                padding: "36px 32px",
                boxShadow: "0 30px 90px rgba(0, 0, 0, 0.6)",
                position: "relative",
              }}
            >
              {/* Modal Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>
                    {mode === "login" ? "Analyst Portal Access" : "Register Simulation Seat"}
                  </h2>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>
                    {mode === "login" ? "Enter your credentials to access live runs" : "Create your analyst profile to access autonomous agents"}
                  </p>
                </div>
                {/* 1-Click Demo Shortcut */}
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: "rgba(244, 185, 66, 0.15)",
                    border: "1px solid rgba(244, 185, 66, 0.35)",
                    color: "var(--marigold)",
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  ⚡ Demo 1-Click
                </button>
              </div>

              {/* Mode Switcher Tabs */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  padding: 4,
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: 12,
                  marginBottom: 20,
                }}
              >
                <button
                  type="button"
                  onClick={() => { setMode("login"); setError(""); }}
                  style={{
                    padding: "8px 0",
                    border: "none",
                    borderRadius: 9,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    background: mode === "login" ? "var(--marigold)" : "transparent",
                    color: mode === "login" ? "#180F24" : "var(--text-secondary)",
                    transition: "all 0.2s ease",
                  }}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setMode("signup"); setError(""); }}
                  style={{
                    padding: "8px 0",
                    border: "none",
                    borderRadius: 9,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    background: mode === "signup" ? "var(--marigold)" : "transparent",
                    color: mode === "signup" ? "#180F24" : "var(--text-secondary)",
                    transition: "all 0.2s ease",
                  }}
                >
                  Create Account
                </button>
              </div>

              {/* Error Banner */}
              {error && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#FCA5A5", fontSize: 12, marginBottom: 14 }}>
                  <AlertCircle size={15} />
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleAuthSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {mode === "signup" && (
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 5 }}>
                      Full Name
                    </label>
                    <div style={{ position: "relative" }}>
                      <User size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Jatin Sharma"
                        className="input-field"
                        style={{ paddingLeft: 40 }}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 5 }}>
                    User ID or Email
                  </label>
                  <div style={{ position: "relative" }}>
                    <Mail size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                    <input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="e.g. strategist@marketsim.ai"
                      className="input-field"
                      style={{ paddingLeft: 40 }}
                    />
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)" }}>
                      Password
                    </label>
                    {mode === "login" && (
                      <button
                        type="button"
                        onClick={() => setShowForgotModal(true)}
                        style={{ background: "none", border: "none", color: "var(--marigold)", fontSize: 11, fontWeight: 600, cursor: "pointer" }}
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div style={{ position: "relative" }}>
                    <Lock size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="input-field"
                      style={{ paddingLeft: 40, paddingRight: 40 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {mode === "signup" && (
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 5 }}>
                      Confirm Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <Lock size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="input-field"
                        style={{ paddingLeft: 40 }}
                      />
                    </div>
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    marginTop: 6,
                    padding: "13px 20px",
                    borderRadius: 12,
                    border: "none",
                    background: "linear-gradient(135deg, #F4B942 0%, #E5A832 100%)",
                    color: "#180F24",
                    fontSize: 14,
                    fontWeight: 750,
                    cursor: isLoading ? "wait" : "pointer",
                    boxShadow: "0 6px 20px rgba(244, 185, 66, 0.28)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  {isLoading ? <span>Authenticating...</span> : <span>{mode === "login" ? "Sign In to Simulation Portal" : "Complete Registration"}</span>}
                </motion.button>
              </form>

              {/* Social Login */}
              <div style={{ display: "flex", alignItems: "center", margin: "18px 0 14px", color: "var(--text-muted)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                <div style={{ flex: 1, height: 1, background: "var(--glass-border)" }} />
                <span style={{ padding: "0 10px" }}>or</span>
                <div style={{ flex: 1, height: 1, background: "var(--glass-border)" }} />
              </div>

              <motion.button
                type="button"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => handleGoogleSignIn(false)}
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "11px 16px",
                  borderRadius: 12,
                  border: "1px solid var(--glass-border)",
                  background: "var(--glass-bg)",
                  color: "var(--text-primary)",
                  fontSize: 13,
                  fontWeight: 650,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Forgot Password Sub-Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: 16,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              style={{
                width: "100%",
                maxWidth: 400,
                background: "var(--rich-aubergine)",
                border: "1px solid var(--glass-border-hover)",
                borderRadius: 20,
                padding: "24px",
              }}
            >
              <h3 style={{ margin: "0 0 8px 0", fontSize: 18, fontWeight: 700 }}>Reset Password</h3>
              <p style={{ margin: "0 0 16px 0", fontSize: 13, color: "var(--text-secondary)" }}>
                Enter your email address to receive password reset instructions.
              </p>
              {forgotSent ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 12, borderRadius: 10, background: "rgba(34, 197, 94, 0.15)", color: "var(--success)", fontSize: 13, fontWeight: 600 }}>
                  <Check size={16} />
                  <span>Reset instructions sent!</span>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="input-field"
                  />
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                    <button type="button" onClick={() => setShowForgotModal(false)} className="btn btn-ghost btn-sm">Cancel</button>
                    <button type="submit" className="btn btn-primary btn-sm">Send Reset Link</button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
