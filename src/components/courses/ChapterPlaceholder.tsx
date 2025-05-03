
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface ChapterPlaceholderProps {
  title?: string;
  message?: string;
  subMessage?: string;
}

const ChapterPlaceholder = ({
  title = "Chapters",
  message = "Chapters will be added after course creation",
  subMessage = "You'll be able to add content, quizzes, and assignments"
}: ChapterPlaceholderProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-gray-500">You can add chapters after creating the course</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md">
          <Plus className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-gray-500 font-medium">{message}</p>
          <p className="text-gray-400 text-sm">{subMessage}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChapterPlaceholder;
