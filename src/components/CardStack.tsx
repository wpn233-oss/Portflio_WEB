import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowUpRight, Mouse } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '../data/projects';

interface CardStackProps { projects: Project[]; onSelect: (project: Project) => void; }
type CardPose = 'active' | 'top' | 'bottom' | 'hidden';
const WHEEL_DISTANCE_PER_CARD = 92;

export function CardStack({ projects, onSelect }: CardStackProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [wheelProgress, setWheelProgress] = useState(0);
  const wheelDistance = useRef(0);
  const restTimer = useRef<number | undefined>(undefined);
  const touchStart = useRef<number | null>(null);

  const advance = useCallback((steps: number) => {
    if (!steps) return;
    setDirection(steps > 0 ? 1 : -1);
    setIndex((current) => (current + steps + projects.length * 10) % projects.length);
  }, [projects.length]);

  const consumeWheel = useCallback((deltaY: number) => {
    wheelDistance.current += deltaY;
    const steps = wheelDistance.current > 0 ? Math.floor(wheelDistance.current / WHEEL_DISTANCE_PER_CARD) : Math.ceil(wheelDistance.current / WHEEL_DISTANCE_PER_CARD);
    if (steps !== 0) {
      advance(steps);
      wheelDistance.current -= steps * WHEEL_DISTANCE_PER_CARD;
    }
    setWheelProgress(Math.max(-1, Math.min(1, wheelDistance.current / WHEEL_DISTANCE_PER_CARD)));
    window.clearTimeout(restTimer.current);
    restTimer.current = window.setTimeout(() => {
      wheelDistance.current = 0;
      setWheelProgress(0);
    }, 130);
  }, [advance]);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 1) return;
      event.preventDefault();
      consumeWheel(event.deltaY);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') advance(1);
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') advance(-1);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('wheel', onWheel); window.removeEventListener('keydown', onKey); window.clearTimeout(restTimer.current); };
  }, [advance, consumeWheel]);

  const topIndex = (index + 1) % projects.length;
  const bottomIndex = (index - 1 + projects.length) % projects.length;
  const poseFor = (cardIndex: number): CardPose => cardIndex === index ? 'active' : cardIndex === topIndex ? 'top' : cardIndex === bottomIndex ? 'bottom' : 'hidden';
  const poseAnimation = (pose: CardPose) => {
    if (pose === 'top') return { y: -388, scale: 0.78, rotateX: -62, opacity: 1, zIndex: 1 };
    if (pose === 'bottom') return { y: 388, scale: 0.78, rotateX: 62, opacity: 1, zIndex: 1 };
    if (pose === 'hidden') return { y: direction > 0 ? -520 : 520, scale: 0.7, rotateX: direction > 0 ? -74 : 74, opacity: 0, zIndex: 0 };
    return { y: wheelProgress * 15, scale: 1 - Math.abs(wheelProgress) * 0.015, rotateX: wheelProgress * -2.2, opacity: 1, zIndex: 3 };
  };

  return <div className="card-stack" onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientY ?? null; }} onTouchEnd={(event) => { const end = event.changedTouches[0]?.clientY; if (touchStart.current !== null && end !== undefined) { const distance = touchStart.current - end; if (Math.abs(distance) > 24) consumeWheel(distance); } touchStart.current = null; }}>
    <div className="stack-canvas"><div className="plate-stack plate-top" aria-hidden="true"><i /><i /></div><div className="plate-stack plate-bottom" aria-hidden="true"><i /><i /></div>{projects.map((project, cardIndex) => {
      const pose = poseFor(cardIndex); const isActive = pose === 'active'; const cover = project.poster ?? project.image; const cardText = project.cardText ?? 'light';
      return <motion.article key={project.id} className={`project-card ${isActive ? 'is-active' : 'is-stacked'} pose-${pose}`} initial={false} animate={poseAnimation(pose)} transition={{ type: 'spring', stiffness: 118, damping: 23, mass: 1.08, opacity: { duration: 0.38 } }} style={{ '--accent': project.accent, '--card-text': cardText === 'dark' ? '#1c1c1a' : '#ffffff', '--card-text-muted': cardText === 'dark' ? 'rgba(28,28,26,.72)' : 'rgba(255,255,255,.78)', '--card-line': cardText === 'dark' ? 'rgba(28,28,26,.78)' : 'rgba(255,255,255,.78)', transformOrigin: pose === 'top' ? '50% 0%' : pose === 'bottom' ? '50% 100%' : '50% 50%' } as CSSProperties} onClick={() => isActive && onSelect(project)} aria-label={`${project.title}，点击查看项目详情`}>
        <div className="project-art"><motion.img src={cover} alt="" animate={{ scale: isActive ? 1 : 1.08 }} transition={{ duration: 0.55 }} /><div className="project-wash" /></div>
        <div className="card-meta"><div><p>{project.discipline}</p><h2>{project.title}</h2><span>{project.subtitle}</span></div><motion.span className="enter-mark" whileHover={{ rotate: 45 }}><ArrowUpRight size={18} strokeWidth={1.5} /></motion.span></div><span className="project-count">{String(cardIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
      </motion.article>;
    })}</div>
    <div className="stack-controls" aria-label="项目导航">{projects.map((project, cardIndex) => <button key={project.id} onClick={() => { setDirection(cardIndex === index ? direction : cardIndex === topIndex ? 1 : -1); setIndex(cardIndex); setWheelProgress(0); }} aria-label={`前往 ${project.title}`} className={cardIndex === index ? 'current' : ''} />)}</div>
    <p className="scroll-note"><Mouse size={14} strokeWidth={1.5} /> 轻拨一格 · 快滚连续切换</p><span className="scroll-loop">循环浏览 · {direction > 0 ? '↓' : '↑'}</span>
  </div>;
}
