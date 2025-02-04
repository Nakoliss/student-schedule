import type { PageSpread } from "@/types/notes";

export const LINES_PER_PAGE = 20;
export const STORAGE_KEY_PREFIX = 'note_';

export const saveNote = (courseId: string, pages: PageSpread[]) => {
  localStorage.setItem(`${STORAGE_KEY_PREFIX}${courseId}`, JSON.stringify(pages));
};

export const loadNote = (courseId: string): PageSpread[] => {
  const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${courseId}`);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      console.error('Failed to parse stored note');
    }
  }
  return [{ left: "", right: "" }];
};

export const handlePageOverflow = (
  value: string,
  side: 'left' | 'right',
  pages: PageSpread[],
  currentPageIndex: number
): {
  updatedPages: PageSpread[];
  newPageIndex?: number;
  focusSide?: 'left' | 'right';
} => {
  const lines = value.split('\n');
  console.log('Number of lines:', lines.length);

  // If we're at exactly LINES_PER_PAGE lines and the last line isn't empty,
  // or if we're over LINES_PER_PAGE, we need to handle overflow
  if ((lines.length === LINES_PER_PAGE && lines[lines.length - 1].trim() !== '') || 
      lines.length > LINES_PER_PAGE) {
    
    // Keep only the first LINES_PER_PAGE lines for current page
    const contentLines = lines.slice(0, LINES_PER_PAGE);
    const overflowLines = lines.slice(LINES_PER_PAGE);
    
    const content = contentLines.join('\n');
    const overflow = overflowLines.join('\n');
    
    console.log('Overflow detected. Content:', content);
    console.log('Overflow:', overflow);
    
    const updatedPages = [...pages];

    if (side === 'left') {
      console.log('Left page overflow, moving to right page');
      updatedPages[currentPageIndex] = {
        ...updatedPages[currentPageIndex],
        left: content,
        right: overflow
      };
      return { 
        updatedPages,
        focusSide: 'right'
      };
    } else {
      console.log('Right page overflow, moving to next spread');
      updatedPages[currentPageIndex] = {
        ...updatedPages[currentPageIndex],
        right: content
      };
      
      if (!updatedPages[currentPageIndex + 1]) {
        updatedPages.push({ left: "", right: "" });
      }
      
      updatedPages[currentPageIndex + 1] = {
        ...updatedPages[currentPageIndex + 1],
        left: overflow
      };
      
      return { 
        updatedPages,
        newPageIndex: currentPageIndex + 1,
        focusSide: 'left'
      };
    }
  }

  // If content fits on current page, just update it
  const updatedPages = [...pages];
  updatedPages[currentPageIndex] = {
    ...updatedPages[currentPageIndex],
    [side]: value
  };
  return { updatedPages };
};
