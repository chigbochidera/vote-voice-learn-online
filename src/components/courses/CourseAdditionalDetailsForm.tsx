
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FormData {
  instructorName: string;
  price: string;
  duration: string;
  isPublished: boolean;
}

interface CourseAdditionalDetailsFormProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CourseAdditionalDetailsForm = ({
  formData,
  handleChange,
  handleCheckboxChange
}: CourseAdditionalDetailsFormProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Additional Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="instructorName">Instructor Name</Label>
            <Input
              id="instructorName"
              name="instructorName"
              placeholder="e.g., John Smith"
              value={formData.instructorName}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (USD)</Label>
            <Input
              id="price"
              name="price"
              placeholder="e.g., 49.99"
              value={formData.price}
              onChange={handleChange}
              type="number"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (hours)</Label>
            <Input
              id="duration"
              name="duration"
              placeholder="e.g., 10.5"
              value={formData.duration}
              onChange={handleChange}
              type="number"
              min="0"
              step="0.5"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleCheckboxChange}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label htmlFor="isPublished" className="text-sm font-medium cursor-pointer">
            Publish course immediately
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseAdditionalDetailsForm;
