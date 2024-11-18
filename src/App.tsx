import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { CalendarPage, LandingPage } from "./pages";
import { ScrollToTop } from "./components";
import { useAuth, useEvent } from "./contexts";

function App() {
  const { authToken } = useAuth();
  const { events } = useEvent();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");

    if (status === "success") {
      toast.success("Sync complete");
    } else if (status === "error") {
      toast.error("Sync failed");
    }
  }, []);
  return (
    <div className="">
      <ScrollToTop />
      
      {!!authToken ? <CalendarPage events={events} /> : <LandingPage />}
    </div>
  );
}

export default App;
