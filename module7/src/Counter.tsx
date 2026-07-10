import { useState } from "react"

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h1>count: {count}</h1>
      <button onClick={increment()} style={{ padding: "20px", borderRadius: "5px" }}>Increment</button>
    </div>
  )

  function increment() {
    return () => setCount((count) => count + 3)
  }
}
