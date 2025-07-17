import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthContainer from './components/auth/AuthContainer';
import Layout from './components/layout/Layout';
import TransmissionTable from './components/tables/TransmissionTable';
import TransmissionForm from './components/forms/TransmissionForm';
import DashboardView from './components/views/DashboardView';
import TransmissionMethodsView from './components/views/TransmissionMethodsView';
import TransmissionHistoryView from './components/views/TransmissionHistoryView';
import ScheduledTasksView from './components/views/ScheduledTasksView';
import AddScheduledTaskForm from './components/forms/AddScheduledTaskForm';
import EventShippingView from './components/views/EventShippingView';
import AddEventShippingForm from './components/forms/AddEventShippingForm';
import MonitorizationView from './components/views/MonitorizationView';
import ToolsView from './components/views/ToolsView';
import NodesView from './components/views/NodesView';
import KeysView from './components/views/KeysView';
import ProvidersView from './components/views/ProvidersView';
import UsersView from './components/views/UsersView';
import OrganizationView from './components/views/OrganizationView';
import NodeDetailsView from './components/views/NodeDetailsView';
import AddNodeView from './components/views/AddNodeView';
import AddPeerView from './components/views/AddPeerView';
import { MOCK_TRANSMISSIONS } from './constants/mockData';
import { Transmission, ScheduledTask, EventShippingTask, User } from './types';
import EditUserView from './components/views/EditUserView';

interface AppRoutesProps {
  isLoggedIn: boolean;
  onLoginSuccess: () => void;
  onUserLogout: () => void;
  scheduledTasks: ScheduledTask[];
  eventShippingTasks: EventShippingTask[];
  users: User[];
  onAddTransmission: () => void;
  onSendFile: () => void;
  onRowClick: (transmission: Transmission) => void;
  onReexecuteTransmission: (transmission: Transmission) => void;
  onSaveNewScheduledTask: (newTask: ScheduledTask) => void;
  onSaveNewEventShippingTask: (newTask: EventShippingTask) => void;
  onToggleTaskStatus: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onToggleEventTaskStatus: (id: string) => void;
  onDeleteEventTask: (id: string) => void;
  onUpdateScheduledTask: (updatedTask: ScheduledTask) => void;
  onUpdateEventTask: (updatedTask: EventShippingTask) => void;
  onUpdateUser: (updatedUser: User) => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({
  isLoggedIn,
  onLoginSuccess,
  onUserLogout,
  scheduledTasks,
  eventShippingTasks,
  users,
  onAddTransmission,
  onSendFile,
  onRowClick,
  onReexecuteTransmission,
  onSaveNewScheduledTask,
  onSaveNewEventShippingTask,
  onToggleTaskStatus,
  onDeleteTask,
  onToggleEventTaskStatus,
  onDeleteEventTask,
  onUpdateScheduledTask,
  onUpdateEventTask,
  onUpdateUser,
}) => {
  const todayTransmissions = MOCK_TRANSMISSIONS.filter(t => t.transmissionDate === '2025-07-09');

  return (
    <Routes>
      {isLoggedIn ? (
        <Route path="/" element={<Layout onLogout={onUserLogout} />}>
          <Route index element={<DashboardView />} />
          <Route
            path="transmissions/today"
            element={
              <TransmissionTable
                transmissions={todayTransmissions}
                onAddTransmission={onAddTransmission}
                onRowClick={onRowClick}
                title="Today's Transmissions"
                subtitle="File transmissions executed today"
              />
            }
          />
          <Route
            path="transmissions/today/add"
            element={
              <TransmissionForm
                onClose={() => {}} // This will be handled by navigate in App.tsx
                onSendFile={onSendFile}
              />
            }
          />
          <Route
            path="transmissions/methods"
            element={
              <TransmissionMethodsView
                allTransmissions={MOCK_TRANSMISSIONS}
                onReexecuteTransmission={onReexecuteTransmission}
              />
            }
          />
          <Route
            path="transmissions/history"
            element={
              <TransmissionHistoryView
                allTransmissions={MOCK_TRANSMISSIONS}
                onRowClick={onRowClick}
              />
            }
          />
          <Route
            path="tasks/scheduled"
            element={
              <ScheduledTasksView
                scheduledTasks={scheduledTasks}
                onToggleStatus={onToggleTaskStatus}
                onDeleteTask={onDeleteTask}
                onUpdateTask={onUpdateScheduledTask}
              />
            }
          />
          <Route
            path="tasks/scheduled/add"
            element={
              <AddScheduledTaskForm
                onSave={onSaveNewScheduledTask}
                onCancel={() => {}} // This will be handled by navigate in App.tsx
              />
            }
          />
          <Route
            path="tasks/event"
            element={
              <EventShippingView
                eventShippingTasks={eventShippingTasks}
                onToggleStatus={onToggleEventTaskStatus}
                onDeleteTask={onDeleteEventTask}
                onUpdateTask={onUpdateEventTask}
              />
            }
          />
          <Route
            path="tasks/event/add"
            element={
              <AddEventShippingForm
                onSave={onSaveNewEventShippingTask}
                onCancel={() => {}} // This will be handled by navigate in App.tsx
              />
            }
          />
          <Route path="monitorization" element={<MonitorizationView />} />
          <Route path="tools" element={<ToolsView />} />
          <Route path="configurations/nodes" element={<NodesView />} />
          <Route path="configurations/nodes/:id" element={<NodeDetailsView />} />
          <Route path="configurations/nodes/add" element={<AddNodeView />} />
          <Route path="configurations/keys" element={<KeysView />} />
          <Route path="configurations/keys/add" element={<AddPeerView />} />
          <Route path="configurations/providers" element={<ProvidersView />} />
          <Route path="configurations/users" element={<UsersView users={users} />} />
          <Route path="configurations/users/:id/edit" element={<EditUserViewWrapper users={users} onUpdateUser={onUpdateUser} />} />
          <Route path="configurations/organization" element={<OrganizationView />} />
        </Route>
      ) : (
        <Route path="*" element={<AuthContainer onLoginSuccess={onLoginSuccess} />} />
      )}
    </Routes>
  );
};

import { useParams, useNavigate } from 'react-router-dom';

const EditUserViewWrapper: React.FC<{ users: User[], onUpdateUser: (user: User) => void }> = ({ users, onUpdateUser }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = users.find(u => u.id === id);

  if (!user) {
    return <div>User not found</div>;
  }

  return <EditUserView user={user} onSaveChanges={onUpdateUser} onCancel={() => navigate('/configurations/users')} />;
};

export default AppRoutes;