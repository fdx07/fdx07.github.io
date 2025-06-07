
export interface NavLink {
  name: string;
  path: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  publishDate: string; // "YYYY-MM"
  tags: string[];
  contentUrl: string; // Path to the HTML content file
  relatedPosts?: string[]; // slugs of related posts
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  isFeatured?: boolean;
  overviewContentUrl?: string; // Path to the HTML overview content file - NOW OPTIONAL
  detailsContentUrl?: string; // Path to the HTML details content file
  displayDate?: string; // Optional display date string for projects
  details: {
    goal: string;
    technologies: string[];
    outcome?: string;
    courseTakeaways?: string[];
  };
}

export interface ChartDataPoint {
  name: string;
  value: number;
}