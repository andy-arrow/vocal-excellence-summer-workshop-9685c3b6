
import React from "react";
import SecurePaymentBadge from "./SecurePaymentBadge";

interface SimpleModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showSecureBadge?: boolean;
}

const SimpleModal: React.FC<SimpleModalProps> = ({
  open,
  onClose,
  title,
  children,
  showSecureBadge = false,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 px-2 py-1 text-apple-blue hover:text-apple-blue-hover text-xl"
          aria-label="Close"
        >
          ×
        </button>
        <div className="flex items-center justify-between mb-4">
          {title && <h2 className="text-lg font-bold">{title}</h2>}
          {showSecureBadge && <SecurePaymentBadge size="sm" />}
        </div>
        {children}
      </div>
    </div>
  );
};

export default SimpleModal;
