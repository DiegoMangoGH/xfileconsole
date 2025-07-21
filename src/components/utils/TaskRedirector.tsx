import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskRedirector: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return null; // This component doesn't render anything, it just redirects
};

export default TaskRedirector;