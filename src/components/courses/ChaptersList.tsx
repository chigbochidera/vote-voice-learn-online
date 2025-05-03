
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChapterItem from "./ChapterItem";

interface Chapter {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  videoFile?: File | null;
  videoSource: 'url' | 'file';
}

interface ChaptersListProps {
  chapters: Chapter[];
  onDeleteChapter: (id: string) => void;
}

const ChaptersList = ({ chapters, onDeleteChapter }: ChaptersListProps) => {
  return (
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
              <ChapterItem
                key={chapter.id}
                chapter={chapter}
                index={index}
                onDelete={onDeleteChapter}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChaptersList;
