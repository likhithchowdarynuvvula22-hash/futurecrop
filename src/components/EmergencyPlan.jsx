import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, Phone, MessageSquare, Shield, Clock, Users, Leaf } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const EmergencyPlan = ({ contingencyPlan, smsTemplates, onBack }) => {
  const { t } = useLanguage();
  const [selectedAlert, setSelectedAlert] = useState('pest_alert');

  const alertTypes = [
    { key: 'pest_alert', label: t('pestAlert'), icon: Shield, color: 'text-red-600 bg-red-50' },
    { key: 'nutrient_alert', label: t('nutrientAlert'), icon: Leaf, color: 'text-yellow-600 bg-yellow-50' },
    { key: 'disaster_alert', label: t('disasterAlert'), icon: AlertTriangle, color: 'text-orange-600 bg-orange-50' }
  ];

  const ActionCard = ({ title, actions, icon: Icon, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center space-x-3 mb-4">
        <Icon className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-blue-600">{index + 1}</span>
            </div>
            <p className="text-gray-700">{action}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('back')}</span>
        </button>
        
        <h2 className="text-3xl font-bold text-gray-900">{t('emergencyPlan')}</h2>
        
        <div className="flex items-center space-x-2 text-red-600">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-medium">Emergency Response</span>
        </div>
      </div>

      {/* Current Emergency Type */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-2">
          <AlertTriangle className="w-8 h-8" />
          <h3 className="text-2xl font-bold">Current Emergency: {contingencyPlan.event.toUpperCase()}</h3>
        </div>
        <p className="text-red-100">
          Follow the action plan below for immediate response and recovery
        </p>
      </div>

      {/* Action Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActionCard
          title={t('immediateActions')}
          actions={contingencyPlan.immediate_actions}
          icon={Clock}
          delay={0.1}
        />
        <ActionCard
          title={t('midTermActions')}
          actions={contingencyPlan.mid_term_actions}
          icon={Shield}
          delay={0.2}
        />
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Users className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-bold text-gray-900">{t('contacts')}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
            <Phone className="w-8 h-8 text-green-600" />
            <div>
              <div className="font-bold text-gray-900">{t('extensionOfficer')}</div>
              <div className="text-green-600 font-medium">{contingencyPlan.contacts.extension_officer}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
            <Phone className="w-8 h-8 text-blue-600" />
            <div>
              <div className="font-bold text-gray-900">{t('helplineNumber')}</div>
              <div className="text-blue-600 font-medium">{contingencyPlan.contacts.helpline_number}</div>
            </div>
          </div>
        </div>
      </div>

      {/* SMS Alert Templates */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <MessageSquare className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-bold text-gray-900">{t('smsAlerts')}</h3>
        </div>
        
        {/* Alert Type Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {alertTypes.map(alert => (
            <button
              key={alert.key}
              onClick={() => setSelectedAlert(alert.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                selectedAlert === alert.key 
                  ? alert.color 
                  : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <alert.icon className="w-4 h-4" />
              <span className="font-medium">{alert.label}</span>
            </button>
          ))}
        </div>
        
        {/* Selected Alert Template */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-gray-900">
              {alertTypes.find(a => a.key === selectedAlert)?.label} Template
            </h4>
            <span className="text-sm text-gray-500">
              {smsTemplates[selectedAlert]?.length || 0}/160 characters
            </span>
          </div>
          <p className="text-gray-700 font-mono text-sm leading-relaxed">
            {smsTemplates[selectedAlert]}
          </p>
          
          <div className="mt-4 flex space-x-3">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Send SMS
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Copy Template
            </button>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-yellow-800 mb-2">Important Notes</h3>
            <ul className="text-yellow-700 space-y-1 text-sm">
              <li>• Act quickly but safely - don't risk personal safety</li>
              <li>• Document damage with photos for insurance claims</li>
              <li>• Keep emergency contacts easily accessible</li>
              <li>• Follow local agricultural extension guidelines</li>
              <li>• Report significant damage to authorities promptly</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmergencyPlan;
