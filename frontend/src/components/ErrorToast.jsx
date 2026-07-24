import React from 'react';
import { AlertCircle, X } from 'lucide-react';

export default function ErrorToast({ error, onClose }) {
  if (!error) return null;

  return (
    <div className="error-toast-container" role="alert">
      <div className="error-toast">
        <AlertCircle className="error-toast-icon" size={22} />
        <div className="error-toast-content">
          <div className="error-toast-title">API Error</div>
          <div className="error-toast-message">{error.message}</div>
          {error.code && (
            <div className="error-toast-code">[{error.code}]</div>
          )}
          {error.details && error.details.length > 0 && (
            <div style={{ fontSize: '0.75rem', marginTop: '0.3rem', color: 'var(--text-muted)' }}>
              Fields: {error.details.join(', ')}
            </div>
          )}
        </div>
        <button
          className="error-toast-close"
          onClick={onClose}
          aria-label="Close Error Notification"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
