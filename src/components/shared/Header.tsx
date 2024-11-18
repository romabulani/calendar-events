import React, { useState } from "react";
import { SearchUserEvents } from "../events/SearchUserEvents";
import { SyncGoogleCalendar } from "../events/SyncGoogleCalendar";
import LogoutButton from "./LogoutButton";
import { EventForm } from "../events/EventForm";
import { useAuth } from "../../contexts";

interface HeaderProps {
  currentWeekStart: Date;
  setCurrentWeekStart: (date: Date) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentWeekStart,
  setCurrentWeekStart,
}) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { authUser } = useAuth();
  const email = authUser?.email;

  const handlePrevWeek = (): void => {
    const prevWeekStart = new Date(currentWeekStart);
    prevWeekStart.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(prevWeekStart);
  };

  const handleNextWeek = (): void => {
    const nextWeekStart = new Date(currentWeekStart);
    nextWeekStart.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(nextWeekStart);
  };

  const handleCreateEvent = () => {
    setOpenDialog(true);
  };

  return (
    <div className="flex justify-between mb-4 mt-2 mx-4 items-center">
      <div className="flex gap-x-4">
        <button
          onClick={handlePrevWeek}
          className="bg-gray-100 px-4 py-2 rounded h-10"
        >
          {`<< Prev`}
        </button>
        <button
          onClick={handleNextWeek}
          className="bg-gray-100 px-4 py-2 rounded h-10"
        >
          {`Next >>`}
        </button>
      </div>
      <SearchUserEvents />
      <h2 className="text-lg font-bold pt-2">
        Week of {currentWeekStart.toDateString()}
      </h2>
      <div className="flex flex-col items-center">
        {email && (
          <div className="text-sm text-gray-600">
            Logged in as: <span className="font-semibold">{email}</span>
          </div>
        )}
        <SyncGoogleCalendar />
      </div>
      <div className="flex items-center gap-x-2">
      <button
        onClick={handleCreateEvent}
        className="bg-indigo-500 text-white h-10 px-4 rounded-md hover:bg-indigo-600"
      >
        Create Event
      </button>
      <LogoutButton />
      </div>
      
      <EventForm openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
};
