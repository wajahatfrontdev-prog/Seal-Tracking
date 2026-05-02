'use client';

import { useState } from 'react';
import Modal from './Modal';
import { QrCode, Barcode } from 'lucide-react';
import { useToast } from './ToastContext';

interface SealGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SealGenerationModal({ isOpen, onClose, onSuccess }: SealGenerationModalProps) {
  const [sealType, setSealType] = useState<'qr' | 'barcode'>('qr');
  const [sealCode, setSealCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const generateRandomCode = () => {
    const prefix = sealType === 'qr' ? 'QR' : 'BC';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    setSealCode(`${prefix}-${timestamp}-${random}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/seals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sealCode,
          sealType,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create seal');
      }

      // Success
      showToast('success', `Seal ${sealCode} created successfully!`);
      setSealCode('');
      setSealType('qr');
      onSuccess();
      onClose();
    } catch (err: any) {
      showToast('error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Generate New Seal">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Seal Type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Seal Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSealType('qr')}
              className={`p-4 rounded-lg border-2 transition-all ${
                sealType === 'qr'
                  ? 'border-primary-500 bg-primary-600/20'
                  : 'border-dark-700 bg-dark-800 hover:border-dark-600'
              }`}
            >
              <QrCode className={`w-8 h-8 mx-auto mb-2 ${
                sealType === 'qr' ? 'text-primary-500' : 'text-gray-400'
              }`} />
              <p className={`text-sm font-medium ${
                sealType === 'qr' ? 'text-white' : 'text-gray-400'
              }`}>
                QR Code
              </p>
            </button>

            <button
              type="button"
              onClick={() => setSealType('barcode')}
              className={`p-4 rounded-lg border-2 transition-all ${
                sealType === 'barcode'
                  ? 'border-primary-500 bg-primary-600/20'
                  : 'border-dark-700 bg-dark-800 hover:border-dark-600'
              }`}
            >
              <Barcode className={`w-8 h-8 mx-auto mb-2 ${
                sealType === 'barcode' ? 'text-primary-500' : 'text-gray-400'
              }`} />
              <p className={`text-sm font-medium ${
                sealType === 'barcode' ? 'text-white' : 'text-gray-400'
              }`}>
                Barcode
              </p>
            </button>
          </div>
        </div>

        {/* Seal Code */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Seal Code
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={sealCode}
              onChange={(e) => setSealCode(e.target.value)}
              placeholder="Enter or generate seal code"
              className="input-field flex-1"
              required
            />
            <button
              type="button"
              onClick={generateRandomCode}
              className="btn-secondary whitespace-nowrap"
            >
              Generate
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary flex-1"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary flex-1"
            disabled={loading || !sealCode}
          >
            {loading ? 'Creating...' : 'Create Seal'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
