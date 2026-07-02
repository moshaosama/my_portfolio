import { useCallback, useEffect, useRef, useState } from 'react'
import { streams } from '../data/streams'

type StreamNodes = {
  sources: AudioScheduledSourceNode[]
  gains: GainNode[]
  streamGain: GainNode
}

function makeNoiseBuffer(ctx: AudioContext, brown = true) {
  const size = ctx.sampleRate * 4
  const buffer = ctx.createBuffer(1, size, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  let last = 0
  for (let i = 0; i < size; i++) {
    const white = Math.random() * 2 - 1
    last = brown ? (last + 0.02 * white) / 1.02 : white
    data[i] = last * (brown ? 2.8 : 0.35)
  }
  return buffer
}

function buildPreset(ctx: AudioContext, master: GainNode, index: number): StreamNodes {
  const sources: AudioScheduledSourceNode[] = []
  const gains: GainNode[] = []
  const streamGain = ctx.createGain()
  streamGain.gain.value = 1
  streamGain.connect(master)

  const addOsc = (freq: number, type: OscillatorType, gain: number, detune = 0) => {
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.type = type
    osc.frequency.value = freq
    osc.detune.value = detune
    g.gain.value = gain
    osc.connect(g)
    g.connect(streamGain)
    osc.start()
    sources.push(osc)
    gains.push(g)
    return { osc, g }
  }

  const addNoise = (gain: number, freq: number, q = 1.2) => {
    const src = ctx.createBufferSource()
    src.buffer = makeNoiseBuffer(ctx, true)
    src.loop = true
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = freq
    filter.Q.value = q
    const g = ctx.createGain()
    g.gain.value = gain
    src.connect(filter)
    filter.connect(g)
    g.connect(streamGain)
    src.start()
    sources.push(src)
    gains.push(g)
  }

  switch (index % streams.length) {
    case 0: {
      addOsc(55, 'sine', 0.2)
      addOsc(110, 'triangle', 0.06, 2)
      addOsc(220, 'sine', 0.04, -2)
      addNoise(0.07, 180, 1.2)
      break
    }
    case 1: {
      addOsc(82.41, 'triangle', 0.14)
      addOsc(164.81, 'sine', 0.05, 3)
      addOsc(329.63, 'square', 0.03, -4)
      addNoise(0.05, 360, 1.4)
      break
    }
    case 2: {
      addOsc(110, 'sine', 0.18)
      addOsc(220, 'triangle', 0.08, 4)
      addOsc(277.18, 'sine', 0.03, -3)
      addNoise(0.04, 420, 1.8)
      break
    }
    default: {
      addOsc(41.2, 'sine', 0.18)
      addOsc(82.4, 'triangle', 0.07, 2)
      addNoise(0.08, 120, 0.8)
      addOsc(123.47, 'sine', 0.04, 5)
      break
    }
  }

  const lfo = ctx.createOscillator()
  const lfoGain = ctx.createGain()
  lfo.frequency.value = 0.15 + index * 0.05
  lfoGain.gain.value = 0.08 + index * 0.015
  lfo.connect(lfoGain)
  lfoGain.connect(streamGain.gain)
  lfo.start()
  sources.push(lfo)

  return { sources, gains, streamGain }
}

export function useAmbientStream() {
  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const nodesRef = useRef<StreamNodes | null>(null)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)

  const ensureContext = useCallback(async () => {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!Ctx) return null
      ctxRef.current = new Ctx()
      masterRef.current = ctxRef.current.createGain()
      masterRef.current.gain.value = 0
      masterRef.current.connect(ctxRef.current.destination)
    }
    if (ctxRef.current.state === 'suspended') await ctxRef.current.resume()
    return ctxRef.current
  }, [])

  const stopNodes = useCallback(() => {
    nodesRef.current?.sources.forEach((node) => {
      try {
        node.stop()
      } catch {
        /* already stopped */
      }
      node.disconnect()
    })
    nodesRef.current?.gains.forEach((g) => g.disconnect())
    nodesRef.current = null
  }, [])

  const loadStream = useCallback(
    (streamIndex: number, fadeIn = false) => {
      const ctx = ctxRef.current
      const master = masterRef.current
      if (!ctx || !master) return

      stopNodes()
      nodesRef.current = buildPreset(ctx, master, streamIndex)

      if (fadeIn) {
        master.gain.cancelScheduledValues(ctx.currentTime)
        master.gain.setValueAtTime(0, ctx.currentTime)
        master.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 1.8)
      } else {
        master.gain.value = 0.35
      }
    },
    [stopNodes],
  )

  const play = useCallback(async () => {
    const ctx = await ensureContext()
    if (!ctx || !masterRef.current) return false

    if (!nodesRef.current) loadStream(index, true)
    else {
      masterRef.current.gain.cancelScheduledValues(ctx.currentTime)
      masterRef.current.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.6)
    }

    setPlaying(true)
    setReady(true)
    return true
  }, [ensureContext, index, loadStream])

  const pause = useCallback(() => {
    const ctx = ctxRef.current
    const master = masterRef.current
    if (ctx && master) {
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5)
    }
    setPlaying(false)
  }, [])

  const toggle = useCallback(async () => {
    if (playing) pause()
    else await play()
  }, [pause, play, playing])

  const go = useCallback(
    async (direction: -1 | 1) => {
      await ensureContext()
      const next = (index + direction + streams.length) % streams.length
      setIndex(next)
      loadStream(next, true)
      setPlaying(true)
      setReady(true)
    },
    [ensureContext, index, loadStream],
  )

  useEffect(() => () => {
    stopNodes()
    void ctxRef.current?.close()
  }, [stopNodes])

  return {
    index,
    playing,
    ready,
    current: streams[index],
    play,
    pause,
    toggle,
    go,
  }
}
