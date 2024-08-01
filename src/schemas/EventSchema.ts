export interface Ticket {
  id: number;
  event_id: number;
  status: string;
  type: string;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  location: string;
  date: string;
  created_at: string; 
  updated_at: string;
  availableTickets: Ticket[];
}


