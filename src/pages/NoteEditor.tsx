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
  const [leftContent, setLeftContent] = useState("");
  const [rightContent, setRightContent] = useState("");

  useEffect(() => {
    console.log('Loading note for course:', courseId);
    if (courseId) {
      const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${courseId}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (typeof parsed === 'object' && parsed !== null) {
            setLeftContent(parsed.left || "");
            setRightContent(parsed.right || "");
          } else if (typeof parsed === 'string') {
            setLeftContent(parsed);
          }
        } catch {
          setLeftContent(stored);
        }
      }
    }
  }, [courseId]);

  const handleContentChange = (side: 'left' | 'right', value: string) => {
    if (side === 'left') {
      setLeftContent(value);
    } else {
      setRightContent(value);
    }
    
    if (courseId) {
      const content = {
        left: side === 'left' ? value : leftContent,
        right: side === 'right' ? value : rightContent
      };
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${courseId}`, JSON.stringify(content));
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

      <div className="notebook-container relative">
        <div className="notebook-spine" />
        <Textarea
          value={leftContent}
          onChange={(e) => handleContentChange('left', e.target.value)}
          className="notebook-paper min-h-[calc(100vh-250px)]"
          placeholder="Prenez vos notes ici..."
        />
        <Textarea
          value={rightContent}
          onChange={(e) => handleContentChange('right', e.target.value)}
          className="notebook-paper-right min-h-[calc(100vh-250px)]"
          placeholder="Continuez vos notes ici..."
        />
      </div>
    </div>
  );
};

export default NoteEditor;