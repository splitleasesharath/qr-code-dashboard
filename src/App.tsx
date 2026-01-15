import { useState } from 'react';
import QRCodeDashboard from './components/QRCodeDashboard';
import { HouseManual, QRCode } from './types/qrcode.types';

// Sample data for demonstration
const sampleHouseManual: HouseManual = {
  id: 'hm-001',
  name: 'Beach House Manual',
  propertyAddress: '123 Ocean Drive, Miami, FL',
  qrCodes: [
    {
      id: 'qr-001',
      title: 'WiFi Access',
      content: 'WIFI:T:WPA;S:BeachHouse;P:Welcome123;;',
      useCaseId: 'uc-001',
      useCaseName: 'WiFi Connection',
      houseManualId: 'hm-001',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: 'qr-002',
      title: 'House Rules',
      content: 'https://splitlease.com/rules/hm-001',
      useCaseId: 'uc-002',
      useCaseName: 'House Rules',
      houseManualId: 'hm-001',
      createdAt: new Date('2024-01-16'),
      updatedAt: new Date('2024-01-16')
    },
    {
      id: 'qr-003',
      title: 'Emergency Contacts',
      content: 'https://splitlease.com/emergency/hm-001',
      useCaseId: 'uc-003',
      useCaseName: 'Emergency Info',
      houseManualId: 'hm-001',
      createdAt: new Date('2024-01-17'),
      updatedAt: new Date('2024-01-17')
    }
  ]
};

function App() {
  const [houseManual, setHouseManual] = useState<HouseManual>(sampleHouseManual);
  const [isOpen, setIsOpen] = useState(true);

  const handleSaveQRCode = (qrCode: QRCode) => {
    setHouseManual(prev => {
      const existingIndex = prev.qrCodes.findIndex(q => q.id === qrCode.id);
      if (existingIndex >= 0) {
        const updated = [...prev.qrCodes];
        updated[existingIndex] = qrCode;
        return { ...prev, qrCodes: updated };
      }
      return { ...prev, qrCodes: [...prev.qrCodes, qrCode] };
    });
  };

  const handleDeleteQRCode = (qrCodeId: string) => {
    setHouseManual(prev => ({
      ...prev,
      qrCodes: prev.qrCodes.filter(q => q.id !== qrCodeId)
    }));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <div className="app-container">
        <button
          className="btn btn-primary"
          onClick={() => setIsOpen(true)}
        >
          Open QR Code Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <QRCodeDashboard
        houseManual={houseManual}
        onSaveQRCode={handleSaveQRCode}
        onDeleteQRCode={handleDeleteQRCode}
        onClose={handleClose}
      />
    </div>
  );
}

export default App;
