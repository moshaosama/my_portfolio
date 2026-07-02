import ScrollScene from './ScrollScene'

export default function ScrollBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <ScrollScene />
      <div className="scene-vignette" />
      <div className="scene-grain" aria-hidden="true" />
    </div>
  )
}
