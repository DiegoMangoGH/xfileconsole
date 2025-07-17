import React from 'react';
import { User, RefreshCw, Folder, Clock, Calendar, FileText, History, BarChart3, Settings, Hexagon, Database, Key, Users, GitFork, Cloud } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isTransmissionsActive = () => {
    return location.pathname.startsWith('/transmissions');
  };

  const isTasksActive = () => {
    return location.pathname.startsWith('/tasks');
  };

  const isConfigurationsActive = () => {
    return location.pathname.startsWith('/configurations');
  };

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <Link 
          to="/"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <div className="bg-blue-600 p-2 rounded-lg">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">X</span>
            </div>
          </div>
          <span className="text-xl font-bold text-gray-800">FILE</span>
        </Link>
      </div>

      <nav className="p-4 space-y-2">
        <div className="mb-4">
          <div className={`flex items-center space-x-2 mb-2 px-2 py-1 rounded-lg ${
            isTransmissionsActive() ? 'bg-blue-50 text-blue-700' : 'text-gray-600'
          }`}>
            <RefreshCw className="h-4 w-4" />
            <span className="text-sm font-medium">Transmissions</span>
          </div>
          <div className="ml-6 space-y-1">
            <Link 
              to="/transmissions/today"
              className={`flex items-center space-x-2 w-full text-left p-2 rounded-lg transition-colors ${
                isActive('/transmissions/today') 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Today</span>
            </Link>
            <Link 
              to="/transmissions/methods"
              className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                isActive('/transmissions/methods')
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span className="text-sm">Methods</span>
            </Link>
            <Link 
              to="/transmissions/history" 
              className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                isActive('/transmissions/history') 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <History className="h-4 w-4" />
              <span className="text-sm">History</span>
            </Link>
          </div>
        </div>

        <div className="mb-4">
          <div className={`flex items-center space-x-2 mb-2 px-2 py-1 rounded-lg ${
            isTasksActive() ? 'bg-blue-50 text-blue-700' : 'text-gray-600'
          }`}>
            <Folder className="h-4 w-4" />
            <span className="text-sm font-medium">Tasks</span>
          </div>
          <div className="ml-6 space-y-1">
            <Link 
              to="/tasks/scheduled" 
              className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                isActive('/tasks/scheduled') 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Clock className="h-4 w-4" />
              <span className="text-sm">Scheduled Tasks</span>
            </Link>
            <Link 
              to="/tasks/event" 
              className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                isActive('/tasks/event') 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Event Tasks</span>
            </Link>
          </div>
        </div>
  
        <div className="mb-4">
          <div className={`flex items-center space-x-2 mb-2 px-2 py-1 rounded-lg ${
            isConfigurationsActive() ? 'bg-blue-50 text-blue-700' : 'text-gray-600'
          }`}>
            <Hexagon className="h-4 w-4" />
            <span className="text-sm font-medium">Configurations</span>
          </div>
          <div className="ml-6 space-y-1">
            <Link
              to="/configurations/nodes"
              className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                isActive('/configurations/nodes')
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Database className="h-4 w-4" />
              <span className="text-sm">Nodes</span>
            </Link>
            <Link
              to="/configurations/keys"
              className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                isActive('/configurations/keys')
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Key className="h-4 w-4" />
              <span className="text-sm">Keys</span>
            </Link>
            <Link
              to="/configurations/providers"
              className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                isActive('/configurations/providers')
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Cloud className="h-4 w-4" />
              <span className="text-sm">Providers</span>
            </Link>
            <Link
              to="/configurations/users"
              className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                isActive('/configurations/users')
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <User className="h-4 w-4" />
              <span className="text-sm">Users</span>
            </Link>
            <Link
              to="/configurations/organization"
              className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                isActive('/configurations/organization')
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <GitFork className="h-4 w-4" />
              <span className="text-sm">Organization</span>
            </Link>
          </div>
        </div>
  
          <Link
            to="/monitorization"
            className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
              isActive('/monitorization')
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span className="text-sm">Monitorization</span>
          </Link>
          <Link
            to="/tools"
            className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
              isActive('/tools')
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Settings className="h-4 w-4" />
            <span className="text-sm">Tools</span>
          </Link>
      </nav>

      <div className="fixed bottom-4 left-4">
        <button 
          onClick={onLogout}
          className="bg-gray-800 text-white p-3 rounded-lg flex items-center space-x-3 hover:bg-gray-700 transition-colors"
        >
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium">Admin Compartamos</p>
            <p className="text-xs text-gray-400">admin@compartamos.com</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;