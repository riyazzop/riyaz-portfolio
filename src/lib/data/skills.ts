export interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    icon: 'Code2',
    skills: [
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'Python', level: 80 },
      { name: 'Java', level: 72 },
      { name: 'SQL', level: 78 },
    ],
  },
  {
    name: 'Frontend',
    icon: 'Layout',
    skills: [
      { name: 'React', level: 88 },
      { name: 'Next.js', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'WebSocket', level: 82 },
    ],
  },
  {
    name: 'Backend',
    icon: 'Server',
    skills: [
      { name: 'Node.js', level: 92 },
      { name: 'Express.js', level: 88 },
      { name: 'REST APIs', level: 90 },
      { name: 'Microservices', level: 85 },
      { name: 'RabbitMQ', level: 80 },
      { name: 'Redis', level: 82 },
    ],
  },
  {
    name: 'Databases',
    icon: 'Database',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 78 },
    ],
  },
  {
    name: 'Cloud & DevOps',
    icon: 'Cloud',
    skills: [
      { name: 'AWS (EC2, S3, RDS)', level: 80 },
      { name: 'AWS (IAM, VPC)', level: 78 },
      { name: 'Docker', level: 78 },
      { name: 'Linux', level: 75 },
      { name: 'Git & GitHub', level: 90 },
    ],
  },
  {
    name: 'System Design (HLD)',
    icon: 'Network',
    skills: [
      { name: 'Distributed Systems', level: 80 },
      { name: 'Event-Driven Architecture', level: 82 },
      { name: 'Caching Strategies', level: 85 },
      { name: 'Rate Limiting', level: 80 },
      { name: 'Load Balancing', level: 75 },
      { name: 'API Design', level: 88 },
    ],
  },
  {
    name: 'Design Patterns (LLD)',
    icon: 'Layers',
    skills: [
      { name: 'SOLID Principles', level: 82 },
      { name: 'Singleton / Factory', level: 80 },
      { name: 'Strategy / Observer', level: 78 },
      { name: 'Builder / State', level: 75 },
      { name: 'Repository Pattern', level: 80 },
      { name: 'OOP', level: 85 },
    ],
  },
];

export const allSkills = skillCategories.flatMap((cat) => cat.skills.map((s) => s.name));
