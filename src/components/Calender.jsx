import React, { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import dayjs from "dayjs";

import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

const Calendar = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const isMobile = useMediaQuery("(max-width: 768px)");
  const todayRef = useRef(null);

  useEffect(() => {
    if (isMobile && todayRef.current) {
      todayRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isMobile, selectedDate]);

  const getMonthDays = () => {
    const start = selectedDate.startOf("month");
    const end = selectedDate.endOf("month");
    const days = [];

    for (let i = 0; i < start.day(); i++) days.push(null);

    for (let d = 1; d <= end.date(); d++) {
      const day = start.date(d);
      days.push(day);
    }

    return days;
  };

  const handleDayClick = (date) => {
    if (onDateSelect) onDateSelect(date);
    console.log("Clicked Date:", date.format("DD-MM-YYYY"));
  };

  const goToPreviousMonth = () => {
    setSelectedDate(selectedDate.subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setSelectedDate(selectedDate.add(1, "month"));
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 text-black dark:text-white">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="text-xl px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <KeyboardArrowLeftOutlinedIcon />
        </button>
        <h2 className="text-lg font-semibold">
          {selectedDate.format("MMMM YYYY")}
        </h2>
        <button
          onClick={goToNextMonth}
          className="text-xl px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <KeyboardArrowRightOutlinedIcon />
        </button>
      </div>

      {/* Desktop Month View */}
      {!isMobile && (
        <div className="border border-gray-200 dark:border-gray-700 p-5 rounded-xl bg-white dark:bg-gray-900">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
              <div
                key={day}
                className="text-sm text-center font-medium text-black dark:text-gray-200"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {getMonthDays().map((day, idx) => {
              const isToday = day?.isSame(dayjs(), "day");
              const isPast = day?.isBefore(dayjs(), "day");

              let dayClass =
                "h-10 border rounded-lg flex items-start justify-start p-2 text-sm transition-colors duration-300 ";
              dayClass += "border-gray-200 dark:border-gray-700 ";

              if (isToday) {
                dayClass +=
                  "bg-green-600 text-white font-semibold hover:bg-white hover:text-green-600 dark:bg-green-700 dark:hover:bg-gray-800 dark:hover:text-green-400 cursor-pointer";
              } else if (isPast) {
                dayClass +=
                  "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed";
              } else {
                dayClass +=
                  "hover:bg-green-50 dark:hover:bg-gray-800 cursor-pointer";
              }

              return (
                <div
                  key={idx}
                  className={dayClass}
                  onClick={() => day && !isPast && handleDayClick(day)}
                >
                  {day && day.date()}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mobile Month View with Scroll */}
      {isMobile && (
        <div className="space-y-2 pr-2 overflow-y-auto max-h-[30vh] scroll-smooth">
          {getMonthDays()
            .filter(Boolean)
            .map((day) => {
              const isToday = day.isSame(dayjs(), "day");
              const isPast = day.isBefore(dayjs(), "day");

              let dayClass =
                "p-4 border rounded transition-colors duration-200 ";
              dayClass += "border-gray-200 dark:border-gray-700 ";

              if (isToday) {
                dayClass += "bg-green-600 text-white hover:bg-green-700";
              } else if (isPast) {
                dayClass +=
                  "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500 cursor-default";
              } else {
                dayClass +=
                  "hover:bg-green-50 dark:hover:bg-gray-800 cursor-pointer";
              }

              return (
                <div
                  key={day.format("YYYY-MM-DD")}
                  className={dayClass}
                  onClick={() => !isPast && handleDayClick(day)}
                  ref={isToday ? todayRef : null}
                >
                  <div className="text-base font-medium">
                    {day.format("dddd, MMM D")}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Calendar;
