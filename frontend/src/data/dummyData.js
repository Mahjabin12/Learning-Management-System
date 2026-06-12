const img = (q, sig) =>
  `https://images.unsplash.com/photo-${q}?auto=format&fit=crop&w=900&q=80&sig=${sig}`;

export const categories = [
  {
    id: 1,
    name: "UI/UX Design",
    icon: "🎨",
    iconName: "Palette",
    color: "from-pink-500 to-rose-500",
    count: 12,
    courses: 12,
    text: "Design clean, modern, and user-friendly digital products.",
  },
  {
    id: 2,
    name: "Python",
    icon: "🐍",
    iconName: "Code2",
    color: "from-yellow-500 to-amber-500",
    count: 18,
    courses: 18,
    text: "Learn Python programming from beginner to advanced level.",
  },
  {
    id: 3,
    name: "JavaScript",
    icon: "🟨",
    iconName: "Braces",
    color: "from-amber-500 to-orange-500",
    count: 22,
    courses: 22,
    text: "Master modern JavaScript for frontend and backend development.",
  },
  {
    id: 4,
    name: "Digital Marketing",
    icon: "📢",
    iconName: "Megaphone",
    color: "from-fuchsia-500 to-purple-500",
    count: 9,
    courses: 9,
    text: "Grow brands using SEO, content, social media, and campaigns.",
  },
  {
    id: 5,
    name: "Graphic Design",
    icon: "✒️",
    iconName: "PenTool",
    color: "from-rose-500 to-pink-500",
    count: 11,
    courses: 11,
    text: "Learn visual design, branding, typography, and creative layouts.",
  },
  {
    id: 6,
    name: "Web Development",
    icon: "🌐",
    iconName: "Globe",
    color: "from-indigo-500 to-blue-500",
    count: 26,
    courses: 26,
    text: "Build modern websites and web applications from scratch.",
  },
  {
    id: 7,
    name: "Data Science",
    icon: "📊",
    iconName: "BarChart3",
    color: "from-emerald-500 to-teal-500",
    count: 14,
    courses: 14,
    text: "Analyze data, create insights, and build predictive models.",
  },
  {
    id: 8,
    name: "Machine Learning",
    icon: "🤖",
    iconName: "BrainCircuit",
    color: "from-teal-500 to-cyan-500",
    count: 16,
    courses: 16,
    text: "Learn AI, machine learning models, and real-world applications.",
  },
];

const baseCurriculum = [
  {
    section: "Getting Started",
    lessons: [
      {
        title: "Welcome to the course",
        type: "video",
        duration: "4:12",
      },
      {
        title: "Course resources and setup",
        type: "notes",
        duration: "PDF",
      },
      {
        title: "How to get the most out of this course",
        type: "video",
        duration: "6:30",
      },
    ],
  },
  {
    section: "Core Concepts",
    lessons: [
      {
        title: "Fundamentals overview",
        type: "video",
        duration: "12:45",
      },
      {
        title: "Hands-on practice",
        type: "video",
        duration: "18:20",
      },
      {
        title: "Cheatsheet and references",
        type: "notes",
        duration: "PDF",
      },
      {
        title: "Mini project walkthrough",
        type: "video",
        duration: "22:10",
      },
    ],
  },
  {
    section: "Advanced Techniques",
    lessons: [
      {
        title: "Real-world patterns",
        type: "video",
        duration: "16:00",
      },
      {
        title: "Performance and best practices",
        type: "video",
        duration: "14:25",
      },
      {
        title: "Capstone project",
        type: "video",
        duration: "38:15",
      },
      {
        title: "Final notes and next steps",
        type: "notes",
        duration: "PDF",
      },
    ],
  },
];

const baseReviews = [
  {
    name: "Aisha Patel",
    rating: 5,
    comment:
      "Absolutely incredible. The instructor explains everything clearly and the projects are practical.",
  },
  {
    name: "Marcus Chen",
    rating: 5,
    comment:
      "Best money I have spent on learning. The course helped me build real portfolio projects.",
  },
  {
    name: "Sofia Rodriguez",
    rating: 4,
    comment:
      "Great content and structure. A few sections could go deeper, but overall fantastic.",
  },
];

const makeCourse = ({
  id,
  title,
  instructor,
  category,
  level,
  price,
  oldPrice,
  rating,
  students,
  hours,
  thumbnail,
  status = "Published",
}) => ({
  id,
  title,
  instructor,
  instructorBio: `${instructor} is a senior practitioner with 10+ years of industry experience teaching ${category} to thousands of students worldwide.`,
  category,
  level,
  price,
  oldPrice,
  rating,
  students,
  hours,
  duration: `${hours} hours`,
  status,
  thumbnail,
  description: `Master ${title.toLowerCase()} from the ground up. This comprehensive course covers fundamentals, advanced concepts, real-world projects, and portfolio-ready practical work.`,
  whatYouLearn: [
    `Build production-ready ${category} projects from scratch`,
    "Learn industry best practices and modern workflows",
    "Complete hands-on exercises and downloadable resources",
    "Create a capstone project for your portfolio",
    "Get lifetime access and certificate of completion",
    "Learn through structured lessons and practical examples",
  ],
  curriculum: baseCurriculum,
  lessons: baseCurriculum.flatMap((section) =>
    section.lessons.map((lesson) => lesson.title)
  ),
  reviews: baseReviews,
});

