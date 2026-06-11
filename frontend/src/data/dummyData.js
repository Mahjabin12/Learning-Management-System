export const categories = [
  { id: 1, name: "Web Development", courses: 12 },
  { id: 2, name: "UI/UX Design", courses: 8 },
  { id: 3, name: "Digital Marketing", courses: 10 },
  { id: 4, name: "Data Science", courses: 6 },
];

export const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    category: "Web Development",
    instructor: "Ronald Richards",
    price: 149,
    oldPrice: 199,
    rating: 4.8,
    students: 1240,
    level: "Beginner",
    duration: "12 hours",
    status: "Published",
    thumbnail:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900",
    description:
      "Learn HTML, CSS, JavaScript, React, and project-based frontend development from the beginning.",
    lessons: [
      "Introduction to Web Development",
      "HTML and CSS Fundamentals",
      "JavaScript Basics",
      "React Components",
      "Routing and Project Structure",
      "Final LMS Project",
    ],
  },
  {
    id: 2,
    title: "UI/UX Design for Beginners",
    category: "UI/UX Design",
    instructor: "Jane Cooper",
    price: 129,
    oldPrice: 169,
    rating: 4.7,
    students: 980,
    level: "Beginner",
    duration: "9 hours",
    status: "Published",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900",
    description:
      "Understand user experience, interface layout, color, typography, wireframing, and prototyping.",
    lessons: [
      "What is UI/UX",
      "User Research",
      "Wireframing",
      "Design System",
      "Prototype Design",
    ],
  },
  {
    id: 3,
    title: "Digital Marketing Masterclass",
    category: "Digital Marketing",
    instructor: "Albert Flores",
    price: 99,
    oldPrice: 140,
    rating: 4.6,
    students: 1600,
    level: "Intermediate",
    duration: "10 hours",
    status: "Draft",
    thumbnail:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900",
    description:
      "Learn SEO, social media marketing, analytics, branding, campaign planning, and conversion strategy.",
    lessons: [
      "Marketing Fundamentals",
      "SEO Basics",
      "Social Media Strategy",
      "Analytics",
      "Campaign Planning",
    ],
  },
  {
    id: 4,
    title: "Data Science with Python",
    category: "Data Science",
    instructor: "Esther Howard",
    price: 179,
    oldPrice: 220,
    rating: 4.9,
    students: 2100,
    level: "Intermediate",
    duration: "15 hours",
    status: "Published",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900",
    description:
      "Learn data analysis, Python basics, visualization, pandas, and machine learning fundamentals.",
    lessons: [
      "Python Refresher",
      "Pandas Basics",
      "Data Cleaning",
      "Visualization",
      "Machine Learning Introduction",
    ],
  },
];

export const users = [
  {
    id: 1,
    name: "Rafia Sultana",
    email: "rafia@gmail.com",
    role: "student",
    status: "Active",
    enrolledCourses: 3,
    joined: "2026-01-15",
  },
  {
    id: 2,
    name: "Nusaiba Rahman",
    email: "nusa@gmail.com",
    role: "student",
    status: "Active",
    enrolledCourses: 2,
    joined: "2026-02-10",
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@lms.com",
    role: "admin",
    status: "Active",
    enrolledCourses: 0,
    joined: "2025-12-01",
  },
];

export const enrollments = [
  {
    id: 101,
    student: "Rafia Sultana",
    course: "Complete Web Development Bootcamp",
    progress: "65%",
    status: "In Progress",
    date: "2026-05-12",
  },
  {
    id: 102,
    student: "Nusaiba Rahman",
    course: "UI/UX Design for Beginners",
    progress: "40%",
    status: "In Progress",
    date: "2026-05-18",
  },
  {
    id: 103,
    student: "Rafia Sultana",
    course: "Digital Marketing Masterclass",
    progress: "100%",
    status: "Completed",
    date: "2026-04-22",
  },
];

export const orders = [
  {
    id: "ORD-1001",
    student: "Rafia Sultana",
    course: "Complete Web Development Bootcamp",
    amount: 149,
    status: "Paid",
    date: "2026-05-12",
  },
  {
    id: "ORD-1002",
    student: "Nusaiba Rahman",
    course: "UI/UX Design for Beginners",
    amount: 129,
    status: "Paid",
    date: "2026-05-18",
  },
  {
    id: "ORD-1003",
    student: "Rafia Sultana",
    course: "Digital Marketing Masterclass",
    amount: 99,
    status: "Pending",
    date: "2026-05-21",
  },
];

export const messages = [
  {
    id: 1,
    sender: "Rafia Sultana",
    subject: "Course video not loading",
    message: "I cannot open lesson 3 from my enrolled course.",
    status: "Open",
    date: "2026-06-01",
  },
  {
    id: 2,
    sender: "Nusaiba Rahman",
    subject: "Certificate request",
    message: "I completed my course. Please issue my certificate.",
    status: "Resolved",
    date: "2026-06-03",
  },
];

export const announcements = [
  {
    id: 1,
    title: "New Web Development Course Released",
    audience: "All Students",
    date: "2026-06-05",
    status: "Published",
  },
  {
    id: 2,
    title: "Platform Maintenance Notice",
    audience: "All Users",
    date: "2026-06-08",
    status: "Draft",
  },
];