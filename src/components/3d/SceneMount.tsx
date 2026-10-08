import { Component, Suspense, useRef, type ReactNode } from 'react'
import { useInViewport } from '@/hooks/useInViewport'
import { useCapabilities, type Quality } from '@/hooks/useCapabilities'
import { cn } from '@/lib/utils'

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

interface RenderArgs {
  active: boolean
  quality: Quality
  reduced: boolean
}

/**
 * Performance gate for every WebGL scene:
 * - the scene's JS chunk and canvas mount only when the section nears the viewport
 * - rendering runs only while the section is visible (`active`)
 * - no WebGL / a crashed context / loading → static poster, so content never depends on 3D
 */
export function SceneMount({
  children,
  poster,
  className,
  rootMargin = '400px',
}: {
  children: (args: RenderArgs) => ReactNode
  poster: ReactNode
  className?: string
  rootMargin?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const near = useInViewport(ref, rootMargin, true)
  const visible = useInViewport(ref, '0px')
  const { webgl, quality, reducedMotion } = useCapabilities()

  return (
    <div ref={ref} className={cn('relative', className)}>
      {near && webgl ? (
        <SceneBoundary fallback={poster}>
          <Suspense fallback={poster}>
            <div className="absolute inset-0 animate-[scene-in_1.2s_var(--ease-out-expo)_both]">
              {children({ active: visible, quality, reduced: reducedMotion })}
            </div>
          </Suspense>
        </SceneBoundary>
      ) : (
        poster
      )}
    </div>
  )
}
