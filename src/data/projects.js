// Central data source for all project cards.
// ProjectCard & ProjectDetail receive these properties to display case studies.
const projects = [
  {
    id: "dqms",
    title: "Digital Queue Management System (DQMS)",
    subtitle: "NIT Warangal Healthcare Center",
    description:
      "A full-stack web application replacing physical queuing at NIT Warangal Healthcare Centre with a real-time digital system for Students, Staff, and Doctors.",
    longDescription:
      "Designed and developed a complete MERN-stack queuing platform for the NIT Warangal Healthcare Centre to eliminate crowded physical waiting areas and streamline doctor appointments. The platform handles real-time patient status updates, multi-tier user authentication, role-based workflows, and automated appointment handling across 15+ RESTful endpoints.",
    highlights: [
      "Developed a full-stack web application replacing physical queuing at the NIT Warangal Healthcare Centre with a real-time digital system for Students, Staff, and Doctors.",
      "Designed a role-based access control (RBAC) system with 3 roles and a RESTful API with 15+ endpoints for queue management, appointment handling, and authentication.",
      "Built real-time queue updates using Socket.io, broadcasting live notifications to students and doctors and eliminating the need for manual refresh.",
      "Secured the system with JWT authentication (24-hr expiry), account lockout after 5 failed logins, rate limiting (100 req/min), MongoDB sanitization, and bcrypt hashing."
    ],
    techStack: [
      "React 18",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "JWT",
      "bcrypt",
      "Helmet.js",
      "Tailwind CSS",
      "Vite",
      "Render"
    ],
    year: "2026",
    category: "Full Stack (MERN)",
    image: "dqms",
    demoLink: "https://github.com/KarneKeerthan/DQMS",
    codeLink: "https://github.com/KarneKeerthan/DQMS"
  },
  {
    id: "splitwise",
    title: "SplitWise — Smart Expense Splitter",
    subtitle: "Expense Splitter for Roommates & Trips",
    description:
      "A full-stack group expense manager featuring equal, percentage, and custom splits, powered by an optimal graph + greedy debt-settlement algorithm.",
    longDescription:
      "Built a full-stack financial ledger application tailored for group trips and shared apartment expenses. Implemented custom split calculations and designed a specialized debt-simplification graph algorithm that minimizes overall peer-to-peer monetary transfers required to settle up.",
    highlights: [
      "Built a full-stack expense-splitting app for groups and trips with equal, percentage, and custom split options across shared group ledgers.",
      "Designed an optimal debt-settlement algorithm (graph + greedy) that nets all pairwise balances and computes the minimum number of transactions to settle a group, beating naive pairwise tracking.",
      "Implemented JWT-based auth, RESTful APIs for groups/expenses/settlements, and a PostgreSQL schema for users, groups, and balances.",
      "Deployed backend services on Render/Railway and interactive frontend on Vercel."
    ],
    techStack: [
      "React",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "JWT",
      "Algorithms (Graph + Greedy)",
      "Render",
      "Vercel"
    ],
    year: "2026",
    category: "Full Stack (PostgreSQL)",
    image: "splitwise",
    demoLink: "https://github.com/KarneKeerthan",
    codeLink: "https://github.com/KarneKeerthan"
  }
];

export default projects;

