import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { getUserEvents } from "../../services";
import { useAuth, useEvent } from "../../contexts";
import { IEvent } from "../../types";

export const SearchUserEvents: React.FC = () => {
  const [email, setEmail] = useState("");
  const { setUserEvents } = useEvent();
  const { authToken } = useAuth();

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email.");
      return;
    }
    try {

      const response = (await getUserEvents(
        authToken,
        email
      )) as unknown as IEvent[];

      const newEvents = {
        [email]: response,
      };
      setUserEvents((prevUserEvents: Record<string, IEvent[]>) => ({
        ...prevUserEvents,
        ...newEvents,
      }));

      if (response?.length === 0) {
        toast.success("No events found for this User");
      } else {
        toast.success("Events fetched successfully!");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="email"
        placeholder="Search user via email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-400 text-sm px-2 mr-2 rounded-md py-3"
      />
    </form>
  );
};
