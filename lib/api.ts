// API utility functions for frontend

const API_BASE = '/api';

// Seals API
export const sealsApi = {
  getAll: async () => {
    const res = await fetch(`${API_BASE}/seals`);
    if (!res.ok) throw new Error('Failed to fetch seals');
    return res.json();
  },

  getByCode: async (code: string) => {
    const res = await fetch(`${API_BASE}/seals/code/${code}`);
    if (!res.ok) throw new Error('Seal not found');
    return res.json();
  },

  create: async (data: any) => {
    const res = await fetch(`${API_BASE}/seals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create seal');
    return res.json();
  },
};

// Shipments API
export const shipmentsApi = {
  getAll: async (status?: string) => {
    const url = status
      ? `${API_BASE}/shipments?status=${status}`
      : `${API_BASE}/shipments`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch shipments');
    return res.json();
  },

  getById: async (id: string) => {
    const res = await fetch(`${API_BASE}/shipments/${id}`);
    if (!res.ok) throw new Error('Shipment not found');
    return res.json();
  },

  create: async (data: any) => {
    const res = await fetch(`${API_BASE}/shipments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create shipment');
    return res.json();
  },

  update: async (id: string, data: any) => {
    const res = await fetch(`${API_BASE}/shipments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update shipment');
    return res.json();
  },
};

// Scans API
export const scansApi = {
  record: async (sealCode: string, location?: string) => {
    const res = await fetch(`${API_BASE}/scans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sealCode, location }),
    });
    if (!res.ok) throw new Error('Failed to record scan');
    return res.json();
  },

  getHistory: async (sealId: string) => {
    const res = await fetch(`${API_BASE}/scans?sealId=${sealId}`);
    if (!res.ok) throw new Error('Failed to fetch scan history');
    return res.json();
  },
};

// Usage example:
// import { sealsApi, shipmentsApi, scansApi } from '@/lib/api';
// const seals = await sealsApi.getAll();
