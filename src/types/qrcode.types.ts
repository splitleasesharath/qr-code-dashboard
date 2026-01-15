export interface QRCode {
  id: string;
  title: string;
  content: string;
  useCaseId: string;
  useCaseName: string;
  houseManualId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UseCase {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface HouseManual {
  id: string;
  name: string;
  propertyAddress: string;
  qrCodes: QRCode[];
}

export type DashboardMode = 'view' | 'edit' | 'create' | 'preview';

export interface DashboardState {
  mode: DashboardMode;
  qrCodeToEdit: QRCode | null;
  qrCodesToPrint: QRCode[];
  selectedQRCodes: Set<string>;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}
