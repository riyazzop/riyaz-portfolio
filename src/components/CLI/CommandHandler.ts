import { useModeStore } from "@/lib/store";
import { projects } from "@/lib/data/projects";
import { skillCategories, allSkills } from "@/lib/data/skills";
import { experiences } from "@/lib/data/experience";
import { blogPosts } from "@/lib/data/blogs";
import {
  personalInfo,
  education,
  certifications,
  funFacts,
} from "@/lib/data/personal";
import { copyToClipboard } from "@/lib/utils";

// Virtual file system
const fileSystem: Record<string, string | Record<string, string>> = {
  "/home/riyaz": {
    "about.txt": "FILE",
    "skills.txt": "FILE",
    "experience.json": "FILE",
    projects: "DIR",
    blog: "DIR",
    "certifications.txt": "FILE",
    "education.txt": "FILE",
    "resume.pdf": "FILE",
    "contact.txt": "FILE",
  },
  "/home/riyaz/projects": Object.fromEntries(
    projects.map((p) => [`${p.slug}.md`, "FILE"]),
  ),
  "/home/riyaz/blog": Object.fromEntries(
    blogPosts.map((b) => [`${b.slug}.md`, "FILE"]),
  ),
};

// Commands list
const commands = [
  "help",
  "about",
  "skills",
  "projects",
  "experience",
  "education",
  "certifications",
  "contact",
  "resume",
  "blog",
  "gui",
  "switch",
  "ls",
  "cd",
  "pwd",
  "cat",
  "clear",
  "history",
  "open",
  "read",
  "github",
  "leetcode",
  "email",
  "whoami",
  "neofetch",
  "matrix",
  "hack",
  "joke",
  "game",
  "sound",
];

interface CommandResult {
  output: string;
  type?: "output" | "error" | "success";
  clear?: boolean;
}

const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
  "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?' 🍺",
  "Why do Java developers wear glasses? Because they can't C# 👓",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
  "There are only 10 types of people in the world: those who understand binary and those who don't.",
  "A programmer's wife tells him: 'Go to the store and buy a loaf of bread. If they have eggs, buy a dozen.' He comes home with 12 loaves of bread.",
  "Why was the JavaScript developer sad? Because he didn't Node how to Express himself! 😢",
];

const hackerMessages = [
  "ACCESSING MAINFRAME...",
  "BYPASSING FIREWALL...",
  "DECRYPTING DATA...",
  "DOWNLOADING SECRET FILES...",
  "ACCESSING SATELLITE...",
  "HACKING THE GIBSON...",
  "...",
  "ACCESS GRANTED ✓",
  "",
  "> Just kidding! This is just a portfolio 😄",
];

export function getAutocompleteSuggestions(input: string): string[] {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return [];

  return commands.filter((cmd) => cmd.startsWith(trimmed));
}

