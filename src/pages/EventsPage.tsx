import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useGetEventsQuery } from "../features/events/EventsApi";
import EventList from "../components/EventList";
import Pagination from "../components/Pagination";
import { Container, Typography } from "@mui/material";

const EventsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data: events = [], isLoading } = useGetEventsQuery();

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Events
      </Typography>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Link to="/settings">Go to Settings</Link>
          <EventList events={events} />
          <Pagination
            page={page}
            count={Math.ceil(events.length / 10)} // Adjust based on page size
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Container>
  );
};

export default EventsPage;
