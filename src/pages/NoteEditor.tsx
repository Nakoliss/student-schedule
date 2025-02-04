import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useEvents } from "@/hooks/use-events";
import { ScrollArea } from "@/components/ui/scroll-area";

const LINES_PER_PAGE = 20;

interface PageSpread {
  left: string;
  right: string;
}

const NoteEditor = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { events } = useEvents();
  const courseTitle = location.state?.courseTitle || 
    events.find(event => event.id === courseId)?.title || 
    "Sans titre";
  
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [pages, setPages] = useState<PageSpread[]>([{ left: "", right: "" }]);

  useEffect(() => {
    console.log('Loading note for course:', courseId);
    if (courseId) {
      const stored = localStorage.getItem(`note_${courseId}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setPages(parsed);
          } else if (typeof parsed === 'object' && parsed !== null) {
            setPages([{ left: parsed.left || "", right: parsed.right || "" }]);
          }
        } catch {
          setPages([{ left: "", right: "" }]);
        }
      }
    }
  }, [courseId]);

  const savePages = (newPages: PageSpread[]) => {
    if (courseId) {
      localStorage.setItem(`note_${courseId}`, JSON.stringify(newPages));
    }
  };

  const handleContentChange = (side: 'left' | 'right', value: string) => {
    const lines = value.split('\n');
    const updatedPages = [...pages];
    
    // If we exceed the line limit
    if (lines.length > LINES_PER_PAGE) {
      // If we're on the left page
      if (side === 'left') {
        const leftContent = lines.slice(0, LINES_PER_PAGE).join('\n');
        const overflow = lines.slice(LINES_PER_PAGE).join('\n');
        
        updatedPages[currentPageIndex].left = leftContent;
        updatedPages[currentPageIndex].right = overflow + (updatedPages[currentPageIndex].right || '');
      }
      // If we're on the right page
      else if (side === 'right') {
        const rightContent = lines.slice(0, LINES_PER_PAGE).join('\n');
        const overflow = lines.slice(LINES_PER_PAGE).join('\n');
        
        updatedPages[currentPageIndex].right = rightContent;
        
        // Create new page spread if needed
        if (!updatedPages[currentPageIndex + 1]) {
          updatedPages.push({ left: "", right: "" });
        }
        updatedPages[currentPageIndex + 1].left = overflow;
        setCurrentPageIndex(currentPageIndex + 1);
      }
    } else {
      updatedPages[currentPageIndex][side] = value;
    }
    
    setPages(updatedPages);
    savePages(updatedPages);
  };

  const handlePageChange = (index: number) => {
    if (index >= 0 && index < pages.length) {
      setCurrentPageIndex(index);
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

      <div className="flex items-center gap-2 mb-4">
        {pages.map((_, index) => (
          <Button
            key={index}
            variant={index === currentPageIndex ? "default" : "outline"}
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </Button>
        ))}
      </div>

      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="notebook-container relative">
          <div className="notebook-spine" />
          <Textarea
            value={pages[currentPageIndex].left}
            onChange={(e) => handleContentChange('left', e.target.value)}
            className="notebook-paper min-h-[480px] max-h-[480px] overflow-hidden"
            placeholder="Prenez vos notes ici..."
            rows={LINES_PER_PAGE}
          />
          <Textarea
            value={pages[currentPageIndex].right}
            onChange={(e) => handleContentChange('right', e.target.value)}
            className="notebook-paper-right min-h-[480px] max-h-[480px] overflow-hidden"
            placeholder="Continuez vos notes ici..."
            rows={LINES_PER_PAGE}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default NoteEditor;