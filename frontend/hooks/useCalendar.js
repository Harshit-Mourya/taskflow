import { format } from "date-fns";
import { useState } from "react";

export default function useCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const selectedStr = selectedDate
      ? format(selectedDate, "yyyy-MM-dd")
      : null;
    setSelectedDate(dateStr === selectedStr ? null : date);
  };

  return { selectedDate, handleDateClick };
}