export const courses = [
  makeCourse({
    id: "uiux-masterclass",
    title: "UI/UX Design Masterclass",
    instructor: "Emma Reyes",
    category: "UI/UX Design",
    level: "Intermediate",
    price: 49,
    oldPrice: 79,
    rating: 4.8,
    students: 12480,
    hours: 28,
    thumbnail: img("1559028012-481c04fa702d", 1),
  }),
  makeCourse({
    id: "python-beginners",
    title: "Python for Beginners",
    instructor: "David Kim",
    category: "Python",
    level: "Beginner",
    price: 0,
    oldPrice: 49,
    rating: 4.7,
    students: 23150,
    hours: 18,
    thumbnail: img("1526379095098-d400fd0bf935", 2),
  }),
  makeCourse({
    id: "javascript-full",
    title: "JavaScript Full Course",
    instructor: "Liam O'Brien",
    category: "JavaScript",
    level: "Intermediate",
    price: 39,
    oldPrice: 69,
    rating: 4.9,
    students: 18700,
    hours: 32,
    thumbnail: img("1517694712202-14dd9538aa97", 3),
  }),
  makeCourse({
    id: "digital-marketing-pro",
    title: "Digital Marketing Pro",
    instructor: "Priya Sharma",
    category: "Digital Marketing",
    level: "Advanced",
    price: 29,
    oldPrice: 59,
    rating: 4.6,
    students: 9320,
    hours: 22,
    thumbnail: img("1460925895917-afdab827c52f", 4),
  }),
  makeCourse({
    id: "graphic-design-basics",
    title: "Graphic Design Basics",
    instructor: "Noah Williams",
    category: "Graphic Design",
    level: "Beginner",
    price: 0,
    oldPrice: 39,
    rating: 4.5,
    students: 14820,
    hours: 14,
    thumbnail: img("1558655146-9f40138edfeb", 5),
  }),
  makeCourse({
    id: "react-complete",
    title: "React.js Complete Guide",
    instructor: "Sarah Johnson",
    category: "Web Development",
    level: "Intermediate",
    price: 59,
    oldPrice: 99,
    rating: 4.9,
    students: 27300,
    hours: 40,
    thumbnail: img("1633356122544-f134324a6cee", 6),
  }),
  makeCourse({
    id: "data-science-python",
    title: "Data Science with Python",
    instructor: "Dr. Alan Ross",
    category: "Data Science",
    level: "Advanced",
    price: 49,
    oldPrice: 89,
    rating: 4.8,
    students: 11240,
    hours: 36,
    thumbnail: img("1551288049-bebda4e38f71", 7),
  }),
  makeCourse({
    id: "figma-ui",
    title: "Figma UI Design",
    instructor: "Mia Tanaka",
    category: "UI/UX Design",
    level: "Beginner",
    price: 19,
    oldPrice: 39,
    rating: 4.7,
    students: 8650,
    hours: 12,
    thumbnail: img("1611224923853-80b023f02d71", 8),
  }),
  makeCourse({
    id: "seo-content",
    title: "SEO and Content Marketing",
    instructor: "James Carter",
    category: "Digital Marketing",
    level: "Intermediate",
    price: 29,
    oldPrice: 49,
    rating: 4.6,
    students: 7420,
    hours: 16,
    thumbnail: img("1432888622747-4eb9a8efeb07", 9),
  }),
  makeCourse({
    id: "nodejs-backend",
    title: "Node.js Backend Development",
    instructor: "Daniel Park",
    category: "Web Development",
    level: "Advanced",
    price: 39,
    oldPrice: 79,
    rating: 4.8,
    students: 10210,
    hours: 26,
    thumbnail: img("1555066931-4365d14bab8c", 10),
  }),
  makeCourse({
    id: "photoshop",
    title: "Adobe Photoshop Essentials",
    instructor: "Olivia Brown",
    category: "Graphic Design",
    level: "Beginner",
    price: 0,
    oldPrice: 49,
    rating: 4.6,
    students: 16720,
    hours: 20,
    thumbnail: img("1626785774573-4b799315345d", 11),
  }),
  makeCourse({
    id: "machine-learning-foundation",
    title: "Machine Learning Foundation",
    instructor: "Dr. Rachel Green",
    category: "Machine Learning",
    level: "Intermediate",
    price: 69,
    oldPrice: 119,
    rating: 4.9,
    students: 15400,
    hours: 42,
    thumbnail: img("1677442136019-21780ecad995", 12),
  }),
];

