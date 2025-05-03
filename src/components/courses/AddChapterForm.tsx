
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Plus } from "lucide-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Chapter {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  videoFile?: File | null;
  videoSource: 'url' | 'file';
}

interface AddChapterFormProps {
  onAddChapter: (chapter: Chapter) => void;
}

const AddChapterForm = ({ onAddChapter }: AddChapterFormProps) => {
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
    
    onAddChapter(chapter);
    
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

  return (
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
  );
};

export default AddChapterForm;
