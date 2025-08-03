"use client"

import { useState, useEffect } from "react"

const Typewriter = ({ phrases, speed = 80, pause = 1200 }) => {
  const [text, setText] = useState("")
  const [idx, setIdx] = useState(0)
  const [subIdx, setSubIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!deleting && subIdx < phrases[idx].length) {
      const timeout = setTimeout(() => setSubIdx(subIdx + 1), speed)
      return () => clearTimeout(timeout)
    } else if (!deleting && subIdx === phrases[idx].length) {
      const timeout = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(timeout)
    } else if (deleting && subIdx > 0) {
      const timeout = setTimeout(() => setSubIdx(subIdx - 1), speed / 2)
      return () => clearTimeout(timeout)
    } else if (deleting && subIdx === 0) {
      setDeleting(false)
      setIdx((idx + 1) % phrases.length)
    }
  }, [subIdx, deleting, idx, phrases, speed, pause])

  useEffect(() => {
    setText(phrases[idx].slice(0, subIdx))
  }, [phrases, idx, subIdx])

  return (
    <span>
      {text}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export default Typewriter
