import { useLoader, Canvas, useFrame, useThree } from "react-three-fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import * as THREE from "three";
import ReactDOM from 'react-dom'
import React, { Suspense, useState, useCallback, useEffect, Fragment } from 'react'
import { OrbitControls, Plane, Sphere, useMatcapTexture, Box, Sky, Stars, PerspectiveCamera } from 'drei'
import { useGLTF } from '@react-three/drei/useGLTF'
import { VRCanvas, DefaultXRControllers, Hover, Select, Hands } from 'react-xr'
import { Physics, useSphere, useBox, usePlane } from 'use-cannon'
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
  // const group = useRef()
  const args = [ 1.57, .18, 1.57]
  const { nodes, materials } = useGLTF('/chessboard/chessboardCentered.gltf')
  const [ref] = useBox(() => ({ args: args, mass: 0, position: [0, 0.6, -0.54]}))

  // useFrame(() => {
  //   api.position.set(0, 0, 0)
  // })

  // useFrame(state => {
  //   const time = state.clock.getElapsedTime();
  //   if (5) {
  //     group.current.position.y = group.current.position.y;
  //     group.current.rotation.y = group.current.rotation.x;
  //   }
  // })

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh 
      material={materials.BlocksPaper} 
      geometry={nodes['node_MeshObject1316465664-PolyPaper21'].geometry}
      scale={[ 2.3, 2.3, 2.3]}
      />
      <Box args={args}>
      <meshBasicMaterial color="blue" transparent opacity={0.1} />
      </Box>
    </group>
  );
}

function Knight({ position, rotation, ...props }) {
  const args = [ .13, .28, .13]
  const { nodes, materials } = useGLTF('/knight/chessKnight.gltf');
  const [ref] = useBox(() => ({ args: args, mass: 0.5, position }));

/////////////
  useFrame(state => {
    // const time = state.clock.getElapsedTime();
    const { controllers } = useThree()
      ref.current.position.y = ref.current.position.y + controllers.current.position.y;
      ref.current.rotation.y = ref.current.rotation.x;
    
  })

  // const [hover, setHover] = useState(false)
  // const [color, setColor] = useState(0x123456)

  // const onSelect = useCallback(() => {
  //   setColor((Math.random() * 0xffffff) | 0)
  // }, [setColor])
  ///////////

  return (
    <group ref={ref} {...props} dispose={null} scale={[ 1, 1, 1 ]}>
      <Select onSelect={useFrame}>
        <mesh  
          material={materials.BlocksPaper} 
          geometry={nodes['node_MeshObject-1328424064-PolyPaper23'].geometry}
          rotation={rotation} 
        />
      </Select>
      <Box args={args}>
      <meshBasicMaterial color="blue" transparent opacity={0.1} />
      </Box>
    </group>
  );
}

// function KnightBox({ position, rotation, ...props }) {
//   const args = [ 1, 1, 1]
//   const [ref] = useBox(() => ({args: args, mass: 0.5, position, scale: .5 }))
//   return (
//     <group ref={ref} {...props} dispose={null} >
//       <mesh />
//       <Box args={args}>
//       <meshBasicMaterial color="blue" transparent opacity={0.1} />
//       </Box>
//     </group>
//   );
// }
//////////////////////////
function JointCollider({ index, hand }) {
  const { gl } = useThree()
  const handObj = (gl.xr).getHand(hand)
  const joint = handObj.joints[index]
  const size = joint.jointRadius ?? 0.001
  const [tipRef, api] = useSphere(() => ({ args: size, position: [-1000, 0, 0] }))
  useFrame(() => {
    if (joint === undefined) return
    api.position.set(joint.position.x, joint.position.y, joint.position.z)
  })

  return (
    <Sphere ref={tipRef} args={[size]}>
      <meshBasicMaterial transparent opacity={0} attach="material" />
    </Sphere>
  )
}

function HandsReady(props) {
  const [ready, setReady] = useState(false)
  const { gl } = useThree()
  useEffect(() => {
    if (ready) return
    const joint = (gl.xr).getHand(0).joints[4]
    if (joint?.jointRadius !== undefined) return
    const id = setInterval(() => {
      if (joint?.jointRadius !== undefined) {
        setReady(true)
      }
    }, 500)
    return () => clearInterval(id)
  }, [gl, ready])

  return ready ? props.children : null
}

const HandsColliders = () =>
  [...Array(25)].map((_, i) => (
    <Fragment key={i}>
      <JointCollider index={i} hand={0} />
      <JointCollider index={i} hand={1} />
    </Fragment>
  ))

// function Scene() {
//   const [floorRef] = usePlane(() => ({
//     args: [10, 10],
//     rotation: [-Math.PI / 2, 0, 0],
//     position: [0, 1, 0],
//     type: 'Static'
//   }))
//   return (
//     <>
//       <Sky />
//       <Plane ref={floorRef} args={[10, 10]} receiveShadow>
//         <meshStandardMaterial attach="material" color="#fff" />
//       </Plane>
//       <Hands />
//       <HandsReady>
//         <HandsColliders />
//       </HandsReady>
//       {[...Array(7)].map((_, i) => (
//         <Cube position={[0, 1.1 + 0.1 * i, -0.5]} />
//       ))}
//       <OrbitControls />
//       <ambientLight intensity={0.5} />
//       <spotLight position={[1, 8, 1]} angle={0.3} penumbra={1} intensity={1} castShadow />
//     </>
//   )
// }
//////////////////////////

