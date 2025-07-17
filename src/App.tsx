import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransmissionDetailsModal from './components/modals/TransmissionDetailsModal';
import AppRoutes from './routes';
import ConfirmationModal from './components/modals/ConfirmationModal';
import { Transmission, ScheduledTask, EventShippingTask, User } from './types';
import { MOCK_SCHEDULED_TASKS, MOCK_EVENT_SHIPPING_TASKS, MOCK_USERS } from './constants/mockData';
import { useModal, useConfirmation } from './hooks';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedTransmission, setSelectedTransmission] = useState<Transmission | null>(null);
  const [scheduledTasks, setScheduledTasks] = useState<ScheduledTask[]>(MOCK_SCHEDULED_TASKS);
  const [eventShippingTasks, setEventShippingTasks] = useState<EventShippingTask[]>(MOCK_EVENT_SHIPPING_TASKS);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  
  const detailsModal = useModal();
  const reexecuteConfirmation = useConfirmation();
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate('/');
  };

  const handleUserLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleAddTransmission = () => {
    navigate('/transmissions/today/add');
  };

  const handleSendFile = () => {
    console.log('File sent!');
    navigate('/transmissions/today');
  };

  const handleRowClick = (transmission: Transmission) => {
    setSelectedTransmission(transmission);
    detailsModal.openModal();
  };

  const handleCloseModal = () => {
    detailsModal.closeModal();
    setSelectedTransmission(null);
  };

  const handleReexecuteTransmission = (transmission: Transmission) => {
    console.log('Attempting to re-execute transmission:', transmission);
    reexecuteConfirmation.openConfirmation(
      `Transmission "${transmission.fileSent}" re-executed successfully!`,
      () => console.log('Re-execution confirmed')
    );
  };

  const handleSaveNewScheduledTask = (newTask: ScheduledTask) => {
    console.log('Saving new scheduled task:', newTask);
    setScheduledTasks(prevTasks => [...prevTasks, newTask]);
    navigate('/tasks/scheduled');
  };

  const handleSaveNewEventShippingTask = (newTask: EventShippingTask) => {
    console.log('Saving new event shipping task:', newTask);
    setEventShippingTasks(prevTasks => [...prevTasks, newTask]);
    navigate('/tasks/event');
  };

  const handleToggleTaskStatus = (id: string) => {
    setScheduledTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setScheduledTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const handleToggleEventTaskStatus = (id: string) => {
    setEventShippingTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  };

  const handleDeleteEventTask = (id: string) => {
    setEventShippingTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const handleUpdateScheduledTask = (updatedTask: ScheduledTask) => {
    setScheduledTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const handleUpdateEventTask = (updatedTask: EventShippingTask) => {
    setEventShippingTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
    navigate('/configurations/users');
  };

  return (
    <>
        <AppRoutes
          isLoggedIn={isLoggedIn}
          onLoginSuccess={handleLoginSuccess}
          onUserLogout={handleUserLogout}
          scheduledTasks={scheduledTasks}
          eventShippingTasks={eventShippingTasks}
          users={users}
          onAddTransmission={handleAddTransmission}
          onSendFile={handleSendFile}
          onRowClick={handleRowClick}
          onReexecuteTransmission={handleReexecuteTransmission}
          onSaveNewScheduledTask={handleSaveNewScheduledTask}
          onSaveNewEventShippingTask={handleSaveNewEventShippingTask}
          onToggleTaskStatus={handleToggleTaskStatus}
          onDeleteTask={handleDeleteTask}
          onToggleEventTaskStatus={handleToggleEventTaskStatus}
          onDeleteEventTask={handleDeleteEventTask}
          onUpdateScheduledTask={handleUpdateScheduledTask}
          onUpdateEventTask={handleUpdateEventTask}
          onUpdateUser={handleUpdateUser}
        />
      
      <TransmissionDetailsModal
        isOpen={detailsModal.isOpen}
        onClose={handleCloseModal}
        transmission={selectedTransmission}
        onReexecute={handleReexecuteTransmission}
      />

      <ConfirmationModal
        isOpen={reexecuteConfirmation.showConfirmation}
        onClose={reexecuteConfirmation.closeConfirmation}
        onConfirm={reexecuteConfirmation.confirmAction}
        message={reexecuteConfirmation.confirmationMessage}
      />
    </>
  );
}

export default App;