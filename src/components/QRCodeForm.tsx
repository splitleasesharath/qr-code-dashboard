import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QRCode, UseCase } from '../types/qrcode.types';
import '../styles/QRCodeForm.css';

interface QRCodeFormProps {
  qrCode: QRCode | null;
  useCases: UseCase[];
  houseManualId: string;
  onSave: (qrCode: QRCode) => void;
  onCancel: () => void;
  isEditMode: boolean;
}

function QRCodeForm({ qrCode, useCases, houseManualId, onSave, onCancel, isEditMode }: QRCodeFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedUseCaseId, setSelectedUseCaseId] = useState('');
  const [errors, setErrors] = useState<{ title?: string; content?: string; useCase?: string }>({});

  useEffect(() => {
    if (qrCode) {
      setTitle(qrCode.title);
      setContent(qrCode.content);
      setSelectedUseCaseId(qrCode.useCaseId);
    } else {
      setTitle('');
      setContent('');
      setSelectedUseCaseId('');
    }
  }, [qrCode]);

  const selectedUseCase = useCases.find(uc => uc.id === selectedUseCaseId);

  const validate = (): boolean => {
    const newErrors: { title?: string; content?: string; useCase?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!content.trim()) {
      newErrors.content = 'QR code content is required';
    } else if (content.length > 2000) {
      newErrors.content = 'Content must be less than 2000 characters';
    }

    if (!selectedUseCaseId) {
      newErrors.useCase = 'Please select a use case';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const useCase = useCases.find(uc => uc.id === selectedUseCaseId);

    const newQRCode: QRCode = {
      id: qrCode?.id || `qr-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      useCaseId: selectedUseCaseId,
      useCaseName: useCase?.name || '',
      houseManualId,
      createdAt: qrCode?.createdAt || new Date(),
      updatedAt: new Date()
    };

    onSave(newQRCode);
  };

  return (
    <div className="qr-form-container">
      <div className="qr-form-header">
        <h2>{isEditMode ? 'Edit QR Code' : 'Create a New QR Code'}</h2>
        <p>Fill in the details below to {isEditMode ? 'update' : 'generate'} your QR code</p>
      </div>

      <form className="qr-form" onSubmit={handleSubmit}>
        <div className="form-layout">
          {/* Form Fields */}
          <div className="form-fields">
            {/* Title Input */}
            <div className="form-group">
              <label htmlFor="qr-title">QR Code Title</label>
              <input
                id="qr-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a descriptive title"
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            {/* Use Case Dropdown */}
            <div className="form-group">
              <label htmlFor="qr-usecase">Select the type of instructions</label>
              <select
                id="qr-usecase"
                value={selectedUseCaseId}
                onChange={(e) => setSelectedUseCaseId(e.target.value)}
                className={errors.useCase ? 'error' : ''}
              >
                <option value="">Choose a use case...</option>
                {useCases.map(useCase => (
                  <option key={useCase.id} value={useCase.id}>
                    {useCase.name}
                  </option>
                ))}
              </select>
              {errors.useCase && <span className="error-message">{errors.useCase}</span>}
            </div>

            {/* Use Case Description */}
            {selectedUseCase && (
              <div className="usecase-description">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span>{selectedUseCase.description}</span>
              </div>
            )}

            {/* Content Input */}
            <div className="form-group">
              <label htmlFor="qr-content">QR Code Content</label>
              <textarea
                id="qr-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter the URL, text, or data to encode in the QR code"
                rows={4}
                className={errors.content ? 'error' : ''}
              />
              <div className="input-footer">
                <span className="char-count">{content.length}/2000 characters</span>
                {errors.content && <span className="error-message">{errors.content}</span>}
              </div>
            </div>
          </div>

          {/* QR Code Preview */}
          <div className="qr-preview">
            <div className="preview-label">Preview</div>
            <div className="preview-box">
              {content ? (
                <QRCodeSVG
                  value={content}
                  size={180}
                  level="M"
                  includeMargin={true}
                  bgColor="#ffffff"
                  fgColor="#000000"
                />
              ) : (
                <div className="preview-placeholder">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  <span>Enter content to preview</span>
                </div>
              )}
            </div>
            {title && <div className="preview-title">{title}</div>}
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditMode ? 'Save Changes' : 'Create QR Code'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default QRCodeForm;