const App = () => {
  // const [isHovered, setIsHovered] = useState(false)
  // const color = isHovered ? 'blue' : '#e23'

  return (
    <VRCanvas colorManagement>
      <PerspectiveCamera
        makeDefault // Registers it as the default camera system-wide (default=false)
        position={[2,4,6]} // All THREE.PerspectiveCamera props are valid
      >
        {/* <mesh /> */}
      </PerspectiveCamera>
      <fog args={['#000', 2, 30]} attach="fog" />
      <Physics
        gravity={[0, -6, 0]}
        iterations={20}
        tolerance={0.0001}
        defaultContactMaterial={{
          friction: 5
        }}
      >
        <Hands />
        <HandsReady>
          <HandsColliders />
        </HandsReady>
        <ambientLight />
        <spotLight position={[0,1.5,0]}/>
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
              <Knight position={[-0.65, 0.83, -1.19]} rotation={[0, -Math.PI / 2, 0]}/>
              <Knight position={[-0.465, 0.83, -1.19]} rotation={[0, -Math.PI / 2, 0]}/>
              <Knight position={[-0.275, 0.83, -1.19]} rotation={[0, -Math.PI / 2, 0]}/>
              <Knight position={[-0.085, 0.83, -1.19]} rotation={[0, -Math.PI / 2, 0]}/>
              <Knight position={[0.095, 0.83, -1.19]} rotation={[0, -Math.PI / 2, 0]}/>
              <Knight position={[0.280, 0.83, -1.19]} rotation={[0, -Math.PI / 2, 0]}/>
              <Knight position={[0.465, 0.83, -1.19]} rotation={[0, -Math.PI / 2, 0]}/>
              <Knight position={[0.645, 0.83, -1.19]} rotation={[0, -Math.PI / 2, 0]}/>

              <Knight position={[-0.65, 0.83, -1.00]} rotation={[0, -Math.PI / 2, 0]}/>
              <Knight position={[-0.465, 0.83, -1.00]} rotation={[0, -Math.PI / 2, 0]}/>
              <Knight position={[-0.275, 0.83, -1.00]} rotation={[0, -Math.PI / 2, 0]}/>
              <Knight position={[-0.085, 0.83, -1.00]} rotation={[0, -Math.PI / 2, 0]}/>
              <Knight position={[0.095, 0.83, -1.00]} rotation={[0, -Math.PI / 2, 0]}/>
              <Knight position={[0.280, 0.83, -1.00]} rotation={[0, -Math.PI / 2, 0]}/>
              <Knight position={[0.465, 0.83, -1.00]} rotation={[0, -Math.PI / 2, 0]}/>
              <Knight position={[0.645, 0.83, -1.00]} rotation={[0, -Math.PI / 2, 0]}/>

              <Knight position={[-0.65, 0.83, -0.09]} rotation={[0, Math.PI / 2, 0]}/>
              <Knight position={[-0.465, 0.83, -0.09]} rotation={[0, Math.PI / 2, 0]}/>
              <Knight position={[-0.275, 0.83, -0.09]} rotation={[0, Math.PI / 2, 0]}/>
              <Knight position={[-0.085, 0.83, -0.09]} rotation={[0, Math.PI / 2, 0]}/>
              <Knight position={[0.095, 0.83, -0.09]} rotation={[0, Math.PI / 2, 0]}/>
              <Knight position={[0.280, 0.83, -0.09]} rotation={[0, Math.PI / 2, 0]}/>
              <Knight position={[0.465, 0.83, -0.09]} rotation={[0, Math.PI / 2, 0]}/>
              <Knight position={[0.645, 0.83, -0.09]} rotation={[0, Math.PI / 2, 0]}/>

              <Knight position={[-0.65, 0.83, 0.10]} rotation={[0, Math.PI / 2, 0]}/>
              <Knight position={[-0.465, 0.83, 0.10]} rotation={[0, Math.PI / 2, 0]}/>
              <Knight position={[-0.275, 0.83, 0.10]} rotation={[0, Math.PI / 2, 0]}/>
              <Knight position={[-0.085, 0.83, 0.10]} rotation={[0, Math.PI / 2, 0]}/>
              <Knight position={[0.095, 0.83, 0.10]} rotation={[0, Math.PI / 2, 0]}/>
              <Knight position={[0.280, 0.83, 0.10]} rotation={[0, Math.PI / 2, 0]}/>
              <Knight position={[0.465, 0.83, 0.10]} rotation={[0, Math.PI / 2, 0]}/>
              <Knight position={[0.645, 0.83, 0.10]} rotation={[0, Math.PI / 2, 0]}/>

              {/* <KnightBox position={[0.40, 3.74, -0.34]} rotation={[0, Math.PI / 2, 0]}/>
              <KnightBox position={[0.40, 3.00, -0.34]} rotation={[0, Math.PI / 2, 0]}/> */}
            </Select>
          </Suspense>
        <DefaultXRControllers />
      </Physics>
    </VRCanvas>
  );
};

ReactDOM.render(<App />, document.getElementById('root'))
