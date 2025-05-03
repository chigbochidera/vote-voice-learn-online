import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { ArrowLeft } from "lucide-react";
import CourseDetailsForm from "@/components/courses/CourseDetailsForm";
import CourseAdditionalDetailsForm from "@/components/courses/CourseAdditionalDetailsForm";
import ChapterPlaceholder from "@/components/courses/ChapterPlaceholder";

interface FormData {
  title: string;
  description: string;
  category: string;
  level: string;
  thumbnailUrl: string;
  price: string;
  duration: string;
  instructorName: string;
  isPublished: boolean;
}

const CreateCourse = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    level: "",
    thumbnailUrl: "",
    price: "",
    duration: "",
    instructorName: "",
    isPublished: false,
  });

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Course created successfully");
      navigate("/admin/courses");
    } catch (error) {
      toast.error("Failed to create course");
      console.error("Error creating course:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <h1 className="text-3xl font-bold mb-2">Create New Course</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Add a new course to the platform
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <CourseDetailsForm
          formData={{
            title: formData.title,
            description: formData.description,
            category: formData.category,
            level: formData.level,
            thumbnailUrl: formData.thumbnailUrl
          }}
          handleChange={handleChange}
          handleRichTextChange={handleRichTextChange}
          handleSelectChange={handleSelectChange}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
        />

        <CourseAdditionalDetailsForm
          formData={{
            instructorName: formData.instructorName,
            price: formData.price,
            duration: formData.duration,
            isPublished: formData.isPublished
          }}
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange}
        />
          
        <ChapterPlaceholder />
      </div>
    </div>
  );
};

export default CreateCourse;
