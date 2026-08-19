import { useState } from 'react';
import { Info, Mail, Share2, UserRound } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '../data/projects';
import { FoldableButton } from './FoldableButton';

interface LeftPanelProps { project: Project | null; onBack: () => void; }

export function LeftPanel({ project, onBack }: LeftPanelProps) {
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (name: string) => setOpen((current) => current === name ? null : name);
  const share = async () => { if (navigator.share && project) await navigator.share({ title: project.title, text: project.subtitle }); else await navigator.clipboard?.writeText(window.location.href); };
  const dock = project ? [{ key: 'info', label: '项目信息', icon: Info }, { key: 'share', label: '分享项目', icon: Share2 }] : [{ key: 'contact', label: '联系方式', icon: Mail }, { key: 'about', label: '个人介绍', icon: UserRound }];

  return <div className="left-content">
    <header className="identity"><button className="name-button" onClick={project ? onBack : undefined}><span>熊政</span>{project && <i>项目集</i>}</button><p>Visual &amp; product designer<br />based in Shenzhen.</p></header>
    {project ? <section className="project-sidebar">
      <motion.button className="back-button" onClick={onBack} whileTap={{ x: -3 }}>←&nbsp; 返回作品</motion.button>
      <div className="current-project"><span>{project.discipline} · {project.year}</span><h1>{project.title}</h1><p>{project.subtitle}</p></div>
      <div className="icon-dock">{dock.map(({ key, label, icon: Icon }) => <button key={key} className={open === key ? 'selected' : ''} onClick={() => toggle(key)} aria-label={label}><Icon size={18} strokeWidth={1.55} /></button>)}</div>
      <FoldableButton label="信息" open={open === 'info'} onClick={() => toggle('info')}><p>{project.description}</p><dl><div><dt>角色</dt><dd>{project.role}</dd></div><div><dt>时间</dt><dd>{project.year}</dd></div></dl></FoldableButton>
      <FoldableButton label="分享" open={open === 'share'} onClick={() => toggle('share')}><button className="share-button" onClick={share}>复制项目链接 <span>↗</span></button></FoldableButton>
    </section> : <section className="home-sidebar">
      <div className="icon-dock">{dock.map(({ key, label, icon: Icon }) => <button key={key} className={open === key ? 'selected' : ''} onClick={() => toggle(key)} aria-label={label}><Icon size={18} strokeWidth={1.55} /></button>)}</div>
      <FoldableButton label="联系方式" open={open === 'contact'} onClick={() => toggle('contact')}><a href="mailto:xiongzheng@email.com">xiongzheng@email.com</a><a href="tel:+8613800000000">+86 138 0000 0000</a><small>请替换成你的真实联系方式</small></FoldableButton>
      <FoldableButton label="个人介绍" open={open === 'about'} onClick={() => toggle('about')}><p>我是一名专注于数字体验与品牌表达的设计师。喜欢把复杂的需求，变成简洁、清晰，也带一点温度的界面。</p><small>这是一段临时文案，可随时替换为你的自我介绍。</small></FoldableButton>
    </section>}
    <footer className="side-footer"><span>© 2026 熊政</span><span>循环浏览</span></footer>
  </div>;
}
