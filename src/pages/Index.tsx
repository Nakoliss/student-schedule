import { WeeklyCalendar } from "@/components/WeeklyCalendar";
import { Sidebar } from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);

  return (
    <div className="flex min-h-screen relative">
      {/* Mobile menu button */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      )}

      {/* Sidebar with responsive visibility */}
      <div className={`${showSidebar ? 'block' : 'hidden'} ${isMobile ? 'absolute z-40 h-full bg-background' : 'relative'}`}>
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-x-auto">
        <WeeklyCalendar />
      </main>
    </div>
  );
};

export default Index;