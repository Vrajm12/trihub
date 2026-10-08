import { Environment, Lightformer } from '@react-three/drei'

/**
 * Soft studio lighting. The environment is generated procedurally from
 * Lightformers once (frames={1}) — no HDR download, no per-frame cost.
 */
export function Studio({ intensity = 1 }: { intensity?: number }) {
  return (
    <>
      <ambientLight intensity={0.55 * intensity} />
      <directionalLight position={[4, 8, 6]} intensity={1.25 * intensity} />
      <directionalLight position={[-6, 3, -2]} intensity={0.35 * intensity} color="#E4E6FF" />
      {/* Low front fill: the core's side faces point slightly downward toward the viewer. */}
      <directionalLight position={[0, -5, 8]} intensity={0.75 * intensity} />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2.2} position={[0, 6, 2]} rotation-x={Math.PI / 2} scale={[12, 8, 1]} />
        <Lightformer form="rect" intensity={1.1} position={[-6, 1, 3]} rotation-y={Math.PI / 2} scale={[5, 9, 1]} />
        <Lightformer form="rect" intensity={1.4} position={[6, 2, 2]} rotation-y={-Math.PI / 2} scale={[5, 9, 1]} />
        <Lightformer form="rect" intensity={0.5} color="#D9D7FF" position={[0, -4, 5]} rotation-x={-Math.PI / 2} scale={[10, 4, 1]} />
        {/* Low side strips — reflected by the core's graphite and steel faces */}
        <Lightformer form="rect" intensity={1.2} position={[-5, -3, -2]} scale={[2.5, 7, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[5, -3, -2]} scale={[2.5, 7, 1]} />
      </Environment>
    </>
  )
}
