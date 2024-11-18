import axios from "axios";
import { API_URL, showError, showSuccess } from "../utils";

export const getUserEvents = async (authToken: string, email?: string) => {
  try {
    const response = await axios.get(`${API_URL}/events${email ? `?email=${email}` : ""}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if(response?.data?.message?.includes("Google Calendar")) {
      showError(response?.data?.message)
    }
    return response.data.events ?? [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const createEvent = async (
  event: {
    name: string;
    datetime: string;
    duration: number;
    tag: string;
  },
  authToken: string
) => {
  try {
    const response = await axios.post(`${API_URL}/events`, event, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    showSuccess(response)
    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating event:",
      error.response?.data || error.message
    );
    showError(error);
  }
};

export const resetGoogleSync = async (authToken: string) => {
  try {
    const response = await axios.post(`${API_URL}/reset-google-sync-flag`, null, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
   showSuccess(response)
   return response.data;

  } catch (error) {
    showError(error);
  }
};

