export type MediaType = 'image' | 'video';

export interface ProjectMedia {
  id: string;
  type: MediaType;
  url: string;
  poster?: string;
  alt?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  discipline: string;
  year: string;
  role: string;
  description: string;
  image: string;
  accent: string;
  mediaType: MediaType;
  cardText?: 'dark' | 'light';
  poster?: string;
  documentUrl?: string;
  gallery: ProjectMedia[];
  status: 'published' | 'draft';
  order: number;
  updatedAt: string;
}

const now = '2026-08-19T00:00:00.000Z';

export const projects: Project[] = [
  { id: 'overseas-engineering-english', title: '海外工程英语', subtitle: '工程英语学习产品设计', discipline: 'Product design', year: '2026', role: '产品策略 · UX/UI', description: '面向海外工程从业者的场景化英语学习产品。以真实项目沟通为线索，把碎片化术语、任务演练与即时反馈组织成一条可持续的学习路径。', image: '/media/工程英语动效1.mp4', poster: '/media/工程英语动效1_Cover.jpg', accent: '#ff774d', mediaType: 'video', cardText: 'dark', documentUrl: '/media/PDF文件/海外工程英语.pdf', gallery: [], status: 'published', order: 1, updatedAt: now },
  { id: 'legendary-life', title: '传奇今生', subtitle: '国货美妆品牌电商小程序设计', discipline: 'E-commerce', year: '2025', role: '体验设计 · 视觉设计', description: '为国货美妆品牌建立更轻盈、可信赖的移动购物体验。在品牌表达与购买效率之间，重新梳理从发现、种草到下单的每一个接触点。', image: '/media/传奇今生动效.mp4', poster: '/media/传奇今生_Cover.jpg', accent: '#c95a7a', mediaType: 'video', cardText: 'light', documentUrl: '/media/PDF文件/传奇今生.pdf', gallery: [], status: 'published', order: 2, updatedAt: now },
  { id: 'dyson-redesign', title: 'Dyson 官网', subtitle: '戴森官网 Redesign', discipline: 'Web design', year: '2026', role: '信息架构 · Web UI', description: '以更清晰的叙事节奏重新组织官网内容，让产品技术、使用情境与购买决策自然衔接。整体视觉克制，将注意力还给产品本身。', image: '/media/DYSON动效.mp4', poster: '/media/DYSON_Cover.jpg', accent: '#76a6bd', mediaType: 'video', cardText: 'light', documentUrl: '/media/PDF文件/DYSON.pdf', gallery: [], status: 'published', order: 3, updatedAt: now },
  { id: 'wesing-star-catcher', title: 'Wesing 运营设计', subtitle: '2026 Star Catcher Global S4', discipline: 'Campaign design', year: '2026', role: '运营视觉 · 活动体验', description: '围绕 Star Catcher Global S4，建立具有宇宙幻想感的活动视觉系统。它需要跨越主会场、榜单、奖励与社媒传播，在全球语境中保持统一识别。', image: '/media/Wesing视频.mp4', poster: '/media/Wesing运营设计_Cover.jpg', accent: '#8e79ec', mediaType: 'video', cardText: 'dark', documentUrl: '/media/PDF文件/Wesing.pdf', gallery: [], status: 'published', order: 4, updatedAt: now },
  { id: 'vivo-creator-camp', title: 'VIVO 影像大V', subtitle: '获客特训营 KV 设计', discipline: 'Brand visual', year: '2026', role: '创意概念 · KV 设计', description: '为影像大 V 获客特训营打造主视觉，用光圈、光影与镜头语言传递专业而有能量的摄影训练氛围，并延展至线上线下传播物料。', image: '/media/VIVO影像大V动效.mp4', poster: '/media/VIVO影像大V_Cover.jpg', accent: '#e8b64c', mediaType: 'video', cardText: 'light', documentUrl: '/media/PDF文件/VIVO.pdf', gallery: [], status: 'published', order: 5, updatedAt: now },
];
