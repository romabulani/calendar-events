import React, { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../utils";
import { toast } from "react-toastify";
import { useAuth, useEvent } from "../../contexts";
import { resetGoogleSync } from "../../services";

export const SyncGoogleCalendar: React.FC = () => {
  const { setEvents } = useEvent();
  const { authToken } = useAuth();

  const resetSync = async () => {
    try {
      const response = await resetGoogleSync(authToken);
      setEvents(response?.events);
    } catch (error) {
      console.error("Error resetting Google sync:", error);
      toast.error("Failed to reset Google sync.");
    }
  };

  const handleSyncClick = async () => {
    try {
      const response = await axios.get(`${API_URL}/google-auth-url`);
      const { authUrl } = response.data;
      window.location.href = authUrl;
    } catch (err) {
      console.error("Error fetching Google Auth URL:", err);
      toast.error("Failed to initiate Google Calendar sync.");
    }
  };

  useEffect(() => {
    const getGoogleCalendarData = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
          const response = await axios.get(
            `${API_URL}/google-auth-callback?code=${code}`
          );
          const { events: userEvents } = response.data;
          setEvents(userEvents);
          window.location.href = "https://calendarevents.vercel.app/";
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        toast.error("Failed to sync Google Calendar events.");
      }
    };

    getGoogleCalendarData();
  }, [setEvents]);

  return (
    <div className="flex space-x-4">
      <button
        className="py-2 text-blue-500 hover:text-blue-600 font-medium"
        onClick={handleSyncClick}
      >
        Sync Google Calendar
      </button>
      <button
        className="py-2 text-red-500 hover:text-red-600 font-medium"
        onClick={resetSync}
      >
        Reset Google Sync
      </button>
    </div>
  );
};
