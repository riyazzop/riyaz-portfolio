export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  date: string;
  description: string[];
  type: 'work' | 'freelance' | 'education' | 'opensource';
}

export const experiences: Experience[] = [
  // {
  //   id: '1',
  //   title: 'Software Development Intern',
  //   company: 'Tech Company',
  //   location: 'Remote',
  //   date: 'Jan 2026 - Present',
  //   description: [
  //     'Built RESTful APIs handling 10,000+ daily requests with optimized database queries',
  //     'Improved application performance by 35% through code optimization and caching strategies',
  //     'Collaborated with senior developers on microservices architecture implementation',
  //   ],
  //   type: 'work',
  // },
  // {
  //   id: '2',
  //   title: 'Freelance Developer',
  //   company: 'Self-Employed',
  //   location: 'Remote',
  //   date: 'Jun 2025 - Dec 2025',
  //   description: [
  //     'Developed 5+ client projects including e-commerce sites and web applications',
  //     'Implemented responsive designs and modern UI/UX patterns',
  //     'Managed full project lifecycle from requirements to deployment',
  //   ],
  //   type: 'freelance',
  // },
  // {
  //   id: '3',
  //   title: 'Open Source Contributor',
  //   company: 'Various Projects',
  //   date: '2024 - Present',
  //   description: [
  //     'Contributed to multiple open source projects on GitHub',
  //     'Fixed bugs and implemented new features in community projects',
  //     'Reviewed pull requests and participated in code discussions',
  //   ],
  //   type: 'opensource',
  // },
  // {
  //   id: '4',
  //   title: 'Learning Journey Began',
  //   company: 'G. Pullaiah College of Engineering',
  //   location: 'Kurnool, AP',
  //   date: 'Oct 2023',
  //   description: [
  //     'Started B.Tech in Computer Science & Engineering (AI)',
  //     'Began learning web development fundamentals',
  //     'Joined coding communities and started competitive programming',
  //   ],
  //   type: 'education',
  // },
];
