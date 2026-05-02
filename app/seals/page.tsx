'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Shield, QrCode, Barcode, Download } from 'lucide-react';
import SealGenerationModal from '@/components/SealGenerationModal';

export default function SealsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [seals, setSeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchSeals();
  }, []);

  const fetchSeals = async () => {
    try {
      const response = await fetch('/api/seals');
      if (response.ok) {
        const data = await response.json();
        setSeals(data);
      }
    } catch (error) {
      console.error('Error fetching seals:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSeals = seals.filter(seal =>
    seal.sealCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <div className="min-h-screen bg-dark-950 p-4 sm:p-6 pt-16 lg:pt-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Security Seals</h1>
            <p className="text-gray-400 text-sm sm:text-base">Manage QR codes and barcodes</p>
          </div>

          <div className="flex items-center space-x-3">
            <button className="btn-secondary flex items-center space-x-2 flex-1 sm:flex-initial justify-center">
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Export</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary flex items-center space-x-2 flex-1 sm:flex-initial justify-center"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Generate</span>
            </button>
          </div>
        </div>

        <SealGenerationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchSeals}
        />

        <div className="card mb-4 sm:mb-6">
          <div className="relative">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by seal code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field w-full pl-9 sm:pl-10 text-sm sm:text-base"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-6">
              <div className="card">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm mb-1">Total</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">{filteredSeals.length}</p>
                  </div>
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary-500" />
                </div>
              </div>

              <div className="card">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm mb-1">Active</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">
                      {filteredSeals.filter(s => s.status === 'active').length}
                    </p>
                  </div>
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                </div>
              </div>

              <div className="card">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm mb-1">QR</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">
                      {filteredSeals.filter(s => s.sealType === 'qr').length}
                    </p>
                  </div>
                  <QrCode className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                </div>
              </div>

              <div className="card">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm mb-1">Barcode</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">
                      {filteredSeals.filter(s => s.sealType === 'barcode').length}
                    </p>
                  </div>
                  <Barcode className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
                </div>
              </div>
            </div>

            {filteredSeals.length === 0 ? (
              <div className="card text-center py-12">
                <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No seals found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredSeals.map((seal) => (
                  <div key={seal.id} className="card-hover">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {seal.sealType === 'qr' ? (
                          <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center">
                            <QrCode className="w-6 h-6 text-primary-500" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                            <Barcode className="w-6 h-6 text-yellow-500" />
                          </div>
                        )}
                        <div>
                          <p className="text-white font-semibold font-mono">{seal.sealCode}</p>
                          <p className="text-gray-400 text-xs uppercase">{seal.sealType}</p>
                        </div>
                      </div>

                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(seal.status)}`}>
                        {seal.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Created</span>
                        <span className="text-white">{new Date(seal.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Created By</span>
                        <span className="text-white">{seal.creator?.name || 'Unknown'}</span>
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
            )}
          </>
        )}
      </div>
    </div>
  );
}
