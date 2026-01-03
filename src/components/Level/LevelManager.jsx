```
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useGameStore } from '../../store/gameStore'

export function LevelManager() {
  const endGame = useGameStore((state) => state.endGame)

  return (
    <group>
      {/* Floor */}
      <RigidBody type="fixed" friction={1}>
        <mesh position={[0, -1, 0]} receiveShadow>
          <boxGeometry args={[100, 1, 100]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </RigidBody>

      {/* Wall Run Wall */}
      <RigidBody type="fixed" friction={1}>
        <mesh position={[-10, 5, 20]} castShadow receiveShadow>
          <boxGeometry args={[1, 10, 40]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </RigidBody>
      
      {/* Obstacle Platform */}
      <RigidBody type="fixed">
        <mesh position={[0, 2, 10]} castShadow receiveShadow>
           <boxGeometry args={[5, 1, 5]} />
           <meshStandardMaterial color="red" />
        </mesh>
      </RigidBody>
      
       {/* Finish Line Trigger */}
       <RigidBody type="fixed" sensor onIntersectionEnter={() => endGame()}>
           <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 40]} />
           <mesh position={[0, 1, 40]}>
               <boxGeometry args={[10, 0.1, 1]} />
               <meshStandardMaterial color="green" />
           </mesh>
       </RigidBody>
    </group>
  )
}
```
