
import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  widthClass?: string;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children, widthClass = "max-w-md" }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-colors">
      <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 ${widthClass} w-full mx-4`}>
        <div className="flex justify-between items-center mb-4">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          <button
            aria-label="Close"
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={onClose}
          >
            <span className="text-xl font-bold">&times;</span>
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
