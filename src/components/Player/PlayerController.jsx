import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RigidBody, vec3 } from '@react-three/rapier'
import * as THREE from 'three'
import { useKeyboardControls } from '../../hooks/useKeyboardControls'

const SPEED = 5
const SPRINT_MULTIPLIER = 1.5
const JUMP_FORCE = 5

export function PlayerController() {
    const body = useRef()
    const { camera } = useThree()
    const { forward, backward, left, right, jump, sprint } = useKeyboardControls()

    useFrame(() => {
        if (!body.current) return

        const velocity = body.current.linvel()
        const currentPos = body.current.translation()

        // Camera follow
        camera.position.x = currentPos.x
        camera.position.y = currentPos.y + 2
        camera.position.z = currentPos.z + 5
        camera.lookAt(currentPos.x, currentPos.y, currentPos.z)

        // Movement Logic
        const frontVector = new THREE.Vector3(
            0,
            0,
            Number(backward) - Number(forward)
        )
        const sideVector = new THREE.Vector3(
            Number(left) - Number(right),
            0,
            0
        )

        // Calculate direction relative to camera (simplified for now, usually needs camera quaternion)
        // For now, world space movement
        const direction = new THREE.Vector3()
        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED * (sprint ? SPRINT_MULTIPLIER : 1))

        // Apply velocity (keep y velocity for gravity)
        body.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z }, true)

        // Jump
        if (jump && Math.abs(velocity.y) < 0.1) { // Ground check approximation
            body.current.applyImpulse({ x: 0, y: JUMP_FORCE, z: 0 }, true)
        }
    })

    return (
        <RigidBody ref={body} position={[0, 5, 0]} enabledRotations={[false, false, false]} friction={1} colliders="cuboid">
            <mesh>
                <capsuleGeometry args={[0.5, 1, 4, 8]} />
                <meshStandardMaterial color="cyan" />
            </mesh>
        </RigidBody>
    )
}
