import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FaArrowLeft, 
  FaHistory, 
  FaCog, 
  FaBell, 
  FaPowerOff,
  FaChartLine,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSignal,
  FaWifi
} from 'react-icons/fa';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { getSensorIcon } from '../components/sensors/SensorIcons';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ToggleSwitch from '../components/common/ToggleSwitch';

const SensorDetailPage = () => {
  const { sensorId } = useParams();
  const navigate = useNavigate();
  const [sensor, setSensor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEnabled, setIsEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  // Get the room name from the URL to create a back link
  const roomName = window.location.pathname.split('/')[2];
  
  // Mock historical data - in a real app this would come from an API
  const mockHistoricalData = [
    { time: '00:00', value: 22 },
    { time: '04:00', value: 21 },
    { time: '08:00', value: 23 },
    { time: '12:00', value: 26 },
    { time: '16:00', value: 28 },
    { time: '20:00', value: 25 },
    { time: '24:00', value: 23 },
  ];

  // Mock activity data
  const activityData = [
    { id: 1, event: 'Sensor reading: 26°C', time: '15 minutes ago' },
    { id: 2, event: 'Status changed to Active', time: '2 hours ago' },
    { id: 3, event: 'Alert cleared: High temperature', time: '1 day ago' },
    { id: 4, event: 'Alert triggered: High temperature', time: '1 day ago' },
    { id: 5, event: 'Sensor reading: 32°C', time: '1 day ago' },
  ];

  useEffect(() => {
    const fetchSensorData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call like:
        // const response = await axios.get(`/api/sensors/${sensorId}`);
        
        // For this example, we'll simulate a delay and return mock data
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockSensor = {
          id: sensorId,
          name: `${roomName.charAt(0).toUpperCase() + roomName.slice(1)} ${sensorId.includes('temp') ? 'Temperature' : 
                 sensorId.includes('motion') ? 'Motion' : 
                 sensorId.includes('smoke') ? 'Smoke' : 
                 sensorId.includes('water') ? 'Water' : 'Sensor'}`,
          type: sensorId.includes('temp') ? 'temperature' : 
                sensorId.includes('motion') ? 'motion' : 
                sensorId.includes('smoke') ? 'smoke' : 
                sensorId.includes('water') ? 'water' : 'sensor',
          status: 'Active',
          value: sensorId.includes('temp') ? '24°C' : 
                 sensorId.includes('motion') ? 'No Motion' : 
                 sensorId.includes('smoke') ? 'Clear' : 
                 sensorId.includes('water') ? '0%' : 'Normal',
          battery: '85%',
          signal: 'Excellent',
          lastUpdate: 'Just now',
          firmware: 'v2.1.0',
          installedDate: '2024-03-15',
          location: roomName.charAt(0).toUpperCase() + roomName.slice(1),
          model: 'HomAlert Pro Sensor'
        };
        
        setSensor(mockSensor);
        setIsEnabled(mockSensor.status !== 'Inactive');
      } catch (err) {
        console.error('Error fetching sensor data:', err);
        setError('Failed to load sensor data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSensorData();
  }, [sensorId, roomName]);

  const handleToggleSensor = () => {
    setIsEnabled(!isEnabled);
    // In a real app, you would also make an API call to update the sensor status
  };

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    // In a real app, you would also make an API call to update notification settings
  };

  const SensorIcon = sensor?.type ? getSensorIcon(sensor.type) : FaSignal;

  if (loading) return <LoadingSpinner message={`Loading sensor details...`} />;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!sensor) return <div className="p-6">No sensor data found.</div>;

  return (
    <div className="p-4 md:p-6">
      {/* Header with back button */}
      <div className="mb-6">
        <Link 
          to={`/dashboard/${roomName}`} 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back to {roomName.charAt(0).toUpperCase() + roomName.slice(1)}
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">{sensor.name}</h1>
        <div className="flex items-center space-x-2 mt-1">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            isEnabled ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                       'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
          }`}>
            {isEnabled ? 'Active' : 'Inactive'}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Last updated: {sensor.lastUpdate}</span>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-6">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview' 
                ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400'
            }`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'history' 
                ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400'
            }`}
          >
            History
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'settings' 
                ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400'
            }`}
          >
            Settings
          </button>
        </nav>
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Current Reading Card */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Current Reading</h2>
                <SensorIcon className="h-8 w-8 text-blue-500 dark:text-blue-400" />
              </div>
              
              <div className="flex flex-col items-center">
                <div className="text-5xl font-bold text-gray-800 dark:text-white mb-4">{sensor.value}</div>
                <div className="flex items-center space-x-2">
                  <FaWifi className={`h-5 w-5 ${
                    sensor.signal === 'Excellent' ? 'text-green-500' : 
                    sensor.signal === 'Good' ? 'text-blue-500' : 
                    sensor.signal === 'Fair' ? 'text-yellow-500' : 'text-red-500'
                  }`} />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Signal: {sensor.signal}</span>
                </div>
              </div>
            </div>

            {/* Quick Controls */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Quick Controls</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaPowerOff className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <span className="text-gray-800 dark:text-gray-200">Sensor Power</span>
                  </div>
                  <ToggleSwitch isOn={isEnabled} onToggle={handleToggleSensor} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaBell className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <span className="text-gray-800 dark:text-gray-200">Notifications</span>
                  </div>
                  <ToggleSwitch isOn={notificationsEnabled} onToggle={handleToggleNotifications} />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Recent Activity</h2>
              <ul className="space-y-3">
                {activityData.map((activity) => (
                  <li key={activity.id} className="flex items-start space-x-3 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <FaHistory className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-800 dark:text-gray-200">{activity.event}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            {/* Chart */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-6">Reading History</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockHistoricalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#718096"
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#718096"
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '4px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={{ r: 4, fill: "#3B82F6", stroke: "#fff", strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: "#3B82F6", stroke: "#fff", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Historical Events Table */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Historical Events</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Event</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Value</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">2024-07-27</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">Reading</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">26°C</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Normal</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">2024-07-26</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">Alert</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">32°C</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Warning</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">2024-07-26</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">Reading</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">28°C</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Normal</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Sensor Information */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Sensor Information</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Model</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{sensor.model}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">ID</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{sensor.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{sensor.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Installed Date</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{sensor.installedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Firmware Version</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{sensor.firmware}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Battery Level</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{sensor.battery}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Notification Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaExclamationTriangle className="h-5 w-5 text-yellow-500 mr-3" />
                    <span className="text-gray-800 dark:text-gray-200">Alert Notifications</span>
                  </div>
                  <ToggleSwitch isOn={notificationsEnabled} onToggle={handleToggleNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaCheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-800 dark:text-gray-200">Status Change Notifications</span>
                  </div>
                  <ToggleSwitch isOn={true} onToggle={() => {}} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaBell className="h-5 w-5 text-blue-500 mr-3" />
                    <span className="text-gray-800 dark:text-gray-200">Low Battery Notifications</span>
                  </div>
                  <ToggleSwitch isOn={true} onToggle={() => {}} />
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Advanced Settings</h2>
              <div className="space-y-4">
                <button className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  <FaCog className="h-5 w-5 mr-2" /> Calibrate Sensor
                </button>
                <button className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  <FaChartLine className="h-5 w-5 mr-2" /> Adjust Threshold Values
                </button>
                <button className="flex items-center text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                  <FaPowerOff className="h-5 w-5 mr-2" /> Reset Sensor
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SensorDetailPage;