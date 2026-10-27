import { motion } from "framer-motion"
import { LogOut, User as UserIcon } from "lucide-react"
import { VIEWS } from "../../constants"

const NAV_ITEMS = [
  { id: VIEWS.SETUP, label: "Setup Studio" },
  { id: VIEWS.CONTROL, label: "Control Room" },
  { id: VIEWS.BRANCH, label: "Branch Lab" },
  { id: VIEWS.REPORT, label: "Reports" },
]

export default function NavBar({ view, navigate, theme, onToggleTheme, user, onLogout }) {
  const isLight = theme === "light"

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: "fixed",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 16px",
        background: isLight ? "rgba(255,255,255,0.92)" : "rgba(38,18,50,0.8)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: isLight ? "1px solid rgba(45,20,65,0.12)" : "1px solid rgba(255,255,255,0.08)",
        borderRadius: 9999,
        boxShadow: isLight ? "0 8px 32px rgba(45,20,65,0.08)" : "0 8px 40px rgba(0,0,0,0.4)",
        transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Logo */}
      <button
        onClick={() => navigate(VIEWS.LANDING)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px 10px",
          borderRadius: 999,
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "linear-gradient(135deg, #F4B942, #FFD36B)", boxShadow: "0 0 12px rgba(244,185,66,0.6)" }} />
        <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.06em", color: isLight ? "#180F24" : "var(--text-primary)", textTransform: "uppercase" }}>
          Market Sim
        </span>
      </button>

      <div style={{ width: 1, height: 22, background: isLight ? "rgba(45,20,65,0.12)" : "rgba(255,255,255,0.1)", margin: "0 4px" }} />

      {/* Nav Items with Framer Motion Sliding Pill */}
      {NAV_ITEMS.map((item) => {
        const isActive = view === item.id
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            style={{
              position: "relative",
              padding: "7px 16px",
              background: "transparent",
              border: "none",
              borderRadius: 999,
              color: isActive
                ? (isLight ? "#B45309" : "#F4B942")
                : (isLight ? "#4E425B" : "var(--text-secondary)"),
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "color 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            {isActive && (
              <motion.div
                layoutId="navPill"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 999,
                  background: isLight ? "rgba(217, 119, 6, 0.12)" : "rgba(244, 185, 66, 0.16)",
                  border: isLight ? "1px solid rgba(217, 119, 6, 0.3)" : "1px solid rgba(244, 185, 66, 0.35)",
                  zIndex: 0,
                }}
              />
            )}
            <span style={{ position: "relative", zIndex: 1 }}>{item.label}</span>
          </button>
        )
      })}

      <div style={{ width: 1, height: 22, background: isLight ? "rgba(45,20,65,0.12)" : "rgba(255,255,255,0.1)", margin: "0 4px" }} />

      {/* Theme Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleTheme}
        title={`Switch to ${isLight ? "Dark" : "Light"} Mode`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 12px",
          borderRadius: 999,
          background: isLight ? "rgba(45,20,65,0.06)" : "rgba(255,255,255,0.08)",
          border: isLight ? "1px solid rgba(45,20,65,0.12)" : "1px solid rgba(255,255,255,0.12)",
          color: isLight ? "#180F24" : "var(--text-primary)",
          fontSize: 12,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "inherit",
          transition: "all 0.2s ease",
        }}
      >
        <span>{isLight ? "🌙" : "☀️"}</span>
        <span style={{ fontSize: 11, letterSpacing: "0.02em" }}>{isLight ? "Dark" : "Light"}</span>
      </motion.button>

      {/* Logged in User Profile Chip and Logout */}
      {user && (
        <>
          <div style={{ width: 1, height: 22, background: isLight ? "rgba(45,20,65,0.12)" : "rgba(255,255,255,0.1)", margin: "0 4px" }} />
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "4px 8px 4px 6px",
            borderRadius: 999,
            background: isLight ? "rgba(45,20,65,0.05)" : "rgba(255,255,255,0.06)",
            border: isLight ? "1px solid rgba(45,20,65,0.1)" : "1px solid rgba(255,255,255,0.1)",
          }}>
            <div style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #F4B942, #E5A832)",
              color: "#180F24",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 800,
              textTransform: "uppercase",
            }}>
              {user.name ? user.name.charAt(0) : <UserIcon size={12} />}
            </div>
            <span style={{
              fontSize: 12,
              fontWeight: 650,
              color: isLight ? "#180F24" : "var(--text-primary)",
              maxWidth: 100,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}>
              {user.name || user.id}
            </span>
            <button
              onClick={onLogout}
              title="Sign Out"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "3px",
                display: "flex",
                alignItems: "center",
                color: isLight ? "#991B1B" : "#F87171",
                borderRadius: 4,
              }}
            >
              <LogOut size={13} />
            </button>
          </div>
        </>
      )}
    </motion.header>
  )
}
