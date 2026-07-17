export interface JourneyMilestone {
  id: string;
  period: string;
  title: string;
  focus: string;
  details: string[];
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: "journey-1",
    period: "2023",
    title: "Programming Foundations",
    focus: "Core programming and logical thinking",
    details: [
      "Learned basic programming concepts and control flow",
      "Started with JavaScript and Python",
      "Built problem-solving habits through consistent practice",
      "Focused on understanding logic rather than memorizing syntax",
    ],
  },
  {
    id: "journey-2",
    period: "Early 2024",
    title: "Frontend Development",
    focus: "Modern UI development",
    details: [
      "Learned HTML, CSS, and modern JavaScript",
      "Adopted React for component-based UI development",
      "Used Tailwind CSS for responsive and scalable layouts",
      "Focused on clean UI structure and state management",
    ],
  },
  {
    id: "journey-3",
    period: "Mid 2024",
    title: "Backend Development & APIs",
    focus: "Server-side engineering",
    details: [
      "Learned Node.js and Express.js",
      "Designed and consumed REST APIs",
      "Worked with MongoDB and PostgreSQL databases",
      "Understood request lifecycle, error handling, and API design principles",
    ],
  },
  {
    id: "journey-4",
    period: "Late 2024",
    title: "Full Stack Integration",
    focus: "End-to-end application development",
    details: [
      "Integrated frontend applications with backend services",
      "Handled real-world API failures and edge cases",
      "Learned deployment fundamentals and environment configuration",
      "Improved debugging, logging, and performance awareness",
    ],
  },
  {
    id: "journey-5",
    period: "Early 2025",
    title: "Scalable Systems & Real-Time Concepts",
    focus: "Concurrency, messaging, and system reliability",
    details: [
      "Learned WebSocket-based real-time communication",
      "Understood event-driven architecture and message queues (RabbitMQ)",
      "Used Redis for caching, rate limiting, and pub/sub state management",
      "Shifted focus from features to scalability and fault tolerance",
    ],
  },
  {
    id: "journey-6",
    period: "Mid 2025 – Early 2026",
    title: "Data Structures & Algorithms",
    focus: "Problem-solving and algorithmic thinking",
    details: [
      "Solved 250+ problems on LeetCode consistently",
      "Focused on arrays, strings, trees, graphs, and DP",
      "Improved time and space complexity analysis",
      "Won 1st Place in inter-college coding competition (700+ participants)",
    ],
  },
  {
    id: "journey-7",
    period: "2026",
    title: "Cloud Architecture & Distributed Systems",
    focus: "Production-grade engineering and AWS certification",
    details: [
      "Earned AWS Certified Solutions Architect – Associate (Jun 2026)",
      "Mastered system design concepts: LLD/HLD, design patterns, SOLID principles",
      "Built a self-healing distributed cache with fault tolerance and LRU eviction",
      "Deep-dived into distributed systems, caching strategies, and load balancing",
    ],
  },
];
