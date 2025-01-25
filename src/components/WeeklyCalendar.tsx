import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const timeSlots = Array.from({ length: 21 }, (_, i) => {
  const hour = Math.floor(i / 2) + 8;
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${hour}:${minutes}`;
});

const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

interface Event {
  id: string;
  title: string;
  day: number;
  startTime: string;
  endTime: string;
  type: 'class' | 'study' | 'other';
}

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Yoga',
    day: 0,
    startTime: '8:00',
    endTime: '10:00',
    type: 'class'
  },
  {
    id: '2',
    title: 'Design',
    day: 1,
    startTime: '14:00',
    endTime: '18:00',
    type: 'class'
  }
];

const getEventStyle = (type: Event['type']) => {
  switch (type) {
    case 'class':
      return 'bg-primary/20 text-primary-foreground/90';
    case 'study':
      return 'bg-accent/20 text-accent-foreground/90';
    default:
      return 'bg-secondary text-secondary-foreground';
  }
};

export const WeeklyCalendar = () => {
  const today = new Date();
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Semaine du {format(today, 'dd MMMM yyyy', { locale: fr })}
        </h1>
        <div className="space-x-2">
          <button className="btn btn-secondary">Aujourd'hui</button>
          <button className="btn btn-outline">Ajouter un cours</button>
        </div>
      </div>
      
      <div className="calendar-grid rounded-lg overflow-hidden border">
        <div className="calendar-cell" />
        {days.map((day) => (
          <div key={day} className="calendar-cell day-header">
            {day}
          </div>
        ))}
        
        {timeSlots.map((time) => (
          <React.Fragment key={time}>
            <div className="calendar-cell time-cell">
              {time}
            </div>
            {days.map((_, dayIndex) => {
              const events = sampleEvents.filter(
                event => 
                  event.day === dayIndex && 
                  event.startTime === time
              );
              
              return (
                <div key={`${dayIndex}-${time}`} className="calendar-cell relative">
                  {events.map(event => (
                    <div
                      key={event.id}
                      className={cn(
                        "event-card",
                        getEventStyle(event.type)
                      )}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};