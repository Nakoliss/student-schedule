import { WeeklyCalendar } from "@/components/WeeklyCalendar";
import { Sidebar } from "@/components/Sidebar";

const Index = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <WeeklyCalendar />
      </main>
    </div>
  );
};

export default Index;