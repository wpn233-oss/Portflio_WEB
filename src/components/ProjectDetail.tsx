import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import type { Project } from '../data/projects';

export function ProjectDetail({ project }: { project: Project }) {
  const cover = project.poster ?? project.image;
  const isVideo = project.mediaType === 'video';
  const videoRef = useRef<HTMLVideoElement>(null);
  const endedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!isVideo || !video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !endedRef.current) {
        void video.play().catch(() => undefined);
      } else if (!entry.isIntersecting) {
        video.pause();
      }
    }, { threshold: 0.35 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [isVideo]);

  return <div className="project-detail" style={{ '--accent': project.accent } as React.CSSProperties}>
    <motion.section className="detail-hero" initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
      {isVideo ? <video ref={videoRef} src={project.image} poster={project.poster} muted playsInline onEnded={() => { endedRef.current = true; }} /> : <img src={cover} alt={project.title} />}<div className="detail-overlay" /><div className="detail-hero-copy"><p>{project.discipline}</p><h2>{project.title}</h2><span>{project.subtitle}</span></div>
    </motion.section>
    <section className="detail-copy-card"><span className="card-label">01 / About</span><p>{project.description}</p></section>
    <section className="detail-stat-grid"><article><span>年份</span><strong>{project.year}</strong></article><article><span>职责</span><strong>{project.role}</strong></article></section>
    <section className="detail-quote"><span>02 / Design notes</span><h3>以简单而有记忆点的体验，让每一个关键触点都自然地推动用户向前。</h3></section>
    <section className="detail-end"><p>感谢观看</p><span>End of project</span></section>
  </div>;
}
