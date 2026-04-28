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
    <div className="min-h-screen bg-dark-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Users</h1>
            <p className="text-gray-400">Manage system users and permissions</p>
          </div>

          <button className="btn-primary flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add User</span>
          </button>
        </div>

        <div className="card mb-6">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="input-field w-full pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Users</p>
                <p className="text-2xl font-bold text-white">{users.length}</p>
              </div>
              <UsersIcon className="w-8 h-8 text-primary-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Admins</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.role === 'admin').length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Operators</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.role === 'operator').length}
                </p>
              </div>
              <UsersIcon className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="card">
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
      </div>
    </div>
  );
}
