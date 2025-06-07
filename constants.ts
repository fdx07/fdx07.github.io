
import { NavLink, Project, BlogPost } from './types';

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Projects/Courses', path: '/projects' },
  { name: 'About Me', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-cybersecurity', // Changed ID for clarity
    slug: 'the-growing-sector-cybersecurity',
    title: 'The Growing Sector: Cybersecurity Challenges & Trends',
    description: 'An overview of current cybersecurity challenges, emerging trends, and the importance of robust security measures. Includes specific charts.',
    imageUrl: '/public/blogs/the-growing-sector-cybersecurity/1.png',
    author: 'Faisal Durbaa',
    publishDate: '2024-05',
    tags: ['Cybersecurity', 'Data Protection', 'Tech Trends', 'Security', 'Charts'],
    contentUrl: '/public/blogs/the-growing-sector-cybersecurity/content.html', // Corrected path
    relatedPosts: [], // No related posts specified
  },
  {
    id: 'blog-history-internet',
    slug: 'history-of-the-internet',
    title: 'History of the Internet',
    description: 'Explore the origins, foundational developments, and expansion of the internet, from ARPANET and TCP/IP to the World Wide Web and the future of Web 3.0.',
    imageUrl: '/public/blogs/history-of-the-internet/1.png',
    author: 'Faisal Durbaa',
    publishDate: '2024-04', // Example date, adjust as needed
    tags: ['Internet', 'History', 'Technology', 'ARPANET', 'WWW', 'Web 3.0'],
    contentUrl: '/public/blogs/history-of-the-internet/content.html', // Path to existing content
    relatedPosts: [],
  },
  
  
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: '4', 
    slug: 'earthquake-ai', 
    title: 'Post-Earthquake Building Damage Prediction with Nepal 2015 Dataset',
    description: 'A neural network model to rapidly assess building damage post-earthquake, aiding response efforts.', 
    imageUrl: '/public/projects/earthquake-ai/thumbnail.png', 
    isFeatured: true,
    overviewContentUrl: '/public/projects/earthquake-ai/overview.html', 
    detailsContentUrl: '/public/projects/earthquake-ai/details.html', 
    displayDate: "April 2025",
    details: { 
      goal: 'To develop a neural network model for rapid assessment of building damage post-earthquake, aiding first-response efforts.',
      technologies: ['Python', 'TensorFlow/Keras', 'Pandas', 'Scikit-learn', 'Data Visualization'],
      outcome: 'A three-class classification model achieving ~71% accuracy in predicting damage severity (low, medium, severe) based on structural and location features from the Nepal 2015 earthquake dataset.',
    },
  },
  {
    id: 'excel-course', // New ID for Excel course
    slug: 'excel-course-notes', // New slug
    title: 'Comprehensive Excel Course Notes',
    description: 'Detailed notes and practical examples from an extensive Excel course, covering beginner to advanced topics.',
    imageUrl: '/public/courses/excel-course-notes/thumbnail.png', // Path to new placeholder image
    isFeatured: false, // Or true, as desired
    overviewContentUrl: '/public/courses/excel-course-notes/overview.html', // Path to new overview HTML
    detailsContentUrl: '/public/courses/excel-course-notes/details.html',   // Path to new details HTML
    displayDate: "Ongoing", // Or relevant date
    details: {
      goal: 'To document and share key learnings from a comprehensive Excel course, including formulas, PivotTables, and basic VBA.',
      technologies: ['Microsoft Excel', 'Data Analysis', 'Formulas', 'Functions', 'PivotTables', 'Charts', 'VBA Basics'],
      courseTakeaways: [
        'Efficient spreadsheet management and data entry.',
        'Mastery of essential and advanced Excel formulas.',
        'Data analysis and visualization techniques using PivotTables and charts.',
        'Introduction to automating tasks with VBA.'
      ],
    },
  }
];

export const PERSONAL_PHOTO_URL = '/public/myphoto.png';
export const ABOUT_ME_PHOTO_URL = '/public/myphoto.png';
export const EMAIL_ADDRESS = 'durbaafaisal@gmail.com';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/faisaldurbaa/';

export const CHART_MOCK_DATA = [
  { name: 'Epoch 1', value: 60 },
  { name: 'Epoch 2', value: 65 },
  { name: 'Epoch 3', value: 72 },
  { name: 'Epoch 4', value: 78 },
  { name: 'Epoch 5', value: 82 },
  { name: 'Epoch 6', value: 85 },
];
