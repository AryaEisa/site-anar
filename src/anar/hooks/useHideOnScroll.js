import { useEffect, useState } from 'react';

/** Så här långt ner på sidan måste man ha scrollat innan headern får gömma sig. */
const HIDE_AFTER_PX = 80;
/** Rörelse (px) som krävs innan riktningen räknas, så att ett darrande finger eller en liten studs inte växlar. */
const SLACK_PX = 6;

/**
 * Headern gömmer sig när gästen scrollar nedåt och visas igen när hen scrollar uppåt.
 * Returnerar { hidden, stuck }: hidden = ska vara utanför skärmen, stuck = sidan är
 * scrollad bort från toppen (headern ligger då över innehållet och behöver egen bakgrund).
 *
 * paused: håll den synlig, t.ex. medan en meny eller ruta i headern är öppen.
 * Tangentbordsfokus i headern visar den alltid (annars tabbar man in i något osynligt).
 */
export default function useHideOnScroll(ref, { paused = false } = {}) {
  const [state, setState] = useState(() => ({
    hidden: false,
    stuck: typeof window !== 'undefined' && window.scrollY > 2,
  }));

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY); // iOS kan studsa under noll
      const delta = y - lastY;
      setState((prev) => {
        let hidden = prev.hidden;
        if (y <= HIDE_AFTER_PX) hidden = false;
        else if (delta > SLACK_PX) hidden = true;
        else if (delta < -SLACK_PX) hidden = false;
        const stuck = y > 2;
        return hidden === prev.hidden && stuck === prev.stuck ? prev : { hidden, stuck };
      });
      // Under gränsen räknas inte små steg: rörelsen samlas tills den är stor nog.
      if (Math.abs(delta) > SLACK_PX || y <= HIDE_AFTER_PX) lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const onFocusIn = () => setState((prev) => (prev.hidden ? { ...prev, hidden: false } : prev));

    const el = ref.current;
    window.addEventListener('scroll', onScroll, { passive: true });
    el?.addEventListener('focusin', onFocusIn);
    return () => {
      window.removeEventListener('scroll', onScroll);
      el?.removeEventListener('focusin', onFocusIn);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ref]);

  return { hidden: state.hidden && !paused, stuck: state.stuck };
}
