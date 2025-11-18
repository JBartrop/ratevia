// import React from "react";
// import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from "@syncfusion/ej2-react-schedule";

// const Calendar:React.FC = () => {
//     return (
//         <section>
//             <ScheduleComponent currentView="Month">
//                 <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
//             </ScheduleComponent>
//             {/* calendar */}
//         </section>
//     )
// }

// export default Calendar;


import React, { useState } from "react";
// import "./scheduler.css";

export interface CalendarEvent {
  id: number;
  title: string;
  description?: string;
  type?: string;
  start: Date;
  end: Date;
}

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const hours = Array.from({ length: 12 }, (_, i) => 8 + i); // 8 AM – 7 PM

export default function SchedulerPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: "Board Meeting",
      type: "Jammy",
      description: "Meeting to discuss business goal of 2023",
      start: new Date(2023, 0, 2, 9, 30),
      end: new Date(2023, 0, 2, 11, 0),
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const weekStart = new Date(2023, 0, 1);

  const getDayCell = (dayIndex: number) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + dayIndex);
    return d;
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="scheduler-wrapper">
      {/* ---------- TOP TOOLBAR ---------- */}
      <div className="scheduler-toolbar">
        <div className="left">
          <button>{"<"}</button>
          <button>{">"}</button>

          <span className="date-range">January 01 – 07, 2023</span>
        </div>

        <div className="right">
          <button className="today-btn">Today</button>
          <button className="active">Day</button>
          <button className="active view">Week</button>
          <button>Month</button>
        </div>
      </div>

      {/* ---------- WEEK GRID ---------- */}
      <div className="scheduler-grid">
        {/* Header row */}
        <div className="header-row">
          <div className="time-col"></div>
          {daysOfWeek.map((d, i) => (
            <div key={i} className="day-header">
              <div>{d}</div>
              <div className="day-number">{getDayCell(i).getDate()}</div>
            </div>
          ))}
        </div>

        {/* Time rows */}
        {hours.map((hour) => (
          <div className="row" key={hour}>
            <div className="time-col">
              {new Date(2023, 0, 1, hour).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}
            </div>

            {daysOfWeek.map((_, dayIndex) => {
              const cellDate = getDayCell(dayIndex);

              const cellEvents = events.filter((ev) => {
                return (
                  ev.start.getDate() === cellDate.getDate() &&
                  ev.start.getHours() === hour
                );
              });

              return (
                <div className="cell" key={dayIndex}>
                  {cellEvents.map((ev) => (
                    <div
                      key={ev.id}
                      className="event-card"
                      onClick={() => setSelectedEvent(ev)}
                    >
                      <strong>{ev.title}</strong>
                      <div className="time-range">
                        {formatTime(ev.start)} – {formatTime(ev.end)}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* ---------- EVENT POPUP ---------- */}
      {selectedEvent && (
        <div className="overlay" onClick={() => setSelectedEvent(null)}>
          <div
            className="details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">{selectedEvent.title}</div>

            <div className="modal-date">
              {selectedEvent.start.toLocaleDateString([], {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              ({formatTime(selectedEvent.start)} – {formatTime(selectedEvent.end)})
            </div>

            <div className="modal-item">
              <strong>Subject:</strong> {selectedEvent.title}
            </div>

            <div className="modal-item">
              <strong>Type:</strong> {selectedEvent.type ?? "—"}
            </div>

            <div className="modal-item">
              <strong>Notes:</strong> {selectedEvent.description ?? "—"}
            </div>

            <div className="modal-footer">
              <button className="delete-btn">Delete</button>
              <button className="more-btn">More Details</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
