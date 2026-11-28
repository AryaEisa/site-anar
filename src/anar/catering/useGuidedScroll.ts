import { useEffect, useMemo, useRef } from 'react'
import { createStepGuide } from '../lib/stepGuide'
import type { StepGuide } from '../lib/stepGuide'
import { DELAYS, NEXT_TARGET } from './guidedFlow'
import type { StepId, TargetId } from './guidedFlow'

/**
 * Får cateringformuläret att gå vidare av sig självt: när gästen fyllt i ett steg och varit stilla en liten stund rullar
 * sidan mjukt till nästa del. Stegen och vad som är "klart" står i guidedFlow.ts, och själva väntan och rullningen i
 * lib/stepGuide.ts (samma som bokningen använder).
 *
 * Här gäller dessutom: sidan väntar med att gå vidare från "Dina uppgifter" medan gästen skriver i "Önskemål" (sista
 * fältet), och Kalkylen rullas inte fram när den redan syns (en klistrad kolumn på en dator).
 */

export type GuidedScroll = Pick<StepGuide<StepId>, 'touch' | 'advance'>

export function useGuidedScroll(done: Record<StepId, boolean>, resolve: (target: TargetId) => HTMLElement | null): GuidedScroll {
  // Senaste värdena, så att en timer som startade vid gästens ändring ser vad som är klart när den går av.
  const doneRef = useRef(done)
  const resolveRef = useRef(resolve)
  useEffect(() => {
    doneRef.current = done
    resolveRef.current = resolve
  })

  const guideRef = useRef<StepGuide<StepId> | null>(null)
  useEffect(() => {
    const guide = createStepGuide<StepId>({
      isDone: (step) => doneRef.current[step],
      resolve: (step) => resolveRef.current(NEXT_TARGET[step]),
      delay: (step) => DELAYS[step],
      skipIfInView: (step) => NEXT_TARGET[step] === 'send',
      hold: (step) => step === 'details' && document.activeElement instanceof HTMLTextAreaElement,
    })
    guideRef.current = guide
    const stop = guide.start()
    return () => {
      stop()
      guideRef.current = null
    }
  }, [])

  // Händelserna (gästens ändringar) kommer efter första ritningen, då guiden finns.
  return useMemo<GuidedScroll>(
    () => ({
      touch: (step, delay) => guideRef.current?.touch(step, delay),
      advance: (step) => guideRef.current?.advance(step),
    }),
    [],
  )
}
