import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { VIEWS } from "./constants"
import { ThemeProvider, useTheme } from "./hooks/useTheme"
import Landing from "./components/landing/Landing"
import SetupStudio from "./components/setup/SetupStudio"
import ControlRoom from "./components/controlroom/ControlRoom"
import BranchLab from "./components/branch/BranchLab"
import ReportCenter from "./components/report/ReportCenter"
import NavBar from "./components/shared/NavBar"

const pageVariants = {
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  exit:    { opacity: 0, y: -16, filter: "blur(4px)", transition: { duration: 0.3 } },
}

function MainApp() {
  const [view, setView]         = useState(VIEWS.LANDING)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("marketsim_user")
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })
  const [simConfig, setSimConfig] = useState(null)
  const [branches, setBranches] = useState([])
  const { theme, toggleTheme, isLight } = useTheme()

  const navigate = (v) => setView(v)

  const handleLogin = (userData) => {
    setCurrentUser(userData)
    try {
      localStorage.setItem("marketsim_user", JSON.stringify(userData))
    } catch (e) {
      console.error(e)
    }
    navigate(VIEWS.SETUP)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    try {
      localStorage.removeItem("marketsim_user")
    } catch (e) {
      console.error(e)
    }
    navigate(VIEWS.LANDING)
  }

  const handleSimLaunch = (config) => {
    setSimConfig(config)
    navigate(VIEWS.CONTROL)
  }

  return (
    <div
      className={`app-container ${isLight ? "theme-light" : "theme-dark"}`}
      style={{
        minHeight: "100vh",
        background: "var(--deep-aubergine)",
        color: "var(--text-primary)",
        transition: "background 0.3s ease, color 0.3s ease",
      }}
    >
      {/* Theme Toggle Button visible on Landing Page */}
      {view === VIEWS.LANDING && (
        <div style={{ position: "fixed", top: 20, right: 24, zIndex: 100 }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 18px",
              borderRadius: 9999,
              background: isLight ? "rgba(255, 255, 255, 0.9)" : "rgba(38, 18, 50, 0.8)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: isLight ? "1px solid rgba(45, 20, 65, 0.15)" : "1px solid rgba(255, 255, 255, 0.12)",
              color: isLight ? "#180F24" : "#F1F4F8",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 700,
              boxShadow: isLight ? "0 4px 20px rgba(45, 20, 65, 0.08)" : "0 4px 20px rgba(0, 0, 0, 0.35)",
              fontFamily: "inherit",
              transition: "all 0.25s ease",
            }}
          >
            <span style={{ fontSize: 15 }}>{isLight ? "🌙" : "☀️"}</span>
            <span>{isLight ? "Dark Theme" : "Light Theme"}</span>
          </motion.button>
        </div>
      )}

      {view !== VIEWS.LANDING && (
        <NavBar
          view={view}
          navigate={navigate}
          theme={theme}
          onToggleTheme={toggleTheme}
          user={currentUser}
          onLogout={handleLogout}
        />
      )}

      <AnimatePresence mode="wait">
        {view === VIEWS.LANDING && (
          <motion.div key="landing" {...pageVariants}>
            <Landing
              onLogin={handleLogin}
              onStart={() => navigate(VIEWS.SETUP)}
            />
          </motion.div>
        )}
        {view === VIEWS.SETUP && (
          <motion.div key="setup" {...pageVariants}>
            <SetupStudio onLaunch={handleSimLaunch} />
          </motion.div>
        )}
        {view === VIEWS.CONTROL && (
          <motion.div key="control" {...pageVariants} style={{ height: "100vh", overflow: "hidden" }}>
            <ControlRoom
              config={simConfig}
              onBranch={(b) => { setBranches([...branches, b]); navigate(VIEWS.BRANCH) }}
              onReport={() => navigate(VIEWS.REPORT)}
            />
          </motion.div>
        )}
        {view === VIEWS.BRANCH && (
          <motion.div key="branch" {...pageVariants}>
            <BranchLab branches={branches} config={simConfig} />
          </motion.div>
        )}
        {view === VIEWS.REPORT && (
          <motion.div key="report" {...pageVariants}>
            <ReportCenter config={simConfig} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  )
}
