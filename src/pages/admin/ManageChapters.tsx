
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { 
  Card, 
  CardContent, 
  CardDescription,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, ArrowLeft, Plus, Grip, Edit, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  duration: number; // in minutes
  isPublished: boolean;
}

interface Course {
  id: string;
  title: string;
}

const ManageChapters = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [chapterForm, setChapterForm] = useState({
    title: "",
    description: "",
    duration: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call for course data
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // Mock course data
        setCourse({
          id: courseId || "",
          title: courseId === "course-1" 
            ? "Introduction to Web Development" 
            : courseId === "course-2"
            ? "React Fundamentals"
            : courseId === "course-3"
            ? "Node.js Backend Development"
            : "Course Not Found",
        });

        // Simulate API call for chapter data
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock chapter data
        const mockChapters: Chapter[] = [
          {
            id: "chapter-1",
            title: "Introduction to HTML",
            description: "Learn the basics of HTML structure and tags",
            order: 1,
            duration: 45,
            isPublished: true,
          },
          {
            id: "chapter-2",
            title: "CSS Fundamentals",
            description: "Learn how to style your HTML documents with CSS",
            order: 2,
            duration: 60,
            isPublished: true,
          },
          {
            id: "chapter-3",
            title: "JavaScript Basics",
            description: "Introduction to programming with JavaScript",
            order: 3,
            duration: 75,
            isPublished: true,
          },
          {
            id: "chapter-4",
            title: "Responsive Design",
            description: "Make your websites work on any screen size",
            order: 4,
            duration: 60,
            isPublished: false,
          },
        ];

        setChapters(mockChapters);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load course data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setChapterForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newChapter: Chapter = {
        id: `chapter-${chapters.length + 1}-${Date.now()}`,
        title: chapterForm.title,
        description: chapterForm.description,
        order: chapters.length + 1,
        duration: parseInt(chapterForm.duration) || 0,
        isPublished: false,
      };
      
      setChapters([...chapters, newChapter]);
      setChapterForm({ title: "", description: "", duration: "" });
      setIsDialogOpen(false);
      toast.success("Chapter added successfully");
    } catch (error) {
      console.error("Error adding chapter:", error);
      toast.error("Failed to add chapter");
    }
  };

  const handleDeleteChapter = async (chapterId: string) => {
    if (confirm("Are you sure you want to delete this chapter? This action cannot be undone.")) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setChapters(chapters.filter(chapter => chapter.id !== chapterId));
        toast.success("Chapter deleted successfully");
      } catch (error) {
        console.error("Error deleting chapter:", error);
        toast.error("Failed to delete chapter");
      }
    }
  };

  const togglePublishStatus = async (chapterId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setChapters(chapters.map(chapter => {
        if (chapter.id === chapterId) {
          return {
            ...chapter,
            isPublished: !chapter.isPublished
          };
        }
        return chapter;
      }));

      toast.success("Chapter status updated");
    } catch (error) {
      console.error("Error updating chapter status:", error);
      toast.error("Failed to update chapter status");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Course not found</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            The course you're looking for doesn't exist or you don't have access to it.
          </p>
          <Button 
            className="mt-4"
            onClick={() => navigate("/admin/courses")}
          >
            Go back to courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate("/admin/courses")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
      </Button>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Manage Chapters</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Course: {course.title}
        </p>
      </div>

      <div className="mb-6 flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Chapter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Chapter</DialogTitle>
              <DialogDescription>
                Create a new chapter for this course.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddChapter}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Chapter Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Introduction to the Course"
                    value={chapterForm.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Brief description of this chapter"
                    value={chapterForm.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    name="duration"
                    type="number"
                    min="1"
                    placeholder="e.g., 45"
                    value={chapterForm.duration}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Chapter</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {chapters.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              <Plus className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="mb-2">No chapters yet</CardTitle>
            <CardDescription>
              Get started by adding your first chapter to this course.
            </CardDescription>
            <Button 
              className="mt-6"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Add First Chapter
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Order</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chapters.map((chapter) => (
                <TableRow key={chapter.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Grip className="h-4 w-4 text-gray-400 mr-2" />
                      {chapter.order}
                    </div>
                  </TableCell>
                  <TableCell>{chapter.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{chapter.description}</TableCell>
                  <TableCell className="text-right">{chapter.duration} min</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        chapter.isPublished
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {chapter.isPublished ? "Published" : "Draft"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => togglePublishStatus(chapter.id)}
                      >
                        {chapter.isPublished ? "Unpublish" : "Publish"}
                      </Button>
                      <Button asChild variant="ghost" size="icon">
                        <Link to={`/admin/courses/${courseId}/chapters/${chapter.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-600"
                        onClick={() => handleDeleteChapter(chapter.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ManageChapters;
