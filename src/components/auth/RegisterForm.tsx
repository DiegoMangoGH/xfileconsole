import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Building, Mail, MapPin, Calendar } from 'lucide-react';
import Button from '../ui/Button';

interface RegisterFormProps {
  onRegisterSuccess: () => void;
  onBackToLogin: () => void;
}

interface RegistrationData {
  // Organization data
  organizationName: string;
  organizationAddress: string;
  licenseType: 'Basic' | 'Professional' | 'Enterprise' | 'Yearly';
  
  // Admin user data
  adminName: string;
  adminUsername: string;
  adminEmail: string;
  adminPhone: string;
  adminPassword: string;
  confirmPassword: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess, onBackToLogin }) => {
  const [formData, setFormData] = useState<RegistrationData>({
    organizationName: '',
    organizationAddress: '',
    licenseType: 'Basic',
    adminName: '',
    adminUsername: '',
    adminEmail: '',
    adminPhone: '',
    adminPassword: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: keyof RegistrationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.organizationName.trim()) {
      newErrors.organizationName = 'Organization name is required';
    }
    if (!formData.organizationAddress.trim()) {
      newErrors.organizationAddress = 'Organization address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.adminName.trim()) {
      newErrors.adminName = 'Admin name is required';
    }
    if (!formData.adminUsername.trim()) {
      newErrors.adminUsername = 'Username is required';
    }
    if (!formData.adminEmail.trim()) {
      newErrors.adminEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.adminEmail)) {
      newErrors.adminEmail = 'Email is invalid';
    }
    if (!formData.adminPhone.trim()) {
      newErrors.adminPhone = 'Phone is required';
    }
    if (!formData.adminPassword) {
      newErrors.adminPassword = 'Password is required';
    } else if (formData.adminPassword.length < 6) {
      newErrors.adminPassword = 'Password must be at least 6 characters';
    }
    if (formData.adminPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      console.log('Registration data:', formData);
      onRegisterSuccess();
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Organization Setup</h2>
        <p className="text-gray-600 mt-2">Let's start by setting up your organization</p>
      </div>

      <div>
        <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-2">
          Organization Name *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Building className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="organizationName"
            type="text"
            placeholder="Your Organization Name"
            value={formData.organizationName}
            onChange={(e) => handleInputChange('organizationName', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.organizationName ? 'border-red-300' : 'border-gray-300'
            }`}
          />
        </div>
        {errors.organizationName && (
          <p className="mt-1 text-sm text-red-600">{errors.organizationName}</p>
        )}
      </div>

      <div>
        <label htmlFor="organizationAddress" className="block text-sm font-medium text-gray-700 mb-2">
          Organization Address *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="organizationAddress"
            type="text"
            placeholder="123 Main Street, City, Country"
            value={formData.organizationAddress}
            onChange={(e) => handleInputChange('organizationAddress', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.organizationAddress ? 'border-red-300' : 'border-gray-300'
            }`}
          />
        </div>
        {errors.organizationAddress && (
          <p className="mt-1 text-sm text-red-600">{errors.organizationAddress}</p>
        )}
      </div>

      <div>
        <label htmlFor="licenseType" className="block text-sm font-medium text-gray-700 mb-2">
          License Type
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <select
            id="licenseType"
            value={formData.licenseType}
            onChange={(e) => handleInputChange('licenseType', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="Basic">Basic - $49/month</option>
            <option value="Professional">Professional - $99/month</option>
            <option value="Enterprise">Enterprise - $199/month</option>
            <option value="Yearly">Yearly - $999/year</option>
          </select>
        </div>
      </div>

      <Button onClick={handleNextStep} className="w-full">
        Continue to Admin Setup
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Account</h2>
        <p className="text-gray-600 mt-2">Create your administrator account</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="adminName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            id="adminName"
            type="text"
            placeholder="John Doe"
            value={formData.adminName}
            onChange={(e) => handleInputChange('adminName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.adminName ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.adminName && (
            <p className="mt-1 text-sm text-red-600">{errors.adminName}</p>
          )}
        </div>

        <div>
          <label htmlFor="adminUsername" className="block text-sm font-medium text-gray-700 mb-2">
            Username *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="adminUsername"
              type="text"
              placeholder="admin.user"
              value={formData.adminUsername}
              onChange={(e) => handleInputChange('adminUsername', e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.adminUsername ? 'border-red-300' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.adminUsername && (
            <p className="mt-1 text-sm text-red-600">{errors.adminUsername}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="adminEmail"
            type="email"
            placeholder="admin@yourcompany.com"
            value={formData.adminEmail}
            onChange={(e) => handleInputChange('adminEmail', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.adminEmail ? 'border-red-300' : 'border-gray-300'
            }`}
          />
        </div>
        {errors.adminEmail && (
          <p className="mt-1 text-sm text-red-600">{errors.adminEmail}</p>
        )}
      </div>

      <div>
        <label htmlFor="adminPhone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <input
          id="adminPhone"
          type="tel"
          placeholder="+1 234-567-8900"
          value={formData.adminPhone}
          onChange={(e) => handleInputChange('adminPhone', e.target.value)}
          className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            errors.adminPhone ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.adminPhone && (
          <p className="mt-1 text-sm text-red-600">{errors.adminPhone}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Password *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="adminPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••"
              value={formData.adminPassword}
              onChange={(e) => handleInputChange('adminPassword', e.target.value)}
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.adminPassword ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
              )}
            </button>
          </div>
          {errors.adminPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.adminPassword}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••••"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      <div className="flex space-x-4">
        <Button variant="secondary" onClick={handlePrevStep} className="flex-1">
          Back
        </Button>
        <Button onClick={handleSubmit} className="flex-1">
          Create Account
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">x</span>
              </div>
            </div>
            <span className="text-2xl font-bold text-gray-800">FILE</span>
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center justify-center mt-6 space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {currentStep === 1 ? renderStep1() : renderStep2()}
        </form>

        <div className="mt-6 text-center">
          <div className="text-sm text-gray-500">
            Already have an account? {' '}
            <button 
              onClick={onBackToLogin}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;