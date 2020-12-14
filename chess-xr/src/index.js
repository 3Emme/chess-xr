import ReactDOM from 'react-dom'
import React, { useState } from 'react'
import { OrbitControls, Box } from 'drei'
import { VRCanvas, DefaultXRControllers, Hover } from 'react-xr'
import './styles.css'

const App = () => {
  const [isHovered, setIsHovered] = useState(false)
  const color = isHovered ? 'blue' : '#e23'

  return (
    <VRCanvas>
      <ambientLight />
      <spotLight />

      <OrbitControls />

      <Hover onChange={setIsHovered}>
        <Box position={[0, 0.8, -1]} scale={[0.3, 0.3, 0.3]}>
          <meshStandardMaterial color={color} />
        </Box>
      </Hover>

      <DefaultXRControllers />
    </VRCanvas>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
