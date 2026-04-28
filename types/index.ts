// Seal Types
export interface Seal {
  id: string;
  seal_code: string;
  seal_type: 'qr' | 'barcode';
  status: 'active' | 'inactive' | 'compromised';
  created_at: Date;
  created_by: string;
}

// Shipment Types
export interface Shipment {
  id: string;
  seal_id: string;
  truck_id: string;
  product_name: string;
  product_description: string;
  quantity: number;
  unit: string;
  origin: string;
  destination: string;
  status: 'pending' | 'in-transit' | 'delivered';
  created_at: Date;
  updated_at: Date;
  created_by: string;
}

// Scan Types
export interface Scan {
  id: string;
  seal_id: string;
  shipment_id: string;
  scanned_by: string;
  scanned_at: Date;
  location?: string;
  device_info: string;
  ip_address: string;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
  created_at: Date;
}
