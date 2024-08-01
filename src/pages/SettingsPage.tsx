import React from 'react';
import SettingsForm from '../components/SettingsForm';
import { Link } from 'react-router-dom';


const SettingsPage: React.FC = () => {
    return (
        <div>
          <Link to="/events">Go to Events</Link>
          <SettingsForm />
        </div>
      );
};

export default SettingsPage;
