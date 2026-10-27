/**
 * BorderBeam - Inspired by 21st.dev / Magic UI
 * Animates a radiant beam along the perimeter of its parent container.
 */
export default function BorderBeam({
  size = 180,
  duration = 8,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#F4B942",
  colorTo = "#8B5CF6",
  delay = 0,
}) {
  return (
    <div
      style={{
        pointerEvents: "none",
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        border: `${borderWidth}px solid transparent`,
        WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    >
      <div
        style={{
          position: "absolute",
          aspectRatio: "1/1",
          width: size,
          transform: `translate(-50%, -50%)`,
          offsetPath: `rect(0 auto auto 0 round inherit)`,
          background: `linear-gradient(to right, ${colorFrom}, ${colorTo}, transparent)`,
          animation: `borderBeamAnim ${duration}s infinite linear`,
          animationDelay: `-${delay}s`,
        }}
      />
    </div>
  )
}
