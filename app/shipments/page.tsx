'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Truck, Package, MapPin, Calendar } from 'lucide-react';
import ShipmentFormModal from '@/components/ShipmentFormModal';

export default function ShipmentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchShipments();
  }, [filterStatus]);

  const fetchShipments = async () => {
    try {
      const url = filterStatus === 'all'
        ? '/api/shipments'
        : `/api/shipments?status=${filterStatus}`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setShipments(data);
      }
    } catch (error) {
      console.error('Error fetching shipments:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredShipments = shipments.filter(shipment =>
    shipment.truckId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.seal.sealCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-600/20 text-green-400 border-green-600';
      case 'in-transit':
        return 'bg-blue-600/20 text-blue-400 border-blue-600';
      case 'pending':
        return 'bg-yellow-600/20 text-yellow-400 border-yellow-600';
      default:
        return 'bg-gray-600/20 text-gray-400 border-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 p-4 sm:p-6 pt-16 lg:pt-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Shipments</h1>
            <p className="text-gray-400 text-sm sm:text-base">Manage all shipments and deliveries</p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>New Shipment</span>
          </button>
        </div>

        <ShipmentFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchShipments}
        />

        {/* Filters */}
        <div className="card mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search shipments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field w-full pl-9 sm:pl-10 text-sm sm:text-base"
              />
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input-field text-sm sm:text-base"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-transit">In Transit</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-6">
              <div className="card">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm mb-1">Total</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">{filteredShipments.length}</p>
                  </div>
                  <Package className="w-6 h-6 sm:w-8 sm:h-8 text-primary-500" />
                </div>
              </div>

              <div className="card">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm mb-1">Transit</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">
                      {filteredShipments.filter(s => s.status === 'in-transit').length}
                    </p>
                  </div>
                  <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                </div>
              </div>

              <div className="card">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm mb-1">Done</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">
                      {filteredShipments.filter(s => s.status === 'delivered').length}
                    </p>
                  </div>
                  <Package className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                </div>
              </div>
            </div>

        {/* Shipments Table - Desktop */}
        <div className="card hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="text-left py-4 px-4 text-gray-400 font-medium text-sm">Shipment ID</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium text-sm">Seal Code</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium text-sm">Truck</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium text-sm">Product</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium text-sm">Quantity</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium text-sm">Route</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium text-sm">Status</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium text-sm">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredShipments.map((shipment) => (
                  <tr
                    key={shipment.id}
                    className="border-b border-dark-800 hover:bg-dark-800 transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-4">
                      <span className="text-white font-semibold">{shipment.id.substring(0, 8)}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-300 font-mono text-sm">{shipment.seal.sealCode}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Truck className="w-4 h-4 text-gray-400" />
                        <span className="text-white">{shipment.truckId}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-white">{shipment.productName}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-white">{shipment.quantity} {shipment.unit}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="text-gray-300">{shipment.origin}</p>
                          <p className="text-gray-500 text-xs">→ {shipment.destination}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(shipment.status)}`}>
                        {shipment.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(shipment.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

            {/* Shipments Cards - Mobile */}
            <div className="md:hidden space-y-3">
              {filteredShipments.length === 0 ? (
                <div className="card text-center py-12">
                  <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No shipments found</p>
                </div>
              ) : (
                filteredShipments.map((shipment) => (
                  <div key={shipment.id} className="card">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-white font-semibold text-sm">{shipment.id.substring(0, 8)}</p>
                        <p className="text-gray-400 text-xs font-mono">{shipment.seal.sealCode}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(shipment.status)}`}>
                        {shipment.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Truck className="w-4 h-4 text-gray-400" />
                        <span className="text-white">{shipment.truckId}</span>
                      </div>

                      <div>
                        <p className="text-white">{shipment.productName}</p>
                        <p className="text-gray-400 text-xs">{shipment.quantity} {shipment.unit}</p>
                      </div>

                      <div className="flex items-start space-x-2 pt-2 border-t border-dark-700">
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div className="text-xs">
                          <p className="text-gray-300">{shipment.origin}</p>
                          <p className="text-gray-500">→ {shipment.destination}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-dark-700">
                        <div className="flex items-center space-x-2 text-gray-400 text-xs">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(shipment.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
