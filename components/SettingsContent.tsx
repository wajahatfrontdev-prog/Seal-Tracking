'use client';

import { useState, useEffect } from 'react';
import { User, Lock, Bell, Moon, Sun, Save } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useToast } from '@/components/ToastProvider';

export default function SettingsContent() {
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Profile settings
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  // Password change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [scanAlerts, setScanAlerts] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/user/settings');
      if (response.ok) {
        const data = await response.json();
        setName(data.name || '');
        setEmail(data.email || '');
        setRole(data.role || '');

        // Load preferences
        if (data.preferences) {
          const prefs = typeof data.preferences === 'string'
            ? JSON.parse(data.preferences)
            : data.preferences;
          setEmailNotifications(prefs.emailNotifications ?? true);
          setScanAlerts(prefs.scanAlerts ?? true);
        }
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      showToast('Failed to load settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const preferences = {
        emailNotifications,
        scanAlerts,
      };

      const response = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          preferences: JSON.stringify(preferences),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast('Profile updated successfully', 'success');
      } else {
        showToast(data.error || 'Failed to update profile', 'error');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast('Failed to update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      showToast('Please fill in all password fields', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }

    if (newPassword.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/user/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showToast('Password changed successfully', 'success');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        showToast(data.error || 'Failed to change password', 'error');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      showToast('Failed to change password', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 p-4 sm:p-6 pt-16 lg:pt-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400 text-sm sm:text-base">Manage your profile and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="card animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Profile</h3>
                <p className="text-sm text-gray-400">Update your personal information</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field w-full"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field w-full"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Role</label>
                <input
                  type="text"
                  value={role}
                  disabled
                  className="input-field w-full opacity-50 cursor-not-allowed"
                />
              </div>

              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="btn-primary flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Profile'}</span>
              </button>
            </div>
          </div>

          {/* Password Change */}
          <div className="card animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Change Password</h3>
                <p className="text-sm text-gray-400">Update your password</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="input-field w-full"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input-field w-full"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field w-full"
                  placeholder="Confirm new password"
                />
              </div>

              <button
                onClick={handleChangePassword}
                disabled={saving}
                className="btn-primary flex items-center space-x-2"
              >
                <Lock className="w-4 h-4" />
                <span>{saving ? 'Changing...' : 'Change Password'}</span>
              </button>
            </div>
          </div>

          {/* Appearance */}
          <div className="card animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-500" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Appearance</h3>
                <p className="text-sm text-gray-400">Customize the look and feel</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Dark Mode</p>
                <p className="text-sm text-gray-400">Toggle between light and dark theme</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                />
                <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>

          {/* Notifications */}
          <div className="card animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-green-500" />
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
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Scan Alerts</p>
                  <p className="text-sm text-gray-400">Alert on multiple seal scans</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={scanAlerts}
                    onChange={(e) => setScanAlerts(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out both;
        }
      `}</style>
    </div>
  );
}
