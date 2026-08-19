import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface FoldableButtonProps { label: string; open: boolean; onClick: () => void; children: ReactNode; }

export function FoldableButton({ label, open, onClick, children }: FoldableButtonProps) {
  return <div className="foldable">
    <button className="foldable-trigger" onClick={onClick} aria-expanded={open}><span>{label}</span><motion.span className="foldable-sign" animate={{ rotate: open ? 45 : 0 }} transition={{ type: 'spring', stiffness: 360, damping: 22 }}>+</motion.span></button>
    <AnimatePresence initial={false}>{open && <motion.div className="foldable-content" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 270, damping: 27, mass: 0.75 }}><div>{children}</div></motion.div>}</AnimatePresence>
  </div>;
}
