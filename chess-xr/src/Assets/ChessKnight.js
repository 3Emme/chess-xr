/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei/useGLTF'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/chessKnight.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh material={materials.BlocksPaper} geometry={nodes['node_MeshObject-1328424064-PolyPaper23'].geometry} />
    </group>
  )
}

useGLTF.preload('/chessKnight.gltf')