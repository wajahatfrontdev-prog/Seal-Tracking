'use client';

import { Settings as SettingsIcon, Bell, Lock, Database, Globe } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-dark-950 p-4 sm:p-6 pt-16 lg:pt-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400 text-sm sm:text-base">Manage system configuration and preferences</p>
        </div>

        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Notifications</h3>
                <p className="text-sm text-gray-400">Configure notification preferences</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Email Notifications</p>
                  <p className="text-sm text-gray-400">Receive email alerts for important events</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Scan Alerts</p>
                  <p className="text-sm text-gray-400">Alert on multiple seal scans</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Security</h3>
                <p className="text-sm text-gray-400">Manage security settings</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Session Timeout (minutes)</label>
                <input
                  type="number"
                  defaultValue={30}
                  className="input-field w-full"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-400">Add extra security layer</p>
                </div>
                <button className="btn-secondary text-sm">Configure</button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Database</h3>
                <p className="text-sm text-gray-400">Database configuration</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-white mb-2">Connection Status</p>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-green-400 text-sm">Connected</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="btn-secondary text-sm">Backup Database</button>
                <button className="btn-secondary text-sm">View Logs</button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">General</h3>
                <p className="text-sm text-gray-400">General system settings</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">System Name</label>
                <input
                  type="text"
                  defaultValue="LOGIFAST Seal Tracking"
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Language</label>
                <select className="input-field w-full">
                  <option>English</option>
                  <option>Urdu</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button className="btn-secondary">Cancel</button>
            <button className="btn-primary">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
