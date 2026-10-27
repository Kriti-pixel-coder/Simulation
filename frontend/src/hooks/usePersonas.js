import { useState, useEffect, useCallback } from "react"

// Status colour map matching the JSON "status" field
export const STATUS_COLORS = {
  dormant:     "#ACB8CC",  // Silver Mist
  aware:       "#F4B942",  // Marigold
  considering: "#8B5CF6",  // Info/Lavender
  user:        "#22C55E",  // Success/Emerald
  lapsed:      "#FF6B6B",  // Danger/Coral
}

export const SEGMENT_COLORS = {
  students:           "#8B5CF6",
  young_professionals:"#F4B942",
  freelancers:        "#22C55E",
  mid_career:         "#F1F4F8",
  outside_target:     "#6B7A8F",
}

export const SEGMENT_LABELS = {
  students:            "Students",
  young_professionals: "Young Professionals",
  freelancers:         "Freelancers",
  mid_career:          "Mid-Career",
  outside_target:      "Outside Target",
}

// ── Main hook ─────────────────────────────────────────────────
export function usePersonas() {
  const [personas, setPersonas]       = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)
  const [selected, setSelected]       = useState(null)   // inspected persona
  const [filterSegment, setFilterSeg] = useState("all")
  const [filterStatus, setFilterStat] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Load JSON once
  useEffect(() => {
    fetch("/personas.json")
      .then((r) => r.json())
      .then((data) => {
        // Give every persona a stable (x, y) position for the network canvas
        const enriched = data.map((p) => ({
          ...p,
          _x: Math.random(),   // normalised 0-1, scaled by canvas at render time
          _y: Math.random(),
          _vx: (Math.random() - 0.5) * 0.0004,
          _vy: (Math.random() - 0.5) * 0.0004,
          _pulse: Math.random() * Math.PI * 2,
        }))
        setPersonas(enriched)
        setLoading(false)
      })
      .catch((e) => { setError(e); setLoading(false) })
  }, [])

  // Derived helpers
  const segmentCounts = personas.reduce((acc, p) => {
    acc[p.segment_id] = (acc[p.segment_id] || 0) + 1
    return acc
  }, {})

  const statusCounts = personas.reduce((acc, p) => {
    acc[p.state.status] = (acc[p.state.status] || 0) + 1
    return acc
  }, {})

  const kpis = {
    total:      personas.length,
    users:      statusCounts.user        || 0,
    aware:      statusCounts.aware       || 0,
    considering:statusCounts.considering || 0,
    lapsed:     statusCounts.lapsed      || 0,
    dormant:    statusCounts.dormant     || 0,
    adoptionRate: personas.length
      ? (((statusCounts.user || 0) / personas.length) * 100).toFixed(1)
      : "0.0",
    awarenessRate: personas.length
      ? ((((statusCounts.aware||0) + (statusCounts.considering||0) + (statusCounts.user||0)) / personas.length) * 100).toFixed(1)
      : "0.0",
    churnRate: (statusCounts.user||0) + (statusCounts.lapsed||0) > 0
      ? (((statusCounts.lapsed||0) / ((statusCounts.user||0) + (statusCounts.lapsed||0))) * 100).toFixed(1)
      : "0.0",
    avgBudget: personas.length
      ? Math.round(personas.reduce((s, p) => s + p.traits.budget, 0) / personas.length)
      : 0,
    avgInfluence: personas.length
      ? (personas.reduce((s, p) => s + p.traits.influence, 0) / personas.length).toFixed(2)
      : "0.00",
  }

  // Filtered view
  const filtered = personas.filter((p) => {
    if (filterSegment !== "all" && p.segment_id !== filterSegment) return false
    if (filterStatus !== "all" && p.state.status !== filterStatus) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return p.name.toLowerCase().includes(q) || p.occupation.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
    }
    return true
  })

  // Simulate status changes (demo: randomly promote some personas)
  const runSimStep = useCallback(() => {
    setPersonas((prev) =>
      prev.map((p) => {
        const r = Math.random()
        let status = p.state.status
        if (status === "dormant"     && r < 0.003 + p.traits.openness * 0.005) status = "aware"
        if (status === "aware"       && r < 0.008 + p.traits.need_strength * 0.01)  status = "considering"
        if (status === "considering" && r < 0.012 - p.traits.price_sensitivity * 0.006) status = "user"
        if (status === "user"        && r < 0.002 + p.traits.skepticism * 0.002) status = "lapsed"
        return status !== p.state.status
          ? { ...p, state: { ...p.state, status } }
          : p
      })
    )
  }, [])

  return {
    personas, filtered, loading, error,
    selected, setSelected,
    filterSegment, setFilterSeg,
    filterStatus,  setFilterStat,
    searchQuery,   setSearchQuery,
    segmentCounts, statusCounts, kpis,
    runSimStep,
  }
}
