import React from "react"
// import { useCalendarStore } from "../../../state/calendarStore";
// import DayCell from "../cells/DayCell";
// import { getMonthGrid } from "../../../utils/dateUtils";

const MonthView:React.FC =() => {
//   const { selectedDate } = useCalendarStore();
//   const days = getMonthGrid(selectedDate);

  return (
    <div className="month-grid">
      {/* {days.map((day) => (
        <DayCell key={day.toISOString()} date={day} />
      ))} */}
      hello world
    </div>
  );
}

export default MonthView;
