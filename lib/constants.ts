// Application Constants

export const APP_NAME = 'LOGIFAST';
export const APP_DESCRIPTION = 'Security Seal Tracking System';

// API Endpoints
export const API_ENDPOINTS = {
  SEALS: '/api/seals',
  SHIPMENTS: '/api/shipments',
  SCANS: '/api/scans',
  USERS: '/api/users',
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  OPERATOR: 'operator',
  VIEWER: 'viewer',
} as const;

// Seal Types
export const SEAL_TYPES = {
  QR: 'qr',
  BARCODE: 'barcode',
} as const;

// Seal Status
export const SEAL_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  COMPROMISED: 'compromised',
} as const;

// Shipment Status
export const SHIPMENT_STATUS = {
  PENDING: 'pending',
  IN_TRANSIT: 'in-transit',
  DELIVERED: 'delivered',
} as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Scanner Settings
export const SCANNER_CONFIG = {
  FPS: 10,
  QR_BOX_SIZE: 250,
  ASPECT_RATIO: 1,
};

// Date Formats
export const DATE_FORMAT = 'MMM dd, yyyy';
export const DATETIME_FORMAT = 'MMM dd, yyyy HH:mm';

// Alert Thresholds
export const SCAN_ALERT_THRESHOLD = 3; // Alert if scanned more than 3 times

// Export for use in components
export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
export type SealType = typeof SEAL_TYPES[keyof typeof SEAL_TYPES];
export type SealStatus = typeof SEAL_STATUS[keyof typeof SEAL_STATUS];
export type ShipmentStatus = typeof SHIPMENT_STATUS[keyof typeof SHIPMENT_STATUS];
