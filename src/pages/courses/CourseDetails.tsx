
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourse, markChapterComplete } from "@/services/api";
import { useAuth } from "@/contexts/auth-context";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { 
  CheckCircle, 
  Loader2, 
  MessageSquare, 
  Clock, 
  FileText,
  Video
} from "lucide-react";

// Fake comments data for demonstration
const FAKE_COMMENTS = [
  {
    id: "comment-1",
    user: {
      name: "John Smith",
      avatar: "https://github.com/shadcn.png"
    },
    content: "This chapter was really helpful! I especially liked the examples.",
    timestamp: "2 days ago"
  },
  {
    id: "comment-2",
    user: {
      name: "Sarah Lee",
      avatar: "https://github.com/shadcn.png"
    },
    content: "I'm still a bit confused about the middle section. Could you explain it in more detail?",
    timestamp: "1 day ago"
  },
  {
    id: "comment-3",
    user: {
      name: "Michael Johnson",
      avatar: "https://github.com/shadcn.png"
    },
    content: "Great explanation! This cleared up a lot of confusion I had.",
    timestamp: "12 hours ago"
  }
];

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { course, isLoading, error } = useCourse(courseId || "");
  
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(FAKE_COMMENTS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState("1");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Update video playback rate when the speed changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = parseFloat(playbackSpeed);
    }
  }, [playbackSpeed]);

  const selectedChapter = course?.chapters[selectedChapterIndex];

  const handleChapterSelect = (index: number) => {
    setSelectedChapterIndex(index);
  };

  const handleMarkComplete = async () => {
    if (!course || !selectedChapter) return;
    
    try {
      const success = await markChapterComplete(course.id, selectedChapter.id, user?.id || "");
      
      if (success) {
        // Update local state
        const updatedChapters = course.chapters.map((chapter, index) => {
          if (index === selectedChapterIndex) {
            return { ...chapter, isCompleted: true };
          }
          return chapter;
        });
        
        // This is a mock update since we're not actually modifying the API data
        toast.success("Chapter marked as completed!");
      }
    } catch (error) {
      console.error("Error marking chapter as complete:", error);
      toast.error("Failed to update progress");
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call to post comment
    setTimeout(() => {
      const newComment = {
        id: `comment-${Date.now()}`,
        user: {
          name: user?.name || "Current User",
          avatar: "https://github.com/shadcn.png"
        },
        content: comment,
        timestamp: "Just now"
      };
      
      setComments([newComment, ...comments]);
      setComment("");
      setIsSubmitting(false);
      toast.success("Comment posted successfully");
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-myvomyvo-600" />
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Course</h2>
          <p className="mb-4">
            We couldn't load the course information. Please try again later.
          </p>
          <Button onClick={() => navigate("/my-courses")}>Back to My Courses</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Instructor: {course.instructor}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video and Content Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            {selectedChapter ? (
              <>
                <div className="relative pt-[56.25%] bg-black">
                  <video 
                    ref={videoRef}
                    src={selectedChapter.videoUrl || "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"}
                    controls
                    className="absolute inset-0 w-full h-full"
                    poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop"
                    preload="metadata"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{selectedChapter.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {selectedChapter.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Speed:</span>
                      <Select 
                        value={playbackSpeed} 
                        onValueChange={setPlaybackSpeed}
                      >
                        <SelectTrigger className="w-[80px]">
                          <SelectValue placeholder="1x" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0.5">0.5x</SelectItem>
                          <SelectItem value="0.75">0.75x</SelectItem>
                          <SelectItem value="1">1x</SelectItem>
                          <SelectItem value="1.25">1.25x</SelectItem>
                          <SelectItem value="1.5">1.5x</SelectItem>
                          <SelectItem value="2">2x</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{selectedChapter.duration}</span>
                    </div>
                    {selectedChapter.isCompleted ? (
                      <div className="flex items-center text-green-500 gap-1">
                        <CheckCircle className="h-5 w-5" />
                        <span>Completed</span>
                      </div>
                    ) : (
                      <Button onClick={handleMarkComplete}>
                        Mark as Completed
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Please select a chapter to start learning
                </p>
              </div>
            )}
          </Card>

          <Tabs defaultValue="discussion">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="discussion">
                <MessageSquare className="h-4 w-4 mr-2" />
                Discussion
              </TabsTrigger>
              <TabsTrigger value="notes">
                <FileText className="h-4 w-4 mr-2" />
                Notes
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="discussion" className="space-y-4 pt-4">
              <form onSubmit={handleCommentSubmit}>
                <Textarea
                  placeholder="Share your thoughts or ask a question..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mb-2"
                />
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !comment.trim()}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      "Post Comment"
                    )}
                  </Button>
                </div>
              </form>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{comment.user.name}</h4>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mt-1">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="notes" className="space-y-4 pt-4">
              <Textarea
                placeholder="Take notes for this chapter..."
                className="min-h-[200px]"
              />
              <div className="flex justify-end">
                <Button>Save Notes</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Chapters List */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Course Chapters</CardTitle>
              <CardDescription>
                {course.chapters.filter(ch => ch.isCompleted).length} of {course.chapters.length} completed
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {course.chapters.map((chapter, index) => (
                  <div 
                    key={chapter.id}
                    onClick={() => handleChapterSelect(index)}
                    className={`p-4 flex items-start gap-3 cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                      selectedChapterIndex === index ? "bg-gray-100 dark:bg-gray-800" : ""
                    }`}
                  >
                    <div className="flex-shrink-0 pt-0.5">
                      {chapter.isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Video className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{chapter.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>{chapter.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round((course.chapters.filter(ch => ch.isCompleted).length / course.chapters.length) * 100)}% Complete
              </div>
              {course.chapters.filter(ch => ch.isCompleted).length === course.chapters.length && (
                <Button 
                  variant="outline"
                  className="text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-950"
                  onClick={() => navigate(`/certificate/${course.id}`)}
                >
                  View Certificate
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
