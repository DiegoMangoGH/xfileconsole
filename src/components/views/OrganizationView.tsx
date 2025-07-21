import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Cloud, 
  Calendar, 
  DollarSign, 
  Edit, 
  Save, 
  X, 
  HardDrive, 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  Shield, 
  CreditCard, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  Settings
} from 'lucide-react';
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

  const getLicenseStatusInfo = () => {
    const expirationDate = new Date(organization.licenseExpiration);
    const today = new Date();
    const daysUntilExpiration = Math.ceil((expirationDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (daysUntilExpiration < 30) {
      return { color: 'text-red-600 bg-red-50 border-red-200', icon: AlertCircle, status: 'Expires Soon' };
    }
    if (daysUntilExpiration < 90) {
      return { color: 'text-yellow-600 bg-yellow-50 border-yellow-200', icon: Clock, status: 'Renewal Due' };
    }
    return { color: 'text-green-600 bg-green-50 border-green-200', icon: CheckCircle, status: 'Active' };
  };

  const licenseStatus = getLicenseStatusInfo();
  const StatusIcon = licenseStatus.icon;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div 
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white"
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center space-x-4">
                <div className="bg-white p-4 rounded-2xl shadow-lg">
                  <Building2 className="h-12 w-12 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">Organization Management</h1>
                  <p className="text-blue-100 text-lg mt-2">Configure and monitor your organization settings</p>
                </div>
              </div>
              {!isEditing ? (
                <Button onClick={handleEdit} className="bg-white text-blue-600 hover:bg-blue-50 flex items-center space-x-2">
                  <Edit className="h-4 w-4" />
                  <span>Edit Settings</span>
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 flex items-center space-x-2">
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </Button>
                  <Button onClick={handleCancel} className="bg-white text-blue-600 hover:bg-blue-50 flex items-center space-x-2">
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Organization Overview Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            variants={itemVariants}
          >
            <MetricCard
              title="Active Users"
              value={organization.activeUsers}
              icon={Users}
              description="Team members with access"
              color="blue"
              onClick={() => handleCardClick('/configurations/users')}
            />
            <MetricCard
              title="Connected Providers"
              value={organization.activeProviders}
              icon={Cloud}
              description="External service integrations"
              color="green"
              onClick={() => handleCardClick('/configurations/providers')}
            />
            <MetricCard
              title="Network Nodes"
              value={MOCK_NODES.length}
              icon={HardDrive}
              description="Infrastructure endpoints"
              color="purple"
              onClick={() => handleCardClick('/configurations/nodes')}
            />
            <MetricCard
              title="Monthly Cost"
              value={`$${(organization.totalCost / 12).toFixed(0)}`}
              icon={DollarSign}
              description="Current subscription cost"
              color="orange"
            />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Organization Details */}
            <motion.div 
              className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Organization Details</h2>
                    <p className="text-gray-600">Basic information and contact details</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      <Building2 className="h-4 w-4 inline mr-2" />
                      Organization Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                        {organization.name}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      <Mail className="h-4 w-4 inline mr-2" />
                      Admin Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editData.adminUser}
                        onChange={(e) => handleInputChange('adminUser', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                        {organization.adminUser}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.direction}
                      onChange={(e) => handleInputChange('direction', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                      {organization.direction}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Established
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                    {organization.creationDate.split(' ')[0]}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* License & Billing Info */}
            <motion.div 
              className="space-y-6"
              variants={itemVariants}
            >
              {/* License Status Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${licenseStatus.color}`}>
                      <StatusIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">License Status</h3>
                      <p className="text-sm text-gray-600">{licenseStatus.status}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Plan Type</span>
                    <span className="font-medium text-gray-900">{organization.licenseType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Expires</span>
                    <span className="font-medium text-gray-900">
                      {organization.licenseExpiration.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Billing Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CreditCard className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Billing Information</h3>
                    <p className="text-sm text-gray-600">Annual subscription</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Annual Cost</span>
                    {isEditing ? (
                      <input
                        type="number"
                        step="0.01"
                        value={editData.totalCost}
                        onChange={(e) => handleInputChange('totalCost', parseFloat(e.target.value) || 0)}
                        className="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-right"
                      />
                    ) : (
                      <span className="font-bold text-2xl text-gray-900">${organization.totalCost}</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Monthly</span>
                    <span className="font-medium text-gray-900">
                      ${(organization.totalCost / 12).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Settings className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Quick Actions</h3>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={() => handleCardClick('/configurations/users')}
                    className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-900">Manage Users</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => handleCardClick('/configurations/providers')}
                    className="w-full text-left p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <Cloud className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-900">Configure Providers</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => handleCardClick('/configurations/nodes')}
                    className="w-full text-left p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <HardDrive className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-gray-900">Manage Nodes</span>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* License Configuration */}
          {isEditing && (
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-orange-100 p-3 rounded-xl">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">License Configuration</h2>
                  <p className="text-gray-600">Manage subscription and license settings</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    License Type
                  </label>
                  <select
                    value={editData.licenseType}
                    onChange={(e) => handleInputChange('licenseType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="Basic">Basic - $49/month</option>
                    <option value="Professional">Professional - $99/month</option>
                    <option value="Enterprise">Enterprise - $199/month</option>
                    <option value="Yearly">Yearly - Custom pricing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    License Expiration
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                    {organization.licenseExpiration.split(' ')[0]}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Usage Analytics */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-indigo-100 p-3 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Usage Analytics</h2>
                    <p className="text-gray-600">Monthly system usage and performance metrics</p>
                  </div>
                </div>
              </div>
              <UsageChart 
                data={organization.usageData} 
                title=""
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrganizationView;