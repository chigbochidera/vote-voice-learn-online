
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, LinkIcon, Upload } from "lucide-react";

interface ChapterItemProps {
  chapter: {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    videoFile?: File | null;
    videoSource: 'url' | 'file';
  };
  index: number;
  onDelete: (id: string) => void;
}

const ChapterItem = ({ chapter, index, onDelete }: ChapterItemProps) => {
  return (
    <div className="flex items-start justify-between p-4 border rounded-md">
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
        onClick={() => onDelete(chapter.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ChapterItem;
