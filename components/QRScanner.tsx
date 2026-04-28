'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, X } from 'lucide-react';

interface QRScannerProps {
  onScanSuccess: (decodedText: string, decodedResult: any) => void;
  onScanError?: (error: string) => void;
}

export default function QRScanner({ onScanSuccess, onScanError }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string>('');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [cameras, setCameras] = useState<any[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>('');

  useEffect(() => {
    // Get available cameras
    Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length) {
        setCameras(devices);
        setSelectedCamera(devices[0].id);
      }
    }).catch(err => {
      setError('Unable to access cameras');
    });

    return () => {
      stopScanning();
    };
  }, []);

  const startScanning = async () => {
    try {
      setError('');
      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;

      await scanner.start(
        selectedCamera || { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText, decodedResult) => {
          onScanSuccess(decodedText, decodedResult);
          // Optional: stop scanning after successful scan
          // stopScanning();
        },
        (errorMessage) => {
          // Ignore scan errors (happens when no QR code is in view)
        }
      );

      setIsScanning(true);
    } catch (err: any) {
      setError(err.message || 'Failed to start scanner');
      if (onScanError) {
        onScanError(err.message);
      }
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
        setIsScanning(false);
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="card mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">QR/Barcode Scanner</h3>
          {isScanning && (
            <button
              onClick={stopScanning}
              className="btn-secondary flex items-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Stop</span>
            </button>
          )}
        </div>

        {cameras.length > 1 && !isScanning && (
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Select Camera</label>
            <select
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              className="input-field w-full"
            >
              {cameras.map((camera) => (
                <option key={camera.id} value={camera.id}>
                  {camera.label || `Camera ${camera.id}`}
                </option>
              ))}
            </select>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-600/20 border border-red-600 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="relative bg-dark-950 rounded-lg overflow-hidden" style={{ minHeight: '300px' }}>
          <div id="qr-reader" className="w-full"></div>

          {!isScanning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={startScanning}
                className="btn-primary flex items-center space-x-2 text-lg px-6 py-3"
              >
                <Camera className="w-6 h-6" />
                <span>Start Scanning</span>
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 text-center text-sm text-gray-400">
          {isScanning ? (
            <p className="flex items-center justify-center space-x-2">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>Scanner active - Point camera at QR code or barcode</span>
            </p>
          ) : (
            <p>Click "Start Scanning" to begin</p>
          )}
        </div>
      </div>
    </div>
  );
}
