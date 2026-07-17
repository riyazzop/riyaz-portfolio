export interface Project {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  highlights: string[];
  techStack: string[];
  category: "frontend" | "backend" | "fullstack" | "ml";
  date: string;
  github: string;
  demo: string;
  demoVideo?: string;
  image?: string;
  isAwsHosted?: boolean;
}

export const projects: Project[] = [
  {
    id: "5",
    slug: "distributed-cache",
    title: "Self-Healing Distributed Cache",
    shortTitle: "Distributed Cache",
    description:
      "A fault-tolerant distributed caching system across 3 nodes using circular replication topology, featuring a self-healing coordinator, LRU eviction, and automatic node recovery.",
    highlights: [
      "Engineered fault-tolerant distributed cache across 3 nodes using circular replication topology, ensuring minimal data loss on node failure via primary/replica key distribution",
      "Built a self-healing coordinator that detects failures via heartbeat monitoring, auto-restarts dead nodes using Node.js child_process, and restores data from surviving replicas",
      "Integrated LRU eviction policy using insertion-order-aware Map, evicting least-recently-used entries under memory pressure to prevent unbounded cache growth",
      "Reduced per-key memory footprint by ~60% by storing only (key, value, type) per entry and offloading ownership resolution to coordinator topology",
    ],
    techStack: ["Node.js", "TypeScript", "Express.js", "Docker"],
    category: "backend",
    date: "Jun 2026 – Present",
    github: "https://github.com/riyazzop/self-healing-distributed-cache",
    demo: "#",
    image: "/projects/distributed-cache.png",
  },
  {
    id: "6",
    slug: "url-shortener",
    title: "URL Shortener",
    shortTitle: "URL Shortener",
    description:
      "A production-grade URL shortening service with collision-free ID generation via Redis atomic INCR and Base62 encoding, MVC architecture with Repository pattern, and JWT-secured REST API.",
    highlights: [
      "Implemented URL shortening engine using Redis atomic INCR for collision-free ID generation combined with Base62 encoding, replicating the core architecture used by production-grade link shorteners",
      "Designed MVC-style backend with Repository pattern using raw PostgreSQL queries, eliminating ORM overhead and improving query performance",
      "Secured the API with JWT authentication, bcrypt password hashing, Helmet HTTP headers, and express-rate-limit middleware to prevent abuse at scale",
    ],
    techStack: ["Next.js", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Redis"],
    category: "fullstack",
    date: "Feb 2026 – Mar 2026",
    github: "https://github.com/riyazzop/url-shortener",
    demo: "#",
    image: "/projects/url-shortener.png",
  },
  {
    id: "1",
    slug: "chat-app",
    title: "Real-Time Chat Application",
    shortTitle: "Chat App",
    description:
      "A scalable real-time chat application built with microservices architecture, featuring event-driven communication and high performance.",
    highlights: [
      "Architected distributed microservices with RabbitMQ (including dead-letter queues) ensuring reliable event-driven communication across services, containerized via Docker for consistent deployment",
      "Engineered WebSocket-based messaging system supporting 500+ concurrent users using Redis caching, rate limiting, and pub/sub messaging patterns",
      "Reduced server load by 40% via MongoDB query optimization, collection indexing, and connection pooling strategies",
    ],
    techStack: [
      "Node.js",
      "Express",
      "RabbitMQ",
      "Redis",
      "WebSocket",
      "MongoDB",
      "React",
    ],
    category: "fullstack",
    date: "Dec 2025 – Jan 2026",
    github: "https://github.com/riyazzop/chat-backend",
    demo: "https://chat-frontend-two-gamma.vercel.app",
    demoVideo:
      "https://res.cloudinary.com/dpjn01kfa/video/upload/v1769090660/chat-app_u9vyae.mp4",
    image: "/projects/chat-app.png",
    isAwsHosted: true,
  },
  {
    id: "2",
    slug: "ai-resume-builder",
    title: "AI Resume Builder",
    shortTitle: "AI Resume",
    description:
      "An intelligent resume building platform powered by AI that generates professional, ATS-friendly resumes with optimized content.",
    highlights: [
      "Integrated Gemini API for AI-powered resume content generation and optimization suggestions",
      "Reduced image load times by 60% using ImageKit CDN with automatic format conversion and lazy loading",
      "Implemented secure file upload system with virus scanning and file type validation",
      "Built intuitive drag-and-drop interface for resume section reordering",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Gemini API",
      "ImageKit CDN",
      "Tailwind CSS",
      "MongoDB",
    ],
    category: "fullstack",
    date: "Oct 2025 – Nov 2025",
    github: "https://github.com/riyazzop/resume-builder-backend",
    demo: "https://resume-builder-frontend-git-main-riyazvros-projects.vercel.app/",
    demoVideo:
      "https://res.cloudinary.com/dpjn01kfa/video/upload/v1769087615/resume-builder_vxatle.mp4",
    image: "/projects/ai-resume.png",
  },
  {
    id: "3",
    slug: "movie-recommender",
    title: "Movie Recommendation Engine",
    shortTitle: "Movie Recommender",
    description:
      "A content-based movie recommendation system that analyzes user preferences and movie metadata to suggest personalized recommendations.",
    highlights: [
      "Implemented content-based filtering using cosine similarity on movie metadata (genres, cast, crew)",
      "Integrated TMDB API for real-time movie data with intelligent caching strategies",
      "Optimized for 500+ concurrent requests with response times under 200ms",
      "Built responsive frontend with advanced search filters and watchlist functionality",
    ],
    techStack: [
      "Python",
      "Flask",
      "MongoDB",
      "Express.js",
      "TMDB API",
      "React",
    ],
    category: "fullstack",
    date: "Aug 2025 – Sep 2025",
    github: "https://github.com/riyazzop/quickshow",
    demo: "https://quickshow-riyazvros-projects.vercel.app/",
    demoVideo:
      "https://res.cloudinary.com/dpjn01kfa/video/upload/v1769087788/quickshow_nh6h6y.mp4",
    image: "/projects/movie-recommender.png",
  },
  {
    id: "4",
    slug: "diabetes-prediction",
    title: "Diabetes Risk Prediction Model",
    shortTitle: "Diabetes Predictor",
    description:
      "A machine learning model that predicts diabetes risk based on health metrics, deployed as a web application for real-time predictions.",
    highlights: [
      "Trained Random Forest classifier achieving 85% accuracy on imbalanced medical dataset",
      "Applied SMOTE oversampling and feature engineering to handle class imbalance",
      "Deployed model using Flask API with input validation and error handling",
      "Created interactive web interface for real-time health risk assessment",
    ],
    techStack: [
      "Python",
      "Scikit-Learn",
      "Random Forest",
      "Flask",
      "Pandas",
      "NumPy",
    ],
    category: "ml",
    date: "Jun 2025 – Jul 2025",
    github: "https://github.com/riyazzop/diabetes-predictor",
    demo: "https://diabetes-predictor-livid.vercel.app/",
    demoVideo: "https://res.cloudinary.com/dpjn01kfa/video/upload/v1772078395/diabetes_shnza9.mp4",
    image: "https://res.cloudinary.com/dpjn01kfa/image/upload/v1772078278/Screenshot_2026-02-26_092258_ynizz6.png",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
