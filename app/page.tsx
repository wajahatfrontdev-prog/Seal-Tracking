'use client';

import { useState, useEffect } from 'react';
import { Package, Truck } from 'lucide-react';

export default function Home() {
  const [stats, setStats] = useState({
    totalShipments: 0,
    inTransit: 0,
    delivered: 0,
    activeSeals: 0,
  });
  const [recentShipments, setRecentShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch shipments
      const shipmentsRes = await fetch('/api/shipments');
      if (shipmentsRes.ok) {
        const shipments = await shipmentsRes.json();

        setStats({
          totalShipments: shipments.length,
          inTransit: shipments.filter((s: any) => s.status === 'in-transit').length,
          delivered: shipments.filter((s: any) => s.status === 'delivered').length,
          activeSeals: 0, // Will be updated with seals data
        });

        // Get recent 4 shipments
        setRecentShipments(shipments.slice(0, 4));
      }

      // Fetch seals for active count
      const sealsRes = await fetch('/api/seals');
      if (sealsRes.ok) {
        const seals = await sealsRes.json();
        setStats(prev => ({
          ...prev,
          activeSeals: seals.filter((s: any) => s.status === 'active').length,
        }));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 p-4 sm:p-6 pt-16 lg:pt-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Shipping Dashboard</h2>
            <p className="text-gray-400 text-sm sm:text-base">Track and manage security seals</p>
          </div>

          <div className="flex items-center space-x-3">
            <button className="btn-secondary text-sm sm:text-base">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline">Search</span>
            </button>
            <button className="btn-primary text-sm sm:text-base">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">New Shipment</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm mb-1">Total Shipments</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">{stats.totalShipments}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600/20 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" />
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm mb-1">In Transit</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">{stats.inTransit}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm mb-1">Delivered</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">{stats.delivered}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs sm:text-sm mb-1">Active Seals</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">{stats.activeSeals}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Shipments */}
            <div className="card">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-white">Recent Shipments</h3>
                <a href="/shipments" className="text-primary-500 hover:text-primary-400 text-xs sm:text-sm">View All</a>
              </div>

              {recentShipments.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">No shipments yet</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {recentShipments.map((shipment) => (
                    <div key={shipment.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors cursor-pointer gap-3">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-dark-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm sm:text-base">#{shipment.truckId}</p>
                          <p className="text-gray-400 text-xs sm:text-sm">{shipment.productName}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end sm:space-x-6 pl-13 sm:pl-0">
                        <div className="text-left sm:text-right">
                          <p className="text-gray-400 text-xs sm:text-sm">Route</p>
                          <p className="text-white text-xs sm:text-sm line-clamp-1">{shipment.origin} → {shipment.destination}</p>
                        </div>
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          shipment.status === 'in-transit' ? 'bg-blue-600/20 text-blue-400' :
                          shipment.status === 'delivered' ? 'bg-green-600/20 text-green-400' :
                          'bg-yellow-600/20 text-yellow-400'
                        }`}>
                          {shipment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
