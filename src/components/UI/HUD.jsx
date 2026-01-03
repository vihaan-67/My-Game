import { useEffect, useRef, useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { addEffect } from '@react-three/fiber'

export function HUD() {
    const gameState = useGameStore((state) => state.gameState)
    const startTime = useGameStore((state) => state.startTime)
    const endTime = useGameStore((state) => state.endTime)
    const [time, setTime] = useState(0)

    useEffect(() => {
        let sub
        if (gameState === 'playing') {
            sub = addEffect(() => {
                setTime(Date.now() - startTime)
            })
        } else if (gameState === 'finished') {
            setTime(endTime - startTime)
        }
        return () => sub && sub()
    }, [gameState, startTime, endTime])

    const formatTime = (ms) => {
        const minutes = Math.floor(ms / 60000)
        const seconds = Math.floor((ms % 60000) / 1000)
        const milliseconds = ms % 1000
        return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`
    }

    if (gameState === 'menu') return null

    return (
        <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'white', fontSize: '24px', fontFamily: 'monospace' }}>
            <div>TIME: {formatTime(time)}</div>
            {gameState === 'finished' && <div style={{ color: 'green' }}>RUN COMPLETE!</div>}
        </div>
    )
}
