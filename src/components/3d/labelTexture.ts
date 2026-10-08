import * as THREE from 'three'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import type { LucideIcon } from 'lucide-react'

/**
 * Module labels are drawn into canvas textures and mapped onto the 3D cards.
 * Unlike DOM overlays they are occluded by the core, follow depth exactly and
 * render correctly in on-demand (reduced-motion) mode.
 */

const PX_PER_UNIT = 360
const FONT = '"Google Sans Flex", "Manrope", system-ui, sans-serif'
const INK = '#111318'
const INK_2 = '#626872'
const ACCENT = '#4F46E5'
const POSITIVE = '#15803D'

const iconCache = new Map<string, Promise<HTMLImageElement | null>>()

/** Renders a lucide icon to an <img> once, via a detached React root. */
function iconImage(Icon: LucideIcon, color: string) {
  const key = `${Icon.displayName ?? Icon.name}:${color}`
  let hit = iconCache.get(key)
  if (!hit) {
    hit = new Promise((resolve) => {
      // Deferred: labels are created during render, where flushSync is a no-op.
      setTimeout(() => {
        const host = document.createElement('div')
        const root = createRoot(host)
        flushSync(() => root.render(createElement(Icon, { size: 64, color, strokeWidth: 2 })))
        let svg = host.innerHTML
        root.unmount()
        if (!svg) return resolve(null)
        if (!svg.includes('xmlns=')) svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = () => resolve(null)
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
      })
    })
    iconCache.set(key, hit)
  }
  return hit
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}

export type LabelState = 'idle' | 'hover' | 'selected'

export interface LabelSpec {
  /** Face size in world units. */
  width: number
  height: number
  title: string
  note?: string
  icon: LucideIcon
  layout: 'card' | 'tile'
}

export class ModuleLabel {
  readonly texture: THREE.CanvasTexture
  private ctx: CanvasRenderingContext2D
  private state: LabelState = 'idle'
  private icons: { ink?: HTMLImageElement | null; white?: HTMLImageElement | null } = {}
  private spec: LabelSpec
  private onChange: () => void

  constructor(spec: LabelSpec, onChange: () => void, anisotropy = 4) {
    this.spec = spec
    this.onChange = onChange
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(spec.width * PX_PER_UNIT)
    canvas.height = Math.round(spec.height * PX_PER_UNIT)
    this.ctx = canvas.getContext('2d')!
    this.texture = new THREE.CanvasTexture(canvas)
    this.texture.colorSpace = THREE.SRGBColorSpace
    this.texture.anisotropy = anisotropy
    this.texture.minFilter = THREE.LinearMipmapLinearFilter

    this.draw()
    Promise.all([iconImage(spec.icon, INK), iconImage(spec.icon, '#FFFFFF'), document.fonts?.ready]).then(([ink, white]) => {
      this.icons = { ink, white }
      this.draw()
    })
  }

  setState(state: LabelState) {
    if (state === this.state) return
    this.state = state
    this.draw()
  }

  dispose() {
    this.texture.dispose()
  }

  private draw() {
    const { ctx } = this
    const { width: W, height: H } = ctx.canvas
    const on = this.state !== 'idle'
    ctx.clearRect(0, 0, W, H)

    const tile = this.spec.layout === 'tile'
    const pad = (tile ? 0.16 : 0.12) * PX_PER_UNIT
    const chip = (tile ? 0.34 : 0.2) * PX_PER_UNIT
    const titleSize = (tile ? 0.25 : 0.135) * PX_PER_UNIT

    // Icon chip
    const cx = pad
    const cy = tile ? H / 2 - chip - 0.03 * PX_PER_UNIT : pad
    ctx.fillStyle = on ? ACCENT : 'rgba(17,19,24,0.06)'
    roundRect(ctx, cx, cy, chip, chip, chip * 0.28)
    ctx.fill()
    const img = on ? this.icons.white : this.icons.ink
    if (img) {
      const s = chip * 0.52
      ctx.drawImage(img, cx + (chip - s) / 2, cy + (chip - s) / 2, s, s)
    }

    // Title — shrinks to fit long names
    ctx.fillStyle = INK
    ctx.font = `600 ${titleSize}px ${FONT}`
    const room = tile ? W - pad * 2 : W - (cx + chip + 0.07 * PX_PER_UNIT) - pad
    const measured = ctx.measureText(this.spec.title).width
    if (measured > room) ctx.font = `600 ${(titleSize * room) / measured}px ${FONT}`
    ctx.textBaseline = 'middle'
    if (tile) {
      ctx.fillText(this.spec.title, pad, cy + chip + 0.07 * PX_PER_UNIT + titleSize / 2)
    } else {
      const tx = cx + chip + 0.07 * PX_PER_UNIT
      ctx.fillText(this.spec.title, tx, cy + chip / 2)
      // Status dot — only when the title leaves room for it
      const dotX = W - pad - 0.03 * PX_PER_UNIT
      if (tx + ctx.measureText(this.spec.title).width < dotX - 0.06 * PX_PER_UNIT) {
        ctx.fillStyle = on ? ACCENT : POSITIVE
        ctx.globalAlpha = on ? 1 : 0.7
        ctx.beginPath()
        ctx.arc(dotX, cy + chip / 2, 0.022 * PX_PER_UNIT, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }

      // Footer: note on hover, placeholder bars otherwise
      const fy = H - pad
      if (on && this.spec.note) {
        // Note wraps onto at most two lines, bottom-aligned.
        const size = 0.078 * PX_PER_UNIT
        ctx.fillStyle = INK_2
        ctx.font = `400 ${size}px ${FONT}`
        ctx.textBaseline = 'alphabetic'
        const lines: string[] = []
        let line = ''
        for (const word of this.spec.note.split(' ')) {
          const next = line ? `${line} ${word}` : word
          if (ctx.measureText(next).width > W - pad * 2 && line) {
            lines.push(line)
            line = word
          } else line = next
        }
        lines.push(line)
        lines.slice(0, 2).forEach((l, k, arr) => ctx.fillText(l, pad, fy - (arr.length - 1 - k) * size * 1.3))
      } else {
        ctx.fillStyle = 'rgba(17,19,24,0.09)'
        let x = pad
        for (const w of [0.9, 0.55, 0.75, 0.4]) {
          const bw = w * 0.26 * (W - pad * 2)
          roundRect(ctx, x, fy - 0.012 * PX_PER_UNIT, bw, 0.024 * PX_PER_UNIT, 4)
          ctx.fill()
          x += bw + 0.03 * PX_PER_UNIT
        }
      }
    }

    this.texture.needsUpdate = true
    this.onChange()
  }
}
