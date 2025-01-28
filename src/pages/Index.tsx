import { WeeklyCalendar } from "@/components/WeeklyCalendar";
import { Sidebar } from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen relative">
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      )}

      <Button
        onClick={() => navigate('/courses')}
        className="absolute top-4 right-20 z-50"
      >
        Liste de cours
      </Button>

      <main className="flex-1 overflow-x-auto">
        <WeeklyCalendar />
      </main>

      <div className={`${showSidebar ? 'block' : 'hidden'} ${isMobile ? 'absolute right-0 z-40 h-full bg-background' : 'relative'}`}>
        <div className="pt-16">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Index;