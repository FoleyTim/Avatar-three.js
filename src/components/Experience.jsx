import { Environment, OrbitControls, useAnimations, useFBX, useTexture } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useThree } from "@react-three/fiber";

export const Experience = () => {

  const texture = useTexture("textures/background1.jpg")
  const viewport = useThree((state) => state.viewport)

  return (
    <>
      <OrbitControls />
      <Avatar position={[-0.1, -2.9, 12]} scale={2} />
      <Environment preset="lobby" />
      <mesh scale={1} position={[0, 0, 0]}>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </>
  );
};
