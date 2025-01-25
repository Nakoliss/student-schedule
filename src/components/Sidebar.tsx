import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Sidebar = () => {
  return (
    <div className="w-64 border-r h-screen p-4">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Note de la semaine</h2>
        <Card className="p-4">
          <ScrollArea className="h-[200px]">
            <textarea
              className="w-full h-full resize-none border-none focus:outline-none"
              placeholder="Écrivez vos notes ici..."
            />
          </ScrollArea>
        </Card>
        
        <h2 className="text-lg font-semibold">À faire</h2>
        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="task1" className="rounded" />
              <label htmlFor="task1">Préparer le cours de yoga</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="task2" className="rounded" />
              <label htmlFor="task2">Réviser le design</label>
            </div>
          </div>
          <Button variant="ghost" className="w-full mt-2">+ Ajouter une tâche</Button>
        </Card>
      </div>
    </div>
  );
};