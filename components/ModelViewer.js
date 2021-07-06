import {
  Suspense,
  useRef,
  useState,
  useMemo,
  useEffect
} from 'react';
import {
  Canvas,
  useFrame,
  useLoader,
} from '@react-three/fiber';
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from '@react-three/drei';
import { colors } from '@material-ui/core';
import * as THREE from "three";

function ThreeJSModel({ file, ...props }) {
  useMemo(() => THREE.DefaultLoadingManager.addHandler(/\.tga$/i, new TGALoader()), []);
  const group = useRef();
  // const animation = useRef();
  const fbx = useLoader(FBXLoader, file);
  const [mixer] = useState(() => new THREE.AnimationMixer());

  useEffect(() => {
    mixer.clipAction(fbx.animations[0], group.current).play();
    // animation.current.play();
    return () => fbx.animations.forEach((clip) => mixer.uncacheClip(clip));
  }, [mixer, fbx.animations, group]);
  useFrame((state, delta) => mixer.update(delta));

  return (
    <group { ...props } ref={ group }
      scale={ [0.035, 0.035, 0.035] }
      position={ [0, -3.1, -2.5] }
      rotation={ [0, 0, 0] }>
      <primitive object={ fbx } onUpdate={ self => (self.needsUpdate = true) } />
    </group>
  );
}

function Plane() {
  const mesh = useRef();
  return (
    <mesh ref={ mesh }
      scale={ [5.5, 5.5, 5.5] }
      position={ [0, -4.2, 0] }
      rotation={ [-1.2, 0, 0] }>
      <planeBufferGeometry attach="geometry" args={ [3, 3, 1] } />
      <meshLambertMaterial attach="material" transparent color={ colors.grey[700] } />
    </mesh>
  )
};

export default function ModelViewer({ file, size, ...props }) {
  return (
    <Canvas style={ { height: size } }
      colorManagement shadowMap concurrent dispose={ null }>
      <Suspense fallback={ null }>
        <ThreeJSModel size={ 280 } file={ file } />
        <Plane />
      </Suspense>
      <ambientLight intensity={ 0.8 } />
      <pointLight intensity={ 1 } position={ [0, 10, 0] } />
      <OrbitControls />
    </Canvas>
  );
};
