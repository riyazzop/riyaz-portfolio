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
      { name: 'TypeScript', level: 85 },
      { name: 'Python', level: 85 },
      { name: 'SQL', level: 75 },
      { name: "Java", level: 70 }
    ],
  },
  {
    name: 'Frontend',
    icon: 'Layout',
    skills: [
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'WebSocket', level: 80 },
      { name: "Redux", level: 70 },
      { name: "Web3Forms", level: 70 }
    ],
  },
  {
    name: 'Backend',
    icon: 'Server',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 85 },
      { name: 'REST APIs', level: 90 },
      { name: 'Microservices', level: 80 },
      { name: 'RabbitMQ', level: 75 },
      { name: 'Redis', level: 80 },
      { name: "FastAPI", level: 70 }
    ],
  },
  {
    name: 'Databases',
    icon: 'Database',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'MySQL', level: 75 },
      { name: 'Redis', level: 80 },
      { name: "PostgreSQL", level: 70 }
    ],
  },
  {
    name: 'ML & Data',
    icon: 'Brain',
    skills: [
      { name: 'Scikit-Learn', level: 75 },
      { name: 'TensorFlow', level: 65 },
      { name: 'Pandas', level: 80 },
      { name: 'NumPy', level: 80 },
      { name: "Data Preprocessing", level: 75 }
    ],
  },
  {
    name: 'DevOps & Tools',
    icon: 'Wrench',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'GitHub', level: 90 },
      { name: 'Postman', level: 85 },
      { name: 'ImageKit CDN', level: 75 },
      { name: "Docker", level: 60 }
    ],
  },
];

export const allSkills = skillCategories.flatMap((cat) => cat.skills.map((s) => s.name));
