import { useLoader } from "react-three-fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import ReactDOM from 'react-dom'
import React, { useState, useRef } from 'react'
import { OrbitControls, Box } from 'drei'
import { VRCanvas, DefaultXRControllers, Hover } from 'react-xr'
import './styles.css'

function Chessboard() {
  // Load the gltf file
  const { nodes, materials } = useLoader(GLTFLoader, "/chessboard.gltf")
  // Fetch some reactive state
  const model = useRef()

  return (
    <mesh dispose={null} scale={[0.1, 0.1, 0.1]}>
      <group ref={model} position={[-0.05, 0.37, 0.3]} scale={[0.15, 0.15, 0.15]}>
        <group rotation={[1.88, -0.35, 2.32]} scale={[2.97, 2.97, 2.97]}>
          <primitive object={nodes.Bone} />
          <skinnedMesh castShadow receiveShadow material={materials.glove} material-roughness={1} geometry={nodes.arm.geometry} skeleton={nodes.arm.skeleton} />
        </group>
        <group rotation={[0, -0.04, 0]} scale={[141.94, 141.94, 141.94]}>
          <mesh castShadow receiveShadow material={materials.wood} geometry={nodes.mesh_0.geometry} />
        </group>
      </group>
    </mesh>
  )
}

const App = () => {
  const [isHovered, setIsHovered] = useState(false)
  const color = isHovered ? 'blue' : '#e23'

  return (
    <VRCanvas>
      <ambientLight />
      <spotLight />

      <OrbitControls />

      {/* <Hover onChange={setIsHovered}>
        <Box position={[0, 0.8, -1]} scale={[0.3, 0.3, 0.3]}>
          <meshStandardMaterial color={color} />
        </Box>
      </Hover> */}
      <Chessboard position={[0, 0.8, -1]} scale={[0.3, 0.3, 0.3]}>
      </Chessboard>
      <DefaultXRControllers />
    </VRCanvas>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
