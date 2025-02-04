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

  // Check if we're trying to add content beyond line 20
  if (lines.length > LINES_PER_PAGE) {
    console.log('Overflow detected - more than 20 lines');
    
    // Keep only the first 20 lines for current page
    const contentLines = lines.slice(0, LINES_PER_PAGE);
    const overflowLines = lines.slice(LINES_PER_PAGE);
    
    const content = contentLines.join('\n');
    const overflow = overflowLines.join('\n');
    
    console.log('Content for current page:', content);
    console.log('Overflow content:', overflow);
    
    const updatedPages = [...pages];

    if (side === 'left') {
      console.log('Moving overflow from left to right page');
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
      console.log('Moving overflow to next spread');
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

  // If we're exactly at line 20 and trying to add more content
  if (lines.length === LINES_PER_PAGE && value.length > lines.join('\n').length) {
    console.log('Overflow detected - at line 20 with more content');
    const updatedPages = [...pages];

    if (side === 'left') {
      // Move to right page
      const nextContent = value.substring(lines.join('\n').length);
      updatedPages[currentPageIndex] = {
        ...updatedPages[currentPageIndex],
        left: lines.join('\n'),
        right: nextContent.startsWith('\n') ? nextContent.substring(1) : nextContent
      };
      return {
        updatedPages,
        focusSide: 'right'
      };
    } else {
      // Move to next spread
      const nextContent = value.substring(lines.join('\n').length);
      updatedPages[currentPageIndex] = {
        ...updatedPages[currentPageIndex],
        right: lines.join('\n')
      };
      
      if (!updatedPages[currentPageIndex + 1]) {
        updatedPages.push({ left: "", right: "" });
      }
      
      updatedPages[currentPageIndex + 1] = {
        ...updatedPages[currentPageIndex + 1],
        left: nextContent.startsWith('\n') ? nextContent.substring(1) : nextContent
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
