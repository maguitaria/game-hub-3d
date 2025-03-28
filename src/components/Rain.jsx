import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

const Rain = ({ count = 2000 }) => {
  const rainRef = useRef()
  const velocities = useRef(new Float32Array(count).fill(0))

  useEffect(() => {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = Math.random() * 200 - 100   // x
      positions[i * 3 + 1] = Math.random() * 100 + 50     // y (start higher)
      positions[i * 3 + 2] = Math.random() * 200 - 100   // z
      velocities.current[i] = -Math.random() * 0.2
    }

    rainRef.current.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    )
  }, [count])

  useFrame(() => {
    const rain = rainRef.current
    if (!rain) return

    const positionAttr = rain.geometry.attributes.position
    if (!positionAttr) return

    const positions = positionAttr.array

    for (let i = 0; i < count; i++) {
      let y = positions[i * 3 + 1]
      let velocity = velocities.current[i]

      y += velocity

      if (y < -10) {
        y = Math.random() * 100 + 50 // reset height
        velocities.current[i] = -Math.random() * 0.2
      }

      positions[i * 3 + 1] = y
    }

    positionAttr.needsUpdate = true
  })

  return (
    <points ref={rainRef}>
      <bufferGeometry />
      <pointsMaterial
        color="#7ec8e3" // light bluish rain color
        size={5}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  )
}

export default Rain
