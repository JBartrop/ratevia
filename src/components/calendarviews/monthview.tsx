import React from "react"
import { getMonthGrid } from "../../utils/dateutils";
import DayCell from "./daycell";
import { setSelectedDate } from "../../store/calendarSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
// import { useCalendarStore } from "../../../state/calendarStore";
// import DayCell from "../cells/DayCell";
// import { getMonthGrid } from "../../../utils/dateUtils";


const MonthView:React.FC =() => {
  const dispatch = useDispatch();
    const selectedDateString = useSelector(
    (state: RootState) => state.calendar.selectedDate
  );
  // const  selectedDate  = setSelectedDate;
    const selectedDate = new Date(selectedDateString);
  // const days = getMonthGrid(selectedDate);



  // Generate grid
  const days = getMonthGrid(selectedDate);

  return (
    <div className="month-grid">
      {days.map((day) => (
        <DayCell key={day.toISOString()} date={day} />
      ))}
      hello world
    </div>
  );
}

export default MonthView;
