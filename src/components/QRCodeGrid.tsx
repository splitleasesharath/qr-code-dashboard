import { QRCodeSVG } from 'qrcode.react';
import { QRCode } from '../types/qrcode.types';
import '../styles/QRCodeGrid.css';

interface QRCodeGridProps {
  qrCodes: QRCode[];
  selectedQRCodes: Set<string>;
  onEdit: (qrCode: QRCode) => void;
  onDelete: (qrCodeId: string) => void;
  onToggleSelect: (qrCodeId: string) => void;
  onAddNew: () => void;
}

function QRCodeGrid({ qrCodes, selectedQRCodes, onEdit, onDelete, onToggleSelect, onAddNew }: QRCodeGridProps) {
  if (qrCodes.length === 0) {
    return (
      <div className="qr-grid-empty">
        <div className="empty-state">
          <div className="empty-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </div>
          <h3>No QR codes added...</h3>
          <p>Create your first QR code for this house manual</p>
          <button className="btn btn-primary" onClick={onAddNew}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add QR Code
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="qr-grid">
      {qrCodes.map(qrCode => (
        <div
          key={qrCode.id}
          className={`qr-card ${selectedQRCodes.has(qrCode.id) ? 'selected' : ''}`}
        >
          {/* Selection Checkbox */}
          <div className="qr-select" onClick={() => onToggleSelect(qrCode.id)}>
            <div className={`checkbox ${selectedQRCodes.has(qrCode.id) ? 'checked' : ''}`}>
              {selectedQRCodes.has(qrCode.id) && (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </div>
          </div>

          {/* QR Code Image */}
          <div className="qr-image" onClick={() => onToggleSelect(qrCode.id)}>
            <QRCodeSVG
              value={qrCode.content}
              size={120}
              level="M"
              includeMargin={true}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>

          {/* QR Code Info */}
          <div className="qr-info">
            <h4 className="qr-title">{qrCode.title}</h4>
            <span className="qr-usecase">{qrCode.useCaseName}</span>
          </div>

          {/* Action Buttons */}
          <div className="qr-actions">
            <button
              className="btn-icon btn-edit"
              onClick={() => onEdit(qrCode)}
              title="Edit QR Code"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button
              className="btn-icon btn-delete"
              onClick={() => onDelete(qrCode.id)}
              title="Delete QR Code"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        </div>
      ))}

      {/* Add New Card */}
      <div className="qr-card qr-card-add" onClick={onAddNew}>
        <div className="add-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
        <span>Add QR Code</span>
      </div>
    </div>
  );
}

export default QRCodeGrid;
