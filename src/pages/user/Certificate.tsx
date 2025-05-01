
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Loader2, Download, ArrowLeft } from "lucide-react";

interface CourseInfo {
  id: string;
  title: string;
  instructor: string;
  completedAt: string;
}

const Certificate = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [courseInfo, setCourseInfo] = useState<CourseInfo | null>(null);

  useEffect(() => {
    const fetchCertificateData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock data
        setCourseInfo({
          id: courseId || "",
          title: "Introduction to Web Development",
          instructor: "Sarah Johnson",
          completedAt: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        });
      } catch (error) {
        console.error("Error fetching certificate data:", error);
        toast.error("Failed to load certificate information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificateData();
  }, [courseId]);

  const handleDownloadCertificate = () => {
    // Simulate download delay
    toast("Preparing your certificate...");
    setTimeout(() => {
      toast.success("Certificate downloaded successfully");
    }, 1500);
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

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/my-courses">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to My Courses
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-2">Course Certificate</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Congratulations on completing the course!
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="p-8 flex flex-col items-center border-4 border-double">
          <div className="text-center space-y-6 py-10">
            <div>
              <h2 className="uppercase text-gray-500 dark:text-gray-400 tracking-widest text-sm font-medium">
                Certificate of Completion
              </h2>
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400">This certifies that</p>
              <h3 className="text-3xl font-serif">{user?.name || "Student Name"}</h3>
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400">has successfully completed</p>
              <h3 className="text-2xl font-bold">{courseInfo?.title}</h3>
              <p className="text-gray-500">Instructed by {courseInfo?.instructor}</p>
            </div>

            <div className="pt-10">
              <div className="w-40 mx-auto border-t-2 border-gray-300 dark:border-gray-700 pt-4">
                <p className="text-sm text-gray-500">Issued on {courseInfo?.completedAt}</p>
                <p className="text-sm text-gray-500">Certificate ID: CERT-{courseId?.slice(0, 8).toUpperCase()}</p>
              </div>
            </div>
          </div>

          <Button onClick={handleDownloadCertificate} className="mt-6">
            <Download className="mr-2 h-4 w-4" /> Download Certificate
          </Button>
        </Card>

        <div className="text-center mt-6">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Share your achievement with others!
          </p>
          <div className="flex justify-center space-x-2">
            <Button variant="outline" size="sm">
              Share on LinkedIn
            </Button>
            <Button variant="outline" size="sm">
              Share on Twitter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
