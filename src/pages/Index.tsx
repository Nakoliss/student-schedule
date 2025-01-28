import { WeeklyCalendar } from "@/components/WeeklyCalendar";
import { Sidebar } from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Menu, Plus } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);

  const handleAddCourse = () => {
    console.log("Dispatching openAddCourse event");
    const event = new CustomEvent('openAddCourse');
    document.dispatchEvent(event);
  };

  return (
    <div className="flex min-h-screen relative">
      {/* Mobile menu button */}
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

      {/* Add course button */}
      <Button
        onClick={handleAddCourse}
        className="absolute top-4 right-20 z-50"
      >
        <Plus className="h-4 w-4 mr-2" />
        Ajouter un cours
      </Button>

      {/* Main content without the extra top padding */}
      <main className="flex-1 overflow-x-auto">
        <WeeklyCalendar />
      </main>

      {/* Sidebar with responsive visibility and adjusted spacing below button */}
      <div className={`${showSidebar ? 'block' : 'hidden'} ${isMobile ? 'absolute right-0 z-40 h-full bg-background' : 'relative'}`}>
        <div className="pt-16">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Index;