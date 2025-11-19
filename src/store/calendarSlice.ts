import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CalendarEvent, CalendarView } from "../components/scheduler";


export interface CalendarState {
  events: CalendarEvent[];
  view: CalendarView;
  selectedDate: string;
}

const initialState: CalendarState = {
  events: [],
  view: "month",
  selectedDate: new Date().toISOString(),
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<CalendarEvent>) => {
      state.events.push(action.payload);
    },

    updateEvent: (
      state,
      action: PayloadAction<{ id: string; data: Partial<CalendarEvent> }>
    ) => {
      const { id, data } = action.payload;
      state.events = state.events.map((event) =>
        event.id === id ? { ...event, ...data } : event
      );
    },

    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter((e) => e.id !== action.payload);
    },

    setView: (state, action: PayloadAction<CalendarView>) => {
      state.view = action.payload;
    },

    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
  },
});

// Export actions
export const {
  addEvent,
  updateEvent,
  deleteEvent,
  setView,
  setSelectedDate,
} = calendarSlice.actions;

// Export reducer
export default calendarSlice.reducer;
