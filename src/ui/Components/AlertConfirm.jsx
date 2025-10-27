// src/ui/Components/AlertConfirm.jsx
import React from "react";

export default function AlertConfirm({ title, message, onClose }) {
  return (
    <div role="alert" className="alert-overlay">
      <div className="alert-card">
        <div className="alert-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="alert-icon"
            aria-hidden="true"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <div className="alert-content">
            <strong className="alert-title">{title}</strong>
            <p className="alert-text">{message}</p>
          </div>

          <button className="alert-close" onClick={onClose} aria-label="Cerrar alerta">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="alert-close-icon">
              <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
