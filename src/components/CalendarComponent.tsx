"use client";

import moment from "moment";
import { useState } from "react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

export function CalendarComponent() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Meeting with Client A",
      start: new Date(2023, 5, 15, 10, 0),
      end: new Date(2023, 5, 15, 11, 0),
    },
    {
      id: 2,
      title: "Product Demo",
      start: new Date(2023, 5, 16, 14, 0),
      end: new Date(2023, 5, 16, 15, 30),
    },
    {
      id: 3,
      title: "Team Sync",
      start: new Date(2023, 5, 17, 9, 0),
      end: new Date(2023, 5, 17, 10, 0),
    },
  ]);

  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    start: new Date(),
    end: new Date(),
  });

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setNewEvent({ start, end });
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      // @ts-expect-error: idunno
      setEvents([...events, { id: events.length + 1, ...(newEvent as Event) }]);
      setNewEvent({ title: "", start: new Date(), end: new Date() });
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4 flex justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Event</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="start" className="text-right">
                    Start
                  </Label>
                  <Input
                    id="start"
                    type="datetime-local"
                    value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        start: new Date(e.target.value),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="end" className="text-right">
                    End
                  </Label>
                  <Input
                    id="end"
                    type="datetime-local"
                    value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        end: new Date(e.target.value),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <Button onClick={handleAddEvent}>Add Event</Button>
            </DialogContent>
          </Dialog>
        </div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectSlot={handleSelectSlot}
          selectable
        />
      </CardContent>
    </Card>
  );
}
