import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import SearchInput from '../ui/SearchInput';
import Toggle from '../ui/Toggle';
import ConfirmationModal from '../modals/ConfirmationModal';
import AddUserModal from '../modals/AddUserModal';
import { useConfirmation } from '../../hooks/useConfirmation';
import { MOCK_USERS } from '../../constants/mockData';
import { User } from '../../types';
import { filterBySearchTerm } from '../../utils/filterUtils';
import { useNavigate } from 'react-router-dom';

interface UsersViewProps {
  users: User[];
}

const UsersView: React.FC<UsersViewProps> = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const {
    showConfirmation,
    confirmationMessage,
    openConfirmation,
    closeConfirmation,
    confirmAction
  } = useConfirmation();
  const navigate = useNavigate();

  const filteredUsers = filterBySearchTerm(users, searchTerm);

  const handleDelete = (userId: string) => {
    const user = users.find(u => u.id === userId);
    openConfirmation(
      `Are you sure you want to delete user "${user?.name}"? This action cannot be undone.`,
      () => {
        // TODO: Lift this state change to App.tsx
        console.log(`User ${userId} deleted`);
      }
    );
  };

  const handleEdit = (userId: string) => {
    navigate(`/configurations/users/${userId}/edit`);
  };

  const handleStatusChange = (userId: string, newStatus: boolean) => {
    // TODO: Lift this state change to App.tsx
    console.log(`User ${userId} status changed to ${newStatus}`);
  };

  const handleAddUser = () => {
    setShowAddModal(true);
  };

  const handleSaveNewUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: String(Date.now())
    };
    // TODO: Lift this state change to App.tsx
    console.log('New user created', newUser);
    setShowAddModal(false);
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'Developer': return 'bg-blue-100 text-blue-800';
      case 'Product Manager': return 'bg-purple-100 text-purple-800';
      case 'Sales Representative': return 'bg-green-100 text-green-800';
      case 'IT Support': return 'bg-orange-100 text-orange-800';
      case 'System Administrator': return 'bg-red-100 text-red-800';
      case 'Business Analyst': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Users</h1>
      </div>
      <p className="text-gray-600 mb-8">Manage system users and their access permissions.</p>

      <div className="flex items-center justify-between mb-8">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Filter users..."
        />
        <Button onClick={handleAddUser} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add User</span>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <motion.tbody
            className="bg-white divide-y divide-gray-200"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
              hidden: {},
            }}
          >
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  className="hover:bg-gray-50"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPositionColor(user.position)}`}>
                      {user.position}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Toggle
                      id={`toggle-${user.id}`}
                      checked={user.status}
                      onChange={(newStatus) => handleStatusChange(user.id, newStatus)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50 transition-colors"
                        title="Edit user"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                        title="Delete user"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button
                        className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-50 transition-colors"
                        title="View details"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <motion.tr
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  No users found matching your criteria.
                </td>
              </motion.tr>
            )}
          </motion.tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={closeConfirmation}
        onConfirm={confirmAction}
        message={confirmationMessage}
      />

      <AddUserModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSaveNewUser}
      />

    </div>
  );
};

export default UsersView;