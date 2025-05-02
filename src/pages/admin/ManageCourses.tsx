
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, Plus, Search, MoreHorizontal, Edit, Trash2, FileText } from "lucide-react";

interface Course {
  id: string;
  title: string;
  instructor: string;
  totalEnrollments: number;
  completionRate: number;
  createdAt: string;
  status: "published" | "draft";
  chaptersCount: number;
}

const ManageCourses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock data
        const mockCourses: Course[] = [
          {
            id: "course-1",
            title: "Introduction to Web Development",
            instructor: "Sarah Johnson",
            totalEnrollments: 245,
            completionRate: 68,
            createdAt: "2023-07-15",
            status: "published",
            chaptersCount: 12
          },
          {
            id: "course-2",
            title: "React Fundamentals",
            instructor: "Michael Chen",
            totalEnrollments: 187,
            completionRate: 72,
            createdAt: "2023-08-22",
            status: "published",
            chaptersCount: 10
          },
          {
            id: "course-3",
            title: "Node.js Backend Development",
            instructor: "David Wilson",
            totalEnrollments: 156,
            completionRate: 55,
            createdAt: "2023-09-10",
            status: "published",
            chaptersCount: 15
          },
          {
            id: "course-4",
            title: "Advanced CSS and Sass",
            instructor: "Emma Thompson",
            totalEnrollments: 134,
            completionRate: 82,
            createdAt: "2023-10-05",
            status: "published",
            chaptersCount: 8
          },
          {
            id: "course-5",
            title: "TypeScript Mastery",
            instructor: "James Rodriguez",
            totalEnrollments: 98,
            completionRate: 60,
            createdAt: "2023-11-17",
            status: "draft",
            chaptersCount: 6
          },
        ];
        
        setCourses(mockCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to load courses");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDeleteCourse = (courseId: string) => {
    // Show confirmation before deleting
    if (confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      setCourses(courses.filter((course) => course.id !== courseId));
      toast.success("Course deleted successfully");
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Courses</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create, edit and manage all courses on the platform
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button asChild>
            <Link to="/admin/courses/create">
              <Plus className="mr-2 h-4 w-4" /> Create Course
            </Link>
          </Button>
        </div>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead className="text-center">Enrollments</TableHead>
                <TableHead className="text-center">Completion</TableHead>
                <TableHead className="text-center">Chapters</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No courses found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell className="text-center">{course.totalEnrollments}</TableCell>
                    <TableCell className="text-center">{course.completionRate}%</TableCell>
                    <TableCell className="text-center">{course.chaptersCount}</TableCell>
                    <TableCell>
                      {new Date(course.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          course.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {course.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/courses/${course.id}`}>View</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/admin/courses/${course.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Course
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/admin/courses/${course.id}/chapters`}>
                              <FileText className="mr-2 h-4 w-4" />
                              Manage Chapters
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteCourse(course.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