export const findCourse = (id) => courses.find((course) => course.id === id);

export const enrolledMock = [
  {
    courseId: "uiux-masterclass",
    progress: 64,
  },
  {
    courseId: "javascript-full",
    progress: 32,
  },
  {
    courseId: "figma-ui",
    progress: 88,
  },
];

export const instructorCoursesMock = [
  {
    courseId: "react-complete",
    students: 27300,
    rating: 4.9,
    earnings: 142500,
  },
  {
    courseId: "nodejs-backend",
    students: 10210,
    rating: 4.8,
    earnings: 39800,
  },
  {
    courseId: "javascript-full",
    students: 18700,
    rating: 4.9,
    earnings: 72900,
  },
];

export const instructors = [
  {
    id: 1,
    name: "Emma Reyes",
    role: "Senior UI/UX Designer",
    specialty: "UI/UX Design",
    rating: 4.8,
    students: 12480,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
    bio: "Emma teaches product design, UX research, wireframing, and design systems.",
  },
  {
    id: 2,
    name: "David Kim",
    role: "Python Developer",
    specialty: "Python",
    rating: 4.7,
    students: 23150,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    bio: "David helps beginners learn Python through practical coding projects.",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Frontend Engineer",
    specialty: "React.js",
    rating: 4.9,
    students: 27300,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&q=80",
    bio: "Sarah specializes in React, JavaScript, and modern frontend architecture.",
  },
  {
    id: 4,
    name: "Dr. Alan Ross",
    role: "Data Scientist",
    specialty: "Data Science",
    rating: 4.8,
    students: 11240,
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80",
    bio: "Dr. Alan teaches data analysis, Python, machine learning, and visualization.",
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
    name: "Raisa Ahmed",
    email: "raisa@gmail.com",
    role: "student",
    status: "Inactive",
    enrolledCourses: 1,
    joined: "2026-03-05",
  },
  {
    id: 4,
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
    courseId: "uiux-masterclass",
    course: "UI/UX Design Masterclass",
    progress: "64%",
    status: "In Progress",
    date: "2026-05-12",
  },
  {
    id: 102,
    student: "Nusaiba Rahman",
    courseId: "javascript-full",
    course: "JavaScript Full Course",
    progress: "32%",
    status: "In Progress",
    date: "2026-05-18",
  },
  {
    id: 103,
    student: "Rafia Sultana",
    courseId: "figma-ui",
    course: "Figma UI Design",
    progress: "88%",
    status: "In Progress",
    date: "2026-05-25",
  },
  {
    id: 104,
    student: "Raisa Ahmed",
    courseId: "python-beginners",
    course: "Python for Beginners",
    progress: "100%",
    status: "Completed",
    date: "2026-04-22",
  },
];

export const orders = [
  {
    id: "ORD-1001",
    student: "Rafia Sultana",
    courseId: "uiux-masterclass",
    course: "UI/UX Design Masterclass",
    amount: 49,
    status: "Paid",
    date: "2026-05-12",
  },
  {
    id: "ORD-1002",
    student: "Nusaiba Rahman",
    courseId: "javascript-full",
    course: "JavaScript Full Course",
    amount: 39,
    status: "Paid",
    date: "2026-05-18",
  },
  {
    id: "ORD-1003",
    student: "Rafia Sultana",
    courseId: "figma-ui",
    course: "Figma UI Design",
    amount: 19,
    status: "Pending",
    date: "2026-05-21",
  },
  {
    id: "ORD-1004",
    student: "Raisa Ahmed",
    courseId: "python-beginners",
    course: "Python for Beginners",
    amount: 0,
    status: "Paid",
    date: "2026-04-22",
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
  {
    id: 3,
    sender: "Raisa Ahmed",
    subject: "Payment confirmation",
    message: "My payment is pending. Please check my order status.",
    status: "Open",
    date: "2026-06-05",
  },
];

export const announcements = [
  {
    id: 1,
    title: "New React.js Course Released",
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
  {
    id: 3,
    title: "Certificate Download Feature Added",
    audience: "Enrolled Students",
    date: "2026-06-10",
    status: "Published",
  },
];

export const blogs = [
  {
    id: 1,
    title: "How AI is Changing Online Learning",
    date: "June 20, 2026",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
    description:
      "Artificial intelligence is making online learning more personalized, interactive, and effective.",
  },
  {
    id: 2,
    title: "Why Students Need Progress Tracking",
    date: "June 18, 2026",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    description:
      "Progress tracking helps students stay motivated and complete courses successfully.",
  },
  {
    id: 3,
    title: "Building Career Skills Through LMS Platforms",
    date: "June 15, 2026",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    description:
      "Modern LMS platforms help learners build job-ready skills through structured courses.",
  },
];