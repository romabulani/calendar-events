import React, { useState } from "react";
import { CalendarEvents, Header } from "../components";
import { IEvent } from "../types";

interface CalendarUIProps {
  events: IEvent[];
}

export const CalendarPage: React.FC<CalendarUIProps> = ({ events }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => {
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    ); // sunday as start
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  });
  const hours: string[] = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  const generateWeekDays = (): Date[] => {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(currentWeekStart);
      day.setDate(currentWeekStart.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDays = generateWeekDays();

  return (
    <div>
      <Header
        currentWeekStart={currentWeekStart}
        setCurrentWeekStart={setCurrentWeekStart}
      />
      <div className="grid grid-cols-8">
        {/* time */}
        <div className="col-span-1  mt-[40px]">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-[60px] flex items-center justify-center border-b text-sm text-gray-600"
            >
              {hour}
            </div>
          ))}
        </div>

        {/* week */}
        {weekDays.map((day, dayIndex) => {
          const isToday = day.toDateString() === new Date().toDateString();

          return (
            <div
              key={day.toString() + dayIndex}
              className={`col-span-1 border-l relative ${
                isToday ? "bg-gray-50" : ""
              }`}
            >
              <h3 className="text-center font-bold py-2">
                {day.toDateString()}
              </h3>
              <div className="relative h-[1440px]">
                {hours.map((hour, hourIndex) => (
                  <div
                    key={hour + hourIndex}
                    className="h-[60px] border-b relative"
                  >
                    <CalendarEvents day={day} hour={hourIndex} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
