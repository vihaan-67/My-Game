import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Suspense } from 'react'
import { useGameStore } from './store/gameStore'
import { PlayerController } from './components/Player/PlayerController'
import { LevelManager } from './components/Level/LevelManager'
import { HUD } from './components/UI/HUD'
import { ErrorBoundary } from './components/UI/ErrorBoundary'

function App() {
  const gameState = useGameStore((state) => state.gameState)

  return (
    <ErrorBoundary>
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 75 }}>
        <color attach="background" args={['#171720']} />
        <Suspense fallback={null}>
          <Physics>
            <PlayerController />
            <LevelManager />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          </Physics>
        </Suspense>
      </Canvas>

      <HUD />

      {gameState === 'menu' && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          color: 'white',
          pointerEvents: 'auto'
        }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.2rem' }}>Parkour Speedrun</h1>
          <button
            onClick={() => useGameStore.getState().startGame()}
            style={{
              padding: '1rem 3rem',
              fontSize: '2rem',
              background: '#00D1FF',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              color: 'black',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}
          >
            Start Game
          </button>
        </div>
      )}
    </ErrorBoundary>
  )
}

export default App
