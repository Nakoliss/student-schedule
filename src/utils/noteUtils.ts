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

  // If content fits on current page, just update it
  if (lines.length <= LINES_PER_PAGE) {
    const updatedPages = [...pages];
    updatedPages[currentPageIndex] = {
      ...updatedPages[currentPageIndex],
      [side]: value
    };
    return { updatedPages };
  }

  // Split content into current page and overflow
  const contentLines = lines.slice(0, LINES_PER_PAGE);
  const overflowLines = lines.slice(LINES_PER_PAGE);
  
  const content = contentLines.join('\n');
  const overflow = overflowLines.join('\n');
  
  const updatedPages = [...pages];

  if (side === 'left') {
    console.log('Left page overflow, moving to right page');
    // Update left page with content that fits
    updatedPages[currentPageIndex] = {
      ...updatedPages[currentPageIndex],
      left: content,
      // Move overflow to right page
      right: overflow + (updatedPages[currentPageIndex].right || '')
    };
    return { 
      updatedPages,
      focusSide: 'right'
    };
  } else {
    console.log('Right page overflow, moving to next spread');
    // Update right page with content that fits
    updatedPages[currentPageIndex] = {
      ...updatedPages[currentPageIndex],
      right: content
    };
    
    // Create new page if needed
    if (!updatedPages[currentPageIndex + 1]) {
      updatedPages.push({ left: "", right: "" });
    }
    
    // Move overflow to next page's left side
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
};