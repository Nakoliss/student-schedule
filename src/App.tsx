import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary } from "@/shared";
import { Index } from "./pages/Index";
import Landing from "./pages/Landing";
import { DayView } from "@/features/calendar";
import { CourseList } from "@/features/courses";
import { NoteEditor, CourseNotes } from "@/features/notes";
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/calendar" element={<Index />} />
            <Route path="/courses_notes" element={<CourseList />} />
            <Route path="/day/:dayIndex" element={<DayView />} />
            <Route path="/course/:courseId/notes/:noteId" element={<NoteEditor />} />
            <Route path="/course/:courseId/notes" element={<CourseNotes />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;