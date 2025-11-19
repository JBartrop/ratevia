import React, { useState } from "react";

export interface Participant {
  id: string;
  name: string;
  email: string;
}

export type EventType = "task" | "event";

export interface CalendarEvent {
  id: string;
  type: EventType;
  title: string;
  description?: string;
  start: string; 
  end: string;
  participants: Participant[];
  createdBy: string;
  color?: string;
}

export type CalendarView = "day" | "week" | "month" | "year" | "schedule";


const Schedule:React.FC = () => {
    const [view, setView ] = useState<CalendarView>("day")

    // const renderView = () => {
    //     switch (view) {
    //       case "day": return <DayView />;
    //       case "week": return <WeekView />;
    //       case "month": return <MonthView />;
    //       case "year": return <YearView />;
    //       case "schedule": return <ScheduleView />;
    //     }
    // };
    return(
        <section>
            <header className="toolbar">
                <button onClick={() => setView("day")}>Day</button>
                <button onClick={() => setView("week")}>Week</button>
                <button onClick={() => setView("month")}>Month</button>
                <button onClick={() => setView("year")}>Year</button>
                <button onClick={() => setView("schedule")}>Schedule</button>
           </header>

           {/* <main>
                {renderView()}
           </main>

           <EventDialog /> */}
            
        </section>
    )
}

export default Schedule;