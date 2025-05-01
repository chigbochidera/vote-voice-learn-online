
import { useState, useEffect } from "react";

// Types
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  instructor: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  enrollmentCount: number;
  rating: number;
  chapters: Chapter[];
  createdAt: string;
  updatedAt: string;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  isCompleted?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  enrolledCourses: string[];
}

// Mock data
const mockCourses: Course[] = [
  {
    id: "course-1",
    title: "Civic Engagement Fundamentals",
    description: "Learn the fundamentals of civic engagement and how to participate effectively in democratic processes.",
    thumbnailUrl: "https://images.unsplash.com/photo-1555485038-d391fc62f2a7?w=600&auto=format&fit=crop",
    instructor: "Dr. Maria Johnson",
    category: "civics",
    difficulty: "beginner",
    duration: "2h 30m",
    enrollmentCount: 1245,
    rating: 4.7,
    chapters: [
      {
        id: "chapter-1-1",
        title: "Introduction to Civic Engagement",
        description: "An overview of civic engagement and its importance in democracy.",
        videoUrl: "https://example.com/videos/civic-intro.mp4",
        duration: "15m",
        isCompleted: false,
      },
      {
        id: "chapter-1-2",
        title: "Understanding Local Government",
        description: "Learn about the structure and functions of local government.",
        videoUrl: "https://example.com/videos/local-gov.mp4",
        duration: "20m",
        isCompleted: false,
      },
      {
        id: "chapter-1-3",
        title: "Voting Rights and Processes",
        description: "Understand voting rights, registration, and electoral processes.",
        videoUrl: "https://example.com/videos/voting.mp4",
        duration: "25m",
        isCompleted: false,
      },
    ],
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2023-06-20T00:00:00Z",
  },
  {
    id: "course-2",
    title: "Advocacy Skills for Change",
    description: "Develop effective advocacy skills to drive positive change in your community.",
    thumbnailUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop",
    instructor: "Professor James Williams",
    category: "advocacy",
    difficulty: "intermediate",
    duration: "3h 15m",
    enrollmentCount: 890,
    rating: 4.5,
    chapters: [
      {
        id: "chapter-2-1",
        title: "Defining Your Advocacy Goals",
        description: "Learn how to define clear, achievable advocacy goals.",
        videoUrl: "https://example.com/videos/advocacy-goals.mp4",
        duration: "18m",
        isCompleted: false,
      },
      {
        id: "chapter-2-2",
        title: "Building Strategic Partnerships",
        description: "Discover how to identify and build effective partnerships.",
        videoUrl: "https://example.com/videos/partnerships.mp4",
        duration: "22m",
        isCompleted: false,
      },
      {
        id: "chapter-2-3",
        title: "Crafting Persuasive Messages",
        description: "Learn techniques for crafting compelling, persuasive advocacy messages.",
        videoUrl: "https://example.com/videos/messaging.mp4",
        duration: "20m",
        isCompleted: false,
      },
    ],
    createdAt: "2023-02-10T00:00:00Z",
    updatedAt: "2023-07-05T00:00:00Z",
  },
  {
    id: "course-3",
    title: "Community Organizing 101",
    description: "Learn the principles and practices of effective community organizing.",
    thumbnailUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&auto=format&fit=crop",
    instructor: "Sarah Gonzalez",
    category: "leadership",
    difficulty: "intermediate",
    duration: "4h 00m",
    enrollmentCount: 635,
    rating: 4.8,
    chapters: [
      {
        id: "chapter-3-1",
        title: "Foundations of Community Organizing",
        description: "Understanding the core principles of community organizing.",
        videoUrl: "https://example.com/videos/organizing-intro.mp4",
        duration: "22m",
        isCompleted: false,
      },
      {
        id: "chapter-3-2",
        title: "Building Community Power",
        description: "Strategies for building collective power in communities.",
        videoUrl: "https://example.com/videos/community-power.mp4",
        duration: "25m",
        isCompleted: false,
      },
      {
        id: "chapter-3-3",
        title: "Developing Leadership",
        description: "How to identify and develop leadership within communities.",
        videoUrl: "https://example.com/videos/leadership.mp4",
        duration: "20m",
        isCompleted: false,
      },
    ],
    createdAt: "2023-03-01T00:00:00Z",
    updatedAt: "2023-05-15T00:00:00Z",
  },
  {
    id: "course-4",
    title: "Digital Advocacy Strategies",
    description: "Master the art of digital advocacy in the modern age.",
    thumbnailUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop",
    instructor: "Michael Chen",
    category: "advocacy",
    difficulty: "advanced",
    duration: "3h 45m",
    enrollmentCount: 720,
    rating: 4.6,
    chapters: [
      {
        id: "chapter-4-1",
        title: "Digital Advocacy Landscape",
        description: "Overview of the digital advocacy ecosystem.",
        videoUrl: "https://example.com/videos/digital-landscape.mp4",
        duration: "18m",
        isCompleted: false,
      },
      {
        id: "chapter-4-2",
        title: "Social Media Campaigns",
        description: "Creating effective social media advocacy campaigns.",
        videoUrl: "https://example.com/videos/social-campaigns.mp4",
        duration: "24m",
        isCompleted: false,
      },
      {
        id: "chapter-4-3",
        title: "Data-Driven Advocacy",
        description: "Using data to enhance your digital advocacy efforts.",
        videoUrl: "https://example.com/videos/data-advocacy.mp4",
        duration: "22m",
        isCompleted: false,
      },
    ],
    createdAt: "2023-04-05T00:00:00Z",
    updatedAt: "2023-08-10T00:00:00Z",
  },
  {
    id: "course-5",
    title: "Introduction to Public Policy",
    description: "Understand how public policy is developed and implemented.",
    thumbnailUrl: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=600&auto=format&fit=crop",
    instructor: "Dr. Robert Nguyen",
    category: "civics",
    difficulty: "beginner",
    duration: "2h 50m",
    enrollmentCount: 935,
    rating: 4.4,
    chapters: [
      {
        id: "chapter-5-1",
        title: "Policy Development Process",
        description: "Understanding how policies are created and developed.",
        videoUrl: "https://example.com/videos/policy-process.mp4",
        duration: "20m",
        isCompleted: false,
      },
      {
        id: "chapter-5-2",
        title: "Policy Analysis",
        description: "Learning to analyze and evaluate public policies.",
        videoUrl: "https://example.com/videos/policy-analysis.mp4",
        duration: "23m",
        isCompleted: false,
      },
      {
        id: "chapter-5-3",
        title: "Policy Implementation",
        description: "How policies are implemented and enforced.",
        videoUrl: "https://example.com/videos/policy-implementation.mp4",
        duration: "19m",
        isCompleted: false,
      },
    ],
    createdAt: "2023-02-20T00:00:00Z",
    updatedAt: "2023-07-25T00:00:00Z",
  },
  {
    id: "course-6",
    title: "Legislative Advocacy",
    description: "Learn how to effectively advocate for legislation at local, state, and federal levels.",
    thumbnailUrl: "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=600&auto=format&fit=crop",
    instructor: "Amanda Rodriguez",
    category: "advocacy",
    difficulty: "intermediate",
    duration: "3h 30m",
    enrollmentCount: 510,
    rating: 4.7,
    chapters: [
      {
        id: "chapter-6-1",
        title: "Understanding the Legislative Process",
        description: "Learn how bills become laws at different levels of government.",
        videoUrl: "https://example.com/videos/legislative-process.mp4",
        duration: "24m",
        isCompleted: false,
      },
      {
        id: "chapter-6-2",
        title: "Building Relationships with Legislators",
        description: "Strategies for engaging with elected officials.",
        videoUrl: "https://example.com/videos/legislator-relationships.mp4",
        duration: "22m",
        isCompleted: false,
      },
      {
        id: "chapter-6-3",
        title: "Testifying at Legislative Hearings",
        description: "How to prepare and deliver effective testimony.",
        videoUrl: "https://example.com/videos/testimony.mp4",
        duration: "26m",
        isCompleted: false,
      },
    ],
    createdAt: "2023-05-05T00:00:00Z",
    updatedAt: "2023-09-15T00:00:00Z",
  },
];

