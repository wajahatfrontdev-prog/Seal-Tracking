'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Download, QrCode as QrCodeIcon, Barcode as BarcodeIcon } from 'lucide-react';
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';

interface SealDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  seal: any;
}

export default function SealDetailModal({ isOpen, onClose, seal }: SealDetailModalProps) {
  const [codeImage, setCodeImage] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isOpen && seal) {
      generateCode();
    }
  }, [isOpen, seal]);

  const generateCode = async () => {
    if (!seal) return;

    try {
      if (seal.sealType === 'qr') {
        // Generate QR Code
        const qrDataUrl = await QRCode.toDataURL(seal.sealCode, {
          width: 400,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        });
        setCodeImage(qrDataUrl);
      } else if (seal.sealType === 'barcode') {
        // Generate Barcode
        if (canvasRef.current) {
          JsBarcode(canvasRef.current, seal.sealCode, {
            format: 'CODE128',
            width: 3,
            height: 150,
            displayValue: true,
            fontSize: 20,
            margin: 10,
          });
          const barcodeDataUrl = canvasRef.current.toDataURL();
          setCodeImage(barcodeDataUrl);
        }
      }
    } catch (error) {
      console.error('Error generating code:', error);
    }
  };

  const handleDownload = () => {
    if (!codeImage) return;

    const link = document.createElement('a');
    link.href = codeImage;
    link.download = `${seal.sealCode}-${seal.sealType}.png`;
    link.click();
  };

  if (!isOpen || !seal) return null;

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-dark-900 rounded-2xl shadow-2xl w-full max-w-2xl border border-dark-700 animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-700 sticky top-0 bg-dark-900 z-10">
          <div className="flex items-center space-x-3">
            {seal.sealType === 'qr' ? (
              <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center">
                <QrCodeIcon className="w-6 h-6 text-primary-500" />
              </div>
            ) : (
              <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                <BarcodeIcon className="w-6 h-6 text-yellow-500" />
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-white">Seal Details</h2>
              <p className="text-gray-400 text-sm font-mono">{seal.sealCode}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* QR Code / Barcode Display */}
          <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center">
            <p className="text-gray-800 font-semibold mb-4 text-center">
              Scan this {seal.sealType === 'qr' ? 'QR Code' : 'Barcode'} from your phone
            </p>
            {codeImage ? (
              <img
                src={codeImage}
                alt={`${seal.sealType} code`}
                className="max-w-full h-auto"
              />
            ) : (
              <div className="w-64 h-64 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>

          {/* Seal Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Seal Code</p>
                <p className="text-white font-mono font-semibold">{seal.sealCode}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Type</p>
                <p className="text-white uppercase">{seal.sealType}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(seal.status)}`}>
                  {seal.status}
                </span>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Created</p>
                <p className="text-white">{new Date(seal.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-400 text-sm mb-1">Created By</p>
                <p className="text-white">{seal.creator?.name || 'Unknown'}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 pt-4 border-t border-dark-700">
            <button
              onClick={handleDownload}
              className="flex-1 btn-primary flex items-center justify-center space-x-2"
              disabled={!codeImage}
            >
              <Download className="w-4 h-4" />
              <span>Download {seal.sealType === 'qr' ? 'QR Code' : 'Barcode'}</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
