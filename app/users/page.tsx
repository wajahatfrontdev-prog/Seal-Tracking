'use client';

import { Users as UsersIcon, Plus, Search, Mail, Shield } from 'lucide-react';

export default function UsersPage() {
  const users = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@logifast.com',
      role: 'admin',
      created_at: '2026-01-15',
      status: 'active',
    },
    {
      id: '2',
      name: 'Operator 1',
      email: 'operator1@logifast.com',
      role: 'operator',
      created_at: '2026-02-20',
      status: 'active',
    },
    {
      id: '3',
      name: 'Viewer User',
      email: 'viewer@logifast.com',
      role: 'viewer',
      created_at: '2026-03-10',
      status: 'active',
    },
  ];

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-600/20 text-red-400 border-red-600';
      case 'operator':
        return 'bg-blue-600/20 text-blue-400 border-blue-600';
      case 'viewer':
        return 'bg-gray-600/20 text-gray-400 border-gray-600';
      default:
        return 'bg-gray-600/20 text-gray-400 border-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 p-4 sm:p-6 pt-16 lg:pt-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Users</h1>
            <p className="text-gray-400 text-sm sm:text-base">Manage system users and permissions</p>
          </div>

          <button className="btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto">
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Add User</span>
          </button>
        </div>

        <div className="card mb-4 sm:mb-6">
          <div className="relative">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search users..."
              className="input-field w-full pl-9 sm:pl-10 text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-6">
          <div className="card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm mb-1">Total</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{users.length}</p>
              </div>
              <UsersIcon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm mb-1">Admins</p>
                <p className="text-xl sm:text-2xl font-bold text-white">
                  {users.filter(u => u.role === 'admin').length}
                </p>
              </div>
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm mb-1">Operators</p>
                <p className="text-xl sm:text-2xl font-bold text-white">
                  {users.filter(u => u.role === 'operator').length}
                </p>
              </div>
              <UsersIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="card hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="text-left py-4 px-4 text-gray-400 font-medium text-sm">Name</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium text-sm">Email</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium text-sm">Role</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium text-sm">Status</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium text-sm">Created</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-dark-800 hover:bg-dark-800 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <span className="text-white font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{user.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border uppercase ${getRoleBadge(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-600/20 text-green-400 border border-green-600">
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-400">{user.created_at}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="text-primary-500 hover:text-primary-400 text-sm">
                          Edit
                        </button>
                        <button className="text-red-500 hover:text-red-400 text-sm">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {users.map((user) => (
            <div key={user.id} className="card">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{user.name}</p>
                    <div className="flex items-center space-x-1 text-gray-400 text-xs mt-1">
                      <Mail className="w-3 h-3" />
                      <span>{user.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-dark-700">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border uppercase ${getRoleBadge(user.role)}`}>
                    {user.role}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-600/20 text-green-400 border border-green-600">
                    {user.status}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-primary-500 hover:text-primary-400 text-xs">
                    Edit
                  </button>
                  <button className="text-red-500 hover:text-red-400 text-xs">
                    Delete
                  </button>
                </div>
              </div>

              <div className="text-gray-400 text-xs mt-2">
                Created: {user.created_at}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
