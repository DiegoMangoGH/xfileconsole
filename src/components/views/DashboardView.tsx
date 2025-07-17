import React from 'react';
import { motion } from 'framer-motion';
import { Users, Cloud, HardDrive } from 'lucide-react';
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
        staggerChildren: 0.2,
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

  return (
    <motion.div
      className="p-6 md:p-8 flex flex-col items-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 to-indigo-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div className="text-center mb-12 max-w-4xl" variants={itemVariants}>
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 drop-shadow-md"
          variants={itemVariants}
        >
          Welcome to <span className="text-blue-600">xFILE Console</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-700 leading-relaxed"
          variants={itemVariants}
        >
          Your comprehensive solution for secure file management and seamless data transmission.
        </motion.p>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 w-full max-w-6xl"
        variants={containerVariants}
      >
        <MetricCard
          title="Active Users"
          value={MOCK_ORGANIZATION.activeUsers}
          icon={Users}
          description="Currently active users"
          color="blue"
          onClick={() => handleCardClick('/configurations/users')}
        />
        <MetricCard
          title="Active Providers"
          value={MOCK_ORGANIZATION.activeProviders}
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
      </motion.div>

      {/* Organization Info */}
      <motion.div
        className="bg-white p-6 md:p-8 rounded-xl shadow-xl w-full max-w-4xl mx-auto mb-12 border border-blue-100"
        variants={itemVariants}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">
          <span className="text-indigo-600">{MOCK_ORGANIZATION.name}</span>
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Located at <span className="font-semibold">{MOCK_ORGANIZATION.direction}</span>, our organization is dedicated to
          pioneering secure and efficient data solutions. We empower businesses with robust tools for
          seamless file management and transmission.
        </p>
        <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-600">
          <span>
            Admin Contact: <span className="font-medium text-blue-500">{MOCK_ORGANIZATION.adminUser}</span>
          </span>
          <span>
            Established: <span className="font-medium">{MOCK_ORGANIZATION.creationDate.split(' ')[0]}</span>
          </span>
        </div>
      </motion.div>

      {/* Dashboard Image */}
      <motion.div
        className="mb-12 w-full max-w-4xl px-4"
        variants={itemVariants}
      >
        <img
          src={dashboardImage}
          alt="Dashboard Illustration"
          className="w-full h-auto rounded-lg shadow-lg border border-blue-100"
        />
      </motion.div>
    </motion.div>
  );
};

export default DashboardView;