
import React from "react";
import SecurePaymentBadge from "./SecurePaymentBadge";

interface SimpleModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showSecureBadge?: boolean;
  backdropOpacity?: "light" | "medium" | "dark";
}

const SimpleModal: React.FC<SimpleModalProps> = ({
  open,
  onClose,
  title,
  children,
  showSecureBadge = false,
  backdropOpacity = "medium",
}) => {
  if (!open) return null;
  
  const backdropClasses = {
    light: "bg-black/30",
    medium: "bg-black/50",
    dark: "bg-black/70"
  };
  
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${backdropClasses[backdropOpacity]}`}>
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 relative mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 px-2 py-1 text-blue-700 hover:text-blue-800 text-xl"
          aria-label="Close"
        >
          ×
        </button>
        <div className="flex items-center justify-between mb-6">
          {title && <h2 className="text-lg font-bold">{title}</h2>}
          {showSecureBadge && <SecurePaymentBadge size="sm" />}
        </div>
        <div className="max-w-prose">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SimpleModal;
