import React from 'react';

// OLD IMPORTS
// import { CalendarGrid } from '@/components/calendar/CalendarGrid';
// import { CalendarHeader } from '@/components/calendar/CalendarHeader';
// import { getEventStyle } from '@/components/calendar/utils';
// import { Event } from '@/components/calendar/types';
// import { useEvents } from '@/hooks/use-events';
// import { Sidebar } from '@/components/Sidebar';

// NEW IMPORTS
import { CalendarGrid, CalendarHeader } from './src/features/calendar/components';
import { getEventStyle } from './src/features/calendar/utils';
import type { Event } from './src/features/calendar/types';
import { useEvents } from './src/features/calendar/hooks/use-events';
import { Sidebar } from './src/components/ui/sidebar';

// Example Component
const ExampleComponent = () => {
  const { events } = useEvents();
  
  const handleDayClick = (index: number, day: string) => {
    console.log(`Clicked day ${day} at index ${index}`);
  };
  
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <CalendarHeader 
          onDayClick={handleDayClick} 
          currentDate={new Date()} 
          onWeekChange={() => {}} 
        />
        <CalendarGrid 
          events={events} 
          onDayClick={handleDayClick} 
          getEventStyle={getEventStyle} 
        />
      </div>
    </div>
  );
};

export default ExampleComponent; 