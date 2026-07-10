import { useState } from "react"

export function Counter({onIncrement}: {onIncrement?: (newCount: number) => void}) {

    const [count, setCount] = useState(0)

    function increment() {
        const newCount = count + 3;
        setCount(newCount);
        if (onIncrement) {
            onIncrement(newCount);
        }
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <h1>count: {count}</h1>
            <button onClick={increment} style={{ padding: "20px", borderRadius: "5px" }}>Increment</button>
        </div>
    )

}
