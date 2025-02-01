import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const STORAGE_KEY_PREFIX = 'note_';

const NoteEditor = () => {
  const { courseId } = useParams();
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Loading note for course:', courseId);
    if (courseId) {
      const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${courseId}`);
      if (stored) {
        try {
          // Try to parse it in case it's JSON
          const parsed = JSON.parse(stored);
          // If it's an array or object, ignore it and start fresh
          if (typeof parsed === 'string') {
            setContent(parsed);
          }
        } catch {
          // If it's not JSON, use it directly
          setContent(stored);
        }
      }
    }
  }, [courseId]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (courseId) {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${courseId}`, newContent);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/courses_notes')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux cours
        </Button>
      </div>
      <Textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Prenez vos notes ici..."
        className="min-h-[70vh] p-4"
      />
    </div>
  );
};

export default NoteEditor;