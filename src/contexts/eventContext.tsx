import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  PropsWithChildren,
  useCallback,
} from "react";
import { IEvent } from "../types";
import { useAuth } from "./authContext";
import { createEvent, getUserEvents } from "../services";

interface IEventContext {
  events: IEvent[];
  setEvents: (events: IEvent[]) => void;
  addEvent: (event: IEvent) => void;
  error: string | null;
  userEvents: Record<string, IEvent[]>;
  setUserEvents: React.Dispatch<
    React.SetStateAction<Record<string, IEvent[]>>
  >;
}

const EventContext = createContext<IEventContext | null>(null);

const EventProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [userEvents, setUserEvents] = useState<Record<string, IEvent[]>>({});
  const [error, setError] = useState<string | null>(null);
  const { authToken } = useAuth();

  const fetchEvents = useCallback(async () => {
    setError(null);
    const fetchedEvents = await getUserEvents(authToken);
    setEvents(fetchedEvents);
  }, [authToken]);

  const addEvent = async (event: IEvent) => {
    const localDatetime = new Date(event.datetime);
            localDatetime.setMinutes(
              localDatetime.getMinutes() + localDatetime.getTimezoneOffset()
            );
            const utcDatetime = localDatetime.toISOString();
    const newEvent = {...event, datetime: utcDatetime }
    const response = await createEvent(newEvent, authToken);
    if (response?.event) {
      setEvents((prevEvents) => [...prevEvents, response.event]);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchEvents();
    }
  }, [authToken, fetchEvents]);

  return (
    <EventContext.Provider
      value={{ events, setEvents, addEvent, error, userEvents, setUserEvents }}
    >
      {children}
    </EventContext.Provider>
  );
};

const useEvent = () => useContext(EventContext) as IEventContext;

export { EventProvider, useEvent };
