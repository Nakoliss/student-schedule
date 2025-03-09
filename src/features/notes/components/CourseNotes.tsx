import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useEvents } from "@/features/calendar/hooks/use-events";

const STORAGE_KEY_PREFIX = 'course_notes_';
const LINES_PER_PAGE = 21; // Exactly 21 lines per page
const MAX_CHARS_PER_LINE = 88; // Reduced from 90 to 88 as requested

// Define our note structure - now with a fixed-size array per page
interface NotePage {
  lines: string[];
}

interface Note {
  id: string;
  courseId: string;
  title: string;
  pages: NotePage[];
  createdAt: string;
}

// Define interfaces for migration from old formats
interface OldNoteWithContent {
  id: string;
  courseId: string;
  title: string;
  content: string;
  createdAt: string;
}

interface OldNoteWithStringPages {
  id: string;
  courseId: string;
  title: string;
  pages: string[];
  createdAt: string;
}

type OldNoteFormat = OldNoteWithContent | OldNoteWithStringPages;

// Generic note type for parsing stored data
interface StoredNote {
  id: string;
  courseId: string;
  title: string;
  content?: string;
  pages?: (NotePage | string)[];
  createdAt: string;
}

const CourseNotes = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { events } = useEvents();
  const courseTitle = location.state?.courseTitle || 
    events.find(event => event.id === courseId)?.title || 
    "Sans titre";
    
  const [note, setNote] = useState<Note | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  
  // Array of refs for each line input
  const lineRefs = useRef<(HTMLInputElement | null)[]>(Array(LINES_PER_PAGE).fill(null));
  
  // Find the last page that has any content
  const findLastPageWithContent = useCallback((note: Note): number => {
    for (let i = note.pages.length - 1; i >= 0; i--) {
      if (note.pages[i].lines.some(line => line.trim() !== '')) {
        return i;
      }
    }
    return 0; // Default to first page if no content found
  }, []);
  
  // Migrate note from old format if needed
  const migrateNoteFormat = useCallback((oldNote: StoredNote): Note => {
    // Check if this is old format with content field
    if ('content' in oldNote && oldNote.content !== undefined) {
      // Split content by newlines and chunk into pages
      const lines = oldNote.content.split(/\r?\n/);
      const pages: NotePage[] = [];
      
      for (let i = 0; i < lines.length; i += LINES_PER_PAGE) {
        const pageLines = lines.slice(i, i + LINES_PER_PAGE);
        // Make sure we have exactly LINES_PER_PAGE lines
        while (pageLines.length < LINES_PER_PAGE) {
          pageLines.push('');
        }
        pages.push({
          lines: pageLines
        });
      }
      
      // If no content, add empty page
      if (pages.length === 0) {
        pages.push({ 
          lines: Array(LINES_PER_PAGE).fill('') 
        });
      }
      
      return {
        ...oldNote,
        pages
      };
    } 
    
    // Handle array of string pages format
    if ('pages' in oldNote && Array.isArray(oldNote.pages)) {
      if (oldNote.pages.length > 0 && typeof oldNote.pages[0] === 'string') {
        return {
          ...oldNote,
          pages: oldNote.pages.map((pageContent: string) => {
            const lines = pageContent.split(/\r?\n/).slice(0, LINES_PER_PAGE);
            // Make sure we have exactly LINES_PER_PAGE lines
            while (lines.length < LINES_PER_PAGE) {
              lines.push('');
            }
            return { lines };
          })
        };
      }
    }
    
    // Already in correct format
    if ('pages' in oldNote && Array.isArray(oldNote.pages) && 
        oldNote.pages.length > 0 && 
        typeof oldNote.pages[0] === 'object' && 
        oldNote.pages[0] !== null &&
        'lines' in oldNote.pages[0]) {
      return oldNote as Note;
    }
    
    // Handle unknown format - create default
    return {
      ...oldNote,
      pages: [{ lines: Array(LINES_PER_PAGE).fill('') }]
    };
  }, []);
  
  // Create a new note with LINES_PER_PAGE empty lines for each page
  const createEmptyPage = useCallback((): NotePage => {
    // Create an array with exactly LINES_PER_PAGE empty strings
    const emptyLines = Array.from({ length: LINES_PER_PAGE }, () => '');
    return { lines: emptyLines };
  }, []);

  // Load note from localStorage
  const loadNoteFromStorage = useCallback((courseId: string): Note | null => {
    const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${courseId}`);
    if (!stored) return null;
    
    try {
      // Parse stored data
      const parsedData = JSON.parse(stored);
      
      // If we have an array, find the note for this course or return null
      if (Array.isArray(parsedData)) {
        const courseNote = parsedData.find((note: StoredNote) => note.courseId === courseId);
        if (!courseNote) return null;
        
        // Migrate from old format if needed
        return migrateNoteFormat(courseNote);
      } 
      
      // If we have a single note object
      return migrateNoteFormat(parsedData as StoredNote);
    } catch (error) {
      console.error("Error loading note:", error);
      return null;
    }
  }, [migrateNoteFormat]);
  
  // Save note to localStorage
  const saveNoteToStorage = useCallback((noteToSave: Note) => {
    if (!courseId) return;
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${courseId}`, JSON.stringify(noteToSave));
  }, [courseId]);
  
  // Load or create note on component mount
  useEffect(() => {
    if (!courseId) return;
    
    const storedNote = loadNoteFromStorage(courseId);
    
    if (storedNote) {
      setNote(storedNote);
      // Find the last page with content
      const lastPageWithContent = findLastPageWithContent(storedNote);
      setCurrentPage(lastPageWithContent);
    } else {
      // Create a new note if one doesn't exist
      const newNote: Note = {
        id: `note-${courseId}`,
        courseId: courseId,
        title: "Notes",
        pages: [createEmptyPage()],
        createdAt: new Date().toISOString()
      };
      
      setNote(newNote);
      setCurrentPage(0);
      saveNoteToStorage(newNote);
    }
  }, [courseId, loadNoteFromStorage, saveNoteToStorage, findLastPageWithContent, createEmptyPage]);

  // Navigate to previous page
  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      
      // Focus last line of previous page after render
      setTimeout(() => {
        if (lineRefs.current[LINES_PER_PAGE - 1]) {
          lineRefs.current[LINES_PER_PAGE - 1].focus();
        }
      }, 0);
    }
  };

  // Navigate to next page
  const goToNextPage = () => {
    if (!note) return;
    
    // If we're at the last page, create a new one
    if (currentPage === note.pages.length - 1) {
      const updatedNote = { ...note };
      updatedNote.pages.push(createEmptyPage());
      setNote(updatedNote);
      saveNoteToStorage(updatedNote);
    }
    
    setCurrentPage(currentPage + 1);
    
    // Focus first line of next page after render
    setTimeout(() => {
      if (lineRefs.current[0]) {
        lineRefs.current[0].focus();
      }
    }, 0);
  };

  // Handle line change
  const handleLineChange = (lineIndex: number, newContent: string) => {
    if (!note) return;
    
    const updatedNote = { ...note };
    
    // Ensure the page exists
    if (!updatedNote.pages[currentPage]) {
      updatedNote.pages[currentPage] = createEmptyPage();
    }
    
    // Check if the content exceeds the max line length
    if (newContent.length > MAX_CHARS_PER_LINE) {
      // Get the overflow content (everything after MAX_CHARS_PER_LINE)
      const lineContent = newContent.substring(0, MAX_CHARS_PER_LINE);
      const overflow = newContent.substring(MAX_CHARS_PER_LINE);
      
      // Update current line with content that fits
      updatedNote.pages[currentPage].lines[lineIndex] = lineContent;
      
      // Overflow handling
      if (lineIndex < LINES_PER_PAGE - 1) {
        // There's a next line on this page - get current content and prepend overflow
        const nextLineContent = updatedNote.pages[currentPage].lines[lineIndex + 1] || '';
        updatedNote.pages[currentPage].lines[lineIndex + 1] = overflow + nextLineContent;
        
        // Update state and save
        setNote(updatedNote);
        saveNoteToStorage(updatedNote);
        
        // Move cursor to the next line
        setTimeout(() => {
          if (lineRefs.current[lineIndex + 1]) {
            lineRefs.current[lineIndex + 1].focus();
            // Position cursor at the beginning of next line (after the overflow text)
            lineRefs.current[lineIndex + 1].setSelectionRange(overflow.length, overflow.length);
          }
        }, 0);
      } else if (currentPage < note.pages.length - 1) {
        // Last line of the page but not last page - move to next page
        const nextPageFirstLineContent = updatedNote.pages[currentPage + 1].lines[0] || '';
        updatedNote.pages[currentPage + 1].lines[0] = overflow + nextPageFirstLineContent;
        
        // Update state and save
        setNote(updatedNote);
        saveNoteToStorage(updatedNote);
        
        // Move to next page
        setTimeout(() => {
          setCurrentPage(currentPage + 1);
          // After page change, focus first line
          setTimeout(() => {
            if (lineRefs.current[0]) {
              lineRefs.current[0].focus();
              lineRefs.current[0].setSelectionRange(overflow.length, overflow.length);
            }
          }, 0);
        }, 0);
      } else {
        // Last line of last page - create new page
        updatedNote.pages.push(createEmptyPage());
        updatedNote.pages[updatedNote.pages.length - 1].lines[0] = overflow;
        
        // Update state and save
        setNote(updatedNote);
        saveNoteToStorage(updatedNote);
        
        // Move to new page
        setTimeout(() => {
          setCurrentPage(updatedNote.pages.length - 1);
          // After page change, focus first line
          setTimeout(() => {
            if (lineRefs.current[0]) {
              lineRefs.current[0].focus();
              lineRefs.current[0].setSelectionRange(overflow.length, overflow.length);
            }
          }, 0);
        }, 0);
      }
      
      return;
    }
    
    // Normal case - content fits on the line
    updatedNote.pages[currentPage].lines[lineIndex] = newContent;
    
    // Update state and save
    setNote(updatedNote);
    saveNoteToStorage(updatedNote);
  };

  // Handle key down
  const handleLineKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, lineIndex: number) => {
    if (!note) return;
    
    // If Enter was pressed
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // If we're on the last line, go to next page
      if (lineIndex === LINES_PER_PAGE - 1) {
        goToNextPage();
      } else {
        // Otherwise focus next line
        if (lineRefs.current[lineIndex + 1]) {
          lineRefs.current[lineIndex + 1].focus();
        }
      }
      return;
    }
    
    // Handle backspace at beginning of line to merge with previous line
    if (e.key === 'Backspace' && lineIndex > 0) {
      const input = e.currentTarget;
      
      // Only handle if cursor is at the beginning of the line
      if (input.selectionStart === 0 && input.selectionEnd === 0) {
        e.preventDefault();
        
        // Get current line content
        const currentLineContent = note.pages[currentPage].lines[lineIndex] || '';
        
        // Get previous line content
        const prevLineContent = note.pages[currentPage].lines[lineIndex - 1] || '';
        
        // Check if combining would exceed line length
        if (prevLineContent.length + currentLineContent.length <= MAX_CHARS_PER_LINE) {
          // Combine lines
          const updatedNote = { ...note };
          updatedNote.pages[currentPage].lines[lineIndex - 1] = prevLineContent + currentLineContent;
          updatedNote.pages[currentPage].lines[lineIndex] = '';
          
          // Update state and save
          setNote(updatedNote);
          saveNoteToStorage(updatedNote);
          
          // Move cursor to end of previous line
          setTimeout(() => {
            if (lineRefs.current[lineIndex - 1]) {
              lineRefs.current[lineIndex - 1].focus();
              const cursorPosition = prevLineContent.length;
              lineRefs.current[lineIndex - 1].setSelectionRange(cursorPosition, cursorPosition);
            }
          }, 0);
        } else {
          // Just move cursor to end of previous line without combining
          setTimeout(() => {
            if (lineRefs.current[lineIndex - 1]) {
              lineRefs.current[lineIndex - 1].focus();
              const cursorPosition = prevLineContent.length;
              lineRefs.current[lineIndex - 1].setSelectionRange(cursorPosition, cursorPosition);
            }
          }, 0);
        }
        
        return;
      }
    }
    
    // Handle arrow down
    if (e.key === 'ArrowDown') {
      // If we're on the last line, go to next page
      if (lineIndex === LINES_PER_PAGE - 1) {
        goToNextPage();
      } else {
        // Otherwise focus next line if it exists
        if (lineRefs.current[lineIndex + 1]) {
          lineRefs.current[lineIndex + 1].focus();
        }
      }
      return;
    }
    
    // Handle arrow up
    if (e.key === 'ArrowUp') {
      // If we're on the first line and there's a previous page
      if (lineIndex === 0 && currentPage > 0) {
        goToPreviousPage();
      } else if (lineIndex > 0) {
        // Otherwise focus previous line if not first line
        if (lineRefs.current[lineIndex - 1]) {
          lineRefs.current[lineIndex - 1].focus();
        }
      }
      return;
    }
  };

  // Handle paste events
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, lineIndex: number) => {
    e.preventDefault();
    if (!note) return;
    
    // Get pasted text
    const pastedText = e.clipboardData.getData('text');
    const pastedLines = pastedText.split(/\r?\n/);
    
    if (pastedLines.length === 1) {
      // Single line paste - just update current line
      const currentLine = note.pages[currentPage]?.lines[lineIndex] || '';
      const updatedLine = currentLine + pastedText;
      handleLineChange(lineIndex, updatedLine);
    } else {
      // Multi-line paste needs special handling
      const updatedNote = { ...note };
      
      // Ensure current page exists
      if (!updatedNote.pages[currentPage]) {
        updatedNote.pages[currentPage] = createEmptyPage();
      }
      
      // Get current page lines
      const currentPageLines = [...updatedNote.pages[currentPage].lines];
      
      // Update current line with first pasted line
      currentPageLines[lineIndex] = 
        (currentPageLines[lineIndex] || '') + pastedLines[0];
      
      // Add remaining pasted lines to current page
      let currentLineIdx = lineIndex + 1;
      let pastedLineIdx = 1;
      
      // Fill current page
      while (currentLineIdx < LINES_PER_PAGE && pastedLineIdx < pastedLines.length) {
        currentPageLines[currentLineIdx] = pastedLines[pastedLineIdx];
        currentLineIdx++;
        pastedLineIdx++;
      }
      
      // Update current page
      updatedNote.pages[currentPage] = { lines: currentPageLines };
      
      // If we have more lines to paste, create new pages
      if (pastedLineIdx < pastedLines.length) {
        // Get remaining lines to paste
        const remainingLines = pastedLines.slice(pastedLineIdx);
        
        // Create new pages for every LINES_PER_PAGE lines
        for (let i = 0; i < remainingLines.length; i += LINES_PER_PAGE) {
          const pageLines = remainingLines.slice(i, i + LINES_PER_PAGE);
          
          // Create full array with empty lines for remaining slots
          const fullPageLines = Array(LINES_PER_PAGE).fill('');
          for (let j = 0; j < pageLines.length; j++) {
            fullPageLines[j] = pageLines[j];
          }
          
          // Add new page
          updatedNote.pages.push({ lines: fullPageLines });
        }
        
        // Update state and save
        setNote(updatedNote);
        saveNoteToStorage(updatedNote);
        
        // Navigate to the last created page
        setTimeout(() => {
          setCurrentPage(updatedNote.pages.length - 1);
        }, 0);
      } else {
        // Just update current page
        setNote(updatedNote);
        saveNoteToStorage(updatedNote);
      }
    }
  };

  // Compute total line count for debugging
  useEffect(() => {
    if (note && note.pages[currentPage]) {
      console.log(`Current page has ${note.pages[currentPage].lines.length} lines`);
    }
  }, [note, currentPage]);

  // Initialize line refs
  useEffect(() => {
    // Initialize with exactly LINES_PER_PAGE refs
    lineRefs.current = Array(LINES_PER_PAGE).fill(null);
  }, []);

  // Verify and fix all pages when note changes
  useEffect(() => {
    if (!note) return;
    
    // Check if any page has fewer than LINES_PER_PAGE lines
    const needsFix = note.pages.some(page => page.lines.length < LINES_PER_PAGE);
    
    if (needsFix) {
      console.log("Fixing pages to ensure all have exactly LINES_PER_PAGE lines");
      const fixedNote = { ...note };
      
      // Ensure all pages have exactly LINES_PER_PAGE lines
      fixedNote.pages = fixedNote.pages.map(page => {
        if (page.lines.length < LINES_PER_PAGE) {
          // Create a new array with proper length
          const newLines = [...page.lines, ...Array(LINES_PER_PAGE - page.lines.length).fill('')];
          return { lines: newLines };
        }
        return page;
      });
      
      setNote(fixedNote);
      saveNoteToStorage(fixedNote);
    }
  }, [note, saveNoteToStorage]);

  // Get current page to display
  const getCurrentPage = (): string[] => {
    if (!note || !note.pages[currentPage]) {
      return Array.from({ length: LINES_PER_PAGE }, () => '');
    }
    
    // Always make a copy of the page lines array
    const pageLines = [...note.pages[currentPage].lines];
    
    // Ensure we have at least LINES_PER_PAGE lines
    while (pageLines.length < LINES_PER_PAGE) {
      pageLines.push('');
    }
    
    return pageLines;
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <h1 className="text-xl font-bold">{courseTitle}</h1>
        
        <div className="w-10"></div> {/* Empty div for spacing */}
      </div>
      
      {/* Note editor */}
      {note && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{note.title}</h2>
            
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPreviousPage}
                disabled={currentPage === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <span className="font-mono">
                Page {currentPage + 1} / {Math.max(note.pages.length, 1)}
              </span>
              
              <Button
                variant="outline"
                size="icon"
                onClick={goToNextPage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Notebook page */}
          <div 
            className="border rounded-md p-4 max-w-4xl mx-auto"
            style={{
              backgroundImage: 'linear-gradient(0deg, #f1f1f1 1px, transparent 1px)',
              backgroundSize: '100% 1.5rem',
              backgroundPositionY: '1.5rem',
              paddingTop: '0.25rem',
              paddingBottom: '0.25rem',
              position: 'relative',
              height: '33rem' // Fixed height for 21 lines (21 * 1.5rem + padding)
            }}
          >
            {/* Red margin line */}
            <div 
              style={{
                position: 'absolute', 
                left: '3rem', 
                top: 0, 
                bottom: 0, 
                width: '1px', 
                backgroundColor: '#f87171'
              }}
            />
            
            {/* Create exactly 21 input lines */}
            <div className="ml-16">
              {Array.from({ length: 21 }).map((_, index) => (
                <div 
                  key={`line-${index}`}
                  className="flex items-center"
                  style={{ height: '1.5rem' }}
                >
                  <input
                    ref={el => lineRefs.current[index] = el}
                    type="text"
                    value={note && note.pages[currentPage] && index < note.pages[currentPage].lines.length 
                      ? note.pages[currentPage].lines[index] 
                      : ''}
                    onChange={(e) => handleLineChange(index, e.target.value)}
                    onKeyDown={(e) => handleLineKeyDown(e, index)}
                    onPaste={(e) => handlePaste(e, index)}
                    className="w-full bg-transparent border-none focus:outline-none focus:ring-0"
                    style={{
                      height: '1.5rem',
                      lineHeight: '1.5rem',
                      paddingLeft: '0.25rem',
                      fontSize: '1rem',
                      fontFamily: 'monospace',
                    }}
                    data-line-index={index}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseNotes;
