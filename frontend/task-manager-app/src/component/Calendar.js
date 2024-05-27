import { useEffect, useState } from "react";
import "./Calendar.css";
import CalendarBox from "./CalendarBox";

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
Date.prototype.monthNames = [
  "January", "February", "March",
  "April", "May", "June",
  "July", "August", "September",
  "October", "November", "December"
];

export default function Calendar({ dateState }) {
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const [yearIndex, setYearIndex] = useState(new Date().getFullYear());
  const [boxes, setBoxes] = useState([]);
  const [showDateInfo, setShowDateInfo] = useState(Date.prototype.monthNames[monthIndex] + " " + yearIndex);

  const daysIndex = () => {
    let jsx = [];
    const firstDayOfMonth = new Date(yearIndex, monthIndex, 1);
    const lastDayOfMonth = new Date(yearIndex, monthIndex + 1, 0);
    const firstWeekDay = firstDayOfMonth.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6

    // Fill in days from the previous month
    for (let i = firstWeekDay; i > 0; i--) {
      const day = new Date(yearIndex, monthIndex, -i + 1).getDate();
      jsx.push(<CalendarBox key={`prev-${i}`} value={day} selected={false} />);
    }

    // Fill in the current month days
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      jsx.push(<CalendarBox key={`current-${i}`} value={i} setDate={dateState} selected={true} />);
    }

    // Fill in days from the next month
    const nextMonthDays = 42 - jsx.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      jsx.push(<CalendarBox key={`next-${i}`} value={i} selected={false} />);
    }

    setBoxes(jsx);
  };

  const updateDate = (action) => {
    if (action === "right") {
      if (monthIndex === 11) {
        setMonthIndex(0);
        setYearIndex(prevYear => prevYear + 1);
      } else {
        setMonthIndex(prevMonth => prevMonth + 1);
      }
    } else {
      if (monthIndex === 0) {
        setMonthIndex(11);
        setYearIndex(prevYear => prevYear - 1);
      } else {
        setMonthIndex(prevMonth => prevMonth - 1);
      }
    }
  };

  useEffect(() => {
    setShowDateInfo(Date.prototype.monthNames[monthIndex] + " " + yearIndex);
    daysIndex();
  }, [monthIndex, yearIndex]);

  return (
    <div id="calendar_container">
      <div id="calendar_header">
        <button className="calendar-btn" onClick={() => { updateDate("left") }}>
          <i className="fa-solid fa-caret-left"></i>
        </button>
        <h5>{showDateInfo}</h5>
        <button className="calendar-btn" onClick={() => { updateDate("right") }}>
          <i className="fa-solid fa-caret-right"></i>
        </button>
      </div>
      <div className="days_container">
        {days.map((day, i) => <CalendarBox key={i} task={false} value={day} />)}
      </div>
      <div className="days_index_container">
        {boxes}
      </div>
    </div>
  );
}
