import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CardStack } from './components/CardStack';
import { LeftPanel } from './components/LeftPanel';
import { ProjectDetail } from './components/ProjectDetail';
import { projects, type Project } from './data/projects';

export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const closeProject = useCallback(() => setActiveProject(null), []);

  return (
    <main className="site-shell">
      <aside className="side-panel"><LeftPanel project={activeProject} onBack={closeProject} /></aside>
      <section className="stage" aria-label="作品展示区">
        <AnimatePresence mode="wait">
          {activeProject ? (
            <motion.div key={`detail-${activeProject.id}`} className="detail-stage" initial={{ opacity: 0, scale: 0.86, filter: 'blur(10px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, scale: 0.92, filter: 'blur(6px)' }} transition={{ type: 'spring', stiffness: 240, damping: 28, mass: 0.9 }}>
              <ProjectDetail project={activeProject} />
            </motion.div>
          ) : (
            <motion.div key="stack" className="stack-stage" initial={{ opacity: 0.25, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.03 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
              <CardStack projects={projects} onSelect={setActiveProject} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
