import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { useEvent } from "../../contexts";
import { IEvent } from "../../types";

interface IEventDialogProps {
  setOpenDialog: (isOpen: boolean) => void;
  openDialog: boolean;
}

const initialEventState = {
  name: "",
  datetime: "",
  duration: 30,
  tag: "work",
};
export const EventForm: React.FC<IEventDialogProps> = ({
  setOpenDialog,
  openDialog,
}) => {
  const [newEvent, setNewEvent] = useState<IEvent>(initialEventState);
  const { addEvent } = useEvent();
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveEvent = () => {
    if (validate()) {
      addEvent(newEvent);
      setOpenDialog(false);
      setNewEvent(initialEventState);
    }
  };

  const validate = (): boolean => {
    if (!newEvent.name.trim()) {
      toast.error("Event name is required.");
      return false;
    }

    if (!newEvent.datetime) {
      toast.error("Start date and time are required.");
      return false;
    }

    if (newEvent.duration <= 5) {
      toast.error("Duration must be greater than 5 minutes.");
      return false;
    }
    return true;
  };

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Create Event</DialogTitle>
      <DialogContent className="gap-6 flex flex-col !p-4">
        <TextField
          required
          label="Event Name"
          fullWidth
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          className="mb-4"
        />
        <TextField
          label="Start Date and Time"
          type="datetime-local"
          fullWidth
          value={
            newEvent.datetime
              ? new Date(newEvent.datetime).toISOString().slice(0, 16)
              : ""
          }
          onChange={(e) => {
            const localDatetime = new Date(e.target.value);
            localDatetime.setMinutes(
              localDatetime.getMinutes() - localDatetime.getTimezoneOffset()
            );
            const utcDatetime = localDatetime.toISOString();
            setNewEvent({ ...newEvent, datetime: utcDatetime });
          }}
          slotProps={{
            inputLabel: { shrink: true },
            htmlInput: {
              min: new Date().toISOString().slice(0, 16),
            },
          }}
        />
        <TextField
          required
          label="Duration (minutes)"
          type="number"
          fullWidth
          value={newEvent.duration}
          onChange={(e) =>
            setNewEvent({ ...newEvent, duration: Number(e.target.value) })
          }
          className="mb-4"
        />
        <FormControl fullWidth className="mb-4">
          <InputLabel id="tag-label">Tag</InputLabel>
          <Select
            label="Tag"
            labelId="tag-label"
            value={newEvent.tag}
            onChange={(e) => setNewEvent({ ...newEvent, tag: e.target.value })}
          >
            <MenuItem value="work">Work</MenuItem>
            <MenuItem value="home">Home</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveEvent} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
