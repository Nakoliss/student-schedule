import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useEvents } from "@/hooks/use-events";

const STORAGE_KEY_PREFIX = 'note_';

const NoteEditor = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { events } = useEvents();
  const courseTitle = location.state?.courseTitle || 
    events.find(event => event.id === courseId)?.title || 
    "Sans titre";
  const [content, setContent] = useState("");

  useEffect(() => {
    console.log('Loading note for course:', courseId);
    if (courseId) {
      const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${courseId}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (typeof parsed === 'string') {
            setContent(parsed);
          }
        } catch {
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
    <div className="min-h-screen p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/courses_notes')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux cours
        </Button>
      </div>

      <h1 className="text-4xl font-bold mb-8">{courseTitle}</h1>

      <div className="notebook-container">
        <Textarea
          value={content}
          onChange={handleContentChange}
          className="notebook-paper min-h-[calc(100vh-250px)]"
          placeholder="Prenez vos notes ici..."
        />
      </div>
    </div>
  );
};

export default NoteEditor;