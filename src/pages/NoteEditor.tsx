import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useEvents } from "@/hooks/use-events";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NotebookPage } from "@/components/notes/NotebookPage";
import { PageNavigation } from "@/components/notes/PageNavigation";
import { handlePageOverflow, loadNote, saveNote } from "@/utils/noteUtils";
import type { PageSpread } from "@/types/notes";

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
    console.log("Loading note for courseId:", courseId);
    if (courseId) {
      const loadedPages = loadNote(courseId);
      console.log("Loaded pages:", loadedPages);
      setPages(loadedPages);
    }
  }, [courseId]);

  const handleContentChange = (side: 'left' | 'right', value: string) => {
    console.log(`Handling content change for ${side} side:`, value);
    
    const result = handlePageOverflow(
      value,
      side,
      pages,
      currentPageIndex
    );

    console.log("Page overflow result:", result);

    setPages(result.updatedPages);
    
    if (courseId) {
      saveNote(courseId, result.updatedPages);
    }

    if (result.newPageIndex !== undefined) {
      console.log("Navigating to new page index:", result.newPageIndex);
      setCurrentPageIndex(result.newPageIndex);
    }

    if (result.focusSide) {
      console.log("Focusing on side:", result.focusSide);
      setTimeout(() => {
        const selector = result.focusSide === 'left' ? '.notebook-paper' : '.notebook-paper-right';
        const textarea = document.querySelector(selector) as HTMLTextAreaElement;
        if (textarea) {
          textarea.focus();
          textarea.setSelectionRange(0, 0);
        }
      }, 0);
    }
  };

  const handleKeyDown = (side: 'left' | 'right', e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const lines = textarea.value.split('\n');
    
    if (e.key === 'Enter' && lines.length >= 20) {
      e.preventDefault();
      
      if (side === 'left') {
        const rightTextarea = document.querySelector('.notebook-paper-right') as HTMLTextAreaElement;
        if (rightTextarea) {
          rightTextarea.focus();
          rightTextarea.setSelectionRange(0, 0);
        }
      } else {
        const newPages = [...pages];
        if (!newPages[currentPageIndex + 1]) {
          newPages.push({ left: "", right: "" });
        }
        setPages(newPages);
        if (courseId) {
          saveNote(courseId, newPages);
        }
        setCurrentPageIndex(prev => prev + 1);
        
        setTimeout(() => {
          const leftTextarea = document.querySelector('.notebook-paper') as HTMLTextAreaElement;
          if (leftTextarea) {
            leftTextarea.focus();
            leftTextarea.setSelectionRange(0, 0);
          }
        }, 0);
      }
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

      <PageNavigation
        currentPage={currentPageIndex}
        totalPages={pages.length}
        onPageChange={setCurrentPageIndex}
      />

      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="notebook-container relative">
          <div className="notebook-spine" />
          <NotebookPage
            content={pages[currentPageIndex]?.left || ""}
            onChange={(value) => handleContentChange('left', value)}
            onKeyDown={(e) => handleKeyDown('left', e)}
            side="left"
            className="notebook-paper min-h-[480px] max-h-[480px] overflow-hidden"
            placeholder="Prenez vos notes ici..."
          />
          <NotebookPage
            content={pages[currentPageIndex]?.right || ""}
            onChange={(value) => handleContentChange('right', value)}
            onKeyDown={(e) => handleKeyDown('right', e)}
            side="right"
            className="notebook-paper-right min-h-[480px] max-h-[480px] overflow-hidden"
            placeholder="Continuez vos notes ici..."
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default NoteEditor;