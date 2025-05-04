import { useState } from 'react'

export default function Counter({
    children,
    count: initialCount,
}: {
    children: JSX.Element
    count: number
}) {
    const [count, setCount] = useState(initialCount)
    const add = () => setCount((i) => i + 1)
    const subtract = () => setCount((i) => i - 1)

    return (
        <>
            <div className="flex flex-col items-center">
                <button onClick={subtract}>-</button>
                <pre>{count}</pre>
                <button onClick={add}>+</button>
            </div>
            <div className="counter-message">{children}</div>
        </>
    )
}
