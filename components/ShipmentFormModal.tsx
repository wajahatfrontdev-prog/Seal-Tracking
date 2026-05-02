'use client';

import { useState, useEffect } from 'react';
import Modal from './Modal';
import { Truck, Package, MapPin } from 'lucide-react';
import { useToast } from './ToastContext';

interface ShipmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ShipmentFormModal({ isOpen, onClose, onSuccess }: ShipmentFormModalProps) {
  const [seals, setSeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    sealId: '',
    truckId: '',
    productName: '',
    productDescription: '',
    quantity: '',
    unit: 'bags',
    origin: '',
    destination: '',
    status: 'pending',
  });

  useEffect(() => {
    if (isOpen) {
      fetchSeals();
    }
  }, [isOpen]);

  const fetchSeals = async () => {
    try {
      const response = await fetch('/api/seals');
      if (response.ok) {
        const data = await response.json();
        // Filter only active seals
        setSeals(data.filter((seal: any) => seal.status === 'active'));
      }
    } catch (error) {
      console.error('Error fetching seals:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/shipments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create shipment');
      }

      // Success - reset form
      showToast('success', `Shipment for truck ${formData.truckId} created successfully!`);
      setFormData({
        sealId: '',
        truckId: '',
        productName: '',
        productDescription: '',
        quantity: '',
        unit: 'bags',
        origin: '',
        destination: '',
        status: 'pending',
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      showToast('error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Shipment">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Seal Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Security Seal *
          </label>
          <select
            name="sealId"
            value={formData.sealId}
            onChange={handleChange}
            className="input-field w-full"
            required
          >
            <option value="">Select a seal</option>
            {seals.map((seal) => (
              <option key={seal.id} value={seal.id}>
                {seal.sealCode} ({seal.sealType})
              </option>
            ))}
          </select>
        </div>

        {/* Truck ID */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Truck/Vehicle ID *
          </label>
          <div className="relative">
            <Truck className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              name="truckId"
              value={formData.truckId}
              onChange={handleChange}
              placeholder="e.g., DEZ-389"
              className="input-field w-full pl-10"
              required
            />
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Product Name *
          </label>
          <div className="relative">
            <Package className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="e.g., Cotton Bales"
              className="input-field w-full pl-10"
              required
            />
          </div>
        </div>

        {/* Product Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Product Description
          </label>
          <textarea
            name="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
            placeholder="Additional details about the product"
            className="input-field w-full resize-none"
            rows={2}
          />
        </div>

        {/* Quantity and Unit */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Quantity *
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="150"
              className="input-field w-full"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Unit *
            </label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="input-field w-full"
              required
            >
              <option value="bags">Bags</option>
              <option value="kg">Kilograms</option>
              <option value="tons">Tons</option>
              <option value="boxes">Boxes</option>
              <option value="pieces">Pieces</option>
            </select>
          </div>
        </div>

        {/* Origin */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Origin *
          </label>
          <div className="relative">
            <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              placeholder="e.g., Karachi Warehouse"
              className="input-field w-full pl-10"
              required
            />
          </div>
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Destination *
          </label>
          <div className="relative">
            <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="e.g., Lahore Distribution Center"
              className="input-field w-full pl-10"
              required
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Status *
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input-field w-full"
            required
          >
            <option value="pending">Pending</option>
            <option value="in-transit">In Transit</option>
            <option value="delivered">Delivered</option>
          </select>
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
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Shipment'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
