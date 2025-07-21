import React from 'react';
import { motion } from 'framer-motion';
import { Users, Cloud, HardDrive, Calendar, MapPin, Mail, Phone, Building2, Shield, TrendingUp, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import dashboardImage from '../../assets/image.png';
import MetricCard from '../ui/MetricCard';
import { MOCK_ORGANIZATION, MOCK_NODES } from '../../constants/mockData';

const DashboardView: React.FC = () => {
  const navigate = useNavigate();

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

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const getLicenseStatusColor = () => {
    const expirationDate = new Date(MOCK_ORGANIZATION.licenseExpiration);
    const today = new Date();
    const daysUntilExpiration = Math.ceil((expirationDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (daysUntilExpiration < 30) return 'text-red-600 bg-red-50';
    if (daysUntilExpiration < 90) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.div 
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white"
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div 
                  className="flex items-center space-x-3 mb-6"
                  variants={itemVariants}
                >
                  <div className="bg-white p-3 rounded-xl shadow-lg">
                    <Building2 className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                      {MOCK_ORGANIZATION.name}
                    </h1>
                    <p className="text-blue-100 text-lg mt-2">File Transfer Management System</p>
                  </div>
                </motion.div>
                
                <motion.div className="space-y-4 mb-8" variants={itemVariants}>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-200" />
                    <span className="text-blue-100">{MOCK_ORGANIZATION.direction}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-200" />
                    <span className="text-blue-100">{MOCK_ORGANIZATION.adminUser}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-blue-200" />
                    <span className="text-blue-100">Established {MOCK_ORGANIZATION.creationDate.split(' ')[0]}</span>
                  </div>
                </motion.div>

                <motion.div 
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getLicenseStatusColor()}`}
                  variants={itemVariants}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  {MOCK_ORGANIZATION.licenseType} License Active
                </motion.div>
              </div>
              
              <motion.div 
                className="hidden lg:block"
                variants={itemVariants}
              >
                <img
                  src={dashboardImage}
                  alt="Organization Dashboard"
                  className="w-full h-auto rounded-2xl shadow-2xl border-4 border-white/20"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            variants={itemVariants}
          >
            <MetricCard
              title="Active Users"
              value={MOCK_ORGANIZATION.activeUsers}
              icon={Users}
              description="Team members with access"
              color="blue"
              onClick={() => handleCardClick('/configurations/users')}
            />
            <MetricCard
              title="Connected Providers"
              value={MOCK_ORGANIZATION.activeProviders}
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
              value={`$${(MOCK_ORGANIZATION.totalCost / 12).toFixed(0)}`}
              icon={TrendingUp}
              description="Current subscription cost"
              color="orange"
            />
          </motion.div>

          {/* Organization Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* License Information */}
            <motion.div 
              className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Shield className="h-6 w-6 mr-3 text-blue-600" />
                  License & Subscription
                </h2>
                <button 
                  onClick={() => handleCardClick('/configurations/organization')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors"
                >
                  Manage Settings →
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">License Type</label>
                    <div className="mt-1">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {MOCK_ORGANIZATION.licenseType}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Annual Cost</label>
                    <p className="text-2xl font-bold text-gray-900 mt-1">${MOCK_ORGANIZATION.totalCost}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Expires</label>
                    <p className="text-lg font-semibold text-gray-900 mt-1">
                      {MOCK_ORGANIZATION.licenseExpiration.split(' ')[0]}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Status</label>
                    <div className="mt-1">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <Activity className="h-3 w-3 mr-1" />
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <button
                  onClick={() => handleCardClick('/transmissions/today/add')}
                  className="w-full text-left p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                      <Activity className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">New Transmission</p>
                      <p className="text-sm text-gray-600">Send files instantly</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => handleCardClick('/tasks/scheduled/add')}
                  className="w-full text-left p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Schedule Task</p>
                      <p className="text-sm text-gray-600">Automate transfers</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => handleCardClick('/monitorization')}
                  className="w-full text-left p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">View Monitoring</p>
                      <p className="text-sm text-gray-600">System status</p>
                    </div>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>

          {/* System Overview */}
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">System Overview</h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">All systems operational</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cloud className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Cloud Integration</h3>
                <p className="text-sm text-gray-600">Seamless connection to external providers and cloud services</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Secure Transfer</h3>
                <p className="text-sm text-gray-600">Enterprise-grade security with encrypted file transmission</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Real-time Monitoring</h3>
                <p className="text-sm text-gray-600">Live tracking of all file transfer operations and system health</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardView;