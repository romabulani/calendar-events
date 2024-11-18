import React from "react";
import { useAuth, useEvent } from "../../contexts";
import { useNavigate } from "react-router-dom";

export const LogoutButton: React.FC = () => {
  const { logout } = useAuth();
  const { setEvents, setUserEvents } = useEvent();
  const navigate = useNavigate()
  const handleLogout = () => {
    logout();
    setEvents([]);
    setUserEvents({});
    navigate("/")
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 h-10"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
