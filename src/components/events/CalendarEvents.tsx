import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useEvent, useAuth } from "../../contexts";
import { IEvent } from "../../types";

interface Props {
  day: Date;
  hour: number;
}

export const CalendarEvents: React.FC<Props> = ({ day, hour }) => {
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const { events, userEvents } = useEvent();
  const {authUser} =useAuth();
  const openDialog = (event: IEvent, email?: string) => {
    setSelectedEvent(event);
    if(email) {
      setSelectedEmail(email)
    }
    
  };

  const closeDialog = () => {
    setSelectedEvent(null);
    setSelectedEmail(null)
  };

  const renderEvents = (currEvents: IEvent[], day: Date, hour: number, email?: string): JSX.Element[] => {
    return currEvents
      ?.filter((event) => {
        const eventDate = new Date(event.datetime);
        return (
          eventDate.toDateString() === day.toDateString() &&
          eventDate.getHours() === hour
        );
      })
      ?.map((event, index) => {
        const height = (event.duration / 60) * 60;
        const topStart = new Date(event.datetime).getMinutes();
        const bgColor =
          event.tag === "home"
            ? "bg-green-200"
            : event.tag === "work"
            ? "bg-blue-200"
            : "bg-gray-200";

        return (
          <div
            key={index}
            className={`absolute left-0 right-0 px-1 rounded shadow-md text-xs ${!email ? bgColor : "border border-blue-500"} cursor-pointer`}
            style={{ height: `${height}px`, top: `${topStart}px` }}
            onClick={() => openDialog(event, email)}
          >
            <p>{event.name}</p>
            <p>{`${new Date(event.datetime).toLocaleTimeString()} - ${new Date(
              event?.endTime ?? ""
            ).toLocaleTimeString()}`}</p>
          </div>
        );
      });
  };

  return (
    <>
      {renderEvents(events, day, hour)}
      {Object.keys(userEvents).map(email => renderEvents(userEvents[email], day, hour, email))}
      <Dialog
        open={!!selectedEvent}
        onClose={closeDialog}
        transitionDuration={0}
      >
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <div>
              <p>
                <strong>email:</strong> {selectedEmail ?? authUser?.email}
              </p>
              <p>
                <strong>Name:</strong> {selectedEvent.name}
              </p>
              <p>
                <strong>Start Date & Time:</strong>{" "}
                {new Date(selectedEvent.datetime).toLocaleString()}
              </p>
              {selectedEvent?.endTime && (
                <p>
                  <strong>End Date & Time:</strong>{" "}
                  {new Date(selectedEvent.endTime).toLocaleString()}
                </p>
              )}
              <p>
                <strong>Duration:</strong> {selectedEvent.duration} minutes
              </p>
              <p>
                <strong>Tag:</strong> {selectedEvent.tag}
              </p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
