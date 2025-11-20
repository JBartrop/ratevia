// import { useCalendarStore } from "../../../state/calendarStore";
import { useSelector } from "react-redux";
// import { openEventDialog } from "../../dialogs/EventDialog";

import { CalendarEvent } from "../scheduler";
import { RootState } from "../../store/store";

interface Props {
  date: Date;
}

export default function DayCell({ date }: Props) {
//   const events = useCalendarStore((s) =>
//     s.events.filter((e) =>
//       e.start.startsWith(date.toISOString().split("T")[0])
//     )
//   );
  const events = useSelector((state: RootState) => state.calendar.events);

  return (
    <div className="day-cell">
      <div className="date-label">{date.getDate()}</div>

      {events.map((e: CalendarEvent) => (
        <div
          key={e.id}
          className="event-chip"
          style={{ backgroundColor: e.color }}
        //   onClick={() => openEventDialog(e)}
        >
          {e.title}
        </div>
      ))}

      <button
        className="add-btn"
        // onClick={() =>
        //   openEventDialog({
        //     id: "",
        //     title: "",
        //     type: "event",
        //     participants: [],
        //     start: date.toISOString(),
        //     end: date.toISOString(),
        //     createdBy: "",
        //   })
        // }
      >
        +
      </button>
    </div>
  );
}
