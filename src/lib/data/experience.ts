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
      "Worked with MongoDB and SQL databases",
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
      "Understood event-driven architecture and message queues",
      "Used Redis for caching, rate limiting, and state management",
      "Shifted focus from features to scalability and fault tolerance",
    ],
  },
  {
    id: "journey-6",
    period: "Last 6 Months",
    title: "Data Structures & Algorithms",
    focus: "Problem-solving and algorithmic thinking",
    details: [
      "Practicing Data Structures and Algorithms consistently on LeetCode",
      "Focused on arrays, strings, recursion, and basic data structures",
      "Improved time and space complexity analysis",
      "Built consistency and discipline through daily problem solving",
    ],
  },
  {
    id: "journey-7",
    period: "Present",
    title: "Cloud & System Design",
    focus: "Production-grade engineering mindset",
    details: [
      "Learning AWS core services such as EC2, IAM, and storage fundamentals",
      "Understanding system design concepts including scalability, availability, and trade-offs",
      "Studying how real-world systems handle load, failures, and growth",
      "Connecting cloud infrastructure decisions with backend architecture",
    ],
  },
];