// API service hooks
export const useAllCourses = (filters?: {
  category?: string;
  difficulty?: string;
  search?: string;
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        // Simulate API call with delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        let filteredCourses = [...mockCourses];
        
        // Apply filters
        if (filters) {
          if (filters.category) {
            filteredCourses = filteredCourses.filter(
              course => course.category === filters.category
            );
          }
          
          if (filters.difficulty) {
            filteredCourses = filteredCourses.filter(
              course => course.difficulty === filters.difficulty
            );
          }
          
          if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filteredCourses = filteredCourses.filter(
              course => 
                course.title.toLowerCase().includes(searchLower) ||
                course.description.toLowerCase().includes(searchLower) ||
                course.instructor.toLowerCase().includes(searchLower)
            );
          }
        }
        
        setCourses(filteredCourses);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [filters?.category, filters?.difficulty, filters?.search]);

  return { courses, isLoading, error };
};

export const useCourse = (courseId: string) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      setIsLoading(true);
      try {
        // Simulate API call with delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        const foundCourse = mockCourses.find(c => c.id === courseId);
        
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          throw new Error("Course not found");
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  return { course, isLoading, error };
};

// Enrolling in a course
export const enrollInCourse = async (courseId: string, userId: string): Promise<boolean> => {
  // Simulate API call with delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, we'd update the database here
      resolve(true);
    }, 800);
  });
};

// Marking a chapter as complete
export const markChapterComplete = async (
  courseId: string,
  chapterId: string,
  userId: string
): Promise<boolean> => {
  // Simulate API call with delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, we'd update the database here
      resolve(true);
    }, 500);
  });
};

// Admin functions
export const createCourse = async (courseData: Omit<Course, "id" | "createdAt" | "updatedAt">): Promise<Course> => {
  // Simulate API call with delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const newCourse: Course = {
        ...courseData,
        id: `course-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // In a real app, we'd add this to the database
      resolve(newCourse);
    }, 1000);
  });
};

export const updateCourse = async (courseId: string, courseData: Partial<Course>): Promise<Course> => {
  // Simulate API call with delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const courseIndex = mockCourses.findIndex(c => c.id === courseId);
      
      if (courseIndex >= 0) {
        const updatedCourse = {
          ...mockCourses[courseIndex],
          ...courseData,
          updatedAt: new Date().toISOString(),
        };
        
        // In a real app, we'd update the database
        resolve(updatedCourse);
      } else {
        reject(new Error("Course not found"));
      }
    }, 1000);
  });
};

export const deleteCourse = async (courseId: string): Promise<boolean> => {
  // Simulate API call with delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const courseIndex = mockCourses.findIndex(c => c.id === courseId);
      
      if (courseIndex >= 0) {
        // In a real app, we'd delete from the database
        resolve(true);
      } else {
        reject(new Error("Course not found"));
      }
    }, 1000);
  });
};
