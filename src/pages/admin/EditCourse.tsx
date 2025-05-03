
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Loader2, Save, ArrowLeft, Plus, Trash2, ListOrdered, FileEdit, LinkIcon, Upload } from "lucide-react";

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
  const [newChapter, setNewChapter] = useState<Chapter>({
    id: "",
    title: "",
    description: "",
    videoUrl: "",
    videoFile: null,
    videoSource: 'url'
  });

  // Rich text editor modules configuration
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

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

  const handleChapterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewChapter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChapterRichTextChange = (content: string) => {
    setNewChapter(prev => ({
      ...prev,
      description: content
    }));
  };

  const handleVideoSourceChange = (value: 'url' | 'file') => {
    setNewChapter(prev => ({
      ...prev,
      videoSource: value,
      videoUrl: value === 'file' ? '' : prev.videoUrl,
      videoFile: value === 'url' ? null : prev.videoFile
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewChapter(prev => ({
        ...prev,
        videoFile: e.target.files ? e.target.files[0] : null,
        videoUrl: e.target.files ? URL.createObjectURL(e.target.files[0]) : ''
      }));
    }
  };

  const handleAddChapter = () => {
    if (!newChapter.title || !newChapter.description) {
      toast.error("Please provide a title and description for the chapter");
      return;
    }

    if (newChapter.videoSource === 'url' && !newChapter.videoUrl) {
      toast.error("Please provide a video URL");
      return;
    }

    if (newChapter.videoSource === 'file' && !newChapter.videoFile) {
      toast.error("Please upload a video file");
      return;
    }
    
    const chapter = {
      ...newChapter,
      id: `chapter-${Date.now()}`,
    };
    
    setChapters([...chapters, chapter]);
    setNewChapter({
      id: "",
      title: "",
      description: "",
      videoUrl: "",
      videoFile: null,
      videoSource: 'url'
    });
    
    toast.success("Chapter added successfully");
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
            <form onSubmit={handleSubmit}>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Course Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Course Description</Label>
                    <div className="min-h-[200px]">
                      <ReactQuill
                        theme="snow"
                        modules={quillModules}
                        value={formData.description}
                        onChange={handleRichTextChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleSelectChange("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web-development">Web Development</SelectItem>
                          <SelectItem value="mobile-development">Mobile Development</SelectItem>
                          <SelectItem value="data-science">Data Science</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="level">Level</Label>
                      <Select
                        value={formData.level}
                        onValueChange={(value) => handleSelectChange("level", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="all-levels">All Levels</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
                    <Input
                      id="thumbnailUrl"
                      name="thumbnailUrl"
                      value={formData.thumbnailUrl}
                      onChange={handleChange}
                    />
                    {formData.thumbnailUrl && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-2">Preview:</p>
                        <img
                          src={formData.thumbnailUrl}
                          alt="Course thumbnail"
                          className="max-h-40 rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="chapters">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Existing Chapters</CardTitle>
              </CardHeader>
              <CardContent>
                {chapters.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No chapters added yet.</p>
                ) : (
                  <div className="space-y-4">
                    {chapters.map((chapter, index) => (
                      <div
                        key={chapter.id}
                        className="flex items-start justify-between p-4 border rounded-md"
                      >
                        <div>
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-2">#{index + 1}</span>
                            <h3 className="font-medium">{chapter.title}</h3>
                          </div>
                          <div 
                            className="text-sm text-gray-600 dark:text-gray-400 mt-1"
                            dangerouslySetInnerHTML={{ __html: chapter.description }}
                          />
                          <div className="mt-2 flex items-center text-xs text-gray-500">
                            <span className="mr-1">Video:</span>
                            {chapter.videoSource === 'url' ? (
                              <LinkIcon className="h-3 w-3 mr-1" />
                            ) : (
                              <Upload className="h-3 w-3 mr-1" />
                            )}
                            {chapter.videoSource === 'url' 
                              ? chapter.videoUrl 
                              : chapter.videoFile?.name || 'Uploaded file'
                            }
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteChapter(chapter.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Add New Chapter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="chapterTitle">Chapter Title</Label>
                    <Input
                      id="chapterTitle"
                      name="title"
                      placeholder="e.g., Introduction to HTML Tags"
                      value={newChapter.title}
                      onChange={handleChapterChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="chapterDescription">Chapter Description</Label>
                    <div className="min-h-[150px]">
                      <ReactQuill
                        theme="snow"
                        modules={quillModules}
                        value={newChapter.description}
                        onChange={handleChapterRichTextChange}
                        placeholder="Provide a brief description of the chapter content..."
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Video Source</Label>
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="videoSourceUrl" 
                          name="videoSource" 
                          className="mr-2"
                          checked={newChapter.videoSource === 'url'} 
                          onChange={() => handleVideoSourceChange('url')}
                        />
                        <Label htmlFor="videoSourceUrl" className="cursor-pointer">External URL</Label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="videoSourceFile" 
                          name="videoSource" 
                          className="mr-2"
                          checked={newChapter.videoSource === 'file'} 
                          onChange={() => handleVideoSourceChange('file')}
                        />
                        <Label htmlFor="videoSourceFile" className="cursor-pointer">Upload File</Label>
                      </div>
                    </div>
                  </div>
                  
                  {newChapter.videoSource === 'url' ? (
                    <div className="space-y-2">
                      <Label htmlFor="videoUrl">Video URL</Label>
                      <Input
                        id="videoUrl"
                        name="videoUrl"
                        placeholder="Enter a URL for the chapter video"
                        value={newChapter.videoUrl}
                        onChange={handleChapterChange}
                        required={newChapter.videoSource === 'url'}
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="videoFile">Upload Video</Label>
                      <Input
                        id="videoFile"
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        required={newChapter.videoSource === 'file'}
                      />
                      {newChapter.videoFile && (
                        <p className="text-sm text-gray-500 mt-1">
                          Selected: {newChapter.videoFile.name} ({(newChapter.videoFile.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={handleAddChapter}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Chapter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EditCourse;
