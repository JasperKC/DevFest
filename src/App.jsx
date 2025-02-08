import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { useState } from "react";

const events = [
  { title: "Climate Action Forum", date: "Feb 10", location: "Lerner Hall" },
  { title: "AI in Finance Panel", date: "Feb 12", location: "Uris Hall" },
  { title: "Student Art Showcase", date: "Feb 15", location: "Dodge Gallery" },
  { title: "Tech & Society Debate", date: "Feb 18", location: "Low Library" },
];

export default function LionPulse() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      <h1 className="text-3xl font-bold text-blue-600">LionPulse: Columbia Events Board</h1>
      <ScrollArea className="w-full max-w-3xl h-96 border rounded-xl p-4 shadow-lg">
        <div className="space-y-4">
          {events.map((event, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedEvent(event)}
              >
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold">{event.title}</h2>
                  <p className="text-gray-600">{event.date} - {event.location}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
      {selectedEvent && (
        <div className="p-4 border rounded-lg bg-white shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
          <p className="text-gray-600">{selectedEvent.date} - {selectedEvent.location}</p>
          <Button className="mt-4" onClick={() => setSelectedEvent(null)}>Close</Button>
        </div>
      )}
    </div>
  );
}
