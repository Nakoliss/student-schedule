import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import type { Event } from "@/features/calendar/types";
import { days } from "./constants";

interface AddCourseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCourse: (course: Omit<Event, "id">) => void;
}

export const AddCourseDialog = ({ isOpen, onClose, onAddCourse }: AddCourseDialogProps) => {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("0");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCourse({
      title,
      day: parseInt(day),
      start: startTime,
      end: endTime,
      startTime,
      endTime,
      type: "class"
    });
    setTitle("");
    setDay("0");
    setStartTime("08:00");
    setEndTime("09:00");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un cours</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Titre du cours</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="day">Jour</Label>
              <select
                id="day"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                required
              >
                {days.map((dayName, index) => (
                  <option key={dayName} value={index}>
                    {dayName}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">Heure de début</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endTime">Heure de fin</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Ajouter</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};