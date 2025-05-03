
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import { Loader2, ArrowLeft, FileEdit, ListOrdered } from "lucide-react";
import CourseDetailsForm from "@/components/courses/CourseDetailsForm";
import ChaptersList from "@/components/courses/ChaptersList";
import AddChapterForm from "@/components/courses/AddChapterForm";

interface Chapter {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  videoFile?: File | null;
  videoSource: 'url' | 'file';
}

const EditCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    thumbnailUrl: "",
  });
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    const fetchCourseData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock data
        setFormData({
          title: "Introduction to Web Development",
          description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites. This comprehensive course covers everything from setting up your development environment to building responsive websites.",
          category: "web-development",
          level: "beginner",
          thumbnailUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        });
        
        setChapters([
          {
            id: "chapter-1",
            title: "Getting Started with HTML",
            description: "Learn the basics of HTML structure and syntax",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            videoFile: null,
            videoSource: 'url'
          },
          {
            id: "chapter-2",
            title: "CSS Fundamentals",
            description: "Master CSS selectors, properties, and values",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            videoFile: null,
            videoSource: 'url'
          },
          {
            id: "chapter-3",
            title: "JavaScript Basics",
            description: "Introduction to JavaScript variables, functions, and control flow",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            videoFile: null,
            videoSource: 'url'
          },
          {
            id: "chapter-4",
            title: "Responsive Design",
            description: "Learn how to make your websites look great on all devices",
            videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            videoFile: null,
            videoSource: 'url'
          },
        ]);
      } catch (error) {
        console.error("Error fetching course details:", error);
        toast.error("Failed to load course data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRichTextChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      description: content
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddChapter = (chapter: Chapter) => {
    setChapters([...chapters, chapter]);
  };

  const handleDeleteChapter = (chapterId: string) => {
    setChapters(chapters.filter(chapter => chapter.id !== chapterId));
    toast.success("Chapter deleted successfully");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here we would handle file uploads if there are any
      // For chapters with videoSource === 'file', we would upload the file
      // and then update the videoUrl with the URL from the server
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Course updated successfully");
      navigate("/admin/courses");
    } catch (error) {
      toast.error("Failed to update course");
      console.error("Error updating course:", error);
    } finally {
      setIsSubmitting(false);
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
        <h1 className="text-3xl font-bold mb-2">Edit Course</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Update course details and manage chapters
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Tabs defaultValue="details">
          <TabsList className="mb-6">
            <TabsTrigger value="details">
              <FileEdit className="mr-2 h-4 w-4" /> Course Details
            </TabsTrigger>
            <TabsTrigger value="chapters">
              <ListOrdered className="mr-2 h-4 w-4" /> Chapters
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <CourseDetailsForm 
              formData={formData}
              handleChange={handleChange}
              handleRichTextChange={handleRichTextChange}
              handleSelectChange={handleSelectChange}
              isSubmitting={isSubmitting}
              handleSubmit={handleSubmit}
            />
          </TabsContent>
          
          <TabsContent value="chapters">
            <ChaptersList
              chapters={chapters}
              onDeleteChapter={handleDeleteChapter}
            />
            
            <AddChapterForm 
              onAddChapter={handleAddChapter}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EditCourse;
