'use client';

import { useState } from 'react';
import QRScanner from '@/components/QRScanner';
import { Package, Truck, MapPin, Calendar, User, AlertCircle } from 'lucide-react';

export default function ScanPage() {
  const [scannedData, setScannedData] = useState<any>(null);
  const [scanHistory, setScanHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleScanSuccess = async (decodedText: string, decodedResult: any) => {
    setLoading(true);

    // Simulate API call to fetch seal/shipment data
    setTimeout(() => {
      const mockData = {
        seal: {
          seal_code: decodedText,
          status: 'active',
          created_at: '2026-04-20',
        },
        shipment: {
          id: 'SHP-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          truck_id: 'DEZ-' + Math.floor(Math.random() * 1000),
          product_name: 'Cotton Bales',
          product_description: 'Premium quality cotton bales',
          quantity: Math.floor(Math.random() * 100) + 50,
          unit: 'bags',
          origin: 'Karachi Warehouse',
          destination: 'Lahore Distribution Center',
          status: 'in-transit',
        },
        scans: [
          {
            scanned_at: new Date().toISOString(),
            scanned_by: 'Current User',
            location: 'Checkpoint A',
          },
          {
            scanned_at: new Date(Date.now() - 86400000).toISOString(),
            scanned_by: 'Operator 1',
            location: 'Origin Warehouse',
          },
        ],
      };

      setScannedData(mockData);
      setScanHistory(prev => [
        { code: decodedText, timestamp: new Date(), ...mockData },
        ...prev.slice(0, 4)
      ]);
      setLoading(false);
    }, 1000);
  };

  const totalScans = scannedData?.scans?.length || 0;
  const isMultipleScans = totalScans > 2;

  return (
    <div className="min-h-screen bg-dark-950 p-4 sm:p-6 pt-16 lg:pt-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Scan Security Seal</h1>
          <p className="text-gray-400 text-sm sm:text-base">Scan QR code or barcode to view shipment details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Scanner Section */}
          <div>
            <QRScanner onScanSuccess={handleScanSuccess} />
          </div>

          {/* Results Section */}
          <div>
            {loading && (
              <div className="card flex items-center justify-center" style={{ minHeight: '300px' }}>
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading shipment data...</p>
                </div>
              </div>
            )}

            {!loading && scannedData && (
              <div className="space-y-4">
                {/* Alert for multiple scans */}
                {isMultipleScans && (
                  <div className="bg-yellow-600/20 border border-yellow-600 rounded-lg p-4 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-yellow-500 font-semibold">Security Alert</p>
                      <p className="text-yellow-400 text-sm">This seal has been scanned {totalScans} times</p>
                    </div>
                  </div>
                )}

                {/* Seal Information */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-4">Seal Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Seal Code</span>
                      <span className="text-white font-mono">{scannedData.seal.seal_code}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status</span>
                      <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm">
                        {scannedData.seal.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Created</span>
                      <span className="text-white">{scannedData.seal.created_at}</span>
                    </div>
                  </div>
                </div>

                {/* Shipment Details */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-4">Shipment Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Truck className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-gray-400 text-sm">Truck ID</p>
                        <p className="text-white font-semibold">{scannedData.shipment.truck_id}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Package className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-gray-400 text-sm">Product</p>
                        <p className="text-white font-semibold">{scannedData.shipment.product_name}</p>
                        <p className="text-gray-400 text-sm">{scannedData.shipment.product_description}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Package className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-gray-400 text-sm">Quantity</p>
                        <p className="text-white font-semibold">
                          {scannedData.shipment.quantity} {scannedData.shipment.unit}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-gray-400 text-sm">Route</p>
                        <p className="text-white">{scannedData.shipment.origin}</p>
                        <div className="flex items-center space-x-2 my-1">
                          <div className="w-full h-px bg-dark-700"></div>
                          <span className="text-gray-500">→</span>
                          <div className="w-full h-px bg-dark-700"></div>
                        </div>
                        <p className="text-white">{scannedData.shipment.destination}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-dark-700">
                      <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                        {scannedData.shipment.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Scan History */}
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Scan History</h3>
                    <span className="text-sm text-gray-400">Total: {totalScans} scans</span>
                  </div>
                  <div className="space-y-3">
                    {scannedData.scans.map((scan: any, index: number) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-dark-800 rounded-lg">
                        <div className="w-8 h-8 bg-primary-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-primary-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{scan.scanned_by}</p>
                          <p className="text-gray-400 text-xs">{scan.location}</p>
                          <p className="text-gray-500 text-xs mt-1">
                            {new Date(scan.scanned_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!loading && !scannedData && (
              <div className="card flex items-center justify-center" style={{ minHeight: '300px' }}>
                <div className="text-center">
                  <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Scan a code to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Scans */}
        {scanHistory.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Scans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scanHistory.map((item, index) => (
                <div key={index} className="card-hover cursor-pointer" onClick={() => setScannedData(item)}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-mono text-sm">{item.code}</span>
                    <span className="text-xs text-gray-500">
                      {item.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{item.shipment.truck_id}</p>
                  <p className="text-gray-500 text-xs">{item.shipment.product_name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
