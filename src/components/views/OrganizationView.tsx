import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Cloud, Calendar, DollarSign, Edit, Save, X, HardDrive } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import MetricCard from '../ui/MetricCard';
import UsageChart from '../ui/UsageChart';
import { MOCK_ORGANIZATION, MOCK_NODES } from '../../constants/mockData';
import { Organization } from '../../types';

const OrganizationView: React.FC = () => {
  const navigate = useNavigate();
  const [organization, setOrganization] = useState<Organization>(MOCK_ORGANIZATION);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Organization>(organization);

  const handleEdit = () => {
    setEditData(organization);
    setIsEditing(true);
  };

  const handleSave = () => {
    setOrganization(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(organization);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof Organization, value: string | number) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex justify-between items-center mb-8"
        variants={itemVariants}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Organization</h1>
          <p className="text-gray-600 mt-2">Manage your organization settings and view usage statistics</p>
        </div>
        {!isEditing ? (
          <Button onClick={handleEdit} className="flex items-center space-x-2">
            <Edit className="h-4 w-4" />
            <span>Edit Settings</span>
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button onClick={handleSave} className="flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </Button>
            <Button variant="secondary" onClick={handleCancel} className="flex items-center space-x-2">
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </Button>
          </div>
        )}
      </motion.div>

      {/* Metrics Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={itemVariants}
      >
        <MetricCard
          title="Active Users"
          value={organization.activeUsers}
          icon={Users}
          description="Currently active users"
          color="blue"
          onClick={() => handleCardClick('/configurations/users')}
        />
        <MetricCard
          title="Active Providers"
          value={organization.activeProviders}
          icon={Cloud}
          description="Connected providers"
          color="green"
          onClick={() => handleCardClick('/configurations/providers')}
        />
        <MetricCard
          title="Active Nodes"
          value={MOCK_NODES.length}
          icon={HardDrive}
          description="Currently active nodes"
          color="purple"
          onClick={() => handleCardClick('/configurations/nodes')}
        />
        <MetricCard
          title="License Type"
          value={organization.licenseType}
          icon={Calendar}
          description="Current subscription plan"
          color="purple"
        />
        <MetricCard
          title="Total Cost"
          value={`$${organization.totalCost}`}
          icon={DollarSign}
          description="Annual subscription cost"
          color="orange"
        />
      </motion.div>

      {/* Basic Information */}
      <motion.div 
        className="bg-white rounded-lg shadow p-6 mb-8"
        variants={itemVariants}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organization Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
                {organization.name}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Direction
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editData.direction}
                onChange={(e) => handleInputChange('direction', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
                {organization.direction}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin User
            </label>
            {isEditing ? (
              <input
                type="email"
                value={editData.adminUser}
                onChange={(e) => handleInputChange('adminUser', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
                {organization.adminUser}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Creation Date
            </label>
            <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
              {organization.creationDate}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Advanced Settings */}
      <motion.div 
        className="bg-white rounded-lg shadow p-6 mb-8"
        variants={itemVariants}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Advanced Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              License Type
            </label>
            {isEditing ? (
              <select
                value={editData.licenseType}
                onChange={(e) => handleInputChange('licenseType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="Basic">Basic</option>
                <option value="Professional">Professional</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Yearly">Yearly</option>
              </select>
            ) : (
              <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
                {organization.licenseType}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              License Expiration
            </label>
            <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
              {organization.licenseExpiration}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Cost
            </label>
            {isEditing ? (
              <input
                type="number"
                step="0.01"
                value={editData.totalCost}
                onChange={(e) => handleInputChange('totalCost', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            ) : (
              <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
                USD {organization.totalCost}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Creation Date
            </label>
            <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900">
              {organization.creationDate}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Usage Chart */}
      <motion.div variants={itemVariants}>
        <UsageChart 
          data={organization.usageData} 
          title="Monthly Usage Statistics"
        />
      </motion.div>
    </motion.div>
  );
};

export default OrganizationView;