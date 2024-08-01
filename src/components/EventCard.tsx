import React from "react";
import { Card, CardContent, Typography, Chip } from "@mui/material";
import { Event } from "../schemas/EventSchema";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Card
      sx={{
        width: 400,
        height: 300,
        backgroundColor: "lightblue",
        m: 1,
        p: 2,
        overflow: "hidden",
      }}
      variant="outlined"
    >
      <CardContent
        sx={{
          m: 2,
          mb: 2,
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Typography variant="body1" sx={{ padding: 1 }}>Event:{event.description}</Typography>
        <Typography variant="body2" sx={{ padding: 1 }}>
          Description: {event.description}
        </Typography>
        <Typography variant="body2" sx={{ padding: 1 }}>Location: {event.location}</Typography>
        <Typography variant="body2" sx={{ padding: 1 }}>
          Date: {new Date(event.date).toLocaleDateString()}
        </Typography>
        {
          <div>
            <Chip sx={{ m: 1 }}
              label={`Available Tickets: ${event.availableTickets.length}`}
            />
          </div>
        }
      </CardContent>
    </Card>
  );
};

export default EventCard;
