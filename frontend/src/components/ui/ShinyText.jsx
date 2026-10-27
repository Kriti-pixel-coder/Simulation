/**
 * ShinyText - Inspired by React Bits & 21st.dev
 * Subtle metallic / luminous sweep across text
 */
export default function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = "",
  style = {},
  color = "#F4B942",
}) {
  const animationDuration = `${speed}s`

  return (
    <span
      className={`shiny-text ${disabled ? "disabled" : ""} ${className}`}
      style={{
        background: `linear-gradient(120deg, rgba(255,255,255,0.75) 0%, ${color} 40%, #FFF5DC 50%, ${color} 60%, rgba(255,255,255,0.75) 100%)`,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
        animation: disabled ? "none" : `shinyTextSweep ${animationDuration} linear infinite`,
        ...style,
      }}
    >
      {text}
    </span>
  )
}
