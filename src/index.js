import { useLoader, Canvas, useFrame } from "react-three-fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import * as THREE from "three";
import ReactDOM from 'react-dom'
import React, { Suspense, useState, useRef } from 'react'
import { OrbitControls, Box, Sky, Stars } from 'drei'
import { useGLTF } from '@react-three/drei/useGLTF'
import { VRCanvas, DefaultXRControllers, Hover, Select } from 'react-xr'
import { Physics, useSphere, useBox, usePlane, useCannon } from 'use-cannon'
// import Chessboard from './Chessboard'
import './styles.css'

function Env() {
  const args = [5, 1, 5]
  const [ref] = useBox(() => ({
    args,
    mass: 0
  }))

  return (
    <Box ref={ref} args={args}>
      <meshStandardMaterial color="#666" attach="material" />
    </Box>
  )
}

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
function Chessboard(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/chessboard/chessboardCentered.gltf')
  const [ref, api] = useBox(() => ({  mass: 0 }))

  useFrame(() => {
    api.position.set(0, 0, 0)
  })

  return (
    <group ref={group} {...props} dispose={null} position={[0, 0.60, -0.54]}>
      <mesh ref={ref} material={materials.BlocksPaper} geometry={nodes['node_MeshObject1316465664-PolyPaper21'].geometry}>
      </mesh>
    </group>
  )
}

function Knight(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/knight/chessKnight.gltf')
  const [ref] = useSphere(() => ({ args: 0.2, mass: .1 }))
  return (
    <group ref={group} {...props} dispose={null} scale={[0.5, 0.5, 0.5]}>
      <mesh ref={ref} material={materials.BlocksPaper} geometry={nodes['node_MeshObject-1328424064-PolyPaper23'].geometry} />
    </group>
  )
}

const App = () => {
  // const [isHovered, setIsHovered] = useState(false)
  // const color = isHovered ? 'blue' : '#e23'

  return (
    <VRCanvas colorManagement>
      <fog args={['#000', 2, 20]} attach="fog" />
      <Physics
        gravity={[0, -6, 0]}
        iterations={20}
        tolerance={0.0001}
        defaultContactMaterial={{
          friction: 5.003,
          restitution: 0.6
        }}>
      <ambientLight />
      <spotLight />
      <Sky
        distance={450000} // Camera distance (default=450000)
        sunPosition={[0, 1, 0]} // Sun position normal (defaults to inclination and azimuth if not set)
        inclination={0} // Sun elevation angle from 0 to 1 (default=0)
        azimuth={0.25} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
      />
      <Stars
        radius={100} // Radius of the inner sphere (default=100)
        depth={50} // Depth of area where stars should fit (default=50)
        count={5000} // Amount of stars (default=5000)
        factor={4} // Size factor (default=4)
        saturation={0.5} // Saturation 0-1 (default=0)
        fade // Faded dots (default=false)
      />

      <OrbitControls />

      {/* <Hover onChange={setIsHovered}>
        <Box position={[0, 0.8, -1]} scale={[0.3, 0.3, 0.3]}>
        <meshStandardMaterial color={color} />
        </Box>
      </Hover> */}

      {/* <Physics gravity={[0, -26, 0]} defaultContactMaterial={{ restitution: 0.6 }}> */}
        {/* {balls.map((props) => (<Ball {...props} />))} */}
        <Suspense fallback={null}>
      <Env />
          <Chessboard />
          <Select onSelect={() => console.log('mesh has been selected')}>
            <Knight position={[-0.28, 1.74, -0.82]} rotation={[0, -Math.PI / 2, 0]}/>
            <Knight position={[-0.20, 1.74, -0.82]} rotation={[0, -Math.PI / 2, 0]}/>
            <Knight position={[-0.12, 1.74, -0.82]} rotation={[0, -Math.PI / 2, 0]}/>
            <Knight position={[-0.04, 1.74, -0.82]} rotation={[0, -Math.PI / 2, 0]}/>
            <Knight position={[0.04, 1.74, -0.82]} rotation={[0, -Math.PI / 2, 0]}/>
            <Knight position={[0.12, 1.74, -0.82]} rotation={[0, -Math.PI / 2, 0]}/>
            <Knight position={[0.20, 1.74, -0.82]} rotation={[0, -Math.PI / 2, 0]}/>
            <Knight position={[0.28, 1.74, -0.82]} rotation={[0, -Math.PI / 2, 0]}/>

            <Knight position={[-0.28, 1.74, -0.74]} rotation={[0, -Math.PI / 2, 0]}/>
            <Knight position={[-0.20, 1.74, -0.74]} rotation={[0, -Math.PI / 2, 0]}/>
            <Knight position={[-0.12, 1.74, -0.74]} rotation={[0, -Math.PI / 2, 0]}/>
            <Knight position={[-0.04, 1.74, -0.74]} rotation={[0, -Math.PI / 2, 0]}/>
            <Knight position={[0.04, 1.74, -0.74]} rotation={[0, -Math.PI / 2, 0]}/>
            <Knight position={[0.12, 1.74, -0.74]} rotation={[0, -Math.PI / 2, 0]}/>
            <Knight position={[0.20, 1.74, -0.74]} rotation={[0, -Math.PI / 2, 0]}/>
            <Knight position={[0.28, 1.74, -0.74]} rotation={[0, -Math.PI / 2, 0]}/>

            <Knight position={[-0.28, 1.74, -0.26]} rotation={[0, Math.PI / 2, 0]}/>
            <Knight position={[-0.20, 1.74, -0.26]} rotation={[0, Math.PI / 2, 0]}/>
            <Knight position={[-0.12, 1.74, -0.26]} rotation={[0, Math.PI / 2, 0]}/>
            <Knight position={[-0.04, 1.74, -0.26]} rotation={[0, Math.PI / 2, 0]}/>
            <Knight position={[0.04, 1.74, -0.26]} rotation={[0, Math.PI / 2, 0]}/>
            <Knight position={[0.12, 1.74, -0.26]} rotation={[0, Math.PI / 2, 0]}/>
            <Knight position={[0.20, 1.74, -0.26]} rotation={[0, Math.PI / 2, 0]}/>
            <Knight position={[0.28, 1.74, -0.26]} rotation={[0, Math.PI / 2, 0]}/>

            <Knight position={[-0.28, 1.74, -0.34]} rotation={[0, Math.PI / 2, 0]}/>
            <Knight position={[-0.20, 1.74, -0.34]} rotation={[0, Math.PI / 2, 0]}/>
            <Knight position={[-0.12, 1.74, -0.34]} rotation={[0, Math.PI / 2, 0]}/>
            <Knight position={[-0.04, 1.74, -0.34]} rotation={[0, Math.PI / 2, 0]}/>
            <Knight position={[0.04, 1.74, -0.34]} rotation={[0, Math.PI / 2, 0]}/>
            <Knight position={[0.12, 1.74, -0.34]} rotation={[0, Math.PI / 2, 0]}/>
            <Knight position={[0.20, 1.74, -0.34]} rotation={[0, Math.PI / 2, 0]}/>
            <Knight position={[0.28, 1.74, -0.34]} rotation={[0, Math.PI / 2, 0]}/>
          </Select>
        </Suspense>
      <DefaultXRControllers />
      </Physics>
    </VRCanvas>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
