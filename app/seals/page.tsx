'use client';

import { useState } from 'react';
import { Plus, Search, Shield, QrCode, Barcode, Download } from 'lucide-react';

export default function SealsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const seals = [
    {
      id: '1',
      seal_code: 'QR-2024-001',
      seal_type: 'qr',
      status: 'active',
      created_at: '2026-04-20',
      assigned_to: 'SHP-001',
    },
    {
      id: '2',
      seal_code: 'BC-2024-002',
      seal_type: 'barcode',
      status: 'active',
      created_at: '2026-04-21',
      assigned_to: 'SHP-002',
    },
    {
      id: '3',
      seal_code: 'QR-2024-003',
      seal_type: 'qr',
      status: 'inactive',
      created_at: '2026-04-22',
      assigned_to: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-600/20 text-green-400 border-green-600';
      case 'inactive':
        return 'bg-gray-600/20 text-gray-400 border-gray-600';
      case 'compromised':
        return 'bg-red-600/20 text-red-400 border-red-600';
      default:
        return 'bg-gray-600/20 text-gray-400 border-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Security Seals</h1>
            <p className="text-gray-400">Manage QR codes and barcodes</p>
          </div>

          <div className="flex items-center space-x-3">
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
            <button className="btn-primary flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Generate Seal</span>
            </button>
          </div>
        </div>

        <div className="card mb-6">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by seal code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field w-full pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Seals</p>
                <p className="text-2xl font-bold text-white">{seals.length}</p>
              </div>
              <Shield className="w-8 h-8 text-primary-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Active</p>
                <p className="text-2xl font-bold text-white">
                  {seals.filter(s => s.status === 'active').length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">QR Codes</p>
                <p className="text-2xl font-bold text-white">
                  {seals.filter(s => s.seal_type === 'qr').length}
                </p>
              </div>
              <QrCode className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Barcodes</p>
                <p className="text-2xl font-bold text-white">
                  {seals.filter(s => s.seal_type === 'barcode').length}
                </p>
              </div>
              <Barcode className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seals.map((seal) => (
            <div key={seal.id} className="card-hover">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {seal.seal_type === 'qr' ? (
                    <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center">
                      <QrCode className="w-6 h-6 text-primary-500" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                      <Barcode className="w-6 h-6 text-yellow-500" />
                    </div>
                  )}
                  <div>
                    <p className="text-white font-semibold font-mono">{seal.seal_code}</p>
                    <p className="text-gray-400 text-xs uppercase">{seal.seal_type}</p>
                  </div>
                </div>

                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(seal.status)}`}>
                  {seal.status}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Created</span>
                  <span className="text-white">{seal.created_at}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Assigned To</span>
                  <span className="text-white">{seal.assigned_to || 'Not assigned'}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-dark-700">
                <button className="text-primary-500 hover:text-primary-400 text-sm w-full text-center">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
