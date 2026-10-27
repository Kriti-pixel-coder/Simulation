import { useRef, useState } from "react"

/**
 * SpotlightCard - Inspired by React Bits & 21st.dev
 * Renders an interactive glass card with a cursor-following radial spotlight highlight.
 */
export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(244, 185, 66, 0.18)",
  borderColor = "rgba(244, 185, 66, 0.4)",
  style = {},
  onClick,
  ...props
}) {
  const divRef = useRef(null)
  const [position, setPosition] = useState({ x: -500, y: -500 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseEnter = () => setOpacity(1)
  const handleMouseLeave = () => setOpacity(0)

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`spotlight-card ${className}`}
      style={{
        position: "relative",
        borderRadius: 20,
        background: "var(--glass-bg)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid var(--glass-border)",
        overflow: "hidden",
        transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease, border-color 0.25s ease",
        ...style,
      }}
      {...props}
    >
      {/* Outer Border Spotlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          padding: 1,
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, ${borderColor}, transparent 80%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
          opacity,
          transition: "opacity 0.25s ease",
          zIndex: 1,
        }}
      />

      {/* Inner Surface Glow Spotlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 75%)`,
          pointerEvents: "none",
          opacity,
          transition: "opacity 0.3s ease",
          zIndex: 1,
        }}
      />

      {/* Content wrapper */}
      <div style={{ position: "relative", zIndex: 2, height: "100%" }}>
        {children}
      </div>
    </div>
  )
}
