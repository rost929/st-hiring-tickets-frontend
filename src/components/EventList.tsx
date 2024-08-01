import React from 'react';
import { Grid } from '@mui/material';
import EventCard from './EventCard';
import { Event } from '../schemas/EventSchema';

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <Grid container spacing={2}>
      {events.map(event => (
        <Grid item xs={12} sm={6} md={4} key={event.id}>
          <EventCard event={event} />
        </Grid>
      ))}
    </Grid>
  );
};

export default EventList;
