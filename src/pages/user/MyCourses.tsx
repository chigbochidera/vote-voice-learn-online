
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  totalChapters: number;
  completedChapters: number;
}

const MyCourses = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock data
        const mockCourses = [
          {
            id: "course-1",
            title: "Introduction to Web Development",
            description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites",
            instructor: "Sarah Johnson",
            thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            progress: 75,
            totalChapters: 12,
            completedChapters: 9,
          },
          {
            id: "course-2",
            title: "React Fundamentals",
            description: "Master React.js fundamentals and build dynamic user interfaces",
            instructor: "Michael Chen",
            thumbnail: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            progress: 40,
            totalChapters: 10,
            completedChapters: 4,
          },
          {
            id: "course-3",
            title: "Node.js Backend Development",
            description: "Learn to build robust server-side applications with Node.js",
            instructor: "David Wilson",
            thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            progress: 20,
            totalChapters: 15,
            completedChapters: 3,
          },
          {
            id: "course-4",
            title: "Advanced CSS and Sass",
            description: "Take your CSS skills to the next level with advanced techniques and Sass",
            instructor: "Emma Thompson",
            thumbnail: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            progress: 100,
            totalChapters: 8,
            completedChapters: 8,
          },
          {
            id: "course-5",
            title: "TypeScript Mastery",
            description: "Learn TypeScript from the ground up to build better JavaScript applications",
            instructor: "James Rodriguez",
            thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            progress: 60,
            totalChapters: 10,
            completedChapters: 6,
          },
        ];
        
        setCourses(mockCourses);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [user]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-myvomyvo-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Courses</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your progress and continue your learning journey
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">You haven't enrolled in any courses yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Explore our course catalog to find something that interests you
          </p>
          <Button asChild>
            <Link to="/">Browse Courses</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden flex flex-col">
              <div className="h-40 overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2 flex-grow">
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Instructor:</span> {course.instructor}
                  </p>
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {course.completedChapters} of {course.totalChapters} chapters completed
                  </p>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                {course.progress === 100 ? (
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                    <Link to={`/certificate/${course.id}`}>View Certificate</Link>
                  </Button>
                ) : (
                  <Button asChild className="w-full">
                    <Link to={`/courses/${course.id}`}>Continue Learning</Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