export async function executeCommand(
  command: string,
  currentPath: string,
  setCurrentPath: (path: string) => void,
): Promise<CommandResult> {
  const parts = command.trim().split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (cmd) {
    case "help":
      return {
        output: `
Available Commands:
─────────────────────────────────────────
Navigation & Files:
  ls [-la]          List directory contents
  cd <dir>          Change directory
  pwd               Print working directory
  cat <file>        Display file contents
  clear             Clear terminal screen

Portfolio Commands:
  about             Professional summary and bio
  skills [--tree]   Technical skills
  projects          List all projects
  open <project>    View project details
  experience        Work experience timeline
  education         Educational background
  certifications    My certifications
  blog              List blog articles
  read <article>    Read blog article
  contact           Contact information
  resume            Download resume

Quick Links:
  github            Open GitHub profile
  leetcode          Open LeetCode profile
  email             Copy email to clipboard

Other:
  gui / switch      Switch to GUI mode
  history           Command history
  sound             Toggle typing sounds
  whoami            Who am I?

Easter Eggs:
  Try: neofetch, joke, hack, matrix, game
─────────────────────────────────────────
        `.trim(),
        type: "output",
      };

    case "about":
      return {
        output: `
╭─────────────────────────────────────────╮
│            ABOUT ME                     │
╰─────────────────────────────────────────╯

${personalInfo.name}
${personalInfo.title} | ${personalInfo.subtitle}

${personalInfo.summary}

📍 ${personalInfo.location}
📧 ${personalInfo.email}
📱 ${personalInfo.phone}

🟢 ${personalInfo.availability}
📚 Currently learning: ${personalInfo.currentlyLearning}

Fun Facts:
${funFacts.map((f, i) => `  ${i + 1}. ${f}`).join("\n")}
        `.trim(),
        type: "output",
      };

    case "skills":
      if (args.includes("--tree")) {
        const tree = skillCategories
          .map(
            (cat) =>
              `├── ${cat.name}\n${cat.skills.map((s, i, arr) => `│   ${i === arr.length - 1 ? "└──" : "├──"} ${s.name}`).join("\n")}`,
          )
          .join("\n");
        return {
          output: `Technical Skills\n${tree}`,
          type: "output",
        };
      }
      return {
        output: `
╭─────────────────────────────────────────╮
│         TECHNICAL SKILLS                │
╰─────────────────────────────────────────╯

${skillCategories
  .map(
    (cat) => `${cat.name}:
  ${cat.skills.map((s) => s.name).join(", ")}`,
  )
  .join("\n\n")}

Tip: Use 'skills --tree' for tree view
        `.trim(),
        type: "output",
      };

    case "projects":
      return {
        output: `
╭─────────────────────────────────────────╮
│         FEATURED PROJECTS               │
╰─────────────────────────────────────────╯

${projects
  .map(
    (p, i) => `${i + 1}. ${p.title}
   ${p.date}
   Tech: ${p.techStack.slice(0, 4).join(", ")}
   → open ${p.slug}`,
  )
  .join("\n\n")}

Use 'open <project-name>' to view details
        `.trim(),
        type: "output",
      };

    case "open":
      if (!args[0]) {
        return {
          output: "Usage: open <project-name>\nExample: open chat-app",
          type: "error",
        };
      }
      const project = projects.find((p) => p.slug === args[0].toLowerCase());
      if (!project) {
        return {
          output: `Project not found: ${args[0]}\nAvailable: ${projects.map((p) => p.slug).join(", ")}`,
          type: "error",
        };
      }
      return {
        output: `
╔═══════════════════════════════════════════════════════╗
  ${project.title.toUpperCase()}
╚═══════════════════════════════════════════════════════╝

📅 ${project.date}

${project.description}

Key Highlights:
${project.highlights.map((h) => `  • ${h}`).join("\n")}

Tech Stack:
  ${project.techStack.join(" | ")}

${project.github ? `🔗 GitHub: ${project.github}` : ""}
        `.trim(),
        type: "success",
      };

    case "experience":
      return {
        output: `
╭─────────────────────────────────────────╮
│       EXPERIENCE & JOURNEY              │
╰─────────────────────────────────────────╯

${experiences
  .map(
    (exp) => `◉ ${exp.title}
  ${exp.company}${exp.location ? ` | ${exp.location}` : ""}
  ${exp.date}
${exp.description.map((d) => `    • ${d}`).join("\n")}`,
  )
  .join("\n\n")}
        `.trim(),
        type: "output",
      };

    case "education":
      return {
        output: `
╭─────────────────────────────────────────╮
│       EDUCATION                         │
╰─────────────────────────────────────────╯

${education
  .map(
    (edu) => `${edu.icon} ${edu.degree}
   ${edu.institution}
   ${edu.duration}
   ${edu.grade}`,
  )
  .join("\n\n")}
        `.trim(),
        type: "output",
      };

    case "certifications":
      return {
        output: `
╭─────────────────────────────────────────╮
│       CERTIFICATIONS                    │
╰─────────────────────────────────────────╯

${certifications
  .map(
    (cert) => `🏆 ${cert.name}
   Issued by: ${cert.issuer} (${cert.date})
   Topics: ${cert.topics.join(", ")}`,
  )
  .join("\n\n")}
        `.trim(),
        type: "output",
      };

    case "contact":
      return {
        output: `
╭─────────────────────────────────────────╮
│       CONTACT ME                        │
╰─────────────────────────────────────────╯

📧 Email:    ${personalInfo.email}
📱 Phone:    ${personalInfo.phone}
📍 Location: ${personalInfo.location}

🔗 Links:
   GitHub:   ${personalInfo.github}
   LeetCode: ${personalInfo.leetcode}
   LinkedIn: ${personalInfo.linkedin}

Quick commands:
  github   - Open GitHub profile
  leetcode - Open LeetCode profile
  email    - Copy email to clipboard
        `.trim(),
        type: "output",
      };

    case "blog":
      return {
        output: `
╭─────────────────────────────────────────╮
│       BLOG ARTICLES                     │
╰─────────────────────────────────────────╯

${blogPosts
  .map(
    (post) => `📝 ${post.title}
   ${post.date} | ${post.readTime} read
   → read ${post.slug}`,
  )
  .join("\n\n")}

Use 'read <article-slug>' to read article
        `.trim(),
        type: "output",
      };

    case "read":
      if (!args[0]) {
        return {
          output:
            "Usage: read <article-slug>\nExample: read building-scalable-microservices",
          type: "error",
        };
      }
      const post = blogPosts.find((p) => p.slug === args[0].toLowerCase());
      if (!post) {
        return {
          output: `Article not found: ${args[0]}\nAvailable: ${blogPosts.map((p) => p.slug).join(", ")}`,
          type: "error",
        };
      }
      return {
        output: `
═══════════════════════════════════════════════════════
${post.title}
═══════════════════════════════════════════════════════
📅 ${post.date} | ⏱ ${post.readTime} read
Tags: ${post.tags.join(", ")}

${post.content.trim()}
        `.trim(),
        type: "output",
      };

    case "resume":
      if (typeof window !== "undefined") {
        window.open("/resume.pdf", "_blank");
      }
      return {
        output: `
📄 Opening resume...
   Resume opened in new tab.
   
   If the file doesn't open, make sure resume.pdf exists in /public/
   You can also download it from: /resume.pdf
        `.trim(),
        type: "success",
      };

    case "github":
      if (typeof window !== "undefined") {
        window.open(personalInfo.github, "_blank");
      }
      return { output: "🔗 Opening GitHub profile...", type: "success" };

    case "leetcode":
      if (typeof window !== "undefined") {
        window.open(personalInfo.leetcode, "_blank");
      }
      return { output: "🔗 Opening LeetCode profile...", type: "success" };

    case "email":
      const copied = await copyToClipboard(personalInfo.email);
      return {
        output: copied
          ? `📧 Email copied to clipboard: ${personalInfo.email}`
          : `📧 Email: ${personalInfo.email}`,
        type: "success",
      };

    case "gui":
    case "switch":
      const { setMode } = useModeStore.getState();
      setTimeout(() => setMode("gui"), 100);
      return { output: "🖥️ Switching to GUI mode...", type: "success" };

    case "clear":
      return { output: "", clear: true };

    case "history":
      const { commandHistory } = useModeStore.getState();
      if (commandHistory.length === 0) {
        return { output: "No command history yet.", type: "output" };
      }
      return {
        output: commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`).join("\n"),
        type: "output",
      };

    case "pwd":
      return { output: currentPath, type: "output" };

    case "ls":
      const showDetails =
        args.includes("-la") || args.includes("-l") || args.includes("-a");
      const dirContent = fileSystem[currentPath];
      if (!dirContent || typeof dirContent === "string") {
        return {
          output: `ls: cannot access '${currentPath}': No such file or directory`,
          type: "error",
        };
      }
      const entries = Object.entries(dirContent);
      if (showDetails) {
        const output = entries
          .map(([name, type]) => {
            const isDir = type === "DIR";
            return `${isDir ? "d" : "-"}rwxr-xr-x  1 riyaz riyaz  4096 Jan 18 2026 ${isDir ? `\x1b[34m${name}\x1b[0m` : name}`;
          })
          .join("\n");
        return { output: `total ${entries.length}\n${output}`, type: "output" };
      }
      const output = entries
        .map(([name, type]) => (type === "DIR" ? `[${name}]` : name))
        .join("  ");
      return { output, type: "output" };

    case "cd":
      if (!args[0] || args[0] === "~") {
        setCurrentPath("/home/riyaz");
        return { output: "", type: "output" };
      }
      if (args[0] === "..") {
        const parts = currentPath.split("/").filter(Boolean);
        if (parts.length > 2) {
          parts.pop();
          setCurrentPath("/" + parts.join("/"));
        }
        return { output: "", type: "output" };
      }
      const newPath = args[0].startsWith("/")
        ? args[0]
        : `${currentPath}/${args[0]}`.replace(/\/+/g, "/");
      if (fileSystem[newPath]) {
        setCurrentPath(newPath);
        return { output: "", type: "output" };
      }
      return {
        output: `cd: no such file or directory: ${args[0]}`,
        type: "error",
      };

    case "cat":
      if (!args[0]) {
        return { output: "Usage: cat <filename>", type: "error" };
      }
      const filename = args[0];
      // Handle cat for known files
      if (filename === "about.txt" && currentPath === "/home/riyaz") {
        return executeCommand("about", currentPath, setCurrentPath);
      }
      if (filename === "skills.txt" && currentPath === "/home/riyaz") {
        return executeCommand("skills", currentPath, setCurrentPath);
      }
      if (filename === "contact.txt" && currentPath === "/home/riyaz") {
        return executeCommand("contact", currentPath, setCurrentPath);
      }
      if (filename === "education.txt" && currentPath === "/home/riyaz") {
        return executeCommand("education", currentPath, setCurrentPath);
      }
      if (filename === "certifications.txt" && currentPath === "/home/riyaz") {
        return executeCommand("certifications", currentPath, setCurrentPath);
      }
      if (filename === "experience.json" && currentPath === "/home/riyaz") {
        return executeCommand("experience", currentPath, setCurrentPath);
      }
      if (filename.endsWith(".md") && currentPath === "/home/riyaz/projects") {
        const slug = filename.replace(".md", "");
        return executeCommand(`open ${slug}`, currentPath, setCurrentPath);
      }
      if (filename.endsWith(".md") && currentPath === "/home/riyaz/blog") {
        const slug = filename.replace(".md", "");
        return executeCommand(`read ${slug}`, currentPath, setCurrentPath);
      }
      return {
        output: `cat: ${filename}: No such file or directory`,
        type: "error",
      };

    case "whoami":
      return {
        output: `
You found me! 👋

I'm Shaik Riyaz Basha, a passionate full-stack developer who:
  • Loves building scalable web applications
  • Enjoys solving complex problems
  • Is always learning something new
  • Writes code that (usually) works on the first try 😅

Current status: ${personalInfo.availability}
Current obsession: ${personalInfo.currentlyLearning}
        `.trim(),
        type: "success",
      };

    case "neofetch":
      return {
        output: `
        ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄       riyaz@portfolio
       ██████████████████████    ─────────────────
      ████████████████████████   OS: Portfolio v1.0
     ██████████████████████████  Host: Shaik Riyaz Basha
    ████████████████████████████ Kernel: Full-Stack Developer
    ████████████████████████████ Uptime: Since Oct 2023
    ████████████████████████████ Shell: TypeScript + React
    ████████████████████████████ Terminal: Interactive CLI
     ██████████████████████████  CPU: Problem Solving (8 cores)
      ████████████████████████   GPU: Creative Thinking
       ██████████████████████    Memory: Infinite Learning
        ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀      Disk: ${projects.length} Projects

                                 ███████ Languages ███████
                                 ███████ Frontend  ███████
                                 ███████ Backend   ███████
                                 ███████ Database  ███████
        `.trim(),
        type: "success",
      };

    case "joke":
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      return { output: `\n💡 ${randomJoke}\n`, type: "output" };

    case "hack":
      return {
        output: hackerMessages.join("\n"),
        type: "success",
      };

    case "matrix":
      return {
        output: `
🎬 Matrix rain effect activated!
   Press ESC or Q to exit.
   Click anywhere to close.
        `.trim(),
        type: "success",
      };

    case "game":
      if (args[0]?.toLowerCase() === "snake" || !args[0]) {
        return {
          output: `
🎮 Starting Snake game!
   Use Arrow keys or WASD to move
   P to pause, Q to quit
          `.trim(),
          type: "success",
        };
      }
      return {
        output: `
🎮 Available Games:
─────────────────
  • snake - Classic Snake game

Usage: game snake
        `.trim(),
        type: "output",
      };

    case "sound":
      const { soundEnabled, toggleSound } = useModeStore.getState();
      toggleSound();
      return {
        output: `🔊 Sound effects ${soundEnabled ? "disabled" : "enabled"}`,
        type: "success",
      };

    case "sudo":
      if (command.toLowerCase().includes("rm -rf")) {
        return {
          output: `
⚠️  Nice try! But this portfolio is indestructible.
   Permission denied: You don't have sudo access here 😄

   (Also, that's a dangerous command. Don't run it on real systems!)
          `.trim(),
          type: "error",
        };
      }
      return { output: "sudo: permission denied", type: "error" };

    default:
      return {
        output: `Command not found: ${cmd}. Type 'help' for available commands.`,
        type: "error",
      };
  }
}
