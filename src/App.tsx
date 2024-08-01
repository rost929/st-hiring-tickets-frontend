import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { eventStore } from './stores/EventsStore';
import { settingStore } from './stores/StettingsStore'; // Importa el store para la SettingsPage
import EventsPage from './pages/EventsPage';
import SettingsPage from './pages/SettingsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/events"
          element={
            <Provider store={eventStore}>
              <EventsPage />
            </Provider>
          }
        />
        <Route
          path="/settings"
          element={
            <Provider store={settingStore}>
              <SettingsPage />
            </Provider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;



/* import React from 'react';
import { Provider } from 'react-redux';
import { eventStore } from './stores/EventsStore';
import EventsPage from './pages/EventsPage';

const App: React.FC = () => {
  return (
      <Provider store={eventStore}>
        <EventsPage />
      </Provider>
    );
}

export default App; */
