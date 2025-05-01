
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "@/components/ui/sonner";
import { Loader2, Play, ChevronDown, ChevronUp, Clock, BookOpen, User, Send } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  isCompleted: boolean;
  comments: {
    id: string;
    user: {
      name: string;
      avatar: string;
    };
    content: string;
    timestamp: string;
  }[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  chapters: Chapter[];
  totalChapters: number;
  completedChapters: number;
}

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const [activeChapterId, setActiveChapterId] = useState<string>("");
  const [comment, setComment] = useState("");
  const [videoSpeed, setVideoSpeed] = useState(1);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock data
        const mockCourse: Course = {
          id: courseId || "course-1",
          title: "Introduction to Web Development",
          description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites. This comprehensive course covers everything from setting up your development environment to building responsive websites.",
          instructor: "Sarah Johnson",
          thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          chapters: [
            {
              id: "chapter-1",
              title: "Getting Started with HTML",
              description: "Learn the basics of HTML structure and syntax",
              videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
              isCompleted: true,
              comments: [
                {
                  id: "comment-1",
                  user: {
                    name: "John Smith",
                    avatar: "https://i.pravatar.cc/100?img=1",
                  },
                  content: "Great explanation of the basics!",
                  timestamp: "2 days ago",
                },
                {
                  id: "comment-2",
                  user: {
                    name: "Emma Davis",
                    avatar: "https://i.pravatar.cc/100?img=5",
                  },
                  content: "I'm still confused about semantic tags. Can someone explain?",
                  timestamp: "1 day ago",
                },
              ],
            },
            {
              id: "chapter-2",
              title: "CSS Fundamentals",
              description: "Master CSS selectors, properties, and values",
              videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
              isCompleted: true,
              comments: [
                {
                  id: "comment-3",
                  user: {
                    name: "Michael Brown",
                    avatar: "https://i.pravatar.cc/100?img=3",
                  },
                  content: "The CSS box model explanation was very helpful!",
                  timestamp: "3 days ago",
                },
              ],
            },
            {
              id: "chapter-3",
              title: "JavaScript Basics",
              description: "Introduction to JavaScript variables, functions, and control flow",
              videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
              isCompleted: false,
              comments: [],
            },
            {
              id: "chapter-4",
              title: "Responsive Design",
              description: "Learn how to make your websites look great on all devices",
              videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
              isCompleted: false,
              comments: [],
            },
          ],
          totalChapters: 4,
          completedChapters: 2,
        };
        
        setCourse(mockCourse);
        setActiveChapterId(mockCourse.chapters[0].id);
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleMarkAsComplete = (chapterId: string) => {
    if (!course) return;
    
    const updatedChapters = course.chapters.map(chapter => {
      if (chapter.id === chapterId) {
        return { ...chapter, isCompleted: !chapter.isCompleted };
      }
      return chapter;
    });
    
    const updatedCompletedCount = updatedChapters.filter(c => c.isCompleted).length;
    
    setCourse({
      ...course,
      chapters: updatedChapters,
      completedChapters: updatedCompletedCount,
    });
    
    toast(
      updatedChapters.find(c => c.id === chapterId)?.isCompleted 
        ? "Chapter marked as complete!" 
        : "Chapter marked as incomplete",
      {
        description: "Your progress has been updated",
      }
    );
  };

  const handleSubmitComment = () => {
    if (!comment.trim() || !course) return;
    
    const updatedChapters = course.chapters.map(chapter => {
      if (chapter.id === activeChapterId) {
        return {
          ...chapter,
          comments: [
            ...chapter.comments,
            {
              id: `comment-${Date.now()}`,
              user: {
                name: "You",
                avatar: "https://i.pravatar.cc/100?img=8",
              },
              content: comment,
              timestamp: "Just now",
            },
          ],
        };
      }
      return chapter;
    });
    
    setCourse({
      ...course,
      chapters: updatedChapters,
    });
    
    setComment("");
    toast("Comment posted", {
      description: "Your comment has been added to the discussion",
    });
  };

  const activeChapter = course?.chapters.find(c => c.id === activeChapterId);
  const progress = course ? Math.round((course.completedChapters / course.totalChapters) * 100) : 0;

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-myvomyvo-600" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Course not found</h2>
          <p>The course you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area - 2/3 width on large screens */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          
          <div className="mb-6 rounded-lg overflow-hidden bg-black aspect-video">
            {/* Video player */}
            <video
              src={activeChapter?.videoUrl}
              controls
              className="w-full h-full"
              poster={course.thumbnail}
              preload="metadata"
              playbackRate={videoSpeed}
            >
              Your browser doesn't support HTML5 video.
            </video>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">{activeChapter?.title}</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm">Playback Speed:</span>
                <select
                  value={videoSpeed}
                  onChange={(e) => setVideoSpeed(parseFloat(e.target.value))}
                  className="text-sm p-1 border rounded"
                >
                  <option value="0.5">0.5x</option>
                  <option value="0.75">0.75x</option>
                  <option value="1">1x</option>
                  <option value="1.25">1.25x</option>
                  <option value="1.5">1.5x</option>
                  <option value="2">2x</option>
                </select>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              {activeChapter?.description}
            </p>
            <div className="flex items-center">
              <Checkbox 
                id={`complete-${activeChapterId}`}
                checked={activeChapter?.isCompleted}
                onCheckedChange={() => handleMarkAsComplete(activeChapterId)}
                className="mr-2"
              />
              <label htmlFor={`complete-${activeChapterId}`} className="text-sm font-medium">
                Mark as completed
              </label>
            </div>
          </div>
          
          <Tabs defaultValue="discussion" className="mb-6">
            <TabsList>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
              <TabsTrigger value="notes">My Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="discussion" className="py-4">
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Comments</h3>
                {activeChapter?.comments && activeChapter.comments.length > 0 ? (
                  <div className="space-y-4">
                    {activeChapter.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <div className="flex-shrink-0">
                          <img 
                            src={comment.user.avatar} 
                            alt={comment.user.name} 
                            className="w-8 h-8 rounded-full"
                          />
                        </div>
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-medium">{comment.user.name}</span>
                            <span className="text-xs text-gray-500">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm mt-1">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No comments yet. Be the first to start the discussion!</p>
                )}
              </div>
              
              <div className="mt-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-myvomyvo-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-myvomyvo-600" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <Textarea
                      placeholder="Add to the discussion..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <Button 
                      onClick={handleSubmitComment}
                      disabled={!comment.trim()}
                      className="mt-2"
                    >
                      <Send className="mr-2 h-4 w-4" /> Post Comment
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="notes" className="py-4">
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">My Notes</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Take notes for this chapter that only you can see.
                </p>
                <Textarea
                  placeholder="Write your notes here..."
                  className="min-h-[200px]"
                />
                <Button className="mt-2">Save Notes</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - 1/3 width on large screens */}
        <div>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Course Progress</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {course.completedChapters} of {course.totalChapters} chapters completed
                </p>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-gray-600" />
                  <span>Instructor: {course.instructor}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-gray-600" />
                  <span>{course.totalChapters} Chapters</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-gray-600" />
                  <span>2.5 hours total</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mb-2">
            <h3 className="text-lg font-bold mb-2">Course Content</h3>
          </div>

          <div className="space-y-2">
            {course.chapters.map((chapter) => (
              <Card
                key={chapter.id}
                className={`transition-colors ${activeChapterId === chapter.id ? "border-myvomyvo-500 bg-myvomyvo-50 dark:bg-myvomyvo-900/20" : ""}`}
              >
                <Collapsible>
                  <CollapsibleTrigger className="flex justify-between items-center w-full p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 pt-1">
                        <div className={`w-5 h-5 rounded-full border ${chapter.isCompleted ? "bg-green-100 border-green-500" : "bg-gray-100 border-gray-300"} flex items-center justify-center`}>
                          {chapter.isCompleted && (
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                          )}
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{chapter.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          <Play className="h-3 w-3 mr-1" /> 10 minutes
                        </div>
                      </div>
                    </div>
                    <div>
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="p-4 pt-0 text-sm">
                      <Separator className="mb-3" />
                      <p className="mb-3">{chapter.description}</p>
                      <div className="flex justify-between">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setActiveChapterId(chapter.id)}
                        >
                          <Play className="mr-1 h-4 w-4" /> Watch Now
                        </Button>
                        <div className="flex items-center">
                          <Checkbox 
                            id={`list-complete-${chapter.id}`}
                            checked={chapter.isCompleted}
                            onCheckedChange={() => handleMarkAsComplete(chapter.id)}
                            className="mr-2"
                          />
                          <label htmlFor={`list-complete-${chapter.id}`} className="text-xs">
                            Complete
                          </label>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
