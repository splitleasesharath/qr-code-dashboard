import { useState, useRef, useCallback } from 'react';
import { useReactToPrint } from 'react-to-print';
import { HouseManual, QRCode, DashboardMode, UseCase, ToastMessage } from '../types/qrcode.types';
import QRCodeGrid from './QRCodeGrid';
import QRCodeForm from './QRCodeForm';
import PrintPreview from './PrintPreview';
import Toast from './Toast';
import '../styles/QRCodeDashboard.css';

// Default use cases for QR codes
const defaultUseCases: UseCase[] = [
  { id: 'uc-001', name: 'WiFi Connection', description: 'Share WiFi credentials with guests. QR code will auto-connect their device.', category: 'connectivity' },
  { id: 'uc-002', name: 'House Rules', description: 'Link to property rules and guidelines guests should follow.', category: 'information' },
  { id: 'uc-003', name: 'Emergency Info', description: 'Quick access to emergency contacts and local services.', category: 'safety' },
  { id: 'uc-004', name: 'Check-in Instructions', description: 'Step-by-step guide for guest check-in process.', category: 'information' },
  { id: 'uc-005', name: 'Local Recommendations', description: 'Curated list of nearby restaurants, attractions, and services.', category: 'hospitality' },
  { id: 'uc-006', name: 'Appliance Guide', description: 'Instructions for using specific appliances in the property.', category: 'instructions' },
  { id: 'uc-007', name: 'Parking Instructions', description: 'Parking location and access instructions.', category: 'information' },
  { id: 'uc-008', name: 'Checkout Checklist', description: 'Tasks guests should complete before checkout.', category: 'information' }
];

interface QRCodeDashboardProps {
  houseManual: HouseManual;
  onSaveQRCode: (qrCode: QRCode) => void;
  onDeleteQRCode: (qrCodeId: string) => void;
  onClose: () => void;
}

function QRCodeDashboard({ houseManual, onSaveQRCode, onDeleteQRCode, onClose }: QRCodeDashboardProps) {
  const [mode, setMode] = useState<DashboardMode>('view');
  const [qrCodeToEdit, setQrCodeToEdit] = useState<QRCode | null>(null);
  const [selectedQRCodes, setSelectedQRCodes] = useState<Set<string>>(new Set());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `QR Codes - ${houseManual.name}`,
  });

  const showToast = useCallback((type: ToastMessage['type'], message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const handleAddQRCode = () => {
    setQrCodeToEdit(null);
    setMode('create');
  };

  const handleEditQRCode = (qrCode: QRCode) => {
    setQrCodeToEdit(qrCode);
    setMode('edit');
  };

  const handleDeleteQRCode = (qrCodeId: string) => {
    if (window.confirm('Are you sure you want to delete this QR code?')) {
      onDeleteQRCode(qrCodeId);
      showToast('success', 'QR Code deleted successfully');
      setSelectedQRCodes(prev => {
        const updated = new Set(prev);
        updated.delete(qrCodeId);
        return updated;
      });
    }
  };

  const handleSaveQRCode = (qrCode: QRCode) => {
    onSaveQRCode(qrCode);
    showToast('success', mode === 'create' ? 'QR Code created successfully' : 'QR Code updated successfully');
    setMode('view');
    setQrCodeToEdit(null);
  };

  const handleCancelForm = () => {
    setMode('view');
    setQrCodeToEdit(null);
  };

  const handleBack = () => {
    if (mode === 'preview') {
      setMode('view');
    } else {
      onClose();
    }
  };

  const handleToggleSelect = (qrCodeId: string) => {
    setSelectedQRCodes(prev => {
      const updated = new Set(prev);
      if (updated.has(qrCodeId)) {
        updated.delete(qrCodeId);
      } else {
        updated.add(qrCodeId);
      }
      return updated;
    });
  };

  const handleSelectAll = () => {
    if (selectedQRCodes.size === houseManual.qrCodes.length) {
      setSelectedQRCodes(new Set());
    } else {
      setSelectedQRCodes(new Set(houseManual.qrCodes.map(q => q.id)));
    }
  };

  const handlePreview = () => {
    if (selectedQRCodes.size === 0) {
      showToast('warning', 'Please select at least one QR code to preview');
      return;
    }
    setMode('preview');
  };

  const handlePrintSelected = () => {
    if (selectedQRCodes.size === 0) {
      showToast('warning', 'Please select at least one QR code to print');
      return;
    }
    handlePrint();
  };

  const selectedQRCodesArray = houseManual.qrCodes.filter(q => selectedQRCodes.has(q.id));

  return (
    <div className="qr-dashboard">
      {/* Toast Container */}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} />
        ))}
      </div>

      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1 className="dashboard-title">QR Codes</h1>
          <span className="qr-count">{houseManual.qrCodes.length} codes</span>
        </div>
        <div className="header-right">
          {mode === 'view' && selectedQRCodes.size > 0 && (
            <span className="selected-count">{selectedQRCodes.size} selected</span>
          )}
          <button className="btn-icon" onClick={onClose} title="Close Dashboard">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="dashboard-actions">
        <div className="actions-left">
          {mode !== 'view' && (
            <button className="btn btn-secondary" onClick={handleBack}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back
            </button>
          )}
          {mode === 'view' && (
            <button className="btn btn-primary" onClick={handleAddQRCode}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add QR Code
            </button>
          )}
        </div>
        {mode === 'view' && houseManual.qrCodes.length > 0 && (
          <div className="actions-right">
            <button className="btn btn-outline" onClick={handleSelectAll}>
              {selectedQRCodes.size === houseManual.qrCodes.length ? 'Deselect All' : 'Select All'}
            </button>
            <button className="btn btn-outline" onClick={handlePreview} disabled={selectedQRCodes.size === 0}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              Preview
            </button>
            <button className="btn btn-primary" onClick={handlePrintSelected} disabled={selectedQRCodes.size === 0}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              Print ({selectedQRCodes.size})
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="dashboard-content">
        {mode === 'view' && (
          <QRCodeGrid
            qrCodes={houseManual.qrCodes}
            selectedQRCodes={selectedQRCodes}
            onEdit={handleEditQRCode}
            onDelete={handleDeleteQRCode}
            onToggleSelect={handleToggleSelect}
            onAddNew={handleAddQRCode}
          />
        )}

        {(mode === 'create' || mode === 'edit') && (
          <QRCodeForm
            qrCode={qrCodeToEdit}
            useCases={defaultUseCases}
            houseManualId={houseManual.id}
            onSave={handleSaveQRCode}
            onCancel={handleCancelForm}
            isEditMode={mode === 'edit'}
          />
        )}

        {mode === 'preview' && (
          <PrintPreview
            qrCodes={selectedQRCodesArray}
            houseManualName={houseManual.name}
            onPrint={handlePrint}
            onBack={() => setMode('view')}
          />
        )}
      </div>

      {/* Hidden Print Container */}
      <div style={{ display: 'none' }}>
        <div ref={printRef}>
          <PrintPreview
            qrCodes={selectedQRCodesArray}
            houseManualName={houseManual.name}
            isPrintMode={true}
          />
        </div>
      </div>
    </div>
  );
}

export default QRCodeDashboard;
